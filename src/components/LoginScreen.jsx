import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const LoginScreen = ({ onLogin, isVisible }) => {
  const timeRef = useRef(null);
  const dateRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordDots, setPasswordDots] = useState(0);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const timeString = `${hours}:${minutes.toString().padStart(2, '0')}`;
      
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const dayName = days[now.getDay()];
      const monthName = months[now.getMonth()];
      const day = now.getDate();
      
      const dateString = `${dayName} ${monthName} ${day}`;
      
      if (timeRef.current) timeRef.current.textContent = timeString;
      if (dateRef.current) dateRef.current.textContent = dateString;
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  // Trigger animations only when visible
  useEffect(() => {
    if (!isVisible) return;

    gsap.fromTo('.login-content', 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.3 }
    );

    // Show password field after a short delay
    const passwordTimeout = setTimeout(() => {
      setShowPassword(true);
      // Animate password dots one by one with smooth timing
      let dotCount = 0;
      const dotInterval = setInterval(() => {
        dotCount++;
        setPasswordDots(dotCount);
        if (dotCount >= 8) {
          clearInterval(dotInterval);
        }
      }, 200);
    }, 1000);

    return () => clearTimeout(passwordTimeout);
  }, [isVisible]);

  const handleLogin = () => {
    gsap.to('.login-content', {
      opacity: 0,
      scale: 1.05,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: onLogin
    });
  };

  return (
    <div className="login-screen w-screen h-screen fixed inset-0 overflow-hidden bg-black">
      {/* Background video for login screen */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        preload="auto"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        style={{ 
          minWidth: '100%',
          minHeight: '100%',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          backgroundColor: '#000000'
        }}
      >
        <source src="/assets/videos/Tahoe Day.mov" type="video/mp4" />
      </video>
      
      {/* Fallback image for login screen - only show if video fails to load */}
      <div 
        className="absolute top-0 left-0 w-full h-full -z-10 bg-black"
        style={{
          backgroundImage: `url('/assets/images/Login.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.95
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20"></div>
      
      <div className="absolute top-2 right-4 flex items-center gap-3 text-white text-[13px]">
        <div className="opacity-80 font-medium">U.S.</div>
        <svg className="w-4 h-4 opacity-80" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd"/>
        </svg>
        <svg className="w-4 h-4 opacity-80" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"/>
        </svg>
      </div>

      <div className="login-content absolute inset-0 flex flex-col items-center justify-center -mt-8 px-4">
        <div className="text-center mb-10 md:mb-20">
          <div ref={dateRef} className="text-white/95 text-base md:text-[18px] font-light mb-3 tracking-wide drop-shadow-lg">
            Mon Dec 1
          </div>
          <div ref={timeRef} className="text-white text-7xl sm:text-9xl md:text-[140px] lg:text-[180px] font-extralight leading-none tracking-tighter drop-shadow-2xl" style={{ fontWeight: 100 }}>
            9:52
          </div>
        </div>

        <div className="mt-16 md:mt-32">
          <div className="flex flex-col items-center gap-4 md:gap-5">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center text-white text-3xl md:text-4xl font-semibold shadow-[0_8px_32px_rgba(59,130,246,0.5)] ring-4 ring-white/20">
              M
            </div>
            <div className="text-white text-base md:text-lg font-medium tracking-wide drop-shadow-lg">Mohish Padave</div>
            
            {showPassword && (
              <div className="mt-3 md:mt-4 animate-fadeIn w-full max-w-xs">
                <button
                  onClick={handleLogin}
                  className="group relative w-full"
                >
                  <div className="w-full h-11 md:h-12 bg-white/20 backdrop-blur-2xl rounded-xl flex items-center px-4 md:px-5 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:bg-white/30 transition-all duration-300 cursor-pointer border border-white/30 hover:border-white/50">
                    <div className="flex-1 text-left text-white text-base md:text-lg tracking-[0.3em] font-light">
                      {'•'.repeat(passwordDots)}
                    </div>
                    <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-white/30 flex items-center justify-center group-hover:bg-white/50 transition-all duration-300 flex-shrink-0 backdrop-blur-sm">
                      <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </button>
                <div className="text-center mt-4 text-white/60 text-xs md:text-sm">
                  Click to enter
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
