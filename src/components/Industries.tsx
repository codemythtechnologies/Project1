import { Cpu, Briefcase, Factory, Pill, Landmark, Hotel, HardHat, Stethoscope } from 'lucide-react';

const industries = [
  {
    name: 'IT & Software',
    icon: Cpu,
    description: 'Developers, QA, DevOps & product roles across product and services firms.',
  },
  {
    name: 'Non-IT / Tech',
    icon: Briefcase,
    description: 'Operations, admin, sales and support talent for non-technical functions.',
  },
  {
    name: 'Manufacturing',
    icon: Factory,
    description: 'Plant staff, supervisors and production engineers across shop floors.',
  },
  {
    name: 'Pharmaceutical',
    icon: Pill,
    description: 'GMP-trained production, QA/QC and regulatory affairs professionals.',
  },
  {
    name: 'Banking & Finance',
    icon: Landmark,
    description: 'Branch, credit, and back-office roles for banks and NBFCs.',
  },
  {
    name: 'Hospitality & Hotels',
    icon: Hotel,
    description: 'Front office, F&B and hotel management talent for luxury properties.',
  },
  {
    name: 'Construction',
    icon: HardHat,
    description: 'Site engineers, project managers and skilled labour for builds.',
  },
  {
    name: 'Medical & Healthcare',
    icon: Stethoscope,
    description: 'Clinical, para-medical and hospital administration professionals.',
  },
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-on-scroll">
          {industries.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <div
                key={ind.name}
                className="group relative rounded-2xl border border-[var(--line)] bg-white flex flex-col justify-between p-6 md:p-7 min-h-[200px] transition-all duration-500 hover:-translate-y-1 hover:border-[var(--emerald)] hover:shadow-xl hover:shadow-[var(--emerald)]/10 cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[10px] tabular text-[var(--muted)]">0{i + 1}</span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--emerald)]/8 transition-colors duration-500 group-hover:bg-[var(--emerald)]/15">
                    <Icon size={19} className="text-[var(--emerald)]" strokeWidth={1.5} />
                  </div>
                </div>
                <div>
                  <h3 className="font-serif text-lg md:text-xl leading-tight text-[var(--ink)]">{ind.name}</h3>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-[var(--muted)]">{ind.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stat strip */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 animate-on-scroll">
          {stats.map((s) => (
            <div key={s.l} className="rounded-2xl bg-[var(--ivory-dark)]/50 p-6 md:p-8">
              <div className="font-serif text-4xl md:text-5xl tabular text-[var(--emerald)]">{s.v}</div>
              <div className="mt-2 text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
