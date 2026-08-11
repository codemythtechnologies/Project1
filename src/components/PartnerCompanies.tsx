import { useEffect, useState } from 'react';
import { Building2, Handshake } from 'lucide-react';
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

  // Duplicate the array for seamless marquee loop
  const marqueePartners = [...partners, ...partners];

  return (
    <section className="relative overflow-hidden bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="animate-on-scroll inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-sm font-semibold text-brand-700">
            <Handshake className="h-4 w-4" />
            Our Partner Companies
          </div>
          <h2 className="animate-on-scroll mt-5 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            Trusted by Leading Organizations
          </h2>
          <p className="animate-on-scroll mx-auto mt-4 max-w-2xl text-lg text-ink-600">
            We have developed good rapport with prestigious multinational and Indian
            companies of repute — on whose panel we are honored to serve.
          </p>
        </div>
      </div>

      {/* Marquee scroll — pauses on hover */}
      {!loading && partners.length > 0 && (
        <div
          className="group relative mt-14 overflow-hidden"
          onMouseEnter={(e) => {
            const track = e.currentTarget.querySelector('[data-marquee]') as HTMLElement;
            if (track) track.style.animationPlayState = 'paused';
          }}
          onMouseLeave={(e) => {
            const track = e.currentTarget.querySelector('[data-marquee]') as HTMLElement;
            if (track) track.style.animationPlayState = 'running';
          }}
        >
          {/* Edge fades */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-white to-transparent" />

          <div
            data-marquee
            className="flex w-max gap-4 animate-marquee"
          >
            {marqueePartners.map((partner, i) => (
              <div
                key={`${partner.id}-${i}`}
                className="group/card flex flex-shrink-0 items-center gap-3 rounded-2xl border border-ink-100 bg-ink-50/50 px-6 py-4 transition-all duration-300 hover:border-brand-300 hover:bg-brand-50 hover:shadow-lg hover:shadow-brand-500/10"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 transition-transform group-hover/card:scale-110">
                  <Building2 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-display text-lg font-extrabold tracking-tight text-ink-900 transition-colors group-hover/card:text-brand-600">
                    {partner.name}
                  </p>
                  <p className="text-xs font-medium text-ink-500">{partner.industry}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chunky table-style list (no borders) */}
      {!loading && partners.length > 0 && (
        <div className="animate-on-scroll mx-auto mt-16 max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-x-8 gap-y-1 sm:grid-cols-3 lg:grid-cols-4">
            {partners.map((partner, i) => (
              <div
                key={partner.id}
                className="group flex items-center gap-2.5 py-3 transition-all duration-300 hover:translate-x-1"
                style={{ animationDelay: `${i * 30}ms` }}
              >
                <span className="text-2xl font-black text-brand-200 transition-colors group-hover:text-brand-400">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="font-display text-base font-bold tracking-tight text-ink-800 transition-colors group-hover:text-brand-600">
                    {partner.name}
                  </p>
                  <p className="text-[11px] font-medium text-ink-400">{partner.industry}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {loading && (
        <div className="mt-14 flex justify-center gap-4 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-16 w-40 flex-shrink-0 rounded-2xl shimmer-bg" />
          ))}
        </div>
      )}
    </section>
  );
}
