import { useEffect, useState } from 'react';

const sections = [
  { id: 'home', label: 'Intro' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'industries', label: 'Industries' },
  { id: 'process', label: 'Process' },
  { id: 'jobs', label: 'Openings' },
  { id: 'partners', label: 'Network' },
  { id: 'testimonials', label: 'Voices' },
  { id: 'contact', label: 'Contact' },
];

export default function SideNav() {
  const [active, setActive] = useState('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-5">
      {sections.map(({ id, label }) => (
        <a key={id} href={`#${id}`} className="group flex items-center gap-3" aria-label={label}>
          <span
            className={`side-nav-dot block w-1.5 h-1.5 rounded-full ${
              active === id ? 'active' : 'bg-[var(--ink)]/30'
            }`}
          />
          <span
            className={`text-[10px] uppercase tracking-[0.24em] font-medium transition-all duration-300 ${
              active === id
                ? 'text-[var(--emerald)] opacity-100 translate-x-0'
                : 'text-[var(--ink)]/50 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
            }`}
          >
            {label}
          </span>
        </a>
      ))}
    </nav>
  );
}
