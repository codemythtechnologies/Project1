import { useEffect, useState } from 'react';
import { Building2 } from 'lucide-react';
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
  const track = [...partners, ...partners];

  return (
    <section className="relative overflow-hidden bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="animate-on-scroll inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-sm font-semibold text-brand-700">
            Our Network
          </div>
          <h2 className="animate-on-scroll mt-4 text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
            Companies We've Partnered With
          </h2>
          <p className="animate-on-scroll mx-auto mt-3 max-w-xl text-ink-500">
            Hover to pause and read a name — move away and the list keeps scrolling.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="mt-10 flex justify-center gap-6 px-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-12 w-40 flex-shrink-0 rounded-xl shimmer-bg" />
          ))}
        </div>
      ) : (
        <div className="group relative mt-10">
          {/* Edge fade masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-32" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-32" />

          <div className="flex w-max animate-marquee gap-4 [animation-play-state:running] group-hover:[animation-play-state:paused]">
            {track.map((p, i) => (
              <div
                key={`${p.id}-${i}`}
                className="flex flex-shrink-0 items-center gap-3 rounded-2xl border border-ink-100 bg-ink-50/60 px-6 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:bg-white hover:shadow-xl hover:shadow-brand-500/10"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-md">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-display text-lg font-extrabold tracking-tight text-ink-900 whitespace-nowrap">
                    {p.name}
                  </p>
                  {p.industry && (
                    <p className="text-xs font-medium text-ink-500 whitespace-nowrap">{p.industry}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
