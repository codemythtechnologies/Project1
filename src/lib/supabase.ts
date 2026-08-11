import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type JobOpening = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  is_active: boolean;
  posted_date: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  message: string;
  avatar_initials: string;
  is_published: boolean;
  category: string;
  source: string;
  reviewer_link: string | null;
  created_at: string;
};

export type ContactSubmission = {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
};

export type PartnerCompany = {
  id: string;
  name: string;
  industry: string;
  is_active: boolean;
  display_order: number;
  created_at: string;
};

export type SiteConfig = {
  key: string;
  value: string;
};
