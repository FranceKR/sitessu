import articlesData from '../data/articles.json';

/**
 * Simulate API delay for realistic UX
 * @param {number} ms - Milliseconds to wait
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetch latest published articles
 * @param {number} limit - Number of articles to fetch
 * @returns {Promise<Object>} - Object with articles array
 */
export const fetchLatestArticles = async (limit = 3) => {
  try {
    await delay(300); // Simulate network delay
    
    const articles = articlesData.articles
      .filter(a => a.published)
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
      .slice(0, limit)
      .map(({ content, ...rest }) => rest); // Exclude content for performance
    
    return { articles };
  } catch (error) {
    console.error('Error fetching latest articles:', error);
    throw new Error('Failed to fetch articles');
  }
};

/**
 * Fetch all published articles
 * @returns {Promise<Object>} - Object with articles array
 */
export const fetchAllArticles = async () => {
  try {
    await delay(300);
    
    const articles = articlesData.articles
      .filter(a => a.published)
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
      .map(({ content, ...rest }) => rest);
    
    return { articles };
  } catch (error) {
    console.error('Error fetching all articles:', error);
    throw new Error('Failed to fetch articles');
  }
};

/**
 * Fetch single article by slug
 * @param {string} slug - Article slug
 * @returns {Promise<Object>} - Object with article
 */
export const fetchArticleBySlug = async (slug) => {
  try {
    await delay(300);
    
    const article = articlesData.articles.find(
      a => a.slug === slug && a.published
    );
    
    if (!article) {
      throw new Error('Article not found');
    }
    
    return { article };
  } catch (error) {
    console.error(`Error fetching article ${slug}:`, error);
    throw error;
  }
};

/**
 * Save new article (for admin panel)
 * Note: This updates the in-memory data only. 
 * For persistence, you'll need to manually update articles.json
 * @param {Object} article - Article object
 * @returns {Promise<Object>} - Created article
 */
export const saveArticle = async (article) => {
  try {
    await delay(500);
    
    // Generate ID
    const maxId = Math.max(...articlesData.articles.map(a => parseInt(a.id)), 0);
    const newArticle = {
      ...article,
      id: String(maxId + 1),
      publishedAt: article.publishedAt || new Date().toISOString()
    };
    
    // Add to in-memory data
    articlesData.articles.unshift(newArticle);
    
    // Log the new article for manual copying
    console.log('📝 New Article Created! Copy this to articles.json:');
    console.log(JSON.stringify(newArticle, null, 2));
    
    return { article: newArticle };
  } catch (error) {
    console.error('Error saving article:', error);
    throw new Error('Failed to save article');
  }
};

