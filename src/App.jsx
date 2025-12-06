import { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import LoginScreen from './components/LoginScreen';
import Desktop from './components/Desktop';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDesktop, setShowDesktop] = useState(false);

  // Preload critical images
  useEffect(() => {
    const preloadImages = [
      '/assets/images/landing.png',
      '/assets/images/Login.png'
    ];

    preloadImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      link.fetchPriority = 'high';
      document.head.appendChild(link);
    });
  }, []);

  // Hide initial HTML loader once React is ready
  useEffect(() => {
    const initialLoader = document.getElementById('initial-loader');
    if (initialLoader) {
      initialLoader.style.display = 'none';
    }
  }, []);

  const handleLogin = () => {
    setShowDesktop(true);
    setTimeout(() => {
      setIsLoggedIn(true);
    }, 100);
  };

  return (
    <div className="w-screen h-screen fixed inset-0 overflow-hidden bg-black">
      {/* Loading Screen - Always render first with highest z-index */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      
      {/* Background image for desktop screen - hidden until logged in */}
      <div 
        className={`absolute top-0 left-0 w-full h-full z-0 transition-all duration-1000 ease-out ${isLoggedIn ? 'opacity-100 scale-100' : 'opacity-0 scale-105 invisible'}`}
        style={{
          backgroundImage: isLoggedIn ? `url('/assets/images/landing.png')` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      {/* Login Screen - render immediately but keep hidden during loading */}
      <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out z-10 bg-black ${isLoading ? 'opacity-0' : isLoggedIn ? 'opacity-0 pointer-events-none invisible' : 'opacity-100'}`}>
        <LoginScreen onLogin={handleLogin} isVisible={!isLoading && !isLoggedIn} />
      </div>
      
      {/* Desktop - render after login */}
      <div className={`absolute inset-0 z-10 ${isLoggedIn ? '' : 'pointer-events-none hidden'}`}>
        {showDesktop && (
          <Desktop onLogout={() => {
            setIsLoggedIn(false);
            setTimeout(() => setShowDesktop(false), 700);
          }} />
        )}
      </div>
    </div>
  );
}

export default App;
