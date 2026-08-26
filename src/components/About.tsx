const aboutImage =
  'https://images.unsplash.com/photo-1497366811353-6870744d04b2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwxfHxleGVjdXRpdmUlMjBvZmZpY2V8ZW58MHx8fHwxNzg3NjYwNzIzfDA&ixlib=rb-4.1.0&q=85';

const values = [
  {
    title: 'Our Mission',
    description:
      'To bridge the gap between talent and opportunity by delivering the right candidate for every position — every time.',
  },
  {
    title: 'Our Vision',
    description:
      "To be India's most trusted manpower recruitment partner, recognized for integrity, quality, and long-term client relationships.",
  },
  {
    title: 'Our Values',
    description:
      'Trust, Reliability, Integrity, and Confidentiality — assured from our end and expected from every organization we serve.',
  },
  {
    title: 'Our Promise',
    description:
      'Free replacement if a placed candidate leaves within 3 months. Your success is our commitment.',
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 md:py-36 relative">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14">
        {/* Section header */}
        <div className="grid grid-cols-12 gap-6 md:gap-10 mb-16 md:mb-24">
          <div className="col-span-12 md:col-span-4 animate-on-scroll">
            <span className="eyebrow">About Us</span>
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] mt-6">
              — Chapter 01
            </div>
          </div>
          <div className="col-span-12 md:col-span-8 animate-on-scroll">
            <h2 className="font-serif display-lg">
              A Legacy of <em className="italic text-[var(--emerald)]">Connecting</em> Talent with
              Opportunity.
            </h2>
          </div>
        </div>

        {/* Alternating image + text */}
        <div className="grid grid-cols-12 gap-6 md:gap-10 items-start">
          <div className="col-span-12 lg:col-span-6 animate-on-scroll">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-[var(--ivory-dark)] relative">
              <img
                src={aboutImage}
                alt="Executive office"
                className="w-full h-full object-cover img-editorial"
                loading="lazy"
              />
              <div className="absolute bottom-4 left-4 bg-[var(--ivory)] rounded-md px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em]">
                Est. 2001 — Pondicherry
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-6 lg:pl-8 animate-on-scroll">
            <p className="font-serif text-2xl leading-snug text-[var(--ink)]">
              Renaissance Management Consultants is a professionally managed placement and
              recruitment agency with over 24 years of successful track record — ranked among
              the top placement agencies of Pondicherry.
            </p>
            <p className="mt-6 text-[15px] leading-relaxed text-[var(--ink-soft)]">
              We are honored to be on the panel of numerous multinational and Indian companies
              of repute. A one-stop solution provider for all your placement needs in India —
              working with the motto:
            </p>
            <p className="mt-6 pull-quote text-[var(--emerald)] border-l-2 border-[var(--emerald)] pl-6">
              "Right Candidate for the Right Position."
            </p>

            {/* Values grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-14">
              {values.map((v, i) => (
                <div key={v.title} className="border-t border-[var(--line)] pt-5">
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="font-mono text-[10px] tabular text-[var(--emerald)]">
                      0{i + 1}
                    </span>
                    <h3 className="font-serif text-lg">{v.title}</h3>
                  </div>
                  <p className="text-[13.5px] leading-relaxed text-[var(--muted)]">
                    {v.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
