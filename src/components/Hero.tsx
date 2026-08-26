import { ArrowUpRight, ArrowDown } from 'lucide-react';

const heroImage =
  'https://images.unsplash.com/photo-1521791136064-7986c2920216?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjh8MHwxfHNlYXJjaHwzfHxidXNpbmVzcyUyMGhhbmRzaGFrZXxlbnwwfHx8fDE3ODc2NjA3MjR8MA&ixlib=rb-4.1.0&q=85';

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14">
        {/* Top meta row */}
        <div className="flex items-end justify-between mb-10 md:mb-16 border-b border-[var(--line)] pb-6">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
            Vol. 24 &middot; Est. 2001 &middot; Pondicherry
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] hidden md:block">
            Recruitment &middot; Staffing &middot; Executive Search
          </div>
        </div>

        {/* Split hero */}
        <div className="grid grid-cols-12 gap-6 md:gap-10">
          {/* Left column */}
          <div className="col-span-12 lg:col-span-7 flex flex-col">
            <span className="eyebrow reveal reveal-1">24+ Years of Excellence</span>

            <h1 className="font-serif display-xl mt-8 reveal reveal-2">
              Right
              <br />
              <em className="italic font-light text-[var(--emerald)]">Candidate</em>
              <span className="text-[var(--muted)]">.</span>
              <br />
              Right Position.
            </h1>

            <p className="mt-10 max-w-xl text-[15px] leading-relaxed text-[var(--ink-soft)] reveal reveal-3">
              Renaissance Management Consultants is a renowned manpower recruitment agency in
              India, providing end-to-end staffing and placement solutions across IT,
              Engineering, Pharma, Banking, and more — trusted by top multinationals for over
              two decades.
            </p>

            <div className="flex flex-wrap gap-3 mt-10 reveal reveal-4">
              <button onClick={() => scrollTo('jobs')} className="btn-primary">
                Explore Openings <ArrowUpRight size={16} />
              </button>
              <button onClick={() => scrollTo('services')} className="btn-ghost">
                Our Services
              </button>
            </div>
          </div>

          {/* Right column — image + caption */}
          <div className="col-span-12 lg:col-span-5 relative">
            <div className="relative aspect-[4/5] overflow-hidden bg-[var(--ivory-dark)]">
              <img
                src={heroImage}
                alt="Business handshake"
                className="w-full h-full object-cover img-editorial"
                loading="eager"
              />
              <div className="absolute top-4 left-4 bg-[var(--ivory)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em]">
                No. 001
              </div>
            </div>
            <div className="mt-4 flex items-start justify-between gap-4">
              <p className="font-serif italic text-sm text-[var(--muted)] max-w-[240px] leading-snug">
                "A legacy of connecting talent with opportunity across every industry."
              </p>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] whitespace-nowrap">
                Fig. 01
              </span>
            </div>
          </div>
        </div>

        {/* Bottom stats bar */}
        <div className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 border-t border-[var(--line)]">
          {[
            { v: '10K+', l: 'Candidates Placed' },
            { v: '500+', l: 'Client Companies' },
            { v: '95%', l: 'Success Rate' },
            { v: '24+', l: 'Years of Trust' },
          ].map((s, i) => (
            <div
              key={s.l}
              className={`py-8 px-4 md:px-6 ${i > 0 ? 'md:border-l border-[var(--line)]' : ''} ${
                i % 2 === 1 ? 'border-l md:border-l' : ''
              }`}
            >
              <div className="font-serif text-4xl md:text-5xl tabular">{s.v}</div>
              <div className="mt-2 text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">{s.l}</div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 mt-10 text-[var(--muted)]">
          <ArrowDown size={14} />
          <span className="font-mono text-[10px] uppercase tracking-[0.22em]">Scroll to read</span>
        </div>
      </div>
    </section>
  );
}
