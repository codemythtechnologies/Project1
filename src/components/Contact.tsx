import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2, Building } from 'lucide-react';
import { supabase, type ContactSubmission } from '@/lib/supabase';

export default function Contact() {
  const [form, setForm] = useState<ContactSubmission>({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    const { error } = await supabase.from('contact_submissions').insert({
      name: form.name,
      email: form.email,
      phone: form.phone,
      company: form.company,
      message: form.message,
    });
    if (error) {
      setStatus('error');
    } else {
      setStatus('success');
      setForm({ name: '', email: '', phone: '', company: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const contactInfo = [
    { icon: Mail, label: 'Email Us', value: 'renhrcentral@gmail.com', href: 'mailto:renhrcentral@gmail.com' },
    { icon: Phone, label: 'Call Us', value: '+91 99449 09999', href: 'tel:+919944909999' },
    { icon: MapPin, label: 'Visit Us', value: 'No 10, Ellaipillai Chavadi, Thanthai Periyar Nagar, 6th Cross Street, Pondicherry Bazaar, Pondicherry - 605001', href: 'https://maps.google.com/?q=Renaissance+Management+Consultants+Pondicherry' },
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
              the right opportunity — we're here to help. Reach out and our team will
              get back to you within 24 hours.
            </p>

            <div className="animate-on-scroll mt-8 space-y-4">
              {contactInfo.map((info) => (
                <a
                  key={info.label}
                  href={info.href}
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

          {/* Right: form */}
          <div className="animate-on-scroll">
            <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-ink-100 sm:p-10">
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 animate-scale-in">
                    <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-ink-900">Message Sent!</h3>
                  <p className="mt-2 text-sm text-ink-600">
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-semibold text-ink-700">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className="mt-1.5 w-full rounded-xl border border-ink-200 bg-ink-50/50 px-4 py-3 text-sm text-ink-900 transition-all focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-200 outline-none"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-ink-700">Email *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className="mt-1.5 w-full rounded-xl border border-ink-200 bg-ink-50/50 px-4 py-3 text-sm text-ink-900 transition-all focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-200 outline-none"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-semibold text-ink-700">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="mt-1.5 w-full rounded-xl border border-ink-200 bg-ink-50/50 px-4 py-3 text-sm text-ink-900 transition-all focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-200 outline-none"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-ink-700">Company</label>
                      <input
                        type="text"
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        className="mt-1.5 w-full rounded-xl border border-ink-200 bg-ink-50/50 px-4 py-3 text-sm text-ink-900 transition-all focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-200 outline-none"
                        placeholder="Your Company"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink-700">Message *</label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      className="mt-1.5 w-full resize-none rounded-xl border border-ink-200 bg-ink-50/50 px-4 py-3 text-sm text-ink-900 transition-all focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-200 outline-none"
                      placeholder="Tell us about your hiring needs or career goals..."
                    />
                  </div>

                  {status === 'error' && (
                    <div className="rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                      Something went wrong. Please try again or email us directly.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-brand-700 px-6 py-4 text-base font-bold text-white shadow-xl shadow-brand-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-500/40 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
