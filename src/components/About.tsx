import { Target, Eye, Handshake, Award } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      desc: 'To bridge the gap between talent and opportunity by delivering the right candidate for every position — every time.',
    },
    {
      icon: Eye,
      title: 'Our Vision',
      desc: 'To be India\'s most trusted manpower recruitment partner, recognized for integrity, quality, and long-term client relationships.',
    },
    {
      icon: Handshake,
      title: 'Our Values',
      desc: 'Trust, Reliability, Integrity, and Confidentiality — assured from our end and expected from every organization we serve.',
    },
    {
      icon: Award,
      title: 'Our Promise',
      desc: 'Free replacement if a placed candidate leaves within 3 months. Your success is our commitment.',
    },
  ];

  return (
    <section id="about" className="relative bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          {/* Left: story */}
          <div>
            <div className="animate-on-scroll inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-sm font-semibold text-brand-700">
              About Us
            </div>
            <h2 className="animate-on-scroll mt-5 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              A Legacy of Connecting
              <span className="text-brand-600"> Talent with Opportunity</span>
            </h2>
            <p className="animate-on-scroll mt-6 text-lg text-ink-600 leading-relaxed">
              Renaissance Management Consultants is a professionally managed and
              established placement and recruitment agency with over{' '}
              <span className="font-bold text-ink-900">24 years of successful track record</span>.
              We are ranked among the top placement agencies of Pondicherry and are
              honored to be on the panel of numerous multinational and Indian
              companies of repute.
            </p>
            <p className="animate-on-scroll mt-4 text-lg text-ink-600 leading-relaxed">
              We are a one-stop solution provider for all your placement needs in India —
              working with the motto <span className="font-semibold text-brand-600">"Right
              Candidate for the Right Position."</span>
            </p>

            {/* Experience highlight bar */}
            <div className="animate-on-scroll mt-8 flex items-center gap-6 rounded-2xl bg-gradient-to-r from-brand-50 to-accent-50 p-5">
              <div className="text-center">
                <div className="text-4xl font-extrabold gradient-text">24+</div>
                <div className="text-xs font-semibold text-ink-600">Years of Trust</div>
              </div>
              <div className="h-12 w-px bg-ink-200" />
              <div className="text-center">
                <div className="text-4xl font-extrabold gradient-text">500+</div>
                <div className="text-xs font-semibold text-ink-600">Partner Companies</div>
              </div>
              <div className="h-12 w-px bg-ink-200" />
              <div className="text-center">
                <div className="text-4xl font-extrabold gradient-text">10K+</div>
                <div className="text-xs font-semibold text-ink-600">Candidates Placed</div>
              </div>
            </div>
          </div>

          {/* Right: values cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {values.map((val, i) => (
              <div
                key={val.title}
                className="animate-on-scroll group relative overflow-hidden rounded-2xl border border-ink-100 bg-white p-6 shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-brand-500/10 hover:-translate-y-1"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-50 transition-transform duration-500 group-hover:scale-150" />
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-lg shadow-brand-500/20 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <val.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ink-900">{val.title}</h3>
                  <p className="mt-2 text-sm text-ink-600 leading-relaxed">{val.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
