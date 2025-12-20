/**
 * Secure API Service
 * Handles all API requests with proper error handling and validation
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

/**
 * Delay helper for retries
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Safe fetch wrapper with timeout and retries
 */
async function safeFetch(url, options = {}, retries = MAX_RETRIES) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    clearTimeout(timeout);

    // Check if response is HTML (error page) instead of JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('text/html')) {
      throw new Error('API endpoint returned HTML instead of JSON. Is the server running?');
    }

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { error: `HTTP ${response.status}` };
      }
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeout);

    // Retry on network errors (but not on HTML responses)
    if (retries > 0 && error.name !== 'AbortError' && !error.message.includes('HTML')) {
      await delay(RETRY_DELAY);
      return safeFetch(url, options, retries - 1);
    }

    throw error;
  }
}

/**
 * Input validation helper
 */
function validateInput(value, type) {
  switch (type) {
    case 'slug':
      return /^[a-z0-9-]+$/.test(value);
    case 'number':
      return !isNaN(value) && value > 0 && value <= 100;
    default:
      return true;
  }
}

/**
 * Fetch latest published articles
 * @param {number} limit - Number of articles (max 100)
 */
export const fetchLatestArticles = async (limit = 3) => {
  try {
    // Validate input
    if (!validateInput(limit, 'number')) {
      throw new Error('Invalid limit parameter');
    }

    const data = await safeFetch(`${API_BASE}/articles/latest?limit=${limit}`);
    return data;
  } catch (error) {
    console.error('Error fetching latest articles:', error);
    
    // Provide more helpful error message
    if (error.message.includes('HTML')) {
      throw new Error('API server not running. Please start Wrangler with: npm run dev:wrangler');
    }
    
    throw new Error('Failed to fetch articles. Please try again later.');
  }
};

/**
 * Fetch all published articles
 */
export const fetchAllArticles = async () => {
  try {
    const data = await safeFetch(`${API_BASE}/articles`);
    return data;
  } catch (error) {
    console.error('Error fetching all articles:', error);
    
    if (error.message.includes('HTML')) {
      throw new Error('API server not running. Please start Wrangler with: npm run dev:wrangler');
    }
    
    throw new Error('Failed to fetch articles. Please try again later.');
  }
};

/**
 * Fetch single article by slug
 * @param {string} slug - Article slug
 */
export const fetchArticleBySlug = async (slug) => {
  try {
    // Validate slug format (prevent injection)
    if (!validateInput(slug, 'slug')) {
      throw new Error('Invalid article slug');
    }

    const data = await safeFetch(`${API_BASE}/articles/${encodeURIComponent(slug)}`);
    return data;
  } catch (error) {
    console.error(`Error fetching article ${slug}:`, error);
    
    if (error.message.includes('HTML')) {
      throw new Error('API server not running. Please start Wrangler with: npm run dev:wrangler');
    }
    
    throw new Error('Article not found or failed to load.');
  }
};

/**
 * Save new article (admin only - requires authentication in production)
 * @param {Object} article - Article object
 */
export const saveArticle = async (article) => {
  try {
    // Validate required fields
    if (!article.title || !article.content || !article.slug) {
      throw new Error('Missing required fields');
    }

    // Validate slug format
    if (!validateInput(article.slug, 'slug')) {
      throw new Error('Invalid slug format. Use only lowercase letters, numbers, and hyphens.');
    }

    const data = await safeFetch(`${API_BASE}/articles`, {
      method: 'POST',
      body: JSON.stringify(article),
    });

    return data;
  } catch (error) {
    console.error('Error saving article:', error);
    throw new Error('Failed to save article. Please try again.');
  }
};