import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

const Window = ({ window: windowData, onClose, onMinimize, isMinimized, index }) => {
  const windowRef = useRef(null);
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    gsap.fromTo(windowRef.current,
      { opacity: 0, scale: 0.8, y: 50 },
      { opacity: 1, scale: 1, y: 0, duration: 0.3 }
    );

    const draggableInstance = Draggable.create(windowRef.current, {
      trigger: windowRef.current.querySelector('.window-header'),
      bounds: 'body',
      type: 'x,y',
      inertia: true,
      edgeResistance: 0.65,
      dragResistance: 0,
      throwResistance: 2500
    });

    return () => {
      if (draggableInstance[0]) {
        draggableInstance[0].kill();
      }
    };
  }, []);

  useEffect(() => {
    // Disable dragging when maximized
    const draggableInstance = Draggable.get(windowRef.current);
    if (draggableInstance) {
      if (isMaximized) {
        draggableInstance.disable();
      } else {
        draggableInstance.enable();
      }
    }
  }, [isMaximized]);

  const handleClose = () => {
    gsap.to(windowRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.2,
      onComplete: onClose
    });
  };

  const getWindowContent = () => {
    switch (windowData.name) {
      case 'About Me':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">About Me</h2>
            <p className="text-gray-700 mb-4">
              Hi! I'm a passionate developer creating amazing web experiences.
            </p>
            <p className="text-gray-700">
              I specialize in React, Tailwind CSS, and modern web technologies.
            </p>
          </div>
        );
      case 'Tech Stack':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Tech Stack</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl mb-2">⚛️</div>
                <div className="font-semibold">React</div>
              </div>
              <div className="p-4 bg-cyan-50 rounded-lg">
                <div className="text-2xl mb-2">🎨</div>
                <div className="font-semibold">Tailwind CSS</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-2xl mb-2">🟢</div>
                <div className="font-semibold">Node.js</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl mb-2">✨</div>
                <div className="font-semibold">GSAP</div>
              </div>
            </div>
          </div>
        );
      case 'My Projects':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">My Projects</h2>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-lg">Project 1</h3>
                <p className="text-gray-600 text-sm">A cool web application</p>
              </div>
              <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-lg">Project 2</h3>
                <p className="text-gray-600 text-sm">Another awesome project</p>
              </div>
            </div>
          </div>
        );
      case 'Contact':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Contact Me</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xl">📧</span>
                <span>email@example.com</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl">💼</span>
                <span>linkedin.com/in/yourprofile</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl">🐙</span>
                <span>github.com/yourprofile</span>
              </div>
            </div>
          </div>
        );
      case 'My Resume':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">My Resume</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">Experience</h3>
                <p className="text-gray-700">Senior Developer at Company XYZ</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Education</h3>
                <p className="text-gray-700">Computer Science Degree</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Skills</h3>
                <p className="text-gray-700">React, JavaScript, CSS, Node.js</p>
              </div>
            </div>
          </div>
        );
      default:
        return <div className="p-6">Content for {windowData.name}</div>;
    }
  };

  if (isMinimized) {
    return null;
  }

  return (
    <div
      ref={windowRef}
      className={`absolute bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300 ${
        isMaximized ? 'inset-4' : ''
      }`}
      style={isMaximized ? {
        zIndex: 10 + index
      } : {
        left: typeof window !== 'undefined' && window.innerWidth < 640 ? '5%' : `${150 + index * 30}px`,
        top: typeof window !== 'undefined' && window.innerWidth < 640 ? '10%' : `${100 + index * 30}px`,
        width: typeof window !== 'undefined' && window.innerWidth < 640 ? '90%' : typeof window !== 'undefined' && window.innerWidth < 768 ? '80%' : '500px',
        maxHeight: typeof window !== 'undefined' && window.innerWidth < 640 ? '80vh' : '600px',
        zIndex: 10 + index
      }}
    >
      <div className="window-header bg-gradient-to-r from-gray-100 to-gray-200 px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between cursor-move border-b">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={handleClose}
            className="window-control w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500 hover:bg-red-600 transition-all shadow-sm group relative"
            title="Close"
          >
            <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <svg className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-black/60" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="2">
                <path d="M2 2l8 8M10 2l-8 8" />
              </svg>
            </span>
          </button>
          <button 
            onClick={onMinimize}
            className="window-control w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-all shadow-sm group relative"
            title="Minimize"
          >
            <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <svg className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-black/60" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="2">
                <path d="M2 6h8" />
              </svg>
            </span>
          </button>
          <button 
            onClick={() => setIsMaximized(!isMaximized)}
            className="window-control w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500 hover:bg-green-600 transition-all shadow-sm group relative"
            title="Maximize"
          >
            <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <svg className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-black/60" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 2h3v3M10 10H7V7M10 2H7v3M2 10h3V7" />
              </svg>
            </span>
          </button>
        </div>
        <div className="text-xs sm:text-sm font-medium text-gray-700">{windowData.name}</div>
        <div className="w-8 sm:w-12" />
      </div>
      
      <div className="overflow-y-auto" style={{ maxHeight: typeof window !== 'undefined' && window.innerWidth < 640 ? 'calc(80vh - 3rem)' : '550px' }}>
        {getWindowContent()}
      </div>
    </div>
  );
};

export default Window;
