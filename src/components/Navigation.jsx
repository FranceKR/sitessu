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

  const navItems = ['Home', 'Articles', 'About', 'Skills', 'Projects', 'Contact'];

  const handleNavClick = (e, item) => {
    e.preventDefault();
    const section = item.toLowerCase();
    const isHomePage = window.location.pathname === '/';

    if (isHomePage) {
      const element = document.getElementById(section);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    } else {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));

      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo(0, 0);
        }
        setIsOpen(false);
      }, 100);
    }
  };

  return (
    <>
      {/* Navigation Bar - Now Fixed/Sticky */}
      <nav
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 border-b-2 border-black ${
          scrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, '', '/');
                window.dispatchEvent(new PopStateEvent('popstate'));
                setTimeout(() => window.scrollTo(0, 0), 50);
                setIsOpen(false);
              }}
              className="flex items-center hover:scale-105 transition-transform z-10"
            >
              <img
                src="/francekhalil.svg"
                alt="France Khalil"
                className="h-10 w-auto"
                style={{ filter: 'brightness(0)' }}
              />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={'#' + item.toLowerCase()}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`text-sm font-bold uppercase tracking-wide transition-all hover:scale-105 cursor-pointer ${
                    activeSection === item.toLowerCase()
                      ? 'text-black border-b-2 border-black'
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 z-10 hover:bg-gray-100 rounded transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Dropdown - Also Fixed */}
      {isOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bg-white border-b-2 border-black z-40 shadow-lg">
          <div className="flex flex-col">
            {navItems.map((item) => (
              <a
                key={item}
                href={'#' + item.toLowerCase()}
                onClick={(e) => handleNavClick(e, item)}
                className="block px-6 py-4 font-bold uppercase text-sm border-b border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}