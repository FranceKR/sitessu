-- Seed data for France Khalil Blog
-- File: seed.sql
-- Description: Inserts initial articles from articles.json

-- Insert articles
INSERT INTO articles (slug, title, excerpt, content, thumbnail, category, author, published_at, read_time, published) VALUES
(
  'building-scalable-pipelines',
  'Building Scalable Data Pipelines',
  'Best practices for designing data infrastructure that grows with your business needs and handles millions of events efficiently.',
  '<h2>Introduction</h2><p>Data pipelines are the backbone of modern data infrastructure. In this guide, we''ll explore essential patterns.</p><h2>Core Principles</h2><p>The foundation rests on three pillars: <strong>reliability</strong>, <strong>maintainability</strong>, and <strong>performance</strong>.</p>',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=450&fit=crop',
  'Data Engineering',
  'France Khalil',
  '2024-12-11T10:00:00Z',
  '6 min',
  1
),
(
  'art-of-data-visualization',
  'The Art of Data Visualization',
  'Turning complex data into compelling stories through thoughtful design principles and effective visual communication.',
  '<h2>Why Visualization Matters</h2><p>Data visualization is about communicating insights effectively.</p><h2>Design Principles</h2><ul><li>Clarity over complexity</li><li>Appropriate chart types</li><li>Consistent colors</li></ul>',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop',
  'Design',
  'France Khalil',
  '2024-12-08T10:00:00Z',
  '4 min',
  1
),
(
  'modern-etl-practices',
  'Modern ETL Best Practices',
  'Lessons learned from building production data pipelines at scale with Apache Spark and Airflow.',
  '<h2>The Evolution of ETL</h2><p>Extract, Transform, Load has evolved significantly for modern needs.</p>',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop',
  'Technology',
  'France Khalil',
  '2024-12-05T10:00:00Z',
  '5 min',
  1
),
(
  'real-time-analytics',
  'Real-Time Analytics Architecture',
  'Building systems that process streaming data with sub-second latency using modern technology stack.',
  '<h2>Stream Processing</h2><p>Real-time analytics require careful architecture design.</p>',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=450&fit=crop',
  'Architecture',
  'France Khalil',
  '2024-12-02T10:00:00Z',
  '7 min',
  1
);

-- Verify insertion
SELECT COUNT(*) as total_articles FROM articles;
SELECT 'Seed data inserted successfully' as status;

