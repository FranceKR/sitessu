import React from 'react';
import CloudIconsParade from './CloudIconsParade';

export default function About() {
  return (
    <section id="about" className="relative py-20 px-4 bg-white border-t-4 border-black overflow-hidden">
      {/* Floating Icons */}
      <CloudIconsParade />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="text-xs uppercase tracking-widest font-bold mb-2">Feature</div>
          <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tight">about prans</h2>
          <div className="w-32 h-1 bg-black mx-auto mt-4"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Column - Image/Visual */}
          <div className="border-4 border-black p-8 bg-gray-100">
            <div className="aspect-square border-2 border-black bg-white mb-4 overflow-hidden">
              <img 
                src="/prans.jpg" 
                alt="France Khalil"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="border-2 border-black p-4 bg-yellow-50">
              <div className="text-xs uppercase font-bold mb-2">Quick Facts</div>
              <ul className="space-y-1 text-sm font-serif">
                <li>• 10M+ events processed daily</li>
                <li>• 80% reduction in data incidents</li>
                <li>• Real-time analytics expert</li>
                <li>• Full-stack designer</li>
              </ul>
            </div>
          </div>
          
          {/* Right Column - Article Text */}
          <div>
            <div className="mb-6">
              <h3 className="text-3xl font-black uppercase mb-4 border-b-2 border-black pb-2">
                A Unique Perspective
              </h3>
              <p className="font-serif text-lg leading-relaxed mb-4">
                <span className="float-left text-6xl font-black mr-3 leading-none">I</span>
                n the rapidly evolving landscape of technology, France Khalil stands out 
                as a rare breed of professional who seamlessly bridges the gap between 
                robust backend engineering and thoughtful user experience design.
              </p>
              <p className="font-serif text-lg leading-relaxed mb-4">
                With years of hands-on experience building scalable data pipelines and 
                crafting intuitive interfaces, Khalil brings a unique perspective that 
                bridges technical excellence with human-centered design principles.
              </p>
            </div>

            <div className="border-l-4 border-black pl-6 mb-6 bg-gray-50 p-4">
              <p className="font-serif italic text-xl leading-relaxed">
                "The best solutions emerge at the intersection of engineering rigor 
                and design thinking. Data should not only work—it should inspire."
              </p>
              <div className="text-sm uppercase font-bold mt-2">— France Khalil</div>
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-black uppercase mb-4 border-b-2 border-black pb-2">
                Beyond the Code
              </h3>
              <p className="font-serif text-lg leading-relaxed">
                When not architecting data systems or designing interfaces, Khalil can 
                be found exploring emerging technologies, contributing to open source 
                projects, and sharing insights about the future of data engineering 
                and design through thoughtful writing and community engagement.
              </p>
            </div>

            <a 
              href="#contact" 
              className="inline-block text-sm uppercase font-black border-4 border-black px-6 py-3 hover:bg-black hover:text-white transition-colors"
            >
              Schedule Consultation →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}