import { Mail, Phone, MapPin, Building, Star } from 'lucide-react';

export default function Contact() {
  const contactInfo = [
    { icon: Mail, label: 'Email Us', value: 'renhrcentral@gmail.com', href: 'mailto:renhrcentral@gmail.com' },
    {
      icon: Phone,
      label: 'Call Us',
      value: '+91 99449 09999 / +91 98423 98452',
      href: 'tel:+919944909999',
    },
    {
      icon: MapPin,
      label: 'Visit Us',
      value:
        'No 10, Ellaipillai Chavadi, Thanthai Periyar Nagar, Near St. Patrick School, 6th Cross Street, Pondicherry Bazaar, Puducherry 605001',
      href: 'https://www.google.com/maps/search/?api=1&query=Renaissance+Management+Consultants+Ellaipillai+Chavadi+Thanthai+Periyar+Nagar+Pondicherry+605001',
    },
  ];

  return (
    <section id="contact" className="relative bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
          {/* Left: info */}
          <div>
            <div className="animate-on-scroll inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-sm font-semibold text-brand-700">
              Get In Touch
            </div>
            <h2 className="animate-on-scroll mt-5 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              Let's Find Your <span className="text-brand-600">Perfect Match</span>
            </h2>
            <p className="animate-on-scroll mt-4 text-lg text-ink-600 leading-relaxed">
              Whether you're a company looking for top talent or a candidate seeking
              the right opportunity — reach out by phone or email and our team will
              get back to you within 24 hours.
            </p>

            <div className="animate-on-scroll mt-4 flex flex-wrap items-center gap-2">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Renaissance+Management+Consultants+Pondicherry"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-4 py-1.5 text-sm font-semibold text-amber-700 transition-colors hover:bg-amber-100"
              >
                <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                4.8 on Google Reviews
              </a>
              <a
                href="https://www.justdial.com/Pondicherry/Renaissance-Management-Consultants-Ellaipillai-Chavadi-Thanthai-Periyar-Nagar-Near-S-Pondicherry-Bazaar/0413P413STDS000129_BZDET"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-100"
              >
                <Star className="h-4 w-4 fill-blue-600 text-blue-600" />
                4.8 · 27 ratings on Justdial
              </a>
            </div>

            <div className="animate-on-scroll mt-8 space-y-4">
              {contactInfo.map((info) => (
                <a
                  key={info.label}
                  href={info.href}
                  target={info.label === 'Visit Us' ? '_blank' : undefined}
                  rel={info.label === 'Visit Us' ? 'noopener noreferrer' : undefined}
                  className="group flex items-center gap-4 rounded-2xl border border-ink-100 bg-ink-50/50 p-5 transition-all duration-300 hover:border-brand-200 hover:bg-brand-50 hover:shadow-lg hover:shadow-brand-500/5"
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-lg shadow-brand-500/20 transition-transform group-hover:scale-110">
                    <info.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-ink-500">{info.label}</div>
                    <div className="text-base font-bold text-ink-900">{info.value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Service terms highlight */}
            <div className="animate-on-scroll mt-8 rounded-2xl bg-gradient-to-r from-brand-50 to-accent-50 p-5">
              <div className="flex items-start gap-3">
                <Building className="h-5 w-5 flex-shrink-0 text-brand-600 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-ink-900">Our Service Terms</p>
                  <p className="mt-1 text-sm text-ink-600">
                    Service charge: 8.33% of annual CTC + 18% GST. Payment within 7–10 days
                    of candidate joining. Free replacement within 3 months.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: map */}
          <div className="animate-on-scroll">
            <div className="overflow-hidden rounded-3xl shadow-xl ring-1 ring-ink-100">
              <iframe
                title="Renaissance Management Consultants location"
                src="https://www.google.com/maps?q=Renaissance+Management+Consultants+Ellaipillai+Chavadi+Thanthai+Periyar+Nagar+Pondicherry+605001&z=16&output=embed"
                width="100%"
                height="480"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Renaissance+Management+Consultants+Ellaipillai+Chavadi+Thanthai+Periyar+Nagar+Pondicherry+605001"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800"
            >
              <MapPin className="h-4 w-4" />
              Get directions on Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
