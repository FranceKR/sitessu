import React, { useState } from 'react';
import { Mail, Linkedin, Github, MapPin, Phone } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 px-4 bg-white border-t-4 border-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-xs uppercase tracking-widest font-bold mb-2">Correspondence</div>
          <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tight">Get in Touch</h2>
          <div className="w-32 h-1 bg-black mx-auto mt-4"></div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Info - Left Column */}
          <div className="md:col-span-1 space-y-6">
            {/* Main Contact Box */}
            <div className="border-4 border-black bg-black text-white p-6">
              <h3 className="text-2xl font-black uppercase mb-4">Contact Information</h3>
              <p className="font-serif text-sm mb-6">
                Available for consulting, collaboration, and speaking engagements.
              </p>
            </div>

            {/* Contact Details */}
            <div className="border-4 border-black bg-gray-50">
              <div className="border-b-4 border-black p-4 bg-white">
                <div className="text-xs uppercase font-black tracking-wider">Direct Lines</div>
              </div>
              <div className="p-6 space-y-4">
                {[
                  { icon: Mail, label: 'Email', value: 'hello@francekhalil.com' },
                  { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567' },
                  { icon: MapPin, label: 'Location', value: 'San Francisco, CA' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="border-2 border-black p-2 bg-white">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs uppercase font-bold text-gray-600">{item.label}</div>
                      <div className="font-bold text-sm">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="border-4 border-black bg-yellow-50 p-6">
              <div className="text-xs uppercase font-black mb-4">Follow</div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Github, label: 'GitHub' },
                  { icon: Linkedin, label: 'LinkedIn' }
                ].map((item, i) => (
                  <a 
                    key={i}
                    href="#contact" 
                    className="border-2 border-black p-3 bg-white hover:bg-black hover:text-white transition-colors text-center"
                  >
                    <item.icon className="w-5 h-5 mx-auto mb-1" />
                    <div className="text-xs font-bold uppercase">{item.label}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Contact Form - Right Column */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="border-4 border-black bg-gray-50">
              <div className="border-b-4 border-black p-6 bg-white">
                <h3 className="text-3xl font-black uppercase">Send a Message</h3>
                <p className="font-serif text-sm mt-2">Fill out the form below and I'll respond within 24 hours</p>
              </div>
              
              <div className="p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase font-black tracking-wider mb-3">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 border-4 border-black focus:outline-none focus:ring-4 focus:ring-yellow-300 font-bold"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-black tracking-wider mb-3">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 border-4 border-black focus:outline-none focus:ring-4 focus:ring-yellow-300 font-bold"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase font-black tracking-wider mb-3">
                    Subject *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full px-4 py-3 border-4 border-black focus:outline-none focus:ring-4 focus:ring-yellow-300 font-bold"
                    placeholder="Project Inquiry"
                  />
                </div>
                
                <div>
                  <label className="block text-xs uppercase font-black tracking-wider mb-3">
                    Message *
                  </label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows="6"
                    className="w-full px-4 py-3 border-4 border-black focus:outline-none focus:ring-4 focus:ring-yellow-300 font-serif"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-black text-white font-black uppercase text-lg hover:bg-gray-900 transition-colors border-4 border-black"
                >
                  Submit Message →
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Additional Info Banner */}
        <div className="mt-12 border-4 border-black p-8 bg-yellow-50 text-center">
          <div className="text-xs uppercase font-black mb-2">Response Time</div>
          <div className="text-2xl font-black uppercase mb-2">Usually within 24 hours</div>
          <p className="font-serif text-sm">For urgent inquiries, please call directly</p>
        </div>
      </div>
    </section>
  );
}