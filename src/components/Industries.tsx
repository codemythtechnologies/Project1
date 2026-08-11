import { Cpu, Building2, Pill, Landmark, Hotel, Factory, HardHat, FlaskConical } from 'lucide-react';

const industries = [
  { icon: Cpu, name: 'IT & Software', color: 'from-brand-500 to-brand-700', bg: 'bg-brand-50', text: 'text-brand-600' },
  { icon: Building2, name: 'Non-IT / Tech', color: 'from-ink-600 to-ink-800', bg: 'bg-ink-100', text: 'text-ink-700' },
  { icon: Factory, name: 'Manufacturing', color: 'from-accent-500 to-accent-700', bg: 'bg-accent-50', text: 'text-accent-600' },
  { icon: Pill, name: 'Pharmaceutical', color: 'from-emerald-500 to-emerald-700', bg: 'bg-emerald-50', text: 'text-emerald-600' },
  { icon: Landmark, name: 'Banking & Finance', color: 'from-brand-600 to-brand-900', bg: 'bg-brand-50', text: 'text-brand-700' },
  { icon: Hotel, name: 'Hospitality & Hotels', color: 'from-rose-500 to-rose-700', bg: 'bg-rose-50', text: 'text-rose-600' },
  { icon: HardHat, name: 'Construction', color: 'from-amber-500 to-amber-700', bg: 'bg-amber-50', text: 'text-amber-600' },
  { icon: FlaskConical, name: 'Medical & Healthcare', color: 'from-teal-500 to-teal-700', bg: 'bg-teal-50', text: 'text-teal-600' },
];

export default function Industries() {
  return (
    <section id="industries" className="relative overflow-hidden bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="animate-on-scroll inline-flex items-center gap-2 rounded-full bg-accent-50 px-4 py-1.5 text-sm font-semibold text-accent-700">
            Industries We Serve
          </div>
          <h2 className="animate-on-scroll mt-5 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl lg:text-[2.75rem]">
            Expertise Across Every Sector
          </h2>
          <p className="animate-on-scroll mx-auto mt-4 max-w-2xl text-lg text-ink-600">
            Our services span all types of industries — from IT and engineering to
            pharmaceuticals, banking, and hospitality. We deliver talent for every sector.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {industries.map((ind, i) => (
            <div
              key={ind.name}
              className="animate-on-scroll group relative overflow-hidden rounded-2xl border border-ink-100 bg-white p-6 text-center transition-all duration-500 hover:shadow-2xl hover:shadow-ink-900/10 hover:-translate-y-2"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <div className={`absolute inset-0 ${ind.bg} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
              <div className="relative">
                <div
                  className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${ind.color} shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}
                >
                  <ind.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="mt-4 text-sm font-bold text-ink-900 sm:text-base">{ind.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
