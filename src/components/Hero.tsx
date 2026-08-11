import { ArrowRight, Search, Users, Building2, TrendingUp, Briefcase, Award, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-ink-50 via-white to-brand-50 pt-24"
    >
      {/* Background decorative shapes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 top-20 h-96 w-96 rounded-full bg-brand-200/30 blur-3xl animate-float-slow" />
        <div className="absolute -left-32 bottom-10 h-80 w-80 rounded-full bg-accent-200/20 blur-3xl animate-float" />
        <div className="absolute right-1/4 top-1/2 h-64 w-64 rounded-full bg-brand-100/40 blur-2xl animate-float-slow" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        {/* Left: text */}
        <div className="text-center lg:text-left">
          <div
            className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50/80 px-4 py-1.5 text-sm font-semibold text-brand-700 animate-fade-down"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
            </span>
            24+ Years of Excellence in Recruitment
          </div>

          <h1
            className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-ink-900 text-balance animate-fade-up sm:text-5xl lg:text-6xl"
            style={{ animationDelay: '0.1s', opacity: 0 }}
          >
            Right Candidate for the
            <span className="gradient-text"> Right Position</span>
          </h1>

          <p
            className="mx-auto mt-6 max-w-xl text-lg text-ink-600 leading-relaxed animate-fade-up lg:mx-0"
            style={{ animationDelay: '0.25s', opacity: 0 }}
          >
            Renaissance Management Consultants is a renowned manpower recruitment
            agency in India, providing end-to-end staffing and placement
            solutions across IT, Engineering, Pharma, Banking, and more —
            trusted by top multinationals for over two decades.
          </p>

          <div
            className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start animate-fade-up"
            style={{ animationDelay: '0.4s', opacity: 0 }}
          >
            <button
              onClick={() => scrollTo('#jobs')}
              className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-brand-700 px-7 py-3.5 text-base font-bold text-white shadow-xl shadow-brand-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-500/40 hover:-translate-y-1"
            >
              Explore Job Openings
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => scrollTo('#services')}
              className="rounded-full border-2 border-ink-200 bg-white/80 px-7 py-3.5 text-base font-bold text-ink-700 transition-all duration-300 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
            >
              Our Services
            </button>
          </div>

          {/* Mini stats */}
          <div
            className="mt-12 grid grid-cols-3 gap-4 animate-fade-up"
            style={{ animationDelay: '0.55s', opacity: 0 }}
          >
            {[
              { icon: Users, label: 'Candidates Placed', value: '10K+' },
              { icon: Building2, label: 'Client Companies', value: '500+' },
              { icon: TrendingUp, label: 'Success Rate', value: '95%' },
            ].map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <stat.icon className="mx-auto h-6 w-6 text-brand-500 lg:mx-0" />
                <div className="mt-2 text-2xl font-extrabold text-ink-900">{stat.value}</div>
                <div className="text-xs font-medium text-ink-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Analytics dashboard */}
        <div
          className="relative hidden lg:block animate-scale-in"
          style={{ animationDelay: '0.3s', opacity: 0 }}
        >
          <div className="relative">
            {/* Main dashboard card */}
            <div className="rounded-3xl bg-white p-6 shadow-2xl shadow-ink-900/15 ring-1 ring-ink-100">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-ink-100 pb-4">
                <div>
                  <p className="text-sm font-medium text-ink-500">Recruitment Overview</p>
                  <p className="font-display text-xl font-extrabold text-ink-900">RMC Dashboard</p>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <span className="text-xs font-bold text-emerald-700">Live</span>
                </div>
              </div>

              {/* Stat cards */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                {[
                  { icon: Briefcase, label: 'Active Jobs', value: '120+', color: 'from-brand-500 to-brand-700', bg: 'bg-brand-50' },
                  { icon: Users, label: 'Candidates', value: '10K+', color: 'from-accent-500 to-accent-700', bg: 'bg-accent-50' },
                  { icon: Building2, label: 'Partners', value: '500+', color: 'from-emerald-500 to-emerald-700', bg: 'bg-emerald-50' },
                  { icon: Award, label: 'Success Rate', value: '95%', color: 'from-rose-500 to-rose-700', bg: 'bg-rose-50' },
                ].map((card, i) => (
                  <div
                    key={card.label}
                    className={`rounded-2xl ${card.bg} p-4 transition-transform hover:scale-105`}
                    style={{ animation: `slideRight 0.6s ease-out ${0.5 + i * 0.1}s forwards`, opacity: 0 }}
                  >
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${card.color} shadow-lg`}>
                      <card.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="mt-3 text-2xl font-extrabold text-ink-900">{card.value}</div>
                    <div className="text-xs font-medium text-ink-500">{card.label}</div>
                  </div>
                ))}
              </div>

              {/* Mini bar chart */}
              <div className="mt-5 rounded-2xl bg-ink-50/60 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-ink-700">Placements by Industry</p>
                  <TrendingUp className="h-4 w-4 text-brand-500" />
                </div>
                <div className="mt-3 flex items-end gap-2 h-20">
                  {[
                    { label: 'IT', h: '85%', color: 'bg-brand-500' },
                    { label: 'Eng', h: '70%', color: 'bg-accent-500' },
                    { label: 'Pharma', h: '60%', color: 'bg-emerald-500' },
                    { label: 'Bank', h: '75%', color: 'bg-rose-500' },
                    { label: 'Mfg', h: '90%', color: 'bg-brand-600' },
                    { label: 'Hotel', h: '50%', color: 'bg-accent-600' },
                  ].map((bar, i) => (
                    <div key={bar.label} className="flex flex-1 flex-col items-center gap-1">
                      <div className="flex w-full items-end justify-center" style={{ height: '60px' }}>
                        <div
                          className={`w-full max-w-[20px] rounded-t-md ${bar.color} transition-all duration-700`}
                          style={{ height: bar.h, animation: `growBar 0.8s ease-out ${0.6 + i * 0.1}s forwards`, transformOrigin: 'bottom', transform: 'scaleY(0)' }}
                        />
                      </div>
                      <span className="text-[10px] font-medium text-ink-400">{bar.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent placements */}
              <div className="mt-4 space-y-2">
                <p className="text-xs font-bold text-ink-700">Recent Placements</p>
                {[
                  { role: 'Senior Software Engineer', dept: 'IT', color: 'bg-brand-500' },
                  { role: 'HR Manager', dept: 'Human Resources', color: 'bg-accent-500' },
                  { role: 'Pharma Production Sup.', dept: 'Pharmaceutical', color: 'bg-emerald-500' },
                ].map((job, i) => (
                  <div
                    key={job.role}
                    className="flex items-center gap-3 rounded-xl bg-ink-50/50 p-3 transition-transform hover:translate-x-1"
                    style={{ animation: `slideRight 0.6s ease-out ${0.8 + i * 0.15}s forwards`, opacity: 0 }}
                  >
                    <div className={`h-8 w-8 rounded-lg ${job.color} flex items-center justify-center`}>
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-ink-900">{job.role}</p>
                      <p className="text-xs text-ink-500">{job.dept}</p>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700">Placed</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating accent card */}
            <div
              className="absolute -bottom-6 -left-8 rounded-2xl bg-white p-5 shadow-xl animate-float"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-100">
                  <TrendingUp className="h-6 w-6 text-accent-600" />
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-ink-900">95%</p>
                  <p className="text-xs text-ink-500">Placement Success</p>
                </div>
              </div>
            </div>

            {/* Floating badge top right */}
            <div className="absolute -right-4 -top-4 rounded-2xl bg-accent-400 px-4 py-3 shadow-lg animate-bounce-subtle">
              <p className="text-xs font-bold text-ink-900">24+ Years</p>
              <p className="text-[10px] text-ink-800/80">of Trust</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" className="h-12 w-full sm:h-20">
          <path d="M0 40L60 36.7C120 33.3 240 26.7 360 30C480 33.3 600 46.7 720 50C840 53.3 960 46.7 1080 40C1200 33.3 1320 26.7 1380 23.3L1440 20V80H0V40Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
