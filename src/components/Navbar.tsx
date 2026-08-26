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
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-[var(--ivory)]/85 backdrop-blur-md border-b border-[var(--line)]' : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14 py-5 flex items-center justify-between">
          <button onClick={() => handleNav('home')} className="flex items-center gap-3 group">
            <Logo />
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => handleNav(l.id)}
                className="text-[13px] tracking-wide link-underline text-[var(--ink)]"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <button onClick={() => handleNav('jobs')} className="hidden md:inline-flex btn-emerald text-[11px] py-3 px-5">
            Explore Openings
          </button>

          <button className="md:hidden text-[var(--ink)]" onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu size={22} />
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] bg-[var(--ivory)] md:hidden flex flex-col">
          <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--line)]">
            <span className="font-serif text-lg">Renaissance</span>
            <button onClick={() => setOpen(false)} aria-label="Close menu">
              <X size={22} />
            </button>
          </div>
          <div className="flex flex-col p-8 gap-6">
            {links.map((l) => (
              <button key={l.id} onClick={() => handleNav(l.id)} className="font-serif text-3xl text-left">
                {l.label}
              </button>
            ))}
            <button onClick={() => handleNav('jobs')} className="btn-emerald mt-6 self-start">
              Explore Openings
            </button>
          </div>
        </div>
      )}
    </>
  );
}
