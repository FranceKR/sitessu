import React from 'react';

export default function CloudIconsParade() {
  const icons = [
    { name: 'AWS', path: '/aws-svgrepo-com.svg', delay: 0 },
    { name: 'GCP', path: '/google-cloud-svgrepo-com.svg', delay: 0.5 },
    { name: 'Python', path: '/python-svgrepo-com.svg', delay: 1 },
    { name: 'Airflow', path: '/apacheairflow-svgrepo-com.svg', delay: 2.5 },
    { name: 'Databricks', path: '/databricks-svgrepo-com.svg', delay: 0.3 },
    { name: 'Docker', path: '/docker-svgrepo-com.svg', delay: 2.3 },
  ];

  // Position icons in a cluster - using more scattered positions
  const getCornerPosition = (index) => {
    const positions = [
      { x: 9, y: 55 },   // AWS
      { x: 28, y: 70 },   // GCP
      { x: 15, y: 30 },   // Python
      { x: 95, y: 45 },   // Airflow
      { x: 87, y: 24 },   // DBX
      { x: 80, y: 65 },   // Docker
    ];
    
    return positions[index % positions.length];
  };

  return (
    <>
      {/* Desktop: Positioned relative to parent container */}
      <div className="hidden md:block absolute inset-0 pointer-events-none">
        {icons.map((item, i) => {
          const pos = getCornerPosition(i);
          return (
            <div 
              key={i} 
              className="absolute flex flex-col items-center gap-2 animate-float"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: 'translate(-50%, -50%)',
                animationDelay: `${item.delay}s`,
                animationDuration: `${5 + (i % 3)}s`,
                zIndex: 10
              }}
            >
              <div className="w-12 h-12 lg:w-16 lg:h-16 border-3 lg:border-4 border-black bg-white flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] lg:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] lg:hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:scale-110 transition-all duration-300 p-2">
                <img 
                  src={item.path} 
                  alt={item.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-[10px] lg:text-xs font-black uppercase tracking-wider whitespace-nowrap bg-white px-2 py-1 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] lg:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                {item.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile: Scrolling Parade - positioned absolutely at top */}
      <div className="md:hidden absolute top-0 left-0 right-0 overflow-hidden py-4 pointer-events-none" style={{ zIndex: 10 }}>
        <div className="flex animate-scroll gap-8">
          {/* Triple the icons for seamless infinite loop */}
          {[...icons, ...icons, ...icons].map((item, i) => (
            <div 
              key={i} 
              className="flex-shrink-0 flex flex-col items-center gap-1"
            >
              <div className="w-10 h-10 border-3 border-black bg-white flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-1">
                <img 
                  src={item.path} 
                  alt={item.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-[9px] font-black uppercase tracking-wider whitespace-nowrap bg-white px-1.5 py-0.5 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes float {
          0%, 100% { 
            transform: translate(-50%, -50%) translateY(0px) rotate(0deg);
          }
          25% { 
            transform: translate(-50%, -50%) translateY(-15px) rotate(1deg);
          }
          50% { 
            transform: translate(-50%, -50%) translateY(-10px) rotate(-1deg);
          }
          75% { 
            transform: translate(-50%, -50%) translateY(-20px) rotate(0.5deg);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-scroll {
          animation: scroll 25s linear infinite;
          width: fit-content;
        }
      `}</style>
    </>
  );
}