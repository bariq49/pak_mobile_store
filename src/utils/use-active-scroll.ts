import { useEffect, RefObject } from 'react';

export function useActiveScroll<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  topOffset: number = 80,
) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      requestAnimationFrame(() => {
        if (window.scrollY > topOffset) {
          element.classList.add('is-scrolling');
        } else {
          element.classList.remove('is-scrolling');
        }
      });
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [ref, topOffset]); // Ensure dependencies are properly handled
}
