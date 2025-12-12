import React from 'react';

export default function Articles() {
  const articles = [
    {
      title: 'Building Scalable Data Pipelines',
      excerpt: 'Best practices for designing data infrastructure that grows with your business needs and handles millions of events efficiently.',
      date: 'Dec 11, 2024',
      readTime: '6 min',
      category: 'Data Engineering',
      featured: true
    },
    {
      title: 'The Art of Data Visualization',
      excerpt: 'Turning complex data into compelling stories through thoughtful design principles and effective visual communication.',
      date: 'Dec 8, 2024',
      readTime: '4 min',
      category: 'Design',
      featured: false
    },
    {
      title: 'Modern ETL Best Practices',
      excerpt: 'Lessons learned from building production data pipelines at scale with Apache Spark, Airflow, and cloud infrastructure.',
      date: 'Dec 5, 2024',
      readTime: '5 min',
      category: 'Technology',
      featured: false
    },
    {
      title: 'Designing for Data Teams',
      excerpt: 'How user experience principles apply to internal tools and data platforms used by engineering teams.',
      date: 'Dec 2, 2024',
      readTime: '3 min',
      category: 'Design',
      featured: false
    },
    {
      title: 'Real-Time Analytics Architecture',
      excerpt: 'Building systems that process and visualize streaming data with sub-second latency using modern stack.',
      date: 'Nov 28, 2024',
      readTime: '7 min',
      category: 'Architecture',
      featured: false
    },
    {
      title: 'Data Quality at Scale',
      excerpt: 'Implementing automated validation and monitoring frameworks that prevent incidents before they happen.',
      date: 'Nov 25, 2024',
      readTime: '5 min',
      category: 'Engineering',
      featured: false
    }
  ];

  const featuredArticle = articles.find(a => a.featured);
  const regularArticles = articles.filter(a => !a.featured);

  return (
    <section id="articles" className="py-20 px-4 bg-gray-50 border-t-4 border-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-xs uppercase tracking-widest font-bold mb-2">Opinion & Analysis</div>
          <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tight">Latest Articles</h2>
          <div className="w-32 h-1 bg-black mx-auto mt-4"></div>
        </div>
        
        {/* Featured Article */}
        <article className="border-4 border-black bg-white mb-12">
          <div className="grid md:grid-cols-2">
            <div className="p-12 border-b-4 md:border-b-0 md:border-r-4 border-black bg-yellow-50">
              <div className="inline-block bg-black text-white px-4 py-2 text-xs font-black uppercase mb-6">
                Featured Story
              </div>
              <h3 className="text-5xl font-black uppercase leading-tight mb-4">
                {featuredArticle.title}
              </h3>
              <div className="flex gap-4 text-xs uppercase font-bold mb-4">
                <span className="border-l-4 border-black pl-2">{featuredArticle.category}</span>
                <span>{featuredArticle.date}</span>
                <span>{featuredArticle.readTime} read</span>
              </div>
            </div>
            <div className="p-12">
              <p className="font-serif text-xl leading-relaxed mb-6">
                <span className="float-left text-7xl font-black mr-4 leading-none">B</span>
                {featuredArticle.excerpt}
              </p>
              <button className="inline-block text-sm uppercase font-black border-2 border-black px-6 py-3 hover:bg-black hover:text-white transition-colors">
                Read Full Article →
              </button>
            </div>
          </div>
        </article>

        {/* Article Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularArticles.map((article, i) => (
            <article key={i} className="border-4 border-black bg-white hover:shadow-xl transition-shadow cursor-pointer">
              {/* Header */}
              <div className="border-b-4 border-black p-4 bg-black text-white">
                <span className="text-xs font-black uppercase tracking-wider">
                  {article.category}
                </span>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-black uppercase leading-tight mb-4 hover:underline">
                  {article.title}
                </h3>
                <p className="font-serif text-sm leading-relaxed mb-4 text-gray-700">
                  {article.excerpt}
                </p>
                
                {/* Meta */}
                <div className="border-t-2 border-black pt-3 flex justify-between text-xs font-bold uppercase">
                  <span>{article.date}</span>
                  <span>{article.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        {/* View More */}
        <div className="text-center mt-12">
          <button className="inline-block text-sm uppercase font-black border-4 border-black px-8 py-4 bg-white hover:bg-black hover:text-white transition-colors">
            View Complete Archive →
          </button>
        </div>
      </div>
    </section>
  );
}