import { useEffect, useMemo, useState } from 'react';
import { Star } from 'lucide-react';
import { supabase, type Testimonial } from '@/lib/supabase';

const sourceLabel: Record<Testimonial['source'], string> = {
  google: 'Google Reviews',
  justdial: 'Justdial',
  direct: 'Direct Feedback',
};

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
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

  const [featured, ...rest] = filtered;

  return (
    <section id="testimonials" className="py-24 md:py-36">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-12 gap-6 md:gap-10 mb-12 md:mb-16">
          <div className="col-span-12 md:col-span-4 animate-on-scroll">
            <span className="eyebrow">Client &amp; Candidate Voices</span>
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] mt-6">
              — Chapter 07
            </div>
          </div>
          <div className="col-span-12 md:col-span-8 animate-on-scroll">
            <h2 className="font-serif display-lg">
              What People <em className="italic text-[var(--emerald)]">Say</em> About Us.
            </h2>
          </div>
        </div>

        {/* Client / Candidate filter */}
        {!loading && testimonials.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-16 md:mb-20 border-t border-b border-[var(--line)] py-4 animate-on-scroll">
            {(['client', 'candidate'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`text-[12px] uppercase tracking-[0.18em] py-2 px-4 border transition-all duration-300 ${
                  tab === t
                    ? 'bg-[var(--ink)] text-[var(--ivory)] border-[var(--ink)]'
                    : 'bg-transparent text-[var(--ink)] border-[var(--line)] hover:border-[var(--ink)]'
                }`}
              >
                {t === 'client' ? 'Client Reviews' : 'Candidate Reviews'}
                <span className="ml-1.5 opacity-60">
                  ({testimonials.filter((x) => x.reviewer_type === t).length})
                </span>
              </button>
            ))}
          </div>
        )}

        {loading && (
          <div className="border-t border-[var(--line)] pt-16">
            <div className="h-6 w-40 bg-[var(--ivory-dark)]" />
            <div className="mt-6 h-10 w-full max-w-2xl bg-[var(--ivory-dark)]" />
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="border-t border-[var(--line)] py-16 text-center text-[var(--muted)]">
            No {tab} reviews published yet.
          </div>
        )}

        {!loading && featured && (
          <>
            {/* Featured pull quote */}
            <div className="grid grid-cols-12 gap-6 md:gap-10 mb-20 animate-on-scroll">
              <div className="col-span-12 md:col-span-2 flex md:justify-end">
                <span className="font-serif italic text-8xl md:text-9xl leading-none text-[var(--emerald)] -mt-4">
                  &ldquo;
                </span>
              </div>
              <div className="col-span-12 md:col-span-10">
                <p className="pull-quote text-[var(--ink)] max-w-4xl">{featured.message}</p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={13}
                        fill="var(--emerald)"
                        strokeWidth={0}
                        className={i < featured.rating ? '' : 'opacity-25'}
                      />
                    ))}
                  </div>
                  <span className="font-mono text-[11px] tabular text-[var(--muted)]">
                    {featured.rating} / 5
                  </span>
                  <span className="hairline flex-1" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                    {featured.name}, {featured.role} · {featured.company} · via{' '}
                    {sourceLabel[featured.source]}
                  </span>
                </div>
              </div>
            </div>

            {/* Secondary quotes */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 border-t border-[var(--line)] pt-16 animate-on-scroll">
                {rest.map((t) => (
                  <div key={t.id}>
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, j) => (
                        <Star
                          key={j}
                          size={12}
                          fill="var(--emerald)"
                          strokeWidth={0}
                          className={j < t.rating ? '' : 'opacity-25'}
                        />
                      ))}
                    </div>
                    <p className="font-serif italic text-xl leading-snug text-[var(--ink)]">
                      "{t.message}"
                    </p>
                    <div className="mt-6 pt-4 border-t border-[var(--line)] flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--emerald)]">
                        {t.name}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                        {t.role}, {t.company}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
