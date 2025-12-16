import React from 'react';
import { Github, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e, section) => {
    e.preventDefault();
    
    // Check if we're on the homepage
    const isHomePage = window.location.pathname === '/';
    
    if (isHomePage) {
      // On homepage - just scroll to section
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // On article/other page - navigate to homepage with hash
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
      
      // Wait for navigation, then scroll
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo(0, 0);
        }
      }, 100);
    }
  };

  return (
    <footer className="bg-black text-white border-t-4 border-black">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-12 pb-8 border-b-2 border-white">
          {/* Masthead with Logo */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <img 
                src="/francekhalil.svg" 
                alt="France Khalil"
                className="h-16 w-auto"
                style={{ filter: 'brightness(0) invert(1)' }} // Makes logo white for dark background
              />
            </div>
            <p className="font-serif text-sm leading-relaxed mb-4 text-gray-300">
              An independent publication covering data engineering, design innovation, 
              and the intersection of technology and creativity. Published daily from 
              Manila, Philippines.
            </p>
            <div className="text-xs uppercase tracking-wider text-gray-400">
              Est. 2025 • Vol. 1
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase font-black tracking-wider mb-4 border-b-2 border-white pb-2">
              Sections
            </h4>
            <div className="space-y-2">
              {['Home', 'About', 'Skills', 'Projects', 'Articles', 'Contact'].map(item => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => handleNavClick(e, item.toLowerCase())}
                  className="block text-sm font-bold hover:underline transition-all cursor-pointer"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
          
          {/* Categories */}
          <div>
            <h4 className="text-xs uppercase font-black tracking-wider mb-4 border-b-2 border-white pb-2">
              Topics
            </h4>
            <div className="space-y-2 text-sm font-bold">
              <div>Data Engineering</div>
              <div>Design</div>
              <div>Technology</div>
              <div>Architecture</div>
              <div>Innovation</div>
              <div>Best Practices</div>
            </div>
          </div>
        </div>

        {/* Social & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Social Links */}
          <div className="flex gap-4">
            {[
              { icon: Github, label: 'GitHub', url: 'https://github.com/FranceKR' },
              { icon: Linkedin, label: 'LinkedIn', url: 'https://www.linkedin.com/in/fkromero/' },
            ].map((item, i) => (
              <a 
                key={i}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="border-2 border-white p-3 hover:bg-white hover:text-black transition-colors"
              >
                <item.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
          
          {/* Copyright */}
          <div className="text-center md:text-right">
            <div className="text-sm font-bold mb-1">
              © {currentYear} France Khalil. All rights reserved.
            </div>
            <div className="text-xs text-gray-400">
              Data Engineer & Designer
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-8 pt-8 border-t-2 border-white text-center">
          <div className="text-xs uppercase tracking-widest font-bold text-gray-400">
            "Where Engineering Meets Artistry"
          </div>
        </div>
      </div>
    </footer>
  );
}