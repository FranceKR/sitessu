import React from 'react';
import { ExternalLink } from 'lucide-react';

export default function Projects() {
  const projects = [
    {
      title: 'Real-Time Data Pipeline',
      subtitle: 'Enterprise-Scale Infrastructure',
      description: 'Revolutionary ETL pipeline architecture processing over 10 million events daily using Apache Spark and Kafka. Implemented distributed computing solutions ensuring 99.9% uptime and real-time data availability.',
      tech: ['Python', 'Spark', 'Kafka', 'AWS'],
      impact: '10M+ daily events',
      category: 'Infrastructure'
    },
    {
      title: 'Analytics Dashboard',
      subtitle: 'Data Visualization Platform',
      description: 'Comprehensive analytics platform featuring real-time visualizations and interactive dashboards. Transformed complex datasets into actionable insights through thoughtful design and robust engineering.',
      tech: ['React', 'TypeScript', 'D3.js', 'FastAPI'],
      impact: '50+ daily users',
      category: 'Application'
    },
    {
      title: 'Data Quality Framework',
      subtitle: 'Automated Monitoring System',
      description: 'Pioneering automated data quality monitoring system implementing advanced validation rules and anomaly detection. Successfully reduced data incidents by 80% through proactive monitoring.',
      tech: ['Python', 'dbt', 'Airflow', 'PostgreSQL'],
      impact: '80% fewer incidents',
      category: 'Framework'
    }
  ];

  return (
    <section id="projects" className="py-20 px-4 bg-white border-t-4 border-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-xs uppercase tracking-widest font-bold mb-2">Portfolio</div>
          <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tight">Featured Projects</h2>
          <div className="w-32 h-1 bg-black mx-auto mt-4"></div>
        </div>
        
        <div className="space-y-8">
          {projects.map((project, i) => (
            <article key={i} className="border-4 border-black bg-gray-50 hover:shadow-2xl transition-shadow">
              <div className="grid md:grid-cols-3">
                {/* Left - Category & Impact */}
                <div className="border-r-0 md:border-r-4 border-black p-8 bg-black text-white">
                  <div className="text-xs uppercase tracking-widest mb-4">Project #{i + 1}</div>
                  <div className="text-xs uppercase tracking-wide mb-2 text-gray-400">{project.category}</div>
                  <div className="mb-8">
                    <div className="text-4xl font-black mb-2">{project.impact}</div>
                  </div>
                  <div className="space-y-2">
                    {project.tech.map((tech, j) => (
                      <div key={j} className="text-xs font-bold uppercase border-l-4 border-white pl-2">
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Right - Content */}
                <div className="md:col-span-2 p-8">
                  <div className="mb-4">
                    <h3 className="text-4xl font-black uppercase leading-tight mb-2">
                      {project.title}
                    </h3>
                    <div className="text-sm uppercase tracking-wide text-gray-600 font-bold">
                      {project.subtitle}
                    </div>
                  </div>
                  
                  <div className="border-t-2 border-black pt-4 mb-6">
                    <p className="font-serif text-lg leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  
                  <button className="inline-flex items-center gap-2 text-sm uppercase font-black border-2 border-black px-6 py-3 hover:bg-black hover:text-white transition-colors">
                    View Case Study <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 border-4 border-black p-8 bg-yellow-50 text-center">
          <h3 className="text-3xl font-black uppercase mb-4">Interested in Collaboration?</h3>
          <p className="font-serif text-lg mb-6">Let's discuss your next groundbreaking project</p>
          <a 
            href="#contact" 
            className="inline-block text-sm uppercase font-black border-4 border-black px-8 py-4 bg-white hover:bg-black hover:text-white transition-colors"
          >
            Get In Touch →
          </a>
        </div>
      </div>
    </section>
  );
}