import React, { useState, useEffect } from 'react';

export default function SplashScreen({ onComplete }) {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Start fade out after 1.5 seconds
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 1500);

    // Complete and remove after fade animation
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2000); // 1500ms display + 500ms fade

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 bg-white z-[9999] flex items-center justify-center transition-opacity duration-500 ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <p className="text-lg italic text-gray-800 font-serif">
        Gloria in excelsis Deo!
      </p>
    </div>
  );
}