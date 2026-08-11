/*
# Create tables for Renaissance Management Consultants website

1. New Tables
- `job_openings`: Active job listings the consultancy is recruiting for.
  - id (uuid, pk), title (text), department (text), location (text),
    type (text: Full-time/Part-time/Contract), experience (text),
    description (text), is_active (bool), posted_date (timestamptz)
- `testimonials`: Client and candidate reviews (dummy seed data).
  - id (uuid, pk), name (text), role (text), company (text),
    rating (int 1-5), message (text), avatar_initials (text),
    is_published (bool), created_at (timestamptz)
- `contact_submissions`: Inquiries submitted via the website contact form.
  - id (uuid, pk), name (text), email (text), phone (text),
    company (text), message (text), submitted_at (timestamptz)

2. Security
- Enable RLS on all tables.
- job_openings: public read (anon + authenticated), no public writes.
- testimonials: public read, no public writes.
- contact_submissions: public insert (anyone can submit a form),
  no public read/update/delete (privacy — only admin via service role).

3. Seed Data
- 6 sample job openings across IT, Engineering, Pharma, Banking, Manufacturing.
- 6 dummy testimonials from clients and placed candidates.
*/

-- ── job_openings ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS job_openings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  department text NOT NULL,
  location text NOT NULL,
  type text NOT NULL DEFAULT 'Full-time',
  experience text NOT NULL,
  description text NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  posted_date timestamptz DEFAULT now()
);

ALTER TABLE job_openings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_read_job_openings" ON job_openings;
CREATE POLICY "anon_read_job_openings" ON job_openings
  FOR SELECT TO anon, authenticated USING (is_active = true);

-- ── testimonials ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  company text NOT NULL,
  rating integer NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  message text NOT NULL,
  avatar_initials text NOT NULL DEFAULT '',
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_read_testimonials" ON testimonials;
CREATE POLICY "anon_read_testimonials" ON testimonials
  FOR SELECT TO anon, authenticated USING (is_published = true);

-- ── contact_submissions ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL DEFAULT '',
  company text NOT NULL DEFAULT '',
  message text NOT NULL,
  submitted_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_contact" ON contact_submissions;
CREATE POLICY "anon_insert_contact" ON contact_submissions
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- ── Seed: job openings ────────────────────────────────────────
INSERT INTO job_openings (title, department, location, type, experience, description, posted_date) VALUES
('Senior Software Engineer', 'IT', 'Pondicherry, India', 'Full-time', '5+ Years', 'Design and develop scalable web applications using modern frameworks. Lead a team of developers and drive architectural decisions.', now() - interval '2 days'),
('HR Manager', 'Human Resources', 'Chennai, India', 'Full-time', '7+ Years', 'Oversee end-to-end HR operations including recruitment, employee engagement, performance management, and policy formulation.', now() - interval '5 days'),
('Mechanical Design Engineer', 'Engineering', 'Coimbatore, India', 'Full-time', '4+ Years', 'Design and model mechanical components using AutoCAD/SolidWorks. Collaborate with manufacturing teams for product development.', now() - interval '8 days'),
('Pharma Production Supervisor', 'Pharmaceutical', 'Pondicherry, India', 'Full-time', '3+ Years', 'Supervise pharmaceutical production lines ensuring GMP compliance. Manage shift operations and maintain quality standards.', now() - interval '1 day'),
('Bank Branch Manager', 'Banking', 'Bangalore, India', 'Full-time', '8+ Years', 'Lead a bank branch with focus on business growth, customer service excellence, and regulatory compliance.', now() - interval '12 days'),
('Hotel General Manager', 'Hospitality', 'Mahabalipuram, India', 'Full-time', '10+ Years', 'Oversee all hotel operations including guest services, F&B, housekeeping, and revenue management for a luxury property.', now() - interval '3 days')
ON CONFLICT DO NOTHING;

-- ── Seed: testimonials ────────────────────────────────────────
INSERT INTO testimonials (name, role, company, rating, message, avatar_initials, is_published, created_at) VALUES
('Rajesh Kumar', 'HR Director', 'TechNova Solutions', 5, 'Renaissance Management Consultants transformed our hiring process. Within weeks, they filled three critical engineering positions with exceptional candidates. Their screening process is thorough and their understanding of our requirements is remarkable.', 'RK', true, now() - interval '30 days'),
('Priya Sharma', 'Placed Candidate', 'Senior Analyst at Apex Bank', 5, 'I was looking for the right opportunity for months. RMC matched me with a role that perfectly aligned with my skills and career goals. Their team guided me through every step of the interview process. Truly grateful for their support.', 'PS', true, now() - interval '20 days'),
('Vikram Nair', 'VP Operations', 'Cascade Manufacturing', 5, 'We have been partnering with RMC for over five years now. Their consistency in delivering quality candidates is unmatched. The free replacement policy gives us complete peace of mind. Highly recommended for any manufacturing setup.', 'VN', true, now() - interval '45 days'),
('Ananya Reddy', 'Talent Acquisition Head', 'MediCore Pharma', 5, 'Finding specialized pharmaceutical talent is challenging, but RMC makes it look easy. Their industry knowledge and candidate network in the pharma sector is impressive. They have become our go-to recruitment partner.', 'AR', true, now() - interval '15 days'),
('Suresh Menon', 'Placed Candidate', 'Project Manager at BuildRight', 5, 'The team at Renaissance didn''t just find me a job — they found me a career. They understood my aspirations and matched me with a company where I could truly grow. The professionalism and personal attention were outstanding.', 'SM', true, now() - interval '10 days'),
('Deepa Krishnan', 'CEO', 'Horizon Hospitality', 5, 'As a growing hotel chain, we needed a recruitment partner who understood hospitality. RMC delivered quality candidates for every role — from front desk to general manager. Their 24 years of experience truly shows in their service.', 'DK', true, now() - interval '60 days')
ON CONFLICT DO NOTHING;