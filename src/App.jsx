import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, Twitter, ChevronDown, ExternalLink, Code, Database, Palette, ChevronRight } from 'lucide-react';

// Typing Animation Component
function TypingAnimation() {
  const [displayText, setDisplayText] = useState('');
  const [currentPhase, setCurrentPhase] = useState('typing-france');
  
  const text1 = 'France Khalil';
  const text2 = 'prans kalil';
  
  useEffect(() => {
    let timeout;
    
    if (currentPhase === 'typing-france') {
      if (displayText.length < text1.length) {
        timeout = setTimeout(() => setDisplayText(text1.slice(0, displayText.length + 1)), 150);
      } else {
        timeout = setTimeout(() => setCurrentPhase('pause-france'), 2000);
      }
    } else if (currentPhase === 'pause-france') {
      timeout = setTimeout(() => setCurrentPhase('deleting-france'), 1000);
    } else if (currentPhase === 'deleting-france') {
      if (displayText.length > 0) {
        timeout = setTimeout(() => setDisplayText(displayText.slice(0, -1)), 80);
      } else setCurrentPhase('typing-prans');
    } else if (currentPhase === 'typing-prans') {
      if (displayText.length < text2.length) {
        timeout = setTimeout(() => setDisplayText(text2.slice(0, displayText.length + 1)), 150);
      } else timeout = setTimeout(() => setCurrentPhase('pause-prans'), 2000);
    } else if (currentPhase === 'pause-prans') {
      timeout = setTimeout(() => setCurrentPhase('deleting-prans'), 1000);
    } else if (currentPhase === 'deleting-prans') {
      if (displayText.length > 0) timeout = setTimeout(() => setDisplayText(displayText.slice(0, -1)), 80);
      else setCurrentPhase('typing-france');
    }
    
    return () => clearTimeout(timeout);
  }, [displayText, currentPhase]);
  
  const isItalic = currentPhase.includes('prans');
  
  return (
    <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold ${isItalic ? 'italic' : ''} bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent`}>
      {displayText}<span className="animate-pulse text-purple-600">|</span>
    </h1>
  );
}

// Navigation Component
function Navigation({ activeSection }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Home', 'About', 'Skills', 'Projects', 'Articles', 'Contact'];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="#home" className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            FK
          </a>

          <div className="hidden md:flex space-x-8">
            {navItems.map(item => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`text-sm font-medium transition-colors hover:text-purple-600 ${
                  activeSection === item.toLowerCase() ? 'text-purple-600' : 'text-gray-700'
                }`}
              >
                {item}
              </a>
            ))}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden bg-white border-t">
            {navItems.map(item => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-purple-600 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

// Hero Section
function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="max-w-5xl mx-auto text-center">
        <div className="mb-8">
          <TypingAnimation />
        </div>
        <p className="text-xl md:text-2xl text-gray-600 mb-4">
          Data Engineer & Creative Designer
        </p>
        <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
          Crafting scalable data solutions and beautiful digital experiences at the intersection of engineering and design
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <a href="#contact" className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all">
            Get in Touch
          </a>
          <a href="#projects" className="px-8 py-3 border-2 border-purple-600 text-purple-600 rounded-full font-medium hover:bg-purple-50 transition-all">
            View Work
          </a>
        </div>
        <div className="flex justify-center gap-6">
          {[
            { icon: Github, label: 'GitHub' },
            { icon: Linkedin, label: 'LinkedIn' },
            { icon: Twitter, label: 'Twitter' },
            { icon: Mail, label: 'Email' }
          ].map(item => (
            <a key={item.label} href="#contact" className="text-gray-600 hover:text-purple-600 transition-colors" aria-label={item.label}>
              <item.icon className="w-6 h-6" />
            </a>
          ))}
        </div>
        <div className="mt-16 animate-bounce">
          <ChevronDown className="w-8 h-8 mx-auto text-gray-400" />
        </div>
      </div>
    </section>
  );
}

// About Section
function About() {
  return (
    <section id="about" className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">About Me</h2>
        <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mb-12"></div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl p-8 aspect-square flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">👨‍💻</div>
                <p className="text-lg text-gray-700">Data Engineer & Designer</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              I'm a data engineer with a passion for creating elegant solutions to complex problems. My work sits at the intersection of robust backend engineering and thoughtful user experience design.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              With years of experience building scalable data pipelines and crafting intuitive interfaces, I bring a unique perspective that bridges technical excellence with human-centered design.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              When I'm not architecting data systems or designing interfaces, you'll find me exploring new technologies, contributing to open source, or writing about the future of data and design.
            </p>
            <a href="#contact" className="inline-flex items-center gap-2 text-purple-600 font-medium hover:gap-3 transition-all">
              Let's work together <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// Skills Section
function Skills() {
  const skillCategories = [
    {
      icon: Database,
      title: 'Data Engineering',
      color: 'purple',
      skills: ['Python', 'SQL', 'Apache Spark', 'Airflow', 'ETL Pipelines', 'AWS/GCP', 'Snowflake', 'dbt']
    },
    {
      icon: Code,
      title: 'Development',
      color: 'blue',
      skills: ['React', 'TypeScript', 'Node.js', 'FastAPI', 'PostgreSQL', 'Docker', 'Git', 'CI/CD']
    },
    {
      icon: Palette,
      title: 'Design',
      color: 'indigo',
      skills: ['UI/UX Design', 'Figma', 'Typography', 'Color Theory', 'Responsive Design', 'Prototyping', 'Design Systems', 'Accessibility']
    }
  ];

  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Skills & Expertise</h2>
        <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mb-12"></div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, i) => (
            <div key={i} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="inline-flex p-4 rounded-xl bg-purple-100 mb-6">
                <category.icon className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, j) => (
                  <span key={j} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Projects Section
function Projects() {
  const projects = [
    {
      title: 'Real-Time Data Pipeline',
      description: 'Built a scalable ETL pipeline processing 10M+ events daily using Apache Spark and Kafka',
      tech: ['Python', 'Spark', 'Kafka', 'AWS'],
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Analytics Dashboard',
      description: 'Designed and developed a comprehensive analytics platform with real-time visualizations',
      tech: ['React', 'TypeScript', 'D3.js', 'FastAPI'],
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Data Quality Framework',
      description: 'Created an automated data quality monitoring system reducing incidents by 80%',
      tech: ['Python', 'dbt', 'Airflow', 'PostgreSQL'],
      gradient: 'from-indigo-500 to-purple-500'
    }
  ];

  return (
    <section id="projects" className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Featured Projects</h2>
        <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mb-12"></div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className={`h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                <div className="text-white text-6xl">💡</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, j) => (
                    <span key={j} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
                <button className="inline-flex items-center gap-2 text-purple-600 font-medium hover:gap-3 transition-all">
                  View Details <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Articles Section
function Articles() {
  const articles = [
    {
      title: 'Building Scalable Data Pipelines',
      excerpt: 'Best practices for designing data infrastructure that grows with your business',
      date: 'Dec 11, 2024',
      readTime: '6 min read',
      category: 'Data Engineering'
    },
    {
      title: 'The Art of Data Visualization',
      excerpt: 'Turning complex data into compelling stories through thoughtful design',
      date: 'Dec 8, 2024',
      readTime: '4 min read',
      category: 'Design'
    },
    {
      title: 'Modern ETL Best Practices',
      excerpt: 'Lessons learned from building production data pipelines at scale',
      date: 'Dec 5, 2024',
      readTime: '5 min read',
      category: 'Technology'
    }
  ];

  return (
    <section id="articles" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Latest Articles</h2>
        <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mb-12"></div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <article key={i} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer">
              <span className="inline-block px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-medium mb-4">
                {article.category}
              </span>
              <h3 className="text-xl font-bold mb-3 hover:text-purple-600 transition-colors">
                {article.title}
              </h3>
              <p className="text-gray-600 mb-4">{article.excerpt}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{article.date}</span>
                <span>{article.readTime}</span>
              </div>
            </article>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 text-purple-600 font-medium hover:gap-3 transition-all">
            View All Articles <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

// Contact Section
function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Get in Touch</h2>
        <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mb-12"></div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
            <p className="text-gray-600 mb-8">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            
            <div className="space-y-4">
              {[
                { icon: Mail, label: 'Email', value: 'hello@francekhalil.com' },
                { icon: Linkedin, label: 'LinkedIn', value: '/in/francekhalil' },
                { icon: Github, label: 'GitHub', value: '@francekhalil' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <item.icon className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">{item.label}</div>
                    <div className="font-medium">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Tell me about your project..."
              ></textarea>
            </div>
            <button
              onClick={handleSubmit}
              className="w-full px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              France Khalil
            </h3>
            <p className="text-gray-400">
              Data Engineer & Creative Designer crafting scalable solutions and beautiful experiences.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <div className="space-y-2">
              {['About', 'Skills', 'Projects', 'Articles', 'Contact'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} className="block text-gray-400 hover:text-white transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Connect</h4>
            <div className="flex gap-4">
              {[Github, Linkedin, Twitter, Mail].map((Icon, i) => (
                <a key={i} href="#contact" className="p-3 bg-gray-800 rounded-lg hover:bg-purple-600 transition-colors">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>© 2025 France Khalil. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// Main App Component
export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'articles', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-white">
      <Navigation activeSection={activeSection} />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Articles />
      <Contact />
      <Footer />
    </div>
  );
}