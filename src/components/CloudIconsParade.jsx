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

  // Position icons in a cluster at top-right corner of profile picture
  const getCornerPosition = (index, total) => {
    // Create a scattered cluster effect
    const positions = [
      { x: 25, y: 60 },  // Top right
      { x: 42.1, y: 62 },  // Far right
      { x: 20.01, y: 70 },  // Mid right
      { x: 20, y: 50 },  // Lower right
      { x: 48, y: 75 },  // Far corner
      { x: 40, y: 85 },  // Bottom cluster
      { x: 85, y: 10 },  // Top cluster
      { x: 95, y: 30 },  // Edge
      { x: 80, y: 15 },  // Upper mid
      { x: 70, y: 20 },  // Left cluster
      { x: 90, y: 35 },  // Bottom right
    ];
    
    const pos = positions[index % positions.length];
    return { x: `${pos.x}%`, y: `${pos.y}%` };
  };

  return (
    <>
      {/* Desktop: Corner Cluster */}


      {/* Mobile: Scrolling Parade */}
      <div className="md:hidden absolute top-0 left-0 right-0 overflow-hidden py-8 pointer-events-none" style={{ zIndex: 20 }}>
        <div className="flex animate-scroll gap-12">
          {/* Triple the icons for seamless infinite loop */}
          {[...icons, ...icons, ...icons].map((item, i) => (
            <div 
              key={i} 
              className="flex-shrink-0 flex flex-col items-center gap-2"
            >
              <div className="w-12 h-12 border-4 border-black bg-white flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-1">
                <img 
                  src={item.path} 
                  alt={item.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider whitespace-nowrap bg-white px-2 py-1 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
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