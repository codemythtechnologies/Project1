import { useEffect, useState } from 'react';
import { supabase, type PartnerCompany } from '@/lib/supabase';

export default function PartnerCompanies() {
  const [partners, setPartners] = useState<PartnerCompany[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      const { data, error } = await supabase
        .from('partner_companies')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });
      if (!error && data) setPartners(data as PartnerCompany[]);
      setLoading(false);
    };
    fetchPartners();
  }, []);

  if (!loading && partners.length === 0) return null;

  // Duplicate the list so the track can loop seamlessly at -50%.
  const row = [...partners, ...partners];

  return (
    <section id="partners" className="py-24 md:py-32 bg-[var(--ivory-dark)]/40 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14 mb-12">
        <div className="grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-4 animate-on-scroll">
            <span className="eyebrow">Our Network</span>
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] mt-6">
              — Chapter 06
            </div>
          </div>
          <div className="col-span-12 md:col-span-8 animate-on-scroll">
            <h2 className="font-serif display-lg">
              Companies We've <em className="italic text-[var(--emerald)]">Partnered</em> With.
            </h2>
            <p className="mt-6 max-w-xl text-[14px] text-[var(--muted)]">
              Hover to pause and read a name — move away and the list keeps scrolling.
            </p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex gap-14 px-6 md:px-10 lg:px-14">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-8 w-40 flex-shrink-0 rounded-lg bg-[var(--line)]/50" />
          ))}
        </div>
      ) : (
        <div className="marquee-wrapper relative">
          <div className="marquee-track flex gap-14 whitespace-nowrap w-max">
            {row.map((p, i) => (
              <div key={`${p.id}-${i}`} className="flex items-baseline gap-4 border-l border-[var(--line)] pl-6">
                <span className="font-serif text-2xl md:text-3xl italic text-[var(--ink)]">{p.name}</span>
                {p.industry && (
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                    {p.industry}
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--ivory)] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--ivory)] to-transparent" />
        </div>
      )}
    </section>
  );
}
