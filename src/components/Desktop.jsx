import { useEffect, useState, lazy, Suspense } from 'react';
import gsap from 'gsap';
import useStore from '../store/useStore';
import MenuBar from './MenuBar';
import Dock from './Dock';
import DesktopIcon from './DesktopIcon';
import Window from './Window';
import ControlCenter from './ControlCenter';
const SpotifyWindow = lazy(() => import('./SpotifyWindow'));
const PreviewApp = lazy(() => import('./PreviewApp'));
const WelcomeTour = lazy(() => import('./WelcomeTour'));
const NotesApp = lazy(() => import('./NotesApp'));
const TerminalWindow = lazy(() => import('./TerminalWindow'));
const PhotosApp = lazy(() => import('./PhotosApp'));
const FinderWindow = lazy(() => import('./FinderWindow'));
const CalendarApp = lazy(() => import('./CalendarApp'));
const ProjectViewerApp = lazy(() => import('./ProjectViewerApp'));
import StageManager from './StageManager';
import WidgetsPanel from './WidgetsPanel';

const Desktop = ({ onLogout }) => {
  const {
    apps,
    openWindows,
    toggleApp,
    bringToFront,
    closeApp,
    controlCenterOpen,
    setControlCenterOpen,
    screenBrightness,
    setScreenBrightness
  } = useStore();

  const [showTour, setShowTour] = useState(false);

  useEffect(() => {
    // Check if user has seen the tour before
    const tourCompleted = localStorage.getItem('portfolioTourCompleted');
    if (!tourCompleted) {
      setTimeout(() => {
        setShowTour(true);
      }, 1500);
    }

    // Auto-open Notes app on first load
    setTimeout(() => {
      toggleApp('notes', { isOpen: true, isMinimized: false });
    }, 800);
  }, []);

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
    { id: 1, name: 'Interactive Portfolio', icon: '/assets/icons/finder.webp', type: 'link', url: 'https://www.google.com' },
    { id: 2, name: 'LinkedIn', icon: '/assets/icons/linkedin.webp', type: 'link', url: 'https://www.linkedin.com/in/mohish-padave' },
    { id: 3, name: 'GitHub', icon: '/assets/icons/github.webp', type: 'link', url: 'https://github.com/MohishPadave' },
    { id: 4, name: 'Tech Stack', icon: '/assets/icons/finder.webp', type: 'folder' },
    { id: 5, name: 'My Resume', icon: '/assets/icons/resume.webp', type: 'resume' },
  ];

  const handleIconClick = (icon) => {
    if (icon.type === 'link') {
      window.open(icon.url, '_blank');
    } else if (icon.type === 'resume') {
      toggleApp('preview', { isOpen: true, isMinimized: false });
    } else if (icon.type === 'folder' || icon.type === 'file') {
      // For now, folder/file icons open Finder as a demonstration
      toggleApp('finder', { isOpen: true, isMinimized: false });
    }
  };

  const getMinimizedApps = () => {
    const minimized = [];
    Object.entries(apps).forEach(([key, app]) => {
      if (app.isMinimized && app.isOpen) {
        minimized.push({ ...app, key });
      }
    });
    return minimized;
  };

  const handleRestore = (app) => {
    toggleApp(app.key, { isMinimized: false });
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
          onLogout={onLogout}
          onStartTour={() => {
            localStorage.removeItem('portfolioTourCompleted');
            setShowTour(true);
          }}
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

        {openWindows.map((windowId, index) => {
          // This allows for generic windows if needed in the future
          // For now, the store manages app windows separately
          return null;
        })}

        <ControlCenter onClose={() => setControlCenterOpen(false)} />

        <WidgetsPanel onCalendarClick={() => toggleApp('calendar', { isOpen: true, isMinimized: false })} />

        <Suspense fallback={null}>
          {showTour && <WelcomeTour onComplete={() => setShowTour(false)} />}

          {apps.notes.isOpen && (
            <NotesApp
              onClose={() => closeApp('notes')}
              onMinimize={() => toggleApp('notes', { isMinimized: true })}
              isMinimized={apps.notes.isMinimized}
            />
          )}

          {apps.terminal.isOpen && (
            <TerminalWindow
              onClose={() => closeApp('terminal')}
              onMinimize={() => toggleApp('terminal', { isMinimized: true })}
              isMinimized={apps.terminal.isMinimized}
            />
          )}

          {apps.photos.isOpen && (
            <PhotosApp
              onClose={() => closeApp('photos')}
              onMinimize={() => toggleApp('photos', { isMinimized: true })}
              isMinimized={apps.photos.isMinimized}
            />
          )}

          {apps.finder.isOpen && (
            <FinderWindow
              onClose={() => closeApp('finder')}
              onMinimize={() => toggleApp('finder', { isMinimized: true })}
              isMinimized={apps.finder.isMinimized}
              onOpenPreview={() => toggleApp('preview', { isOpen: true, isMinimized: false })}
              onOpenProjectViewer={(projectName) => toggleApp('projectViewer', { isOpen: true, isMinimized: false, projectName })}
            />
          )}

          {apps.spotify.isOpen && (
            <SpotifyWindow
              onClose={() => closeApp('spotify')}
              isMinimized={apps.spotify.isMinimized}
              onMinimize={() => toggleApp('spotify', { isMinimized: !apps.spotify.isMinimized })}
            />
          )}

          {apps.preview.isOpen && (
            <PreviewApp
              onClose={() => closeApp('preview')}
              onMinimize={() => toggleApp('preview', { isMinimized: true })}
              isMinimized={apps.preview.isMinimized}
              filePath="/assets/documents/resume.pdf"
              fileName="Resume.pdf"
            />
          )}

          {apps.projectViewer?.isOpen && (
            <ProjectViewerApp
              onClose={() => closeApp('projectViewer')}
              onMinimize={() => toggleApp('projectViewer', { isMinimized: true })}
              isMinimized={apps.projectViewer.isMinimized}
              projectName={apps.projectViewer.projectName || "Project1"}
            />
          )}

          {apps.calendar.isOpen && (
            <CalendarApp
              onClose={() => closeApp('calendar')}
              onMinimize={() => toggleApp('calendar', { isMinimized: true })}
              isMinimized={apps.calendar.isMinimized}
            />
          )}
        </Suspense>

        <StageManager
          minimizedApps={getMinimizedApps()}
          onRestore={handleRestore}
        />

        <Dock />
      </div>
    </div>
  );
};

export default Desktop;
