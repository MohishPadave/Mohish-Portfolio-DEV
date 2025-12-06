import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const DesktopIcon = ({ icon, onClick, delay }) => {
  const iconRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(iconRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.4, delay }
    );
  }, [delay]);

  const isImageIcon = typeof icon.icon === 'string' && icon.icon.startsWith('http');

  return (
    <div
      ref={iconRef}
      onClick={onClick}
      className="flex flex-col items-center gap-0.5 sm:gap-1 cursor-pointer group w-14 sm:w-16 md:w-20"
    >
      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg flex items-center justify-center text-2xl sm:text-3xl group-hover:bg-white/10 transition-all">
        {isImageIcon ? (
          <img 
            src={icon.icon} 
            alt={icon.name} 
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain drop-shadow-lg"
            loading="eager"
            decoding="async"
            fetchpriority="high"
          />
        ) : (
          <span className="drop-shadow-lg">{icon.icon}</span>
        )}
      </div>
      <div className="text-white text-[10px] sm:text-xs text-center font-medium drop-shadow-lg px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
        {icon.name}
      </div>
    </div>
  );
};

export default DesktopIcon;
