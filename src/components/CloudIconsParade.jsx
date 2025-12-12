import React from 'react';
import { 
  Database, 
  Cloud, 
  Server, 
  Container, 
  Boxes, 
  Globe, 
  HardDrive,
  Cpu,
  Network,
  Workflow
} from 'lucide-react';

export default function CloudIconsParade() {
  // Using Lucide React icons that are already installed in your project!
  // No external dependencies needed
  const icons = [
    { name: 'AWS', Icon: Cloud },
    { name: 'GCP', Icon: Globe },
    { name: 'Azure', Icon: Cloud },
    { name: 'Docker', Icon: Container },
    { name: 'Kubernetes', Icon: Boxes },
    { name: 'Terraform', Icon: Workflow },
    { name: 'Database', Icon: Database },
    { name: 'Spark', Icon: Server },
    { name: 'Snowflake', Icon: HardDrive },
    { name: 'Apache', Icon: Cpu },
    { name: 'Network', Icon: Network },
  ];

  return (
    <div className="overflow-hidden bg-gray-100 border-y-4 border-black py-8">
      <div className="flex animate-scroll gap-16">
        {/* Triple the icons for seamless infinite loop */}
        {[...icons, ...icons, ...icons].map((item, i) => (
          <div 
            key={i} 
            className="flex-shrink-0 flex flex-col items-center gap-3"
          >
            <div className="w-16 h-16 border-4 border-black bg-white flex items-center justify-center">
              <item.Icon className="w-10 h-10" strokeWidth={2.5} />
            </div>
            <span className="text-xs font-black uppercase tracking-wider whitespace-nowrap">
              {item.name}
            </span>
          </div>
        ))}
      </div>
      
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
          width: fit-content;
        }
      `}</style>
    </div>
  );
}

/* 
  HOW TO ADD MORE ICONS:
  
  1. Import more icons from 'lucide-react' at the top
  2. Add them to the icons array:
  
  { name: 'YourTech', Icon: YourLucideIcon }
  
  Available Lucide icons: https://lucide.dev/icons/
  Already installed in your project - no external dependencies!
  
  Examples:
  - Cloud, CloudCog, CloudDownload, CloudUpload
  - Database, DatabaseBackup, DatabaseZap
  - Server, Servers
  - Container, Boxes
  - Code, CodeSquare, Brackets
  - Cpu, Microchip, CircuitBoard
  - Network, Share2, Workflow
*/