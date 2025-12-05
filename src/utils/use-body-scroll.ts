import { useEffect } from 'react';

export default function useBodyScroll(state: boolean) {
  useEffect(() => {
    const scrollWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = state ? 'hidden' : 'auto';
    document.body.style.paddingRight = state
      ? `${scrollWidth}px`
      : '0';
  }, [state]);
}
