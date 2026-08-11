import { useEffect, useRef } from 'react';

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const elements = el.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return ref;
}

export function useScrollReveal() {
  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );

    // Observe every .animate-on-scroll element currently in the DOM.
    const observeAll = () => {
      document.querySelectorAll('.animate-on-scroll:not(.is-visible)').forEach((el) => {
        intersectionObserver.observe(el);
      });
    };

    observeAll();

    // Elements that render later (e.g. job/testimonial cards that only
    // appear once their Supabase fetch resolves) are added to the DOM
    // after this effect's first run, so a one-time querySelectorAll
    // misses them entirely and they stay stuck at opacity: 0 forever.
    // A MutationObserver re-scans whenever new nodes are added and picks
    // up anything the initial pass missed.
    const mutationObserver = new MutationObserver(() => {
      observeAll();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      intersectionObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}
