import { Mail, Phone, MapPin, Star, ArrowUpRight } from 'lucide-react';

const contactInfo = [
  {
    icon: Mail,
    title: 'Email Us',
    value: 'renhrcentral@gmail.com',
    href: 'mailto:renhrcentral@gmail.com',
  },
  {
    icon: Phone,
    title: 'Call Us',
    value: '+91 99449 09999 / +91 98423 98452',
    href: 'tel:+919944909999',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    value:
      'No 10, Ellaipillai Chavadi, Thanthai Periyar Nagar, Near St. Patrick School, 6th Cross Street, Pondicherry Bazaar, Puducherry 605001',
    href: 'https://www.google.com/maps/search/?api=1&query=Renaissance+Management+Consultants+Ellaipillai+Chavadi+Thanthai+Periyar+Nagar+Pondicherry+605001',
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-36 bg-[var(--ink)] text-[var(--ivory)]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-12 gap-6 md:gap-10 mb-16 md:mb-20">
          <div className="col-span-12 md:col-span-4 animate-on-scroll">
            <span className="eyebrow" style={{ color: 'var(--emerald-accent)' }}>
              Get In Touch
            </span>
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ivory)]/50 mt-6">
              — Chapter 08
            </div>
          </div>
          <div className="col-span-12 md:col-span-8 animate-on-scroll">
            <h2 className="font-serif display-lg text-[var(--ivory)]">
              Let's Find Your Perfect{' '}
              <em className="italic" style={{ color: 'var(--emerald-accent)' }}>
                Match
              </em>
              .
            </h2>
            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-[var(--ivory)]/70">
              Whether you're a company looking for top talent or a candidate seeking the right
              opportunity — reach out by phone or email and our team will get back to you
              within 24 hours.
            </p>

            {/* Ratings row */}
            <div className="mt-8 flex flex-wrap gap-6">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Renaissance+Management+Consultants+Pondicherry"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 border border-white/20 py-2.5 px-4 hover:border-[var(--emerald-accent)] transition-colors"
              >
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill="var(--emerald-accent)" strokeWidth={0} />
                  ))}
                </div>
                <span className="text-[12px] tabular">4.8 on Google Reviews</span>
              </a>
              <a
                href="https://www.justdial.com/Pondicherry/Renaissance-Management-Consultants-Ellaipillai-Chavadi-Thanthai-Periyar-Nagar-Near-S-Pondicherry-Bazaar/0413P413STDS000129_BZDET"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 border border-white/20 py-2.5 px-4 hover:border-[var(--emerald-accent)] transition-colors"
              >
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill="var(--emerald-accent)" strokeWidth={0} />
                  ))}
                </div>
                <span className="text-[12px] tabular">4.8 &middot; 27 ratings on Justdial</span>
              </a>
            </div>
          </div>
        </div>

        {/* Contact grid */}
        <div className="grid grid-cols-12 gap-0 border-t border-white/15 animate-on-scroll">
          {contactInfo.map((c, i) => {
            const Icon = c.icon;
            return (
              <a
                key={c.title}
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel={c.href.startsWith('http') ? 'noreferrer' : undefined}
                className={`group col-span-12 md:col-span-4 p-8 border-b border-white/15 ${
                  i > 0 ? 'md:border-l' : ''
                } hover:bg-white/[0.03] transition-colors duration-500`}
              >
                <div className="flex items-start justify-between mb-6">
                  <Icon size={22} strokeWidth={1.5} style={{ color: 'var(--emerald-accent)' }} />
                  <ArrowUpRight
                    size={18}
                    className="opacity-40 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ivory)]/50 mb-3">
                  {c.title}
                </div>
                <div className="font-serif text-lg md:text-xl leading-snug">{c.value}</div>
              </a>
            );
          })}
        </div>

        {/* Google Map */}
        <div className="mt-16 animate-on-scroll">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ivory)]/50">
              Fig. 08 — Head Office Location
            </span>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Renaissance+Management+Consultants+Ellaipillai+Chavadi+Thanthai+Periyar+Nagar+Pondicherry+605001"
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[10px] uppercase tracking-[0.22em] link-underline"
              style={{ color: 'var(--emerald-accent)' }}
            >
              Get Directions →
            </a>
          </div>
          <div className="aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden border border-white/15">
            <iframe
              title="Renaissance Management Consultants location"
              src="https://www.google.com/maps?q=Renaissance+Management+Consultants+Ellaipillai+Chavadi+Thanthai+Periyar+Nagar+Pondicherry+605001&z=16&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(0.6) contrast(1.05)' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Terms note */}
        <div className="mt-12 grid grid-cols-12 gap-6 border-t border-white/15 pt-8 animate-on-scroll">
          <div className="col-span-12 md:col-span-4">
            <span
              className="font-mono text-[10px] uppercase tracking-[0.22em]"
              style={{ color: 'var(--emerald-accent)' }}
            >
              Our Service Terms
            </span>
          </div>
          <div className="col-span-12 md:col-span-8">
            <p className="font-serif italic text-lg text-[var(--ivory)]/80">
              Service charge: 8.33% of annual CTC + 18% GST. Payment within 7–10 days of
              candidate joining. Free replacement within 3 months.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
