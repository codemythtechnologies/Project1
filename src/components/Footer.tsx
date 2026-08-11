import { Mail, Phone, MapPin, ArrowUp, Linkedin, Facebook, Twitter } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const quickLinks = [
    { label: 'About Us', href: '#about' },
    { label: 'Our Services', href: '#services' },
    { label: 'Industries', href: '#industries' },
    { label: 'Job Openings', href: '#jobs' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ];

  const services = [
    'Manpower Staffing',
    'Executive Headhunting',
    'Personnel Selection',
    'Job Placement Services',
    'Recruitment Consultancy',
  ];

  return (
    <footer className="relative overflow-hidden bg-ink-950 text-ink-300">
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-brand-500 via-brand-400 to-accent-400" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Logo variant="light" />
            <p className="mt-5 text-sm leading-relaxed text-ink-400">
              A renowned manpower recruitment agency in India with 24+ years of
              excellence. Right Candidate for the Right Position — trusted by
              multinational and Indian companies of repute.
            </p>
            <div className="mt-5 flex gap-3">
              {[Linkedin, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-ink-400 transition-all duration-300 hover:bg-brand-500 hover:text-white hover:scale-110"
                  aria-label="Social link"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Quick Links</h4>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="group flex items-center gap-2 text-sm text-ink-400 transition-colors hover:text-brand-400"
                  >
                    <span className="h-px w-0 bg-brand-400 transition-all duration-300 group-hover:w-4" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Our Services</h4>
            <ul className="mt-5 space-y-3">
              {services.map((s) => (
                <li key={s} className="text-sm text-ink-400 transition-colors hover:text-brand-400 cursor-pointer">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Contact Info</h4>
            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <Mail className="h-5 w-5 flex-shrink-0 text-brand-400" />
                <a href="mailto:renhrcentral@gmail.com" className="text-ink-400 transition-colors hover:text-brand-400">
                  renhrcentral@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Phone className="h-5 w-5 flex-shrink-0 text-brand-400" />
                <div className="flex flex-col gap-0.5">
                  <a href="tel:+919944909999" className="text-ink-400 transition-colors hover:text-brand-400">
                    +91 99449 09999
                  </a>
                  <a href="tel:+919842398452" className="text-ink-400 transition-colors hover:text-brand-400">
                    +91 98423 98452
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="h-5 w-5 flex-shrink-0 text-brand-400" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Renaissance+Management+Consultants+Ellaipillai+Chavadi+Thanthai+Periyar+Nagar+Pondicherry+605001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-400 transition-colors hover:text-brand-400"
                >
                  No 10, Ellaipillai Chavadi, Thanthai Periyar Nagar, 6th Cross Street, Pondicherry Bazaar, Puducherry 605001
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-sm text-ink-500">
            &copy; {new Date().getFullYear()} Renaissance Management Consultants. All rights reserved.
          </p>
          <p className="text-sm text-ink-500">
            Crafted with care at <span className="font-semibold text-ink-400">CodeMyth Technologies</span>
          </p>
          <button
            onClick={() => scrollTo('#home')}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-ink-400 transition-all duration-300 hover:bg-brand-500 hover:text-white hover:-translate-y-1"
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
