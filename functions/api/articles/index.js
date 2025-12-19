/**
 * Cloudflare Pages Function: Get All Articles
 * Security: Rate limiting, caching
 */

const rateLimitMap = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const userRequests = rateLimitMap.get(ip) || [];
  const validRequests = userRequests.filter(time => now - time < 60000);
  
  if (validRequests.length >= 100) return false;
  
  validRequests.push(now);
  rateLimitMap.set(ip, validRequests);
  return true;
}

export async function onRequestGet(context) {
  const { request, env } = context;
  
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'public, max-age=300',
  };

  try {
    // Rate limiting
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    if (!checkRateLimit(ip)) {
      return new Response(
        JSON.stringify({ error: 'Too many requests' }),
        { status: 429, headers }
      );
    }

    // Query all published articles
    const { results } = await env.DB.prepare(
      'SELECT id, slug, title, excerpt, thumbnail, category, author, published_at, read_time FROM articles WHERE published = 1 ORDER BY published_at DESC'
    ).all();

    const articles = results.map(article => ({
      id: article.id,
      slug: article.slug,
      title: article.title,
      excerpt: article.excerpt,
      thumbnail: article.thumbnail,
      category: article.category,
      author: article.author,
      publishedAt: article.published_at,
      readTime: article.read_time,
    }));

    return new Response(
      JSON.stringify({ articles }),
      { status: 200, headers }
    );

  } catch (error) {
    console.error('Database error:', error);
    
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers }
    );
  }
}