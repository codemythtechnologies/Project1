import { useEffect, useState } from 'react';
import {
  Lock, LogOut, Plus, Trash2, Eye, EyeOff, Briefcase, Star, Building2,
  X, Loader2, CheckCircle2, ExternalLink, LayoutDashboard, TrendingUp,
  Users, Award
} from 'lucide-react';
import { supabase, type JobOpening, type Testimonial, type PartnerCompany } from '@/lib/supabase';

type Tab = 'jobs' | 'reviews' | 'partners';
type View = 'login' | 'dashboard';

const EDGE_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-api`;

export default function Admin() {
  const [view, setView] = useState<View>('login');
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [tab, setTab] = useState<Tab>('jobs');

  // Data
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [partners, setPartners] = useState<PartnerCompany[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // Form state
  const [showAdd, setShowAdd] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleLogin = async () => {
    setLoading(true);
    setAuthError(false);
    try {
      const res = await fetch(EDGE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}` },
        body: JSON.stringify({ action: 'login', admin_password: password, table: 'site_config' }),
      });
      // Check if password matches by trying a test mutation
      const { data: config } = await supabase
        .from('site_config')
        .select('value')
        .eq('key', 'admin_password')
        .maybeSingle();

      if (config && config.value === password) {
        setAuthed(true);
        setView('dashboard');
        fetchAll();
      } else {
        setAuthError(true);
      }
    } catch {
      setAuthError(true);
    }
    setLoading(false);
  };

  const fetchAll = async () => {
    setLoading(true);
    const [jobsRes, testRes, partnerRes] = await Promise.all([
      supabase.from('job_openings').select('*').order('posted_date', { ascending: false }),
      supabase.from('testimonials').select('*').order('created_at', { ascending: false }),
      supabase.from('partner_companies').select('*').order('display_order', { ascending: true }),
    ]);
    if (jobsRes.data) setJobs(jobsRes.data as JobOpening[]);
    if (testRes.data) setTestimonials(testRes.data as Testimonial[]);
    if (partnerRes.data) setPartners(partnerRes.data as PartnerCompany[]);
    setLoading(false);
  };

  useEffect(() => {
    if (authed) fetchAll();
  }, [authed]);

  const callApi = async (payload: Record<string, unknown>) => {
    setActionLoading(true);
    try {
      const res = await fetch(EDGE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}` },
        body: JSON.stringify({ ...payload, admin_password: password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      await fetchAll();
    } catch (err) {
      console.error('Admin action failed:', err);
    }
    setActionLoading(false);
  };

  const handleAdd = () => {
    if (tab === 'jobs') {
      callApi({ action: 'insert', table: 'job_openings', record: formData });
    } else if (tab === 'reviews') {
      callApi({ action: 'insert', table: 'testimonials', record: formData });
    } else if (tab === 'partners') {
      callApi({ action: 'insert', table: 'partner_companies', record: formData });
    }
    setShowAdd(false);
    setFormData({});
  };

  const handleDelete = (id: string, table: 'job_openings' | 'testimonials' | 'partner_companies') => {
    callApi({ action: 'delete', table, record: { id } });
  };

  const handleToggle = (record: JobOpening | Testimonial | PartnerCompany, table: 'job_openings' | 'testimonials' | 'partner_companies') => {
    if (table === 'job_openings') callApi({ action: 'toggle', table, record: { id: record.id, is_active: (record as JobOpening).is_active } });
    else if (table === 'testimonials') callApi({ action: 'toggle', table, record: { id: record.id, is_published: (record as Testimonial).is_published } });
    else callApi({ action: 'toggle', table, record: { id: record.id, is_active: (record as PartnerCompany).is_active } });
  };

  // Stats for dashboard overview
  const stats = [
    { icon: Briefcase, label: 'Active Jobs', value: jobs.filter((j) => j.is_active).length, color: 'from-brand-500 to-brand-700' },
    { icon: Star, label: 'Published Reviews', value: testimonials.filter((t) => t.is_published).length, color: 'from-accent-500 to-accent-700' },
    { icon: Building2, label: 'Active Partners', value: partners.filter((p) => p.is_active).length, color: 'from-emerald-500 to-emerald-700' },
    { icon: Users, label: 'Total Records', value: jobs.length + testimonials.length + partners.length, color: 'from-rose-500 to-rose-700' },
  ];

  // ── Login view ──────────────────────────────────────────────────
  if (view === 'login' || !authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-ink-900 via-ink-800 to-brand-950 px-4">
        <div className="w-full max-w-md rounded-3xl bg-white/5 p-8 backdrop-blur-md ring-1 ring-white/10 animate-scale-in">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-xl shadow-brand-500/30">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <h2 className="mt-5 text-2xl font-extrabold text-white">Admin Access</h2>
            <p className="mt-1.5 text-sm text-ink-400">Enter your password to manage website content</p>
          </div>

          <div className="mt-8 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-ink-300">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setAuthError(false); }}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition-all focus:border-brand-400 focus:bg-white/10 focus:ring-2 focus:ring-brand-400/30 outline-none"
                placeholder="Enter admin password"
                autoFocus
              />
              {authError && (
                <p className="mt-2 text-sm font-medium text-rose-400">Incorrect password. Please try again.</p>
              )}
            </div>
            <button
              onClick={handleLogin}
              disabled={loading || !password}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-brand-700 px-6 py-3.5 text-base font-bold text-white shadow-xl shadow-brand-500/30 transition-all hover:shadow-2xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Login <ArrowRight /></>}
            </button>
            <button
              onClick={() => window.location.hash = ''}
              className="w-full text-center text-sm text-ink-400 transition-colors hover:text-white"
            >
              Back to website
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Dashboard view ──────────────────────────────────────────────
  const tabs: { key: Tab; label: string; icon: typeof Briefcase }[] = [
    { key: 'jobs', label: 'Job Openings', icon: Briefcase },
    { key: 'reviews', label: 'Reviews', icon: Star },
    { key: 'partners', label: 'Partner Companies', icon: Building2 },
  ];

  const addFields: Record<Tab, { name: string; label: string; type?: string; required?: boolean; options?: string[] }[]> = {
    jobs: [
      { name: 'title', label: 'Job Title', required: true },
      { name: 'department', label: 'Department', required: true },
      { name: 'location', label: 'Location', required: true },
      { name: 'type', label: 'Job Type', options: ['Full-time', 'Part-time', 'Contract'] },
      { name: 'experience', label: 'Experience Required', required: true },
      { name: 'description', label: 'Job Description', type: 'textarea', required: true },
    ],
    reviews: [
      { name: 'name', label: 'Reviewer Name', required: true },
      { name: 'role', label: 'Role (e.g. HR Director / Placed Candidate)', required: true },
      { name: 'company', label: 'Company', required: true },
      { name: 'rating', label: 'Rating (1-5)', type: 'number', required: true },
      { name: 'message', label: 'Review Message', type: 'textarea', required: true },
      { name: 'category', label: 'Category', options: ['client', 'candidate'] },
      { name: 'source', label: 'Source', options: ['website', 'google', 'justdial'] },
    ],
    partners: [
      { name: 'name', label: 'Company Name', required: true },
      { name: 'industry', label: 'Industry', required: true },
      { name: 'display_order', label: 'Display Order (number)', type: 'number' },
    ],
  };

  return (
    <div className="min-h-screen bg-ink-50">
      {/* Top bar */}
      <header className="sticky top-0 z-40 glass shadow-lg shadow-ink-900/5">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="h-6 w-6 text-brand-600" />
            <span className="font-display text-lg font-extrabold text-ink-900">Admin Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => { window.location.hash = ''; setAuthed(false); setView('login'); setPassword(''); }}
              className="flex items-center gap-1.5 rounded-full bg-ink-100 px-4 py-2 text-sm font-semibold text-ink-700 transition-colors hover:bg-rose-50 hover:text-rose-600"
            >
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats overview */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-ink-100 animate-fade-up"
              style={{ animationDelay: `${i * 80}ms`, opacity: 0 }}
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="mt-3 text-3xl font-extrabold text-ink-900">{stat.value}</div>
              <div className="text-xs font-medium text-ink-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mt-8 flex gap-2 border-b border-ink-200">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => { setTab(t.key); setShowAdd(false); }}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-bold transition-all ${
                tab === t.key
                  ? 'border-brand-500 text-brand-600'
                  : 'border-transparent text-ink-500 hover:text-ink-700'
              }`}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
            </button>
          ))}
        </div>

        {/* Add button */}
        <div className="mt-6">
          <button
            onClick={() => setShowAdd(!showAdd)}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-brand-700 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand-500/30 transition-all hover:shadow-xl hover:-translate-y-0.5"
          >
            <Plus className="h-4 w-4" />
            Add {tab === 'jobs' ? 'Job' : tab === 'reviews' ? 'Review' : 'Partner'}
          </button>
        </div>

        {/* Add form modal */}
        {showAdd && (
          <div className="mt-4 rounded-2xl bg-white p-6 shadow-lg ring-1 ring-ink-100 animate-fade-up">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-ink-900">Add New {tab === 'jobs' ? 'Job Opening' : tab === 'reviews' ? 'Review' : 'Partner Company'}</h3>
              <button onClick={() => setShowAdd(false)} className="rounded-lg p-1.5 text-ink-400 hover:bg-ink-100 hover:text-ink-700">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {addFields[tab].map((field) => (
                <div key={field.name} className={field.type === 'textarea' ? 'sm:col-span-2' : ''}>
                  <label className="block text-sm font-semibold text-ink-700">
                    {field.label} {field.required && <span className="text-rose-500">*</span>}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      rows={3}
                      value={formData[field.name] || ''}
                      onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-ink-200 bg-ink-50/50 px-4 py-2.5 text-sm text-ink-900 transition-all focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-200 outline-none"
                    />
                  ) : field.options ? (
                    <select
                      value={formData[field.name] || field.options[0]}
                      onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-ink-200 bg-ink-50/50 px-4 py-2.5 text-sm text-ink-900 transition-all focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-200 outline-none"
                    >
                      {field.options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  ) : (
                    <input
                      type={field.type || 'text'}
                      value={formData[field.name] || ''}
                      onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-ink-200 bg-ink-50/50 px-4 py-2.5 text-sm text-ink-900 transition-all focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-200 outline-none"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-5 flex gap-3">
              <button
                onClick={handleAdd}
                disabled={actionLoading}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-brand-700 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand-500/30 transition-all hover:shadow-xl disabled:opacity-50"
              >
                {actionLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
                Save
              </button>
              <button
                onClick={() => { setShowAdd(false); setFormData({}); }}
                className="rounded-full border border-ink-200 px-6 py-2.5 text-sm font-bold text-ink-700 transition-colors hover:bg-ink-50"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Data tables */}
        <div className="mt-6">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
            </div>
          ) : tab === 'jobs' ? (
            <div className="space-y-3">
              {jobs.map((job) => (
                <div key={job.id} className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-ink-100">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-ink-900">{job.title}</h4>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${job.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-ink-100 text-ink-500'}`}>
                        {job.is_active ? 'Active' : 'Hidden'}
                      </span>
                    </div>
                    <p className="text-sm text-ink-500">{job.department} · {job.location} · {job.experience}</p>
                  </div>
                  <button onClick={() => handleToggle(job, 'job_openings')} className="rounded-lg p-2 text-ink-400 transition-colors hover:bg-ink-100 hover:text-brand-600">
                    {job.is_active ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                  </button>
                  <button onClick={() => handleDelete(job.id, 'job_openings')} className="rounded-lg p-2 text-ink-400 transition-colors hover:bg-rose-50 hover:text-rose-600">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
              {jobs.length === 0 && <p className="text-center text-ink-500 py-8">No job openings yet.</p>}
            </div>
          ) : tab === 'reviews' ? (
            <div className="space-y-3">
              {testimonials.map((rev) => (
                <div key={rev.id} className="flex items-start gap-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-ink-100">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-ink-900">{rev.name}</h4>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${rev.is_published ? 'bg-emerald-100 text-emerald-700' : 'bg-ink-100 text-ink-500'}`}>
                        {rev.is_published ? 'Published' : 'Hidden'}
                      </span>
                      <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-bold text-brand-700">{rev.source}</span>
                      <span className="rounded-full bg-accent-50 px-2 py-0.5 text-xs font-bold text-accent-700">{rev.category}</span>
                    </div>
                    <p className="mt-1 text-sm text-ink-600 line-clamp-2">{rev.message}</p>
                    <div className="mt-1 flex gap-0.5">
                      {Array.from({ length: rev.rating }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-accent-400 text-accent-400" />)}
                    </div>
                  </div>
                  <button onClick={() => handleToggle(rev, 'testimonials')} className="rounded-lg p-2 text-ink-400 transition-colors hover:bg-ink-100 hover:text-brand-600">
                    {rev.is_published ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                  </button>
                  <button onClick={() => handleDelete(rev.id, 'testimonials')} className="rounded-lg p-2 text-ink-400 transition-colors hover:bg-rose-50 hover:text-rose-600">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
              {testimonials.length === 0 && <p className="text-center text-ink-500 py-8">No reviews yet.</p>}
            </div>
          ) : (
            <div className="space-y-3">
              {partners.map((p) => (
                <div key={p.id} className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-ink-100">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700">
                    <Building2 className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-ink-900">{p.name}</h4>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${p.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-ink-100 text-ink-500'}`}>
                        {p.is_active ? 'Active' : 'Hidden'}
                      </span>
                    </div>
                    <p className="text-sm text-ink-500">{p.industry}</p>
                  </div>
                  <button onClick={() => handleToggle(p, 'partner_companies')} className="rounded-lg p-2 text-ink-400 transition-colors hover:bg-ink-100 hover:text-brand-600">
                    {p.is_active ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                  </button>
                  <button onClick={() => handleDelete(p.id, 'partner_companies')} className="rounded-lg p-2 text-ink-400 transition-colors hover:bg-rose-50 hover:text-rose-600">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
              {partners.length === 0 && <p className="text-center text-ink-500 py-8">No partner companies yet.</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ArrowRight() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  );
}
