import { ArrowUpRight } from 'lucide-react';

const servicesImage =
  'https://images.unsplash.com/photo-1758518731706-be5d5230e5a5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2ODh8MHwxfHNlYXJjaHw0fHxjb3Jwb3JhdGUlMjBwcm9mZXNzaW9uYWxzfGVufDB8fHx8MTc4NzY2MDcyNHww&ixlib=rb-4.1.0&q=85';

const services = [
  {
    id: '01',
    title: 'Manpower Staffing',
    description:
      "Access India's third-largest pool of skilled manpower. We identify and deliver the best candidates for your organization — from entry-level to leadership.",
    points: ['Mass recruitment drives', 'Contract & permanent staffing', 'Skilled & management cadres'],
  },
  {
    id: '02',
    title: 'Executive Headhunting',
    description:
      'Our talented team of headhunters generates qualitative candidates for almost any position, from a database of millions of live resumes.',
    points: ['C-level & VP searches', 'Niche role specialists', 'Confidential searches'],
  },
  {
    id: '03',
    title: 'Personnel Selection',
    description:
      'Thorough preliminary assessments, in-depth reference checks, and detailed candidate vitae sent to you — only the best reach your desk.',
    points: ['Pre-screening & assessment', 'Reference verification', 'Detailed candidate reports'],
  },
  {
    id: '04',
    title: 'Job Placement Services',
    description:
      'A complete one-stop solution for all your placement needs across every industry sector in India — with a proven 24-year track record.',
    points: ['All industry verticals', 'Pan-India coverage', 'Free replacement guarantee'],
  },
  {
    id: '05',
    title: 'Recruitment Consultancy',
    description:
      'Strategic hiring partnerships with multinational and Indian companies of repute. We become an extension of your HR team.',
    points: ['Dedicated account managers', 'Customized hiring strategy', 'Industry-specific expertise'],
  },
  {
    id: '06',
    title: 'Resume Database Access',
    description:
      'Tap into our extensive data bank of millions of live, qualified resumes across every discipline and experience level.',
    points: ['Millions of active profiles', 'Real-time resume updates', 'Advanced filtering & matching'],
  },
];

export default function Services() {
  return (
    <section id="services" className="py-14 md:py-20 bg-[var(--ivory-dark)]/40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-12 gap-6 md:gap-10 mb-16 md:mb-20">
          <div className="col-span-12 md:col-span-4 animate-on-scroll">
            <span className="eyebrow">What We Do</span>
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] mt-6">
              — Chapter 02
            </div>
          </div>
          <div className="col-span-12 md:col-span-8 animate-on-scroll">
            <h2 className="font-serif display-lg">
              Comprehensive Recruitment <em className="italic text-[var(--emerald)]">Solutions</em>.
            </h2>
            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-[var(--ink-soft)]">
              From entry-level hiring to executive search, we provide end-to-end recruitment
              services tailored to your organization's unique needs.
            </p>
          </div>
        </div>

        {/* Editorial services list */}
        <div className="grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 lg:col-span-4 order-2 lg:order-1 animate-on-scroll">
            <div className="lg:sticky lg:top-28">
              <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-[var(--ivory-dark)]">
                <img
                  src={servicesImage}
                  alt="Corporate team"
                  className="w-full h-full object-cover img-editorial"
                  loading="lazy"
                />
              </div>
              <p className="mt-4 font-serif italic text-sm text-[var(--muted)] leading-snug">
                "We become an extension of your HR team — with dedicated account managers and
                industry-specific expertise."
              </p>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8 order-1 lg:order-2 animate-on-scroll">
            <div className="border-b border-[var(--line)]">
              {services.map((s) => (
                <div key={s.id} className="editorial-card group">
                  <div className="grid grid-cols-12 gap-4 items-start">
                    <div className="col-span-2 md:col-span-1">
                      <span className="font-mono text-[10px] tabular text-[var(--emerald)]">{s.id}</span>
                    </div>
                    <div className="col-span-10 md:col-span-7">
                      <h3 className="font-serif text-2xl md:text-[28px] leading-tight">{s.title}</h3>
                      <p className="mt-3 text-[14px] leading-relaxed text-[var(--muted)] max-w-lg">
                        {s.description}
                      </p>
                    </div>
                    <div className="col-span-12 md:col-span-4 md:pl-6">
                      <ul className="space-y-2 mt-3 md:mt-1">
                        {s.points.map((p) => (
                          <li
                            key={p}
                            className="text-[12.5px] uppercase tracking-[0.14em] text-[var(--ink-soft)] flex items-center gap-2"
                          >
                            <span className="w-1 h-1 rounded-full bg-[var(--emerald)]" />
                            {p}
                          </li>
                        ))}
                      </ul>
                      <ArrowUpRight
                        size={20}
                        className="mt-5 text-[var(--ink)] opacity-40 group-hover:opacity-100 group-hover:text-[var(--emerald)] transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
