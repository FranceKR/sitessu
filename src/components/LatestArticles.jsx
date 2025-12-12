import React, { useState, useEffect } from 'react';
import { fetchLatestArticles } from '../services/api';
import ArticleCard from './ArticleCard';

export default function LatestArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        const data = await fetchLatestArticles(3);
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
      <section className="py-20 px-4 bg-gray-50 border-t-4 border-black">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-6xl font-black uppercase mb-4">Loading...</div>
          <div className="animate-pulse bg-black h-1 w-32 mx-auto"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 px-4 bg-gray-50 border-t-4 border-black">
        <div className="max-w-6xl mx-auto">
          <div className="border-4 border-black bg-red-50 p-8 text-center">
            <h3 className="text-3xl font-black uppercase mb-4">Error Loading Articles</h3>
            <p className="font-serif">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="articles" className="py-20 px-4 bg-gray-50 border-t-4 border-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-xs uppercase tracking-widest font-bold mb-2">Latest Edition</div>
          <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tight">Recent Articles</h2>
          <div className="w-32 h-1 bg-black mx-auto mt-4"></div>
        </div>
        
        {/* Article Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
        
        {/* View All Button */}
        <div className="text-center">
          <a
            href="/articles"
            className="inline-block text-sm uppercase font-black border-4 border-black px-8 py-4 bg-white hover:bg-black hover:text-white transition-colors"
          >
            View All Articles →
          </a>
        </div>
      </div>
    </section>
  );
}