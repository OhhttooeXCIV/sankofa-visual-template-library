import { useEffect, useRef, useState } from 'react';

export function useCopyCode() {
  const [status, setStatus] = useState('');
  const timeout = useRef();
  useEffect(() => () => clearTimeout(timeout.current), []);

  async function copy(code) {
    clearTimeout(timeout.current);
    try {
      await navigator.clipboard.writeText(code);
      setStatus('Copied!');
      timeout.current = setTimeout(() => setStatus(''), 2000);
    } catch {
      setStatus('Clipboard unavailable. Select the code to copy it manually.');
    }
  }

  return { status, copy };
}
