import React from 'react';

export default function CloudIconsParade() {
  const icons = [
    { name: 'AWS', path: '/aws-svgrepo-com.svg', delay: 0 },
    { name: 'GCP', path: '/google-cloud-svgrepo-com.svg', delay: 0.5 },
    { name: 'Python', path: '/python-svgrepo-com.svg', delay: 1 },
    { name: 'Docker', path: '/docker-svgrepo-com.svg', delay: 1.5 },
    { name: 'Spark', path: '/spark-svgrepo-com.svg', delay: 2 },
    { name: 'Airflow', path: '/apacheairflow-svgrepo-com.svg', delay: 2.5 },
    { name: 'Databricks', path: '/databricks-svgrepo-com.svg', delay: 0.3 },
    { name: 'AWS', path: '/aws-svgrepo-com.svg', delay: 0.8 },
    { name: 'GCP', path: '/google-cloud-svgrepo-com.svg', delay: 1.3 },
    { name: 'Python', path: '/python-svgrepo-com.svg', delay: 1.8 },
    { name: 'Docker', path: '/docker-svgrepo-com.svg', delay: 2.3 },
  ];

  // Position icons in an arc pattern (top arc)
  const getArcPosition = (index, total) => {
    // Spread icons across the top in an arc from left to right
    const progress = index / (total - 1); // 0 to 1
    const x = 10 + progress * 80; // 10% to 90% horizontally
    
    // Create arc curve - peaks in the middle, lower at edges
    const curve = Math.sin(progress * Math.PI); // 0 to 1 to 0
    const y = 15 + curve * 15; // 15% to 30% (arc shape)
    
    return { x: `${x}%`, y: `${y}%` };
  };

  return (
    <>
      {/* Desktop: Arc Pattern */}
      <div className="hidden md:block absolute inset-0 pointer-events-none overflow-hidden">
        {icons.map((item, i) => {
          const pos = getArcPosition(i, icons.length);
          return (
            <div 
              key={i} 
              className="absolute flex flex-col items-center gap-2 animate-float pointer-events-auto"
              style={{
                left: pos.x,
                top: pos.y,
                transform: 'translate(-50%, -50%)',
                animationDelay: `${item.delay}s`,
                animationDuration: `${3 + (i % 3)}s`
              }}
            >
              <div className="w-16 h-16 border-4 border-black bg-white flex items-center justify-center shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 p-2">
                <img 
                  src={item.path} 
                  alt={item.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xs font-black uppercase tracking-wider whitespace-nowrap">
                {item.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile: Scrolling Parade */}
      <div className="md:hidden absolute top-0 left-0 right-0 overflow-hidden py-8 pointer-events-none">
        <div className="flex animate-scroll gap-12">
          {/* Triple the icons for seamless infinite loop */}
          {[...icons, ...icons, ...icons].map((item, i) => (
            <div 
              key={i} 
              className="flex-shrink-0 flex flex-col items-center gap-2"
            >
              <div className="w-12 h-12 border-4 border-black bg-white flex items-center justify-center shadow-lg p-1">
                <img 
                  src={item.path} 
                  alt={item.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider whitespace-nowrap">
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