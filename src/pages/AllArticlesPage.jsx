import React, { useState, useEffect } from 'react';
import { fetchAllArticles } from '../services/api';
import ArticleCard from '../components/ArticleCard';

export default function AllArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        const data = await fetchAllArticles();
        setArticles(data.articles || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center py-20">
          <div className="text-6xl font-black uppercase mb-4 animate-pulse">Loading Articles...</div>
          <div className="w-32 h-1 bg-black mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto py-20">
          <div className="border-4 border-black bg-red-50 p-12 text-center">
            <div className="text-8xl mb-6">📰</div>
            <h1 className="text-4xl font-black uppercase mb-4">Error Loading Articles</h1>
            <p className="font-serif text-lg mb-8">{error}</p>
            <a href="/" className="inline-block border-4 border-black px-8 py-4 bg-white hover:bg-black hover:text-white transition-colors font-black uppercase">
              Back to Homepage →
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Get unique categories
  const categories = ['all', ...new Set(articles.map(a => a.category))];

  // Filter articles
  const filteredArticles = filter === 'all' 
    ? articles 
    : articles.filter(a => a.category === filter);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-xs uppercase tracking-widest font-bold mb-2">Complete Archive</div>
          <h1 className="text-6xl md:text-7xl font-black uppercase tracking-tight mb-4">All Articles</h1>
          <div className="w-32 h-1 bg-black mx-auto mb-6"></div>
          <p className="font-serif text-xl text-gray-700 max-w-2xl mx-auto">
            Explore our complete collection of articles covering data engineering, design, and technology.
          </p>
        </div>

        {/* Stats Banner */}
        <div className="border-4 border-black bg-yellow-50 p-8 mb-12">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-black mb-2">{articles.length}</div>
              <div className="text-sm uppercase font-bold tracking-wide">Total Articles</div>
            </div>
            <div>
              <div className="text-5xl font-black mb-2">{categories.length - 1}</div>
              <div className="text-sm uppercase font-bold tracking-wide">Categories</div>
            </div>
            <div>
              <div className="text-5xl font-black mb-2">
                {articles.reduce((sum, a) => sum + parseInt(a.readTime), 0)}
              </div>
              <div className="text-sm uppercase font-bold tracking-wide">Minutes of Content</div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="border-4 border-black bg-white mb-12">
          <div className="border-b-4 border-black p-6 bg-black text-white">
            <h2 className="text-2xl font-black uppercase">Filter by Category</h2>
          </div>
          <div className="p-6">
            <div className="flex flex-wrap gap-3">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-3 font-black uppercase text-sm transition-colors ${
                    filter === cat
                      ? 'bg-black text-white border-4 border-black'
                      : 'bg-white border-4 border-black hover:bg-gray-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Articles Count */}
        <div className="mb-6">
          <p className="font-black uppercase text-sm">
            Showing {filteredArticles.length} {filteredArticles.length === 1 ? 'Article' : 'Articles'}
            {filter !== 'all' && ` in ${filter}`}
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>

        {/* Empty State */}
        {filteredArticles.length === 0 && (
          <div className="border-4 border-black bg-white p-12 text-center">
            <div className="text-8xl mb-6">📭</div>
            <h3 className="text-3xl font-black uppercase mb-4">No Articles Found</h3>
            <p className="font-serif text-lg mb-6">No articles in this category yet.</p>
            <button
              onClick={() => setFilter('all')}
              className="inline-block border-4 border-black px-8 py-4 bg-white hover:bg-black hover:text-white transition-colors font-black uppercase"
            >
              View All Articles
            </button>
          </div>
        )}

        {/* Back to Home */}
        <div className="mt-12 text-center">
          <a 
            href="/"
            className="inline-block border-4 border-black px-8 py-4 bg-white hover:bg-black hover:text-white transition-colors font-black uppercase"
          >
            ← Back to Homepage
          </a>
        </div>
      </div>
    </div>
  );
}