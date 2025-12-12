import React from 'react';

export default function ArticleCard({ article }) {
  const { slug, title, excerpt, thumbnail, publishedAt, readTime, category } = article;
  
  const formattedDate = new Date(publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const handleClick = () => {
    // Update URL and trigger popstate event for routing
    window.history.pushState({}, '', `/article/${slug}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
    
    // Scroll to top
    window.scrollTo(0, 0);
  };

  return (
    <article 
      onClick={handleClick}
      className="border-4 border-black bg-white hover:shadow-xl transition-all cursor-pointer h-full flex flex-col"
    >
      {/* Thumbnail */}
      <div className="border-b-4 border-black bg-gray-100 aspect-video overflow-hidden">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      
      {/* Category Badge */}
      <div className="border-b-4 border-black p-4 bg-black text-white">
        <span className="text-xs font-black uppercase tracking-wider">
          {category || 'Technology'}
        </span>
      </div>
      
      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-2xl font-black uppercase leading-tight mb-4 hover:underline line-clamp-3">
          {title}
        </h3>
        
        <p className="font-serif text-sm leading-relaxed mb-4 text-gray-700 flex-1 line-clamp-3">
          {excerpt}
        </p>
        
        {/* Meta */}
        <div className="border-t-2 border-black pt-3 flex justify-between text-xs font-bold uppercase">
          <span>{formattedDate}</span>
          <span>{readTime} read</span>
        </div>
      </div>
    </article>
  );
}