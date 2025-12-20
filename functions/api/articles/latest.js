/**
 * Cloudflare Pages Function: Get Latest Articles
 * Security: Rate limiting, input validation, SQL injection prevention
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
    // Check if D1 binding exists
    if (!env.DB) {
      console.error('D1 database binding not found');
      return new Response(
        JSON.stringify({ 
          error: 'Database not configured',
          details: 'D1 binding "DB" not found. Check wrangler.toml configuration.'
        }),
        { status: 500, headers }
      );
    }

    // Rate limiting
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    if (!checkRateLimit(ip)) {
      return new Response(
        JSON.stringify({ error: 'Too many requests' }),
        { status: 429, headers }
      );
    }

    // Parse query parameters
    const url = new URL(request.url);
    let limit = parseInt(url.searchParams.get('limit')) || 3;
    
    // Validate limit (prevent abuse)
    if (limit < 1) limit = 3;
    if (limit > 100) limit = 100;

    console.log(`Fetching ${limit} articles from D1...`);

    // Query D1 database with parameterized query
    const { results } = await env.DB.prepare(
      'SELECT id, slug, title, excerpt, thumbnail, category, author, published_at, read_time FROM articles WHERE published = 1 ORDER BY published_at DESC LIMIT ?'
    ).bind(limit).all();

    console.log(`Found ${results?.length || 0} articles`);

    // Format response
    const articles = (results || []).map(article => ({
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
    console.error('Error stack:', error.stack);
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error.message,
        hint: 'Check if database is initialized with: npm run db:init && npm run db:seed'
      }),
      { status: 500, headers }
    );
  }
}