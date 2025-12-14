import React from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white border-t-4 border-black">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-12 pb-8 border-b-2 border-white">
          {/* Masthead */}
          <div className="md:col-span-2">
            <h3 className="text-4xl font-black uppercase tracking-tighter mb-4">
              The Daily FK
            </h3>
            <p className="font-serif text-sm leading-relaxed mb-4 text-gray-300">
              An independent publication covering data engineering, design innovation, 
              and the intersection of technology and creativity. Published daily from 
              San Francisco, California.
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
                  className="block text-sm font-bold hover:underline transition-all"
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
             // { icon: Twitter, label: 'Twitter', url: '#contact' },
             // { icon: Mail, label: 'Email', url: '#contact' }
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
              © {currentYear} The Daily FK. All rights reserved.
            </div>
            <div className="text-xs text-gray-400">
              France Khalil • Data Engineer & Designer
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