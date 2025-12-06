import { useEffect, useState } from 'react';
import gsap from 'gsap';
import NotesApp from './NotesApp';
import TerminalWindow from './TerminalWindow';
import FinderWindow from './FinderWindow';
import PhotosApp from './PhotosApp';

const Dock = ({ onOpenSpotify, previewOpen, onOpenPreview }) => {
  const [hoveredApp, setHoveredApp] = useState(null);
  const [notesOpen, setNotesOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [finderOpen, setFinderOpen] = useState(false);
  const [photosOpen, setPhotosOpen] = useState(false);
  const [photosMinimized, setPhotosMinimized] = useState(false);

  useEffect(() => {
    gsap.fromTo('.dock', 
      { y: 100 },
      { y: 0, duration: 0.6, delay: 0.3, ease: 'power2.out' }
    );
  }, []);

  const baseDockApps = [
    { id: 1, icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Terminalicon2.png/240px-Terminalicon2.png', name: 'Terminal' },
    { id: 2, icon: '/assets/icons/apple-photos.svg', name: 'Photos' },
    { id: 3, icon: 'https://img.icons8.com/?size=100&id=jHteWfDDRFlK&format=png&color=000000', name: 'Folder' },
    { id: 4, icon: '/assets/icons/apple-notes.svg', name: 'Notes' },
    { id: 5, icon: '/assets/icons/apple-mail.svg', name: 'Mail' },
    { id: 6, icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png', name: 'Spotify' },
  ];

  // Add Preview icon if preview is open
  const dockApps = previewOpen 
    ? [...baseDockApps, { id: 7, icon: '/assets/images/preview.png', name: 'Preview' }]
    : baseDockApps;



  const handleAppClick = (appId) => {
    if (appId === 1) { // Terminal app
      setTerminalOpen(true);
    } else if (appId === 2) { // Photos app
      if (photosMinimized) {
        setPhotosMinimized(false);
      } else {
        setPhotosOpen(true);
      }
    } else if (appId === 3) { // Folder app
      setFinderOpen(true);
    } else if (appId === 4) { // Notes app
      setNotesOpen(true);
    } else if (appId === 5) { // Mail app
      window.location.href = 'mailto:mohish.workk@gmail.com';
    } else if (appId === 6) { // Spotify app
      if (onOpenSpotify) {
        onOpenSpotify();
      }
    } else if (appId === 7) { // Preview app
      if (onOpenPreview) {
        onOpenPreview();
      }
    }
  };

  return (
    <>
      {terminalOpen && <TerminalWindow onClose={() => setTerminalOpen(false)} />}
      {photosOpen && (
        <PhotosApp 
          onClose={() => {
            setPhotosOpen(false);
            setPhotosMinimized(false);
          }}
          onMinimize={() => setPhotosMinimized(true)}
          isMinimized={photosMinimized}
        />
      )}
      {finderOpen && <FinderWindow onClose={() => setFinderOpen(false)} onOpenPreview={onOpenPreview} />}
      {notesOpen && <NotesApp onClose={() => setNotesOpen(false)} />}
      
      <div 
        className="dock fixed left-0 right-0 z-50 pointer-events-none"
        style={{
          bottom: 'calc(env(safe-area-inset-bottom, 0px) + 3.5rem)',
        }}
      >
        <div className="flex justify-center px-2 pointer-events-auto">
          <div className="bg-white/10 backdrop-blur-3xl rounded-2xl sm:rounded-[24px] px-2 sm:px-4 py-1.5 sm:py-3 border border-white/20 shadow-2xl">
            <div className="flex items-end gap-1.5 sm:gap-3 relative">
            {dockApps.map((app) => (
            <div
              key={app.id}
              className="relative group"
              onMouseEnter={() => setHoveredApp(app.id)}
              onMouseLeave={() => setHoveredApp(null)}
            >
              {/* Tooltip with Triangle Arrow */}
              {hoveredApp === app.id && (
                <div 
                  className="absolute -top-16 left-1/2 -translate-x-1/2 z-[100] pointer-events-none animate-fade-in"
                >
                  <div className="relative bg-gray-800/95 backdrop-blur-xl text-white text-xs sm:text-sm font-medium px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl">
                    {app.name}
                    {/* Triangle Arrow pointing down */}
                    <div 
                      className="absolute left-1/2 -translate-x-1/2"
                      style={{
                        top: '100%',
                        width: 0,
                        height: 0,
                        borderLeft: '6px solid transparent',
                        borderRight: '6px solid transparent',
                        borderTop: '6px solid rgba(31, 41, 55, 0.95)',
                      }}
                    />
                  </div>
                </div>
              )}
              
              {/* App Icon */}
              <div 
                className="w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center cursor-pointer transition-transform duration-300 overflow-hidden bg-transparent active:scale-95"
                onClick={() => handleAppClick(app.id)}
              >
                <img 
                  src={app.icon} 
                  alt={app.name} 
                  className={`${app.id === 3 ? 'w-[120%] h-[120%] object-cover' : 'w-full h-full object-cover'}`}
                  loading="eager"
                  decoding="async"
                  fetchpriority="high"
                />
              </div>
            </div>
          ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dock;
