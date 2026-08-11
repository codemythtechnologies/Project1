import { FileSearch, ClipboardList, UsersRound, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    icon: FileSearch,
    title: 'Understanding Your Needs',
    desc: 'You provide a detailed job description and candidate profile. We analyze your requirements to understand the exact skills and traits needed.',
    num: '01',
  },
  {
    icon: ClipboardList,
    title: 'Sourcing & Screening',
    desc: 'We leverage our database of millions of resumes, advertise across channels, and conduct in-depth preliminary assessments of shortlisted candidates.',
    num: '02',
  },
  {
    icon: UsersRound,
    title: 'Candidate Presentation',
    desc: 'Qualitative candidate vitae with our assessment notes are sent to you for review. You select the candidates you want to interview.',
    num: '03',
  },
  {
    icon: CheckCircle2,
    title: 'Placement & Support',
    desc: 'Upon selection, we facilitate the offer process. Free replacement is provided if the candidate leaves within 3 months of joining.',
    num: '04',
  },
];

export default function Process() {
  return (
    <section className="relative bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="animate-on-scroll inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-sm font-semibold text-brand-700">
            How We Work
          </div>
          <h2 className="animate-on-scroll mt-5 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl lg:text-[2.75rem]">
            Our Proven Recruitment Process
          </h2>
          <p className="animate-on-scroll mx-auto mt-4 max-w-2xl text-lg text-ink-600">
            A structured, transparent approach refined over 24 years — designed to
            deliver the right candidate efficiently and reliably.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={step.title} className="animate-on-scroll relative" style={{ transitionDelay: `${i * 100}ms` }}>
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="absolute top-10 left-[60%] hidden h-0.5 w-[80%] bg-gradient-to-r from-brand-300 to-brand-100 lg:block" />
              )}
              <div className="relative group">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 ring-2 ring-brand-200 transition-all duration-500 group-hover:from-brand-500 group-hover:to-brand-700 group-hover:ring-brand-300 group-hover:shadow-xl group-hover:shadow-brand-500/30">
                  <step.icon className="h-9 w-9 text-brand-600 transition-colors duration-500 group-hover:text-white" />
                </div>
                <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-accent-400 text-xs font-extrabold text-ink-900 shadow-md">
                  {step.num}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-bold text-ink-900">{step.title}</h3>
              <p className="mt-2 text-sm text-ink-600 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
