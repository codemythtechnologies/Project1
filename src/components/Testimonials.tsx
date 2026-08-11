import { useEffect, useMemo, useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { supabase, type Testimonial } from '@/lib/supabase';

const sourceLabel: Record<Testimonial['source'], string> = {
  google: 'Google Reviews',
  justdial: 'Justdial',
  direct: 'Direct Feedback',
};

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(0);
  const [tab, setTab] = useState<'client' | 'candidate'>('client');

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });
      if (!error && data) setTestimonials(data as Testimonial[]);
      setLoading(false);
    };
    fetchTestimonials();
  }, []);

  const filtered = useMemo(
    () => testimonials.filter((t) => t.reviewer_type === tab),
    [testimonials, tab]
  );

  useEffect(() => setActive(0), [tab]);

  const next = () => setActive((p) => (p + 1) % filtered.length);
  const prev = () => setActive((p) => (p - 1 + filtered.length) % filtered.length);

  const avatarColors = [
    'from-brand-500 to-brand-700',
    'from-accent-500 to-accent-700',
    'from-emerald-500 to-emerald-700',
    'from-rose-500 to-rose-700',
    'from-teal-500 to-teal-700',
    'from-amber-500 to-amber-700',
  ];

  return (
    <section id="testimonials" className="relative overflow-hidden bg-gradient-to-br from-ink-900 via-ink-800 to-brand-950 py-24">
      {/* Decorative */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 top-10 h-96 w-96 rounded-full bg-brand-500/10 blur-3xl animate-float-slow" />
        <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-accent-500/8 blur-3xl animate-float" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="animate-on-scroll inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-brand-200 backdrop-blur-sm">
            Client & Candidate Voices
          </div>
          <h2 className="animate-on-scroll mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
            What People Say About Us
          </h2>
          <p className="animate-on-scroll mx-auto mt-4 max-w-2xl text-lg text-ink-300">
            Don't just take our word for it — hear from the companies and candidates
            we've helped over the years.
          </p>
        </div>

        {/* Client / Candidate tabs */}
        {!loading && testimonials.length > 0 && (
          <div className="animate-on-scroll mt-8 flex justify-center gap-2">
            {(['client', 'candidate'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-300 ${
                  tab === t
                    ? 'bg-gradient-to-r from-brand-500 to-brand-700 text-white shadow-lg shadow-brand-500/30'
                    : 'bg-white/10 text-ink-200 backdrop-blur-sm hover:bg-white/20'
                }`}
              >
                {t === 'client' ? 'Client Reviews' : 'Candidate Reviews'}
                <span className="ml-1.5 opacity-75">
                  ({testimonials.filter((x) => x.reviewer_type === t).length})
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Carousel */}
        {loading ? (
          <div className="mt-16 mx-auto max-w-3xl">
            <div className="rounded-3xl bg-white/5 p-8 backdrop-blur-sm">
              <div className="h-6 w-32 rounded-full shimmer-bg" />
              <div className="mt-4 space-y-2">
                <div className="h-4 w-full rounded shimmer-bg" />
                <div className="h-4 w-3/4 rounded shimmer-bg" />
              </div>
            </div>
          </div>
        ) : filtered.length > 0 ? (
          <div className="animate-on-scroll mt-16 mx-auto max-w-4xl">
            <div className="relative">
              {/* Main testimonial card */}
              <div className="relative overflow-hidden rounded-3xl bg-white/5 p-8 backdrop-blur-md ring-1 ring-white/10 sm:p-12">
                <Quote className="absolute -top-2 -left-2 h-24 w-24 text-white/5" />

                <div key={active} className="animate-fade-in">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    {/* Stars */}
                    <div className="flex gap-1">
                      {Array.from({ length: filtered[active].rating }).map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-accent-400 text-accent-400" />
                      ))}
                    </div>
                    {/* Source badge */}
                    <a
                      href={filtered[active].source_url || '#'}
                      target={filtered[active].source_url ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-brand-200 transition-colors hover:bg-white/20"
                    >
                      via {sourceLabel[filtered[active].source]}
                      {filtered[active].source_url && <ExternalLink className="h-3 w-3" />}
                    </a>
                  </div>

                  <p className="mt-6 text-lg leading-relaxed text-ink-100 sm:text-xl">
                    "{filtered[active].message}"
                  </p>

                  <div className="mt-8 flex items-center gap-4">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${avatarColors[active % avatarColors.length]} text-lg font-extrabold text-white shadow-lg`}
                    >
                      {filtered[active].avatar_initials}
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white">{filtered[active].name}</div>
                      <div className="text-sm text-brand-200">
                        {filtered[active].role}, {filtered[active].company}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="mt-6 flex items-center justify-between">
                <div className="flex gap-2">
                  {filtered.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === active ? 'w-8 bg-brand-400' : 'w-2 bg-white/20 hover:bg-white/40'
                      }`}
                      aria-label={`Go to testimonial ${i + 1}`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={prev}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-brand-500 hover:scale-110"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={next}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-brand-500 hover:scale-110"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-on-scroll mt-16 text-center text-ink-300">
            No {tab} reviews published yet.
          </div>
        )}
      </div>
    </section>
  );
}
