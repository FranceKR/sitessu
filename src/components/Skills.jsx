import React from 'react';
import { Database, Code, Palette } from 'lucide-react';

export default function Skills() {
  const skillCategories = [
    {
      icon: Database,
      title: 'Data Engineering',
      category: 'Technical',
     // skills: ['Python', 'SQL', 'Apache Spark', 'Airflow', 'ETL Pipelines', 'AWS/GCP', 'Snowflake', 'dbt']
    },
    {
      icon: Code,
      title: 'Development',
      category: 'Engineering',
     // skills: ['React', 'TypeScript', 'Node.js', 'FastAPI', 'PostgreSQL', 'Docker', 'Git', 'CI/CD']
    },
    {
      icon: Palette,
      title: 'Design',
      category: 'Creative',
    //  skills: ['UI/UX Design', 'Figma', 'Typography', 'Color Theory', 'Responsive Design', 'Prototyping', 'Design Systems', 'Accessibility']
    }
  ];

  return (
    <section id="skills" className="py-20 px-4 bg-gray-50 border-t-4 border-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-xs uppercase tracking-widest font-bold mb-2">Specialty</div>
          <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tight">Skills & Expertise</h2>
          <div className="w-32 h-1 bg-black mx-auto mt-4"></div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, i) => (
            <article key={i} className="border-4 border-black bg-white">
              {/* Article Header */}
              <div className="border-b-4 border-black p-6 bg-black text-white">
                <div className="text-xs uppercase tracking-wide mb-2">{category.category}</div>
                <h3 className="text-3xl font-black uppercase">{category.title}</h3>
              </div>
              
              {/* Icon */}
              <div className="p-6 border-b-2 border-black bg-yellow-50">
                <category.icon className="w-16 h-16 mx-auto" strokeWidth={3} />
              </div>
              
              {/* Skills List */}
              {/* <div className="p-6">
                <div className="space-y-2">
                  {category.skills.map((skill, j) => (
                    <div key={j} className="border-l-4 border-black pl-3 py-1">
                      <span className="font-bold uppercase text-sm tracking-wide">{skill}</span>
                    </div>
                  ))}
                </div>
              </div> */}
            </article>
          ))}
        </div>

        {/* Additional Info Box */}
    
      </div>
    </section>
  );
}