import { useEffect, useRef } from 'react';
import useScrollLock from './useScrollLock';

const openDialogs = [];
const focusable = 'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), iframe, video[controls], [tabindex="0"]';

export function useDialogFocus(open, onClose) {
  const ref = useRef(null);
  const close = useRef(onClose);
  useEffect(() => { close.current = onClose; }, [onClose]);
  useScrollLock(open);
  useEffect(() => {
    if (!open || !ref.current) return;
    const dialog = ref.current;
    const previous = document.activeElement;
    const getTargets = () => [...dialog.querySelectorAll(focusable)].filter((item) =>
      !item.closest('[hidden], [inert]') && getComputedStyle(item).visibility !== 'hidden'
    );
    openDialogs.push(dialog);
    (dialog.querySelector('[data-dialog-focus]') || getTargets()[0] || dialog).focus({ preventScroll: true });
    function handleKey(event) {
      if (openDialogs.at(-1) !== dialog || event.defaultPrevented) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        close.current?.();
      }
      if (event.key !== 'Tab') return;
      const targets = getTargets();
      const first = targets[0];
      const last = targets.at(-1);
      const active = document.activeElement;
      if (!first || !targets.includes(active) || (event.shiftKey ? active === first : active === last)) {
        event.preventDefault();
        ((event.shiftKey ? last : first) || dialog).focus();
      }
    }
    function containFocus(event) {
      if (openDialogs.at(-1) === dialog && !dialog.contains(event.target)) {
        (getTargets()[0] || dialog).focus({ preventScroll: true });
      }
    }
    document.addEventListener('keydown', handleKey);
    document.addEventListener('focusin', containFocus);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('focusin', containFocus);
      const index = openDialogs.indexOf(dialog);
      const wasTop = index === openDialogs.length - 1;
      openDialogs.splice(index, 1);
      if (wasTop && previous?.isConnected) previous.focus({ preventScroll: true });
    };
  }, [open]);
  return ref;
}
