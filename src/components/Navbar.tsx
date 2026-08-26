import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const links = [
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'industries', label: 'Industries' },
  { id: 'jobs', label: 'Openings' },
  { id: 'testimonials', label: 'Voices' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Fully opaque backdrop keeps the bar (and the logo/company name) legible over
          every section, including images, regardless of scroll position. */}
      <header
        className={`fixed top-0 inset-x-0 z-50 bg-[var(--ivory)] border-b border-[var(--line)] transition-all duration-300 ${
          scrolled ? 'py-2.5 shadow-sm shadow-black/5' : 'py-4'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-14 flex items-center justify-between gap-3">
          <button onClick={() => handleNav('home')} className="flex items-center gap-3 group min-w-0">
            <Logo />
          </button>

          <nav className="hidden lg:flex items-center gap-7">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => handleNav(l.id)}
                className="text-[13px] tracking-wide link-underline text-[var(--ink)] whitespace-nowrap"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => handleNav('jobs')}
            className="hidden lg:inline-flex btn-emerald text-[11px] py-2.5 px-5 whitespace-nowrap flex-shrink-0"
          >
            Explore Openings
          </button>

          <button
            className="lg:hidden text-[var(--ink)] flex-shrink-0 p-1.5 -mr-1.5"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] bg-[var(--ivory)] lg:hidden flex flex-col overflow-y-auto">
          <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--line)] flex-shrink-0">
            <span className="font-serif text-lg">Renaissance</span>
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-1.5 -mr-1.5">
              <X size={22} />
            </button>
          </div>
          <div className="flex flex-col p-6 sm:p-8 gap-5">
            {links.map((l) => (
              <button key={l.id} onClick={() => handleNav(l.id)} className="font-serif text-2xl sm:text-3xl text-left">
                {l.label}
              </button>
            ))}
            <button onClick={() => handleNav('jobs')} className="btn-emerald mt-4 w-full sm:w-auto sm:self-start justify-center">
              Explore Openings
            </button>
          </div>
        </div>
      )}
    </>
  );
}
