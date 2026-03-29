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
    // Disable dragging when maximized or minimized
    const draggableInstance = Draggable.get(windowRef.current);
    if (draggableInstance) {
      if (isMaximized || isMinimized) {
        draggableInstance.disable();
      } else {
        draggableInstance.enable();
      }
    }
  }, [isMaximized, isMinimized]);

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
          <div className="p-6 sm:p-8 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 min-h-full">
            <div className="mb-10">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-3">
                Tech Stack
              </h2>
              <p className="text-gray-600">Building modern web experiences with cutting-edge tools</p>
            </div>

            {/* Backend */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30">
                  <span className="text-white text-lg">⚙️</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800">Backend</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="group relative bg-white/80 backdrop-blur-sm p-5 rounded-2xl border-2 border-gray-100 hover:border-green-400 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300 hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative">
                    <div className="text-3xl mb-3">🟢</div>
                    <div className="font-bold text-gray-900 mb-1">Node.js</div>
                    <div className="text-xs text-gray-500">JavaScript Runtime</div>
                  </div>
                </div>
                <div className="group relative bg-white/80 backdrop-blur-sm p-5 rounded-2xl border-2 border-gray-100 hover:border-gray-400 hover:shadow-xl hover:shadow-gray-500/10 transition-all duration-300 hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative">
                    <div className="text-3xl mb-3">⚡</div>
                    <div className="font-bold text-gray-900 mb-1">Express</div>
                    <div className="text-xs text-gray-500">Web Framework</div>
                  </div>
                </div>
                <div className="group relative bg-white/80 backdrop-blur-sm p-5 rounded-2xl border-2 border-gray-100 hover:border-green-500 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300 hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative">
                    <div className="text-3xl mb-3">🍃</div>
                    <div className="font-bold text-gray-900 mb-1">MongoDB</div>
                    <div className="text-xs text-gray-500">NoSQL Database</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Frontend */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <span className="text-white text-lg">🎨</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800">Frontend</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="group relative bg-white/80 backdrop-blur-sm p-5 rounded-2xl border-2 border-gray-100 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative">
                    <div className="text-3xl mb-3">⚛️</div>
                    <div className="font-bold text-gray-900 mb-1">React</div>
                    <div className="text-xs text-gray-500">UI Library</div>
                  </div>
                </div>
                <div className="group relative bg-white/80 backdrop-blur-sm p-5 rounded-2xl border-2 border-gray-100 hover:border-orange-400 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative">
                    <div className="text-3xl mb-3">📄</div>
                    <div className="font-bold text-gray-900 mb-1">HTML5</div>
                    <div className="text-xs text-gray-500">Markup Language</div>
                  </div>
                </div>
                <div className="group relative bg-white/80 backdrop-blur-sm p-5 rounded-2xl border-2 border-gray-100 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative">
                    <div className="text-3xl mb-3">🎨</div>
                    <div className="font-bold text-gray-900 mb-1">CSS3</div>
                    <div className="text-xs text-gray-500">Styling</div>
                  </div>
                </div>
                <div className="group relative bg-white/80 backdrop-blur-sm p-5 rounded-2xl border-2 border-gray-100 hover:border-yellow-400 hover:shadow-xl hover:shadow-yellow-500/10 transition-all duration-300 hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative">
                    <div className="text-3xl mb-3">⚡</div>
                    <div className="font-bold text-gray-900 mb-1">JavaScript</div>
                    <div className="text-xs text-gray-500">Programming</div>
                  </div>
                </div>
                <div className="group relative bg-white/80 backdrop-blur-sm p-5 rounded-2xl border-2 border-gray-100 hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative">
                    <div className="text-3xl mb-3">💨</div>
                    <div className="font-bold text-gray-900 mb-1">Tailwind CSS</div>
                    <div className="text-xs text-gray-500">CSS Framework</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Animation */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                  <span className="text-white text-lg">✨</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800">Animation & Interaction</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="group relative bg-white/80 backdrop-blur-sm p-5 rounded-2xl border-2 border-gray-100 hover:border-green-500 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300 hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative">
                    <div className="text-3xl mb-3">✨</div>
                    <div className="font-bold text-gray-900 mb-1">GSAP</div>
                    <div className="text-xs text-gray-500">Animation Library</div>
                  </div>
                </div>
                <div className="group relative bg-white/80 backdrop-blur-sm p-5 rounded-2xl border-2 border-gray-100 hover:border-purple-400 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative">
                    <div className="text-3xl mb-3">🚂</div>
                    <div className="font-bold text-gray-900 mb-1">Locomotive</div>
                    <div className="text-xs text-gray-500">Smooth Scroll</div>
                  </div>
                </div>
                <div className="group relative bg-white/80 backdrop-blur-sm p-5 rounded-2xl border-2 border-gray-100 hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative">
                    <div className="text-3xl mb-3">📜</div>
                    <div className="font-bold text-gray-900 mb-1">ScrollTrigger</div>
                    <div className="text-xs text-gray-500">GSAP Plugin</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Languages */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center shadow-lg shadow-red-500/30">
                  <span className="text-white text-lg">💻</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800">Programming Languages</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="group relative bg-white/80 backdrop-blur-sm p-5 rounded-2xl border-2 border-gray-100 hover:border-red-400 hover:shadow-xl hover:shadow-red-500/10 transition-all duration-300 hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative">
                    <div className="text-3xl mb-3">☕</div>
                    <div className="font-bold text-gray-900 mb-1">Java</div>
                    <div className="text-xs text-gray-500">Object-Oriented</div>
                  </div>
                </div>
                <div className="group relative bg-white/80 backdrop-blur-sm p-5 rounded-2xl border-2 border-gray-100 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative">
                    <div className="text-3xl mb-3">🐍</div>
                    <div className="font-bold text-gray-900 mb-1">Python</div>
                    <div className="text-xs text-gray-500">Versatile & Powerful</div>
                  </div>
                </div>
              </div>
            </div>

            {/* DevOps */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                  <span className="text-white text-lg">🚀</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800">DevOps & Tools</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="group relative bg-white/80 backdrop-blur-sm p-5 rounded-2xl border-2 border-gray-100 hover:border-orange-500 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative">
                    <div className="text-3xl mb-3">🐙</div>
                    <div className="font-bold text-gray-900 mb-1">Git</div>
                    <div className="text-xs text-gray-500">Version Control</div>
                  </div>
                </div>
                <div className="group relative bg-white/80 backdrop-blur-sm p-5 rounded-2xl border-2 border-gray-100 hover:border-blue-600 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative">
                    <div className="text-3xl mb-3">🐳</div>
                    <div className="font-bold text-gray-900 mb-1">Docker</div>
                    <div className="text-xs text-gray-500">Containerization</div>
                  </div>
                </div>
                <div className="group relative bg-white/80 backdrop-blur-sm p-5 rounded-2xl border-2 border-gray-100 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative">
                    <div className="text-3xl mb-3">☸️</div>
                    <div className="font-bold text-gray-900 mb-1">Kubernetes</div>
                    <div className="text-xs text-gray-500">Orchestration</div>
                  </div>
                </div>
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

  useEffect(() => {
    if (isMinimized) {
      gsap.to(windowRef.current, {
        opacity: 0,
        scale: 0.8,
        y: 20,
        duration: 0.3,
        pointerEvents: 'none',
        ease: 'power2.in'
      });
    } else {
      gsap.to(windowRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.4,
        pointerEvents: 'auto',
        ease: 'back.out(1.2)'
      });
    }
  }, [isMinimized]);

  return (
    <div
      ref={windowRef}
      className={`absolute bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300 ${isMaximized ? 'inset-4' : ''
        }`}
      style={isMaximized ? {
        zIndex: 50 + index
      } : {
        left: typeof window !== 'undefined' && window.innerWidth < 640 ? '5%' : `${150 + index * 30}px`,
        top: typeof window !== 'undefined' && window.innerWidth < 640 ? '10%' : `${100 + index * 30}px`,
        width: typeof window !== 'undefined' && window.innerWidth < 640 ? '90%' : typeof window !== 'undefined' && window.innerWidth < 768 ? '80%' : '500px',
        maxHeight: typeof window !== 'undefined' && window.innerWidth < 640 ? '80vh' : '600px',
        zIndex: 50 + index
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

      <div className="overflow-y-auto" style={{
        maxHeight: isMaximized
          ? 'calc(100vh - 8rem)'
          : (typeof window !== 'undefined' && window.innerWidth < 640 ? 'calc(80vh - 3rem)' : '550px')
      }}>
        {getWindowContent()}
      </div>
    </div>
  );
};

export default Window;
