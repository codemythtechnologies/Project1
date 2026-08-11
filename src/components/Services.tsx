import { UserSearch, FileText, Building, Layers, Crosshair, ClipboardCheck, ArrowUpRight } from 'lucide-react';

const services = [
  {
    icon: UserSearch,
    title: 'Manpower Staffing',
    desc: 'Access India\'s third-largest pool of skilled manpower. We identify and deliver the best candidates for your organization — from entry-level to leadership.',
    features: ['Mass recruitment drives', 'Contract & permanent staffing', 'Skilled & management cadres'],
  },
  {
    icon: Crosshair,
    title: 'Executive Headhunting',
    desc: 'Our talented team of headhunters generates qualitative candidates for almost any position, from a database of millions of live resumes.',
    features: ['C-level & VP searches', 'Niche role specialists', 'Confidential searches'],
  },
  {
    icon: ClipboardCheck,
    title: 'Personnel Selection',
    desc: 'Thorough preliminary assessments, in-depth reference checks, and detailed candidate vitae sent to you — only the best reach your desk.',
    features: ['Pre-screening & assessment', 'Reference verification', 'Detailed candidate reports'],
  },
  {
    icon: FileText,
    title: 'Job Placement Services',
    desc: 'A complete one-stop solution for all your placement needs across every industry sector in India — with a proven 24-year track record.',
    features: ['All industry verticals', 'Pan-India coverage', 'Free replacement guarantee'],
  },
  {
    icon: Building,
    title: 'Recruitment Consultancy',
    desc: 'Strategic hiring partnerships with multinational and Indian companies of repute. We become an extension of your HR team.',
    features: ['Dedicated account managers', 'Customized hiring strategy', 'Industry-specific expertise'],
  },
  {
    icon: Layers,
    title: 'Resume Database Access',
    desc: 'Tap into our extensive data bank of millions of live, qualified resumes across every discipline and experience level.',
    features: ['Millions of active profiles', 'Real-time resume updates', 'Advanced filtering & matching'],
  },
];

export default function Services() {
  return (
    <section id="services" className="relative bg-ink-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="animate-on-scroll inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-700">
            What We Do
          </div>
          <h2 className="animate-on-scroll mt-5 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl lg:text-[2.75rem]">
            Comprehensive Recruitment Solutions
          </h2>
          <p className="animate-on-scroll mx-auto mt-4 max-w-2xl text-lg text-ink-600">
            From entry-level hiring to executive search, we provide end-to-end
            recruitment services tailored to your organization's unique needs.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="animate-on-scroll group relative overflow-hidden rounded-2xl bg-white p-7 shadow-sm ring-1 ring-ink-100 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-500/10 hover:-translate-y-2 hover:ring-brand-200"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {/* Hover gradient bg */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-50/0 to-brand-50/0 opacity-0 transition-opacity duration-500 group-hover:from-brand-50/50 group-hover:to-transparent group-hover:opacity-100" />

              <div className="relative">
                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-lg shadow-brand-500/25 transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-brand-500/30">
                    <service.icon className="h-7 w-7 text-white" />
                  </div>
                  <ArrowUpRight className="h-6 w-6 text-ink-300 transition-all duration-300 group-hover:text-brand-500 group-hover:rotate-12" />
                </div>

                <h3 className="mt-5 text-xl font-bold text-ink-900">{service.title}</h3>
                <p className="mt-2 text-sm text-ink-600 leading-relaxed">{service.desc}</p>

                <ul className="mt-5 space-y-2">
                  {service.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-sm text-ink-700">
                      <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-100">
                        <svg className="h-3 w-3 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
