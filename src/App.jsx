import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import LatestArticles from './components/LatestArticles';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ArticlePage from './pages/ArticlePage';
import AllArticlesPage from './pages/AllArticlesPage';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [currentView, setCurrentView] = useState('home'); // 'home', 'article', or 'articles'
  const [currentSlug, setCurrentSlug] = useState(null);

  // Handle routing based on URL
  useEffect(() => {
    const path = window.location.pathname;
    
    if (path.startsWith('/article/')) {
      const slug = path.replace('/article/', '');
      setCurrentView('article');
      setCurrentSlug(slug);
    } else if (path === '/articles') {
      setCurrentView('articles');
    } else {
      setCurrentView('home');
    }

    // Handle browser back/forward
    const handlePopState = () => {
      const newPath = window.location.pathname;
      if (newPath.startsWith('/article/')) {
        const slug = newPath.replace('/article/', '');
        setCurrentView('article');
        setCurrentSlug(slug);
      } else if (newPath === '/articles') {
        setCurrentView('articles');
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Scroll tracking for navigation
  useEffect(() => {
    if (currentView !== 'home') return;

    const handleScroll = () => {
      const sections = ['home', 'articles', 'about', 'skills', 'projects', 'contact'];
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
  }, [currentView]);

  // Render all articles page
  if (currentView === 'articles') {
    return (
      <div className="bg-gray-50">
        <Navigation activeSection="articles" />
        <AllArticlesPage />
        <Footer />
      </div>
    );
  }

  // Render single article page
  if (currentView === 'article') {
    return (
      <div className="bg-gray-50">
        <Navigation activeSection="articles" />
        <ArticlePage slug={currentSlug} />
        <Footer />
      </div>
    );
  }

  // Render homepage
  return (
    <div className="bg-gray-50">
      <Navigation activeSection={activeSection} />
      <Hero />
      <LatestArticles />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}