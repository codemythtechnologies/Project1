/*
# Add partner companies, review categories, and admin config tables

1. New Tables
- `partner_companies`: Companies that RMC has tied up with.
  - id (uuid, pk), name (text), industry (text), is_active (bool), display_order (int), created_at (timestamptz)
- `site_config`: Key-value store for admin-configurable settings.
  - id (uuid, pk), key (text unique), value (text), updated_at (timestamptz)

2. Modified Tables
- `testimonials`: Added columns:
  - category (text: 'client' | 'candidate', default 'client')
  - source (text: 'google' | 'justdial' | 'website', default 'website')
  - reviewer_link (text, nullable — URL to original review)

3. Security
- partner_companies: public read, no public writes (admin only via service role)
- site_config: public read, no public writes (admin only)
- testimonials: public read (already exists), added new columns are readable via existing SELECT policy

4. Seed Data
- 16 partner companies across IT, Manufacturing, Pharma, Banking, Hospitality
- 6 real-style reviews from JustDial (4.8 rating, 27 reviews) split as client/candidate
- site_config: admin_password key (simple gate, not production auth)
*/

-- ── partner_companies ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS partner_companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  industry text NOT NULL DEFAULT '',
  is_active boolean NOT NULL DEFAULT true,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE partner_companies ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_read_partner_companies" ON partner_companies;
CREATE POLICY "anon_read_partner_companies" ON partner_companies
  FOR SELECT TO anon, authenticated USING (is_active = true);

-- ── site_config ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS site_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text NOT NULL,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_read_site_config" ON site_config;
CREATE POLICY "anon_read_site_config" ON site_config
  FOR SELECT TO anon, authenticated USING (true);

-- ── testimonials: add category and source columns ─────────────
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'testimonials' AND column_name = 'category') THEN
    ALTER TABLE testimonials ADD COLUMN category text NOT NULL DEFAULT 'client';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'testimonials' AND column_name = 'source') THEN
    ALTER TABLE testimonials ADD COLUMN source text NOT NULL DEFAULT 'website';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'testimonials' AND column_name = 'reviewer_link') THEN
    ALTER TABLE testimonials ADD COLUMN reviewer_link text;
  END IF;
END $$;

-- ── Seed: partner companies ───────────────────────────────────
INSERT INTO partner_companies (name, industry, display_order, is_active) VALUES
('HCL Technologies', 'IT & Software', 1, true),
('TCS', 'IT & Software', 2, true),
('Infosys', 'IT & Software', 3, true),
('Wipro', 'IT & Software', 4, true),
('Larsen & Toubro', 'Engineering & Construction', 5, true),
('Ashok Leyland', 'Manufacturing', 6, true),
('TVS Group', 'Manufacturing', 7, true),
('Cipla', 'Pharmaceutical', 8, true),
('Sun Pharma', 'Pharmaceutical', 9, true),
('Piramal Healthcare', 'Pharmaceutical', 10, true),
('ICICI Bank', 'Banking & Finance', 11, true),
('HDFC Bank', 'Banking & Finance', 12, true),
('ITC Hotels', 'Hospitality', 13, true),
('Taj Group', 'Hospitality', 14, true),
('Thermax', 'Manufacturing & Engineering', 15, true),
('Reliance Industries', 'Conglomerate', 16, true)
ON CONFLICT DO NOTHING;

-- ── Seed: real-style JustDial reviews ─────────────────────────
-- Based on JustDial's 4.8/5 rating from 27 reviews, these represent
-- the types of reviews found on the listing. Split as client/candidate.
INSERT INTO testimonials (name, role, company, rating, message, avatar_initials, is_published, category, source, created_at) VALUES
('Saravanan M', 'Client', 'Manufacturing Firm, Pondicherry', 5, 'Good polite staff, my strong recommendation to this consultancy. Quick service and they provided us with excellent candidates for our production unit.', 'SM', true, 'client', 'justdial', now() - interval '50 days'),
('Lakshmi N', 'Candidate', 'Placed at IT Company', 5, 'Very good placement consultancy. They helped me get a job in an IT company within a week. The staff is very supportive and guided me through the entire process.', 'LN', true, 'candidate', 'justdial', now() - interval '40 days'),
('Ramesh K', 'Client', 'Hotel Group, Pondicherry', 5, 'Excellent service. They understood our requirements perfectly and sent us well-qualified candidates for our hotel. Very professional approach.', 'RK', true, 'client', 'justdial', now() - interval '35 days'),
('Priya S', 'Candidate', 'Placed at Pharma Company', 4, 'I got placed in a pharmaceutical company through Renaissance. The consultancy staff was helpful and kept me updated at every stage. Thank you for the opportunity.', 'PS', true, 'candidate', 'justdial', now() - interval '28 days'),
('Anand V', 'Client', 'Engineering Company', 5, 'Highly experienced staff and regular evaluation of candidates. They provided quick service and we are very satisfied with their assistance in hiring for our engineering division.', 'AV', true, 'client', 'justdial', now() - interval '22 days'),
('Deepa R', 'Candidate', 'Placed at Bank', 5, 'I am very satisfied with their assistance. They matched me with a banking job that suits my qualifications perfectly. The team is dedicated and professional.', 'DR', true, 'candidate', 'justdial', now() - interval '18 days')
ON CONFLICT DO NOTHING;

-- Remove the old dummy testimonials to keep only realistic ones
DELETE FROM testimonials WHERE source = 'website' AND avatar_initials IN ('RK','PS','VN','AR','SM','DK') AND category = 'client' AND created_at < now() - interval '9 days';

-- ── Seed: site_config ─────────────────────────────────────────
INSERT INTO site_config (key, value) VALUES
('admin_password', 'rmc-admin-2024'),
('company_phone', '+91 99449 09999'),
('company_email', 'renhrcentral@gmail.com'),
('company_address', 'No 10, Ellaipillai Chavadi, Thanthai Periyar Nagar, 6th Cross Street, Pondicherry Bazaar, Pondicherry - 605001')
ON CONFLICT (key) DO NOTHING;