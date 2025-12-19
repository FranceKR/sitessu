/**
 * Cloudflare Pages Function: Get Article by Slug
 * Security: Input validation, SQL injection prevention, rate limiting
 */

// Rate limiting map
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

function sanitizeSlug(slug) {
  // Only allow lowercase letters, numbers, and hyphens
  return slug.replace(/[^a-z0-9-]/g, '');
}

export async function onRequestGet(context) {
  const { request, env, params } = context;
  
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

    // Validate and sanitize slug
    const slug = sanitizeSlug(params.slug);
    if (!slug || slug.length > 100) {
      return new Response(
        JSON.stringify({ error: 'Invalid article slug' }),
        { status: 400, headers }
      );
    }

    // Query D1 database with parameterized query (prevents SQL injection)
    const { results } = await env.DB.prepare(
      'SELECT * FROM articles WHERE slug = ? AND published = 1 LIMIT 1'
    ).bind(slug).all();

    if (!results || results.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Article not found' }),
        { status: 404, headers }
      );
    }

    const article = results[0];

    // Format response
    return new Response(
      JSON.stringify({
        article: {
          id: article.id,
          slug: article.slug,
          title: article.title,
          excerpt: article.excerpt,
          content: article.content,
          thumbnail: article.thumbnail,
          category: article.category,
          author: article.author,
          publishedAt: article.published_at,
          readTime: article.read_time,
        }
      }),
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