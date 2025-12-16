import React from 'react';
import { Mail, Linkedin, Github, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-4 bg-white border-t-4 border-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-xs uppercase tracking-widest font-bold mb-2">Correspondence</div>
          <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tight">Get in Touch</h2>
          <div className="w-32 h-1 bg-black mx-auto mt-4"></div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="space-y-6">
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
                  { icon: MapPin, label: 'Location', value: 'Manila, Philippines' }
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
                  { icon: Github, label: 'GitHub', url:'https://github.com/FranceKR'},
                  { icon: Linkedin, label: 'LinkedIn', url:'https://www.linkedin.com/in/fkromero/'}]
                .map((item, i) => (
                  <a 
                    key={i}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-black p-3 bg-white hover:bg-black hover:text-white transition-colors text-center"
                  >
                    <item.icon className="w-5 h-5 mx-auto mb-1" />
                    <div className="text-xs font-bold uppercase">{item.label}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Additional Contact Card */}
          <div className="border-4 border-black bg-white">
            <div className="border-b-4 border-black p-6 bg-gray-900 text-white">
              <h3 className="text-2xl font-black uppercase">Let's Connect</h3>
            </div>
            <div className="p-8">
              <p className="font-serif text-lg leading-relaxed mb-6">
                Interested in collaboration, consulting, or just want to chat about data engineering and design? 
                I'm always open to connecting with fellow professionals and innovators.
              </p>
              <div className="border-l-4 border-black pl-4 bg-gray-50 p-4">
                <p className="text-sm font-bold uppercase mb-2">Response Time</p>
                <p className="font-serif text-sm">Usually within 24 hours for email inquiries</p>
              </div>
            </div>
          </div>

          {/* Availability Card */}
          <div className="border-4 border-black bg-gradient-to-br from-yellow-50 to-white">
            <div className="border-b-4 border-black p-6 bg-black text-white">
              <h3 className="text-2xl font-black uppercase">Availability</h3>
            </div>
            <div className="p-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500 border-2 border-black"></div>
                  <span className="font-bold">Available for Projects</span>
                </div>
                <div className="border-t-2 border-black pt-4">
                  <p className="font-serif text-sm leading-relaxed mb-4">
                    Currently accepting:
                  </p>
                  <ul className="space-y-2 font-serif text-sm">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Data Engineering Consulting</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>UI/UX Design Projects</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Speaking Engagements</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Technical Writing</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Banner */}
        <div className="mt-12 border-4 border-black p-8 bg-yellow-50">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-xs uppercase font-black mb-2">Response Time</div>
              <div className="text-2xl font-black uppercase">24 Hours</div>
              <p className="font-serif text-sm mt-2">Email responses</p>
            </div>
            <div>
              <div className="text-xs uppercase font-black mb-2">Time Zone</div>
              <div className="text-2xl font-black uppercase">PHT (UTC+8)</div>
              <p className="font-serif text-sm mt-2">Manila, Philippines</p>
            </div>
            <div>
              <div className="text-xs uppercase font-black mb-2">Working Hours</div>
              <div className="text-2xl font-black uppercase">Flexible</div>
              <p className="font-serif text-sm mt-2">Remote collaboration</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}