import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

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
    <span className={isItalic ? 'italic' : ''}>
      {displayText}<span className="animate-pulse">|</span>
    </span>
  );
}

export default function Hero() {
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-24 pb-12 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Newspaper Header */}
        <div className="text-center mb-8 border-b-4 border-black pb-6">
          <div className="text-sm uppercase tracking-widest text-gray-600 mb-2">
            {today}
          </div>
          <h1 className="text-7xl md:text-7xl font-black tracking-tighter uppercase mb-5">
            <TypingAnimation />
          </h1>
          <div className="text-sm uppercase tracking-widest text-gray-600">
            Vol. 1 • DATA ENGINEER
          </div>
        </div>

        {/* Main Headline */}
        {/* <div className="border-4 border-black p-8 mb-8 bg-yellow-50">
          <div className="text-xs uppercase tracking-widest font-bold mb-4">
            Breaking News
          </div>
          <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6 uppercase">
            Data Engineer Revolutionizes Digital Design
          </h2>
          <div className="border-t-2 border-black pt-4">
            <p className="text-xl md:text-2xl font-serif leading-relaxed mb-4">
              <span className="float-left text-6xl font-black mr-2 leading-none">F</span>
              rance Khalil, a visionary data engineer and creative designer, continues to push 
              the boundaries of scalable data solutions while crafting beautiful digital experiences 
              at the intersection of engineering and design.
            </p>
          </div>
        </div> */}

        {/* Columns */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="border-2 border-black p-6 bg-white">
            <h3 className="text-2xl font-black uppercase mb-3 border-b-2 border-black pb-2">
              Latest Projects
            </h3>
            <p className="font-serif text-sm leading-relaxed">
              Revolutionary data pipelines processing millions of events daily. 
              Real-time analytics platforms with stunning visualizations. 
              Automated quality frameworks reducing incidents by 80%.
            </p>
            <a href="#projects" className="inline-block mt-4 text-xs uppercase font-bold border-2 border-black px-4 py-2 hover:bg-black hover:text-white transition-colors">
              Read More →
            </a>
          </div>

          <div className="border-2 border-black p-6 bg-white">
            <h3 className="text-2xl font-black uppercase mb-3 border-b-2 border-black pb-2">
              Expert Analysis
            </h3>
            <p className="font-serif text-sm leading-relaxed">
              Building scalable data infrastructure. The art of data visualization. 
              Modern ETL best practices from production pipelines at scale.
            </p>
            <a href="#articles" className="inline-block mt-4 text-xs uppercase font-bold border-2 border-black px-4 py-2 hover:bg-black hover:text-white transition-colors">
              View Articles →
            </a>
          </div>

          <div className="border-2 border-black p-6 bg-black text-white">
            <h3 className="text-2xl font-black uppercase mb-3 border-b-2 border-white pb-2">
              Contact
            </h3>
            <p className="font-serif text-sm leading-relaxed mb-4">
              Available for consulting, collaboration, and innovative projects. 
              Let's create something extraordinary together.
            </p>
            <div className="flex gap-3">
              {[
                {Icon: Github, label:'GitHub', url:'https://github.com/FranceKR'},
                {Icon: Linkedin, label:'LinkedIn', url: 'https://www.linkedin.com/in/fkromero/'}
                ]
                .map(({Icon, url },i) => (
                <a 
                  key={i} 
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-white p-2 hover:bg-white hover:text-black transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}