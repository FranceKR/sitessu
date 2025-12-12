import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation({ activeSection }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Updated order: Home, Articles, About, Skills, Projects, Contact
  const navItems = ['Home', 'Articles', 'About', 'Skills', 'Projects', 'Contact'];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b-2 border-black ${
      scrolled ? 'bg-white shadow-md' : 'bg-white/95'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="#home" className="text-3xl font-black tracking-tighter uppercase">
            The Daily FK
          </a>

          <div className="hidden md:flex space-x-8">
            {navItems.map(item => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`text-sm font-bold uppercase tracking-wide transition-all hover:scale-105 ${
                  activeSection === item.toLowerCase() 
                    ? 'text-black border-b-2 border-black' 
                    : 'text-gray-600 hover:text-black'
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
          <div className="md:hidden bg-white border-t-2 border-black">
            {navItems.map(item => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 font-bold uppercase text-sm border-b border-gray-200 hover:bg-gray-100 transition-colors"
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