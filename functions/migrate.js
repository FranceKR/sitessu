// /functions/migrate.js
export async function onRequestGet({ env }) {
  const { DB } = env

  // Create table if not exists
  await DB.exec(`
    CREATE TABLE IF NOT EXISTS articles (
      slug TEXT PRIMARY KEY,
      title TEXT,
      excerpt TEXT,
      content TEXT,
      thumbnail TEXT,
      category TEXT,
      author TEXT,
      published_at TEXT,
      read_time TEXT,
      published INTEGER
    )
  `)

  // Insert sample articles (idempotent)
  await DB.exec(`
    INSERT INTO articles (slug, title, excerpt, content, thumbnail, category, author, published_at, read_time, published)
    VALUES
      ('building-scalable-pipelines','Building Scalable Data Pipelines','Best practices ...','<h2>Intro</h2>','https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=450&fit=crop','Data Engineering','France Khalil','2024-12-11T10:00:00Z','6 min',1)
    ON CONFLICT(slug) DO NOTHING
  `)

  return new Response("Migration complete", { status: 200 })
}
