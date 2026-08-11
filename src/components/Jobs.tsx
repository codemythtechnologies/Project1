import { useEffect, useState } from 'react';
import { MapPin, Briefcase, Clock, ArrowRight, Search, X } from 'lucide-react';
import { supabase, type JobOpening } from '@/lib/supabase';

export default function Jobs() {
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('All');
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);

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
  const filtered = filter === 'All' ? jobs : jobs.filter((j) => j.department === filter);

  const scrollToContact = () => {
    setSelectedJob(null);
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

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
    <section id="jobs" className="relative bg-ink-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="animate-on-scroll inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-700">
            Current Openings
          </div>
          <h2 className="animate-on-scroll mt-5 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl lg:text-[2.75rem]">
            Find Your Next Opportunity
          </h2>
          <p className="animate-on-scroll mx-auto mt-4 max-w-2xl text-lg text-ink-600">
            Browse active positions across industries. Can't find the right fit?
            Send us your CV and we'll match you with the perfect role.
          </p>
        </div>

        {/* Filter tabs */}
        {!loading && jobs.length > 0 && (
          <div className="animate-on-scroll mt-12 flex flex-wrap justify-center gap-2">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setFilter(dept)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${
                  filter === dept
                    ? 'bg-gradient-to-r from-brand-500 to-brand-700 text-white shadow-lg shadow-brand-500/30'
                    : 'bg-white text-ink-600 ring-1 ring-ink-200 hover:ring-brand-300 hover:text-brand-600'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        )}

        {/* Jobs grid */}
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink-100">
                  <div className="h-6 w-24 rounded-full shimmer-bg" />
                  <div className="mt-4 h-6 w-3/4 rounded shimmer-bg" />
                  <div className="mt-3 h-4 w-full rounded shimmer-bg" />
                  <div className="mt-2 h-4 w-2/3 rounded shimmer-bg" />
                  <div className="mt-5 flex gap-3">
                    <div className="h-8 w-20 rounded-lg shimmer-bg" />
                    <div className="h-8 w-20 rounded-lg shimmer-bg" />
                  </div>
                </div>
              ))
            : filtered.map((job, i) => (
                <div
                  key={job.id}
                  className="animate-on-scroll group flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink-100 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-500/10 hover:-translate-y-1.5 hover:ring-brand-200"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <div className="flex items-start justify-between">
                    <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
                      {job.department}
                    </span>
                    <span className="text-xs font-medium text-ink-400">{timeAgo(job.posted_date)}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ink-900 transition-colors group-hover:text-brand-600">
                    {job.title}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-3 text-sm text-ink-600">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-brand-500" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="h-4 w-4 text-brand-500" />
                      {job.type}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-1.5 text-sm text-ink-600">
                    <Clock className="h-4 w-4 text-brand-500" />
                    {job.experience}
                  </div>
                  <p className="mt-3 line-clamp-2 text-sm text-ink-500 leading-relaxed">
                    {job.description}
                  </p>
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="mt-auto flex items-center gap-1.5 pt-5 text-sm font-bold text-brand-600 transition-colors hover:text-brand-700"
                  >
                    View Details
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              ))}
        </div>

        {!loading && jobs.length === 0 && (
          <div className="mt-12 text-center">
            <p className="text-ink-500">No active job openings at the moment. Please check back soon or send us your CV.</p>
          </div>
        )}
      </div>

      {/* Job detail modal */}
      {selectedJob && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          onClick={() => setSelectedJob(null)}
        >
          <div className="absolute inset-0 bg-ink-900/60 backdrop-blur-sm animate-fade-in" />
          <div
            className="relative w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute right-4 top-4 rounded-full p-2 text-ink-400 transition-colors hover:bg-ink-100 hover:text-ink-700"
            >
              <X className="h-5 w-5" />
            </button>
            <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
              {selectedJob.department}
            </span>
            <h3 className="mt-4 text-2xl font-extrabold text-ink-900">{selectedJob.title}</h3>
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-ink-600">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-brand-500" /> {selectedJob.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Briefcase className="h-4 w-4 text-brand-500" /> {selectedJob.type}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-brand-500" /> {selectedJob.experience}
              </span>
            </div>
            <div className="mt-5 border-t border-ink-100 pt-5">
              <h4 className="text-sm font-bold text-ink-900">Job Description</h4>
              <p className="mt-2 text-sm text-ink-600 leading-relaxed">{selectedJob.description}</p>
            </div>
            <div className="mt-6 flex gap-3">
              <button
                onClick={scrollToContact}
                className="flex-1 rounded-full bg-gradient-to-r from-brand-500 to-brand-700 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-500/30 transition-all hover:shadow-xl hover:-translate-y-0.5"
              >
                Apply Now
              </button>
              <button
                onClick={() => setSelectedJob(null)}
                className="rounded-full border-2 border-ink-200 px-6 py-3 text-sm font-bold text-ink-700 transition-colors hover:bg-ink-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
