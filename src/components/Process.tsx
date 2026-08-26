const processImage =
  'https://images.unsplash.com/photo-1714974528737-3e6c7e4d11af?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2ODh8MHwxfHNlYXJjaHwzfHxjb3Jwb3JhdGUlMjBwcm9mZXNzaW9uYWxzfGVufDB8fHx8MTc4NzY2MDcyNHww&ixlib=rb-4.1.0&q=85';

const process = [
  {
    step: '01',
    title: 'Understanding Your Needs',
    description:
      'You provide a detailed job description and candidate profile. We analyze your requirements to understand the exact skills and traits needed.',
  },
  {
    step: '02',
    title: 'Sourcing & Screening',
    description:
      'We leverage our database of millions of resumes, advertise across channels, and conduct in-depth preliminary assessments of shortlisted candidates.',
  },
  {
    step: '03',
    title: 'Candidate Presentation',
    description:
      'Qualitative candidate vitae with our assessment notes are sent to you for review. You select the candidates you want to interview.',
  },
  {
    step: '04',
    title: 'Placement & Support',
    description:
      'Upon selection, we facilitate the offer process. Free replacement is provided if the candidate leaves within 3 months of joining.',
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="py-24 md:py-36 bg-[var(--ink)] text-[var(--ivory)] relative overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14 relative z-10">
        <div className="grid grid-cols-12 gap-6 md:gap-10 mb-16 md:mb-20">
          <div className="col-span-12 md:col-span-4 animate-on-scroll">
            <span className="eyebrow" style={{ color: 'var(--emerald-accent)' }}>
              How We Work
            </span>
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ivory)]/50 mt-6">
              — Chapter 04
            </div>
          </div>
          <div className="col-span-12 md:col-span-8 animate-on-scroll">
            <h2 className="font-serif display-lg text-[var(--ivory)]">
              Our Proven{' '}
              <em className="italic" style={{ color: 'var(--emerald-accent)' }}>
                Recruitment
              </em>{' '}
              Process.
            </h2>
            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-[var(--ivory)]/70">
              A structured, transparent approach refined over 24 years — designed to deliver
              the right candidate efficiently and reliably.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 lg:col-span-5 animate-on-scroll">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={processImage}
                alt="Team collaboration"
                className="w-full h-full object-cover img-editorial"
                loading="lazy"
                style={{ filter: 'grayscale(0.25) contrast(1.05)' }}
              />
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7 animate-on-scroll">
            <div className="border-t border-white/15">
              {process.map((p) => (
                <div
                  key={p.step}
                  className="grid grid-cols-12 gap-4 py-8 border-b border-white/15 group hover:pl-4 transition-all duration-500"
                >
                  <div className="col-span-3 md:col-span-2">
                    <span
                      className="font-serif text-4xl md:text-5xl tabular italic"
                      style={{ color: 'var(--emerald-accent)' }}
                    >
                      {p.step}
                    </span>
                  </div>
                  <div className="col-span-9 md:col-span-10">
                    <h3 className="font-serif text-2xl md:text-[26px] leading-tight">{p.title}</h3>
                    <p className="mt-3 text-[14px] leading-relaxed text-[var(--ivory)]/65 max-w-xl">
                      {p.description}
                    </p>
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
