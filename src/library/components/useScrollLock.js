import { useEffect } from 'react';

let locks = 0;
let restore;

export function useScrollLock(isLocked) {
  useEffect(() => {
    if (!isLocked) return;
    const body = document.body;
    if (locks++ === 0) {
      const { overflow, paddingRight } = body.style;
      const width = document.documentElement.clientWidth;
      const gap = width ? Math.max(0, window.innerWidth - width) : 0;
      const padding = parseFloat(getComputedStyle(body).paddingRight) || 0;
      body.style.overflow = 'hidden';
      if (gap) body.style.paddingRight = padding + gap + 'px';
      restore = () => Object.assign(body.style, { overflow, paddingRight });
    }
    return () => {
      if (--locks === 0) restore();
    };
  }, [isLocked]);
}

export default useScrollLock;
