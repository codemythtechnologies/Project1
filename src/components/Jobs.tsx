import { useEffect, useState } from 'react';
import { ArrowUpRight, MapPin, Clock, Briefcase } from 'lucide-react';
import { supabase, type JobOpening } from '@/lib/supabase';

export default function Jobs() {
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState('All');

  useEffect(() => {
    const fetchJobs = async () => {
      const { data, error } = await supabase
        .from('job_openings')
        .select('*')
        .eq('is_active', true)
        .order('posted_date', { ascending: false });
      if (!error && data) setJobs(data as JobOpening[]);
      setLoading(false);
    };
    fetchJobs();
  }, []);

  const departments = ['All', ...Array.from(new Set(jobs.map((j) => j.department)))];
  const filtered = active === 'All' ? jobs : jobs.filter((j) => j.department === active);

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    return `${Math.floor(days / 30)} months ago`;
  };

  return (
    <section id="jobs" className="py-24 md:py-36">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-12 gap-6 md:gap-10 mb-12 md:mb-16">
          <div className="col-span-12 md:col-span-4 animate-on-scroll">
            <span className="eyebrow">Current Openings</span>
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] mt-6">
              — Chapter 05
            </div>
          </div>
          <div className="col-span-12 md:col-span-8 animate-on-scroll">
            <h2 className="font-serif display-lg">
              Find Your Next <em className="italic text-[var(--emerald)]">Opportunity</em>.
            </h2>
            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-[var(--ink-soft)]">
              Browse active positions across industries. Can't find the right fit? Reach out
              and we'll match you with the perfect role.
            </p>
          </div>
        </div>

        {/* Filters */}
        {!loading && jobs.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-12 border-t border-b border-[var(--line)] py-4 animate-on-scroll">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setActive(dept)}
                className={`text-[12px] uppercase tracking-[0.18em] py-2 px-4 border transition-all duration-300 ${
                  active === dept
                    ? 'bg-[var(--ink)] text-[var(--ivory)] border-[var(--ink)]'
                    : 'bg-transparent text-[var(--ink)] border-[var(--line)] hover:border-[var(--ink)]'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="border-t border-[var(--line)]">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="border-b border-[var(--line)] py-8 md:py-10 px-2 md:px-4">
                <div className="h-4 w-24 rounded bg-[var(--ivory-dark)]" />
                <div className="mt-4 h-7 w-2/3 rounded bg-[var(--ivory-dark)]" />
                <div className="mt-3 h-4 w-full max-w-md rounded bg-[var(--ivory-dark)]" />
              </div>
            ))}
          </div>
        )}

        {/* Magazine-style listings */}
        {!loading && filtered.length > 0 && (
          <div className="border-t border-[var(--line)] animate-on-scroll">
            {filtered.map((job, i) => (
              <a
                key={job.id}
                href="#contact"
                className="group block border-b border-[var(--line)] py-8 md:py-10 hover:bg-[var(--ivory-dark)]/40 transition-colors duration-500 px-2 md:px-4"
              >
                <div className="grid grid-cols-12 gap-4 items-start">
                  <div className="col-span-2 md:col-span-1">
                    <span className="font-mono text-[10px] tabular text-[var(--emerald)]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="col-span-10 md:col-span-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[10px] uppercase tracking-[0.22em] py-1 px-2.5 bg-[var(--emerald)]/10 text-[var(--emerald)] border border-[var(--emerald)]/20">
                        {job.department}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
                        {timeAgo(job.posted_date)}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl md:text-3xl leading-tight group-hover:text-[var(--emerald)] transition-colors">
                      {job.title}
                    </h3>
                    <p className="mt-3 text-[13.5px] leading-relaxed text-[var(--muted)] max-w-lg">
                      {job.description}
                    </p>
                  </div>
                  <div className="col-span-12 md:col-span-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-[12.5px] text-[var(--ink-soft)]">
                        <MapPin size={13} className="text-[var(--emerald)]" strokeWidth={1.5} />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-2 text-[12.5px] text-[var(--ink-soft)]">
                        <Briefcase size={13} className="text-[var(--emerald)]" strokeWidth={1.5} />
                        {job.type}
                      </div>
                      <div className="flex items-center gap-2 text-[12.5px] text-[var(--ink-soft)]">
                        <Clock size={13} className="text-[var(--emerald)]" strokeWidth={1.5} />
                        {job.experience}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-1 flex md:justify-end">
                    <ArrowUpRight
                      size={24}
                      className="text-[var(--ink)] opacity-40 group-hover:opacity-100 group-hover:text-[var(--emerald)] transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        {!loading && jobs.length === 0 && (
          <div className="border-t border-[var(--line)] py-16 text-center">
            <p className="text-[var(--muted)]">
              No active job openings at the moment. Please check back soon or send us your CV.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
