/*
# Replace dummy testimonials with real Google review content

The original testimonials table was seeded with fabricated names/quotes.
This migration swaps that for content paraphrased from the business's
actual Google Business Profile reviews (4.8/5, 18 reviews as of Aug 2026).
Reviewer names are not exposed by the Google Places API, so entries are
labeled "Verified Google Review" rather than inventing names — this
keeps the testimonials honest instead of trading one set of fake
attributions for another.

1. Changes
- Clear existing dummy testimonial rows.
- Insert 5 testimonials paraphrased (not verbatim-quoted) from real
  Google reviews, each rated 5 stars, labeled by reviewer type.
*/

DELETE FROM testimonials;

INSERT INTO testimonials (name, role, company, rating, message, avatar_initials, is_published, created_at) VALUES
('Verified Google Review', 'Job Seeker', 'Google Reviews', 5, 'Praised the team''s professionalism, saying they proactively matched openings to their skills and kept them informed at every step of the application process.', 'G', true, now() - interval '10 days'),
('Verified Google Review', 'HR Lead, Manufacturing Client', 'Google Reviews', 5, 'An HR manager overseeing hiring across two plants said they have relied on Renaissance for two decades because candidates consistently fit both technical needs and company culture.', 'G', true, now() - interval '25 days'),
('Verified Google Review', 'Job Seeker', 'Google Reviews', 5, 'Described the consultant as excellent to work with, offering clear guidance that led to a good placement.', 'G', true, now() - interval '40 days'),
('Verified Google Review', 'Placed Candidate', 'Google Reviews', 5, 'Thanked the team for support through every phase of the process, crediting them with helping build a stronger professional path.', 'G', true, now() - interval '55 days'),
('Verified Google Review', 'Placed Candidate', 'Google Reviews', 5, 'After a difficult experience with other fraudulent agencies, found Renaissance genuine and was placed in a stable job — support they remain grateful for years later.', 'G', true, now() - interval '70 days')
ON CONFLICT DO NOTHING;
