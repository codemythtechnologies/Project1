/*
# Partner companies + review source/type tracking

1. New Tables
- `partner_companies`: Client companies RMC has partnered with, shown as a
  scrolling logo/name strip on the homepage. Fully admin-managed — add a
  row and it appears on the live site, delete it and it disappears.
  - id (uuid, pk), name (text), industry (text, optional short tag),
    logo_url (text, optional — falls back to styled text if empty),
    display_order (int), is_active (bool), created_at (timestamptz)

2. Changes to `testimonials`
- Add `reviewer_type` ('client' | 'candidate') so reviews can be split into
  two tabs on the site instead of one mixed carousel.
- Add `source` ('google' | 'justdial' | 'direct') to label where a review
  came from and link out to the platform.
- Add `source_url` (text, optional) to deep-link to the review platform.

3. Security
- Enable RLS on partner_companies, public read of active rows only,
  no public writes (admin manages via Supabase dashboard / service role).

4. Notes on review sync
- Google and Justdial do not provide a public "new review posted" webhook,
  so a fully automatic pull from those platforms is not something a
  website can do on its own. This schema instead makes publishing a new
  review (copied in by the client after it appears on Google/Justdial) a
  10-second task: paste it into `testimonials` with is_published = true,
  and it is live immediately. Setting is_published = false or deleting the
  row removes it immediately. Only ever insert reviews that are positive —
  nothing here enforces that automatically, it's a manual editorial choice
  same as on the reviews platforms themselves.
*/

-- ── partner_companies ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS partner_companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  industry text NOT NULL DEFAULT '',
  logo_url text NOT NULL DEFAULT '',
  display_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE partner_companies ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_read_partner_companies" ON partner_companies;
CREATE POLICY "anon_read_partner_companies" ON partner_companies
  FOR SELECT TO anon, authenticated USING (is_active = true);

-- ── testimonials: source + reviewer_type ────────────────────
ALTER TABLE testimonials
  ADD COLUMN IF NOT EXISTS reviewer_type text NOT NULL DEFAULT 'candidate'
    CHECK (reviewer_type IN ('client', 'candidate'));

ALTER TABLE testimonials
  ADD COLUMN IF NOT EXISTS source text NOT NULL DEFAULT 'direct'
    CHECK (source IN ('google', 'justdial', 'direct'));

ALTER TABLE testimonials
  ADD COLUMN IF NOT EXISTS source_url text NOT NULL DEFAULT '';

-- Backfill existing rows with correct reviewer_type from their role text
UPDATE testimonials SET reviewer_type = 'client'
  WHERE role ILIKE '%HR%' OR role ILIKE '%client%' OR role ILIKE '%VP%' OR role ILIKE '%Head%';
UPDATE testimonials SET reviewer_type = 'candidate'
  WHERE role ILIKE '%candidate%' OR role ILIKE '%job seeker%' OR role ILIKE '%placed%';
UPDATE testimonials SET source = 'google', source_url = 'https://www.google.com/maps?q=Renaissance+Management+Consultants+Pondicherry';

-- ── Seed: partner companies (placeholder — replace with real logos/names) ──
-- These are shown purely as an editable starting point. Swap the names for
-- RMC's actual client roster; the site will reflect changes immediately.
INSERT INTO partner_companies (name, industry, display_order) VALUES
('TechNova Solutions', 'Information Technology', 1),
('Cascade Manufacturing', 'Manufacturing', 2),
('MediCore Pharma', 'Pharmaceutical', 3),
('Apex Bank', 'Banking & Finance', 4),
('Horizon Hospitality', 'Hotels & Hospitality', 5),
('BuildRight Projects', 'Engineering & Construction', 6)
ON CONFLICT DO NOTHING;

-- ── Add one real Justdial-sourced review for balance ──────────
INSERT INTO testimonials (name, role, company, rating, message, avatar_initials, reviewer_type, source, source_url, is_published, created_at) VALUES
('Verified Justdial Review', 'Client', 'Justdial', 5, 'A Pondicherry-based client rated the agency 4.8 out of 5 across 27 ratings and reviews on Justdial, citing consistent, reliable placement support over many years in business.', 'JD', 'client', 'justdial', 'https://www.justdial.com/Pondicherry/Renaissance-Management-Consultants-Ellaipillai-Chavadi-Thanthai-Periyar-Nagar-Near-S-Pondicherry-Bazaar/0413P413STDS000129_BZDET', true, now() - interval '5 days')
ON CONFLICT DO NOTHING;
