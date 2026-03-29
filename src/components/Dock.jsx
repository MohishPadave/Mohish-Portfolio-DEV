import { useEffect, useState } from 'react';
import gsap from 'gsap';
import useStore from '../store/useStore';

const Dock = () => {
  const { apps, toggleApp } = useStore();
  const [hoveredApp, setHoveredApp] = useState(null);

  useEffect(() => {
    gsap.fromTo('.dock',
      { y: 100 },
      { y: 0, duration: 0.6, delay: 0.3, ease: 'power2.out' }
    );
  }, []);

  const baseDockApps = [
    { id: 1, key: 'terminal', icon: '/assets/icons/terminal.png?v=2', name: 'Terminal' },
    { id: 2, key: 'photos', icon: '/assets/icons/apple-photos.svg', name: 'Photos' },
    { id: 3, key: 'finder', icon: '/assets/icons/finder.webp', name: 'Folder' },
    { id: 4, key: 'notes', icon: '/assets/icons/apple-notes.svg', name: 'Notes' },
    { id: 5, key: 'mail', icon: '/assets/icons/apple-mail.svg', name: 'Mail' },
    { id: 6, key: 'spotify', icon: '/assets/icons/spotify.webp', name: 'Spotify' },
  ];

  // Add Preview icon if preview is open
  const dockApps = apps.preview.isOpen
    ? [...baseDockApps, { id: 7, key: 'preview', icon: '/assets/images/preview.webp', name: 'Preview' }]
    : baseDockApps;

  const handleAppClick = (app) => {
    if (app.key === 'mail') {
      window.location.href = 'mailto:mohish.workk@gmail.com';
      return;
    }

    // Toggle app open and make sure it's not minimized
    toggleApp(app.key, { isOpen: true, isMinimized: false });
  };

  return (
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
                {/* App Icon */}
                <div
                  className={`w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center cursor-pointer transition-transform duration-300 overflow-hidden bg-transparent active:scale-95 relative ${apps && apps[app.key]?.isOpen ? 'after:content-[""] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-white after:rounded-full after:shadow-[0_0_5px_white]' : ''
                    }`}
                  onClick={() => handleAppClick(app)}
                >
                  <img
                    src={app.icon}
                    alt={app.name}
                    className={`${app.id === 3 ? 'w-[120%] h-[120%] object-cover' : 'w-full h-full object-cover'} ${apps && apps[app.key]?.isMinimized ? 'opacity-50' : ''}`}
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dock;
