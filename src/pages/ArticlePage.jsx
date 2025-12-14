import React, { useState, useEffect } from 'react';
import { fetchArticleBySlug } from '../services/api';
import { sanitizeHTML } from '../utils/sanitize';

export default function ArticlePage({ slug }) {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        setLoading(true);
        const data = await fetchArticleBySlug(slug);
        setArticle(data.article);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) loadArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center py-20">
          <div className="text-6xl font-black uppercase mb-4 animate-pulse">Loading Article...</div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen pt-24 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto py-20">
          <div className="border-4 border-black bg-red-50 p-12 text-center">
            <div className="text-8xl mb-6">📰</div>
            <h1 className="text-4xl font-black uppercase mb-4">Article Not Found</h1>
            <p className="font-serif text-lg mb-8">{error || 'The article you\'re looking for doesn\'t exist.'}</p>
            <a href="/" className="inline-block border-4 border-black px-8 py-4 bg-white hover:bg-black hover:text-white transition-colors font-black uppercase">
              Back to Homepage →
            </a>
          </div>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-gray-50">
      <article className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="border-4 border-black bg-white mb-8">
          {/* Thumbnail */}
          <div className="border-b-4 border-black">
            <img 
              src={article.thumbnail} 
              alt={article.title}
              className="w-full h-96 object-cover"
            />
          </div>
          
          {/* Metadata */}
          <div className="p-8 border-b-4 border-black bg-yellow-50">
            <div className="flex gap-4 text-xs uppercase font-bold mb-4">
              <span className="border-l-4 border-black pl-2">{article.category || 'Technology'}</span>
              <span>{formattedDate}</span>
              <span>{article.readTime} read</span>
            </div>
            <h1 className="text-3xl md:text-6xl font-black uppercase leading-tight">
              {article.title}
            </h1>
          </div>
          
          {/* Author */}
          <div className="p-6 bg-black text-white flex items-center gap-4">
            <div className="w-12 h-12 border-2 border-white bg-gray-800 flex items-center justify-center text-2xl">
              👨‍💻
            </div>
            <div>
              <div className="font-black uppercase text-sm">{article.author || 'France Khalil'}</div>
              <div className="text-xs text-gray-400">Data Engineer</div>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div className="border-4 border-black bg-white p-8 md:p-12">
          <div 
            className="prose prose-lg max-w-none
              prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight
              prose-h1:text-4xl prose-h1:border-b-4 prose-h1:border-black prose-h1:pb-4
              prose-h2:text-3xl prose-h2:border-b-2 prose-h2:border-black prose-h2:pb-3
              prose-p:font-serif prose-p:leading-relaxed prose-p:text-lg
              prose-a:text-black prose-a:font-bold prose-a:underline
              prose-strong:font-black
              prose-blockquote:border-l-4 prose-blockquote:border-black prose-blockquote:pl-6 prose-blockquote:bg-gray-50 prose-blockquote:py-4
              prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:border-2 prose-code:border-black prose-code:font-bold
              prose-pre:bg-black prose-pre:text-white prose-pre:border-4 prose-pre:border-black
              prose-img:border-4 prose-img:border-black
              prose-ul:list-disc prose-ol:list-decimal
              prose-li:font-serif prose-li:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: sanitizeHTML(article.content) }}
          />
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <a 
            href="/"
            className="inline-block border-4 border-black px-8 py-4 bg-white hover:bg-black hover:text-white transition-colors font-black uppercase"
          >
            ← Back to Homepage
          </a>
        </div>
      </article>
    </div>
  );
}