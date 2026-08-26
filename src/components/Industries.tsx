import { Cpu, Briefcase, Factory, Pill, Landmark, Hotel, HardHat, Stethoscope } from 'lucide-react';

const industries = [
  { name: 'IT & Software', icon: Cpu },
  { name: 'Non-IT / Tech', icon: Briefcase },
  { name: 'Manufacturing', icon: Factory },
  { name: 'Pharmaceutical', icon: Pill },
  { name: 'Banking & Finance', icon: Landmark },
  { name: 'Hospitality & Hotels', icon: Hotel },
  { name: 'Construction', icon: HardHat },
  { name: 'Medical & Healthcare', icon: Stethoscope },
];

const stats = [
  { v: '24+', l: 'Years of Experience' },
  { v: '500+', l: 'Client Companies' },
  { v: '10K+', l: 'Candidates Placed' },
  { v: '120+', l: 'Active Job Openings' },
];

export default function Industries() {
  return (
    <section id="industries" className="py-24 md:py-36">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-12 gap-6 md:gap-10 mb-16 md:mb-20">
          <div className="col-span-12 md:col-span-4 animate-on-scroll">
            <span className="eyebrow">Industries We Serve</span>
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] mt-6">
              — Chapter 03
            </div>
          </div>
          <div className="col-span-12 md:col-span-8 animate-on-scroll">
            <h2 className="font-serif display-lg">
              Expertise Across <em className="italic text-[var(--emerald)]">Every</em> Sector.
            </h2>
            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-[var(--ink-soft)]">
              Our services span all types of industries — from IT and engineering to
              pharmaceuticals, banking, and hospitality. We deliver talent for every sector.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-[var(--line)] animate-on-scroll">
          {industries.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <div
                key={ind.name}
                className="group relative border-r border-b border-[var(--line)] aspect-square flex flex-col justify-between p-6 md:p-8 transition-colors duration-500 hover:bg-[var(--ink)] hover:text-[var(--ivory)] cursor-pointer overflow-hidden"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[10px] tabular text-[var(--muted)] group-hover:text-[var(--ivory)]/50 transition-colors">
                    0{i + 1}
                  </span>
                  <Icon
                    size={22}
                    className="text-[var(--emerald)] group-hover:text-[var(--emerald-accent)] transition-transform duration-500 group-hover:-translate-y-1"
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <h3 className="font-serif text-lg md:text-xl leading-tight">{ind.name}</h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stat strip */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--line)] animate-on-scroll">
          {stats.map((s) => (
            <div key={s.l} className="bg-[var(--ivory)] p-6 md:p-8">
              <div className="font-serif text-4xl md:text-5xl tabular text-[var(--emerald)]">{s.v}</div>
              <div className="mt-2 text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
