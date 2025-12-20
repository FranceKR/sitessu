-- Seed data for France Khalil Blog
-- File: seed.sql
-- Description: Inserts 4 placeholder sample articles based on schema.sql

-- Insert placeholder sample articles
INSERT OR IGNORE INTO articles (
  slug, title, excerpt, content, thumbnail, category,
  author, published_at, read_time, published, created_at, updated_at
) VALUES
(
  'sample-article-1',
  'Sample Article Title One',
  'This is a sample excerpt for the first placeholder article. It provides a brief overview of what the article is about.',
  '<h2>Introduction</h2><p>This is placeholder content for sample article one. Replace this with your actual article content.</p><h2>Main Content</h2><p>Add your main article content here. This is just a placeholder to demonstrate the structure.</p><h2>Conclusion</h2><p>Wrap up your article with a conclusion paragraph.</p>',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=450&fit=crop',
  'Data Engineering',
  'France Khalil',
  '2024-12-20T10:00:00Z',
  '5 min',
  1,
  '2024-12-20T10:00:00Z',
  '2024-12-20T10:00:00Z'
),
(
  'sample-article-2',
  'Sample Article Title Two',
  'This is a sample excerpt for the second placeholder article. It gives readers a preview of the article content.',
  '<h2>Getting Started</h2><p>This is placeholder content for sample article two. Replace this with your actual article content.</p><h2>Key Points</h2><ul><li>Point one</li><li>Point two</li><li>Point three</li></ul><h2>Summary</h2><p>Summarize your key takeaways here.</p>',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop',
  'Technology',
  'France Khalil',
  '2024-12-19T10:00:00Z',
  '4 min',
  1,
  '2024-12-19T10:00:00Z',
  '2024-12-19T10:00:00Z'
),
(
  'sample-article-3',
  'Sample Article Title Three',
  'This is a sample excerpt for the third placeholder article. It highlights the main topic and key insights.',
  '<h2>Overview</h2><p>This is placeholder content for sample article three. Replace this with your actual article content.</p><h2>Deep Dive</h2><p>Provide detailed information and explanations in this section.</p><h2>Best Practices</h2><p>Share your recommendations and best practices here.</p>',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop',
  'Architecture',
  'France Khalil',
  '2024-12-18T10:00:00Z',
  '6 min',
  1,
  '2024-12-18T10:00:00Z',
  '2024-12-18T10:00:00Z'
),
(
  'sample-article-4',
  'Sample Article Title Four',
  'This is a sample excerpt for the fourth placeholder article. It introduces the topic and sets expectations.',
  '<h2>Introduction</h2><p>This is placeholder content for sample article four. Replace this with your actual article content.</p><h2>Main Discussion</h2><p>Elaborate on your main points and provide examples.</p><h2>Next Steps</h2><p>Guide readers on what to do next or how to apply what they learned.</p>',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=450&fit=crop',
  'Design',
  'France Khalil',
  '2024-12-17T10:00:00Z',
  '7 min',
  1,
  '2024-12-17T10:00:00Z',
  '2024-12-17T10:00:00Z'
)
ON CONFLICT(slug) DO UPDATE SET
  title        = excluded.title,
  excerpt      = excluded.excerpt,
  content      = excluded.content,
  thumbnail    = excluded.thumbnail,
  category     = excluded.category,
  author       = excluded.author,
  published_at = excluded.published_at,
  read_time    = excluded.read_time,
  published    = excluded.published,
  updated_at   = excluded.updated_at;


-- Verify insertion
SELECT COUNT(*) as total_articles FROM articles;
SELECT 'Seed data inserted successfully' as status;

