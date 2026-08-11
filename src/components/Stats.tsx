import { useEffect, useRef, useState } from 'react';
import { Users, Building2, Briefcase, Calendar } from 'lucide-react';

type Stat = {
  icon: typeof Users;
  value: number;
  suffix: string;
  label: string;
};

const stats: Stat[] = [
  { icon: Calendar, value: 24, suffix: '+', label: 'Years of Experience' },
  { icon: Building2, value: 500, suffix: '+', label: 'Client Companies' },
  { icon: Users, value: 10000, suffix: '+', label: 'Candidates Placed' },
  { icon: Briefcase, value: 120, suffix: '+', label: 'Active Job Openings' },
];

function CountUp({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const startTime = performance.now();
          const animate = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
            else setCount(end);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end]);

  const display = count >= 1000 ? `${(count / 1000).toFixed(0)}K` : count.toString();

  return (
    <span ref={ref} className="text-4xl font-extrabold text-white sm:text-5xl">
      {display}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-800 to-ink-900 py-20">
      {/* Decorative */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-20 top-0 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl animate-float-slow" />
        <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-accent-500/10 blur-3xl animate-float" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="animate-on-scroll text-center"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm transition-transform duration-300 hover:scale-110">
                <stat.icon className="h-7 w-7 text-brand-200" />
              </div>
              <div className="mt-4">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-1 text-sm font-medium text-brand-200">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
