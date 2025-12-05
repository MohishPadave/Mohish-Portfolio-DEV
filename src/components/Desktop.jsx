import { useEffect, useState } from 'react';
import gsap from 'gsap';
import MenuBar from './MenuBar';
import Dock from './Dock';
import DesktopIcon from './DesktopIcon';
import Window from './Window';
import ControlCenter from './ControlCenter';
import SpotifyWindow from './SpotifyWindow';
import PreviewApp from './PreviewApp';
import WelcomeTour from './WelcomeTour';

const Desktop = ({ onLogout }) => {
  const [openWindows, setOpenWindows] = useState([]);
  const [controlCenterOpen, setControlCenterOpen] = useState(false);
  const [screenBrightness, setScreenBrightness] = useState(90);
  const [spotifyOpen, setSpotifyOpen] = useState(false);
  const [spotifyMinimized, setSpotifyMinimized] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [showTour, setShowTour] = useState(false);

  useEffect(() => {
    // Check if user has seen the tour before
    const tourCompleted = localStorage.getItem('portfolioTourCompleted');
    if (!tourCompleted) {
      // Show tour after a short delay
      setTimeout(() => {
        setShowTour(true);
      }, 1500);
    }
  }, []);

  // Add keyboard shortcut to reset tour (Cmd/Ctrl + Shift + T)
  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'T') {
        localStorage.removeItem('portfolioTourCompleted');
        setShowTour(true);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  useEffect(() => {
    gsap.fromTo('.desktop-content', 
      { scale: 0.98 },
      { scale: 1, duration: 0.5, delay: 0.1, ease: 'power2.out' }
    );
  }, []);

  const desktopIcons = [
    { id: 1, name: 'About Me', icon: 'https://img.icons8.com/?size=100&id=jHteWfDDRFlK&format=png&color=000000', type: 'folder' },
    { id: 2, name: 'LinkedIn', icon: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png', type: 'link', url: 'https://www.linkedin.com/in/mohish-padave' },
    { id: 3, name: 'GitHub', icon: 'https://cdn-icons-png.flaticon.com/512/25/25231.png', type: 'link', url: 'https://github.com/MohishPadave' },
    { id: 4, name: 'Tech Stack', icon: 'https://img.icons8.com/?size=100&id=jHteWfDDRFlK&format=png&color=000000', type: 'folder' },
    { id: 5, name: 'My Resume', icon: 'https://cdn-icons-png.flaticon.com/512/337/337946.png', type: 'resume' },
    { id: 6, name: 'My Projects', icon: 'https://img.icons8.com/?size=100&id=jHteWfDDRFlK&format=png&color=000000', type: 'folder' },
  ];

  const handleIconClick = (icon) => {
    if (icon.type === 'link') {
      // Open external links in new tab (GitHub/LinkedIn don't allow iframe embedding)
      window.open(icon.url, '_blank');
    } else if (icon.type === 'resume') {
      // Open resume in Preview app
      setPreviewOpen(true);
    } else if (icon.type === 'folder' || icon.type === 'file') {
      const existingWindow = openWindows.find(w => w.id === icon.id);
      if (existingWindow) {
        // If window exists and is minimized, restore it
        if (existingWindow.minimized) {
          setOpenWindows(openWindows.map(w => 
            w.id === icon.id ? { ...w, minimized: false } : w
          ));
        }
      } else {
        // Open new window
        setOpenWindows([...openWindows, { ...icon, minimized: false }]);
      }
    }
  };

  const handleCloseWindow = (id) => {
    setOpenWindows(openWindows.filter(w => w.id !== id));
  };

  return (
    <div className="desktop w-screen h-screen fixed inset-0 overflow-hidden">
      {/* Brightness Overlay */}
      <div 
        className="absolute inset-0 bg-black pointer-events-none z-[100]"
        style={{ 
          opacity: (100 - screenBrightness) / 100,
          transition: 'opacity 0.2s ease'
        }}
      />
      
      <div className="desktop-content absolute inset-0">
        <MenuBar 
          onControlCenterClick={() => setControlCenterOpen(!controlCenterOpen)}
          onLogout={onLogout}
        />
        
        <div className="absolute top-8 sm:top-10 md:top-12 lg:top-16 left-2 sm:left-3 md:left-4 grid grid-cols-1 gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 z-10">
          {desktopIcons.map((icon, index) => (
            <DesktopIcon 
              key={icon.id}
              icon={icon}
              onClick={() => handleIconClick(icon)}
              delay={index * 0.05}
            />
          ))}
        </div>

        {openWindows.map((window, index) => (
          <Window
            key={window.id}
            window={window}
            onClose={() => handleCloseWindow(window.id)}
            onMinimize={() => {
              setOpenWindows(openWindows.map(w => 
                w.id === window.id ? { ...w, minimized: true } : w
              ));
            }}
            isMinimized={window.minimized}
            index={index}
          />
        ))}

        <ControlCenter 
          isOpen={controlCenterOpen} 
          onClose={() => setControlCenterOpen(false)}
          onBrightnessChange={(value) => setScreenBrightness(value)}
          onOpenSpotify={() => {
            setSpotifyOpen(true);
            setSpotifyMinimized(false);
          }}
        />

        {spotifyOpen && (
          <SpotifyWindow 
            onClose={() => {
              setSpotifyOpen(false);
              setSpotifyMinimized(false);
            }}
            isMinimized={spotifyMinimized}
            onMinimize={() => setSpotifyMinimized(!spotifyMinimized)}
          />
        )}

        {previewOpen && (
          <PreviewApp 
            onClose={() => setPreviewOpen(false)}
            filePath="/assets/documents/resume.pdf"
            fileName="Resume.pdf"
          />
        )}

        {showTour && <WelcomeTour onComplete={() => setShowTour(false)} />}

        <Dock 
          onOpenSpotify={() => {
            setSpotifyOpen(true);
            setSpotifyMinimized(false);
          }}
          previewOpen={previewOpen}
          onOpenPreview={() => setPreviewOpen(true)}
        />
      </div>
    </div>
  );
};

export default Desktop;
