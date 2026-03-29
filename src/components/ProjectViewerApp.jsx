import { useState } from 'react';
import Project1Details from './Project1Details';

const ProjectViewerApp = ({ onClose, onMinimize, isMinimized, projectName }) => {
  const [isMaximized, setIsMaximized] = useState(false);

  return (
    <div className={`fixed inset-0 z-[60] flex items-center justify-center pb-16 px-4 pointer-events-none transition-opacity duration-300 ${isMinimized ? 'opacity-0 pointer-events-none' : ''}`}>
      <div
        className={`relative bg-[#2d2d2d] rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col border border-gray-700 pointer-events-auto ${isMaximized
          ? 'w-full h-full max-w-none max-h-none m-0 transition-all duration-300'
          : 'w-full max-w-5xl h-[85vh] max-h-[900px] transition-all duration-300'
          }`}
        role="dialog"
        aria-label="Project Viewer window"
      >
        {/* Header */}
        <div className="bg-[#3a3a3a] px-4 py-2.5 flex items-center justify-between border-b border-gray-700">
          {/* Window Controls */}
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="window-control w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff4136] transition-all shadow-sm group relative"
              title="Close"
            >
              <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-2 h-2 text-black/60" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="2">
                  <path d="M2 2l8 8M10 2l-8 8" />
                </svg>
              </span>
            </button>
            <button
              onClick={onMinimize}
              className="window-control w-3 h-3 rounded-full bg-[#febc2e] hover:bg-[#ffb700] transition-all shadow-sm group relative"
              title="Minimize"
            >
              <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-2 h-2 text-black/60" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="2">
                  <path d="M2 6h8" />
                </svg>
              </span>
            </button>
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="window-control w-3 h-3 rounded-full bg-[#28c840] hover:bg-[#20a030] transition-all shadow-sm group relative"
              title="Maximize"
            >
              <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-2 h-2 text-black/60" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 2h3v3M10 10H7V7M10 2H7v3M2 10h3V7" />
                </svg>
              </span>
            </button>
          </div>

          {/* Title */}
          <div className="absolute left-1/2 -translate-x-1/2 text-gray-300 text-sm font-medium">
            {projectName}
          </div>

          {/* Spacer for flex balance */}
          <div className="flex gap-3 items-center w-[60px]"></div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden relative bg-[#111] rounded-b-lg">
          <div className="absolute inset-0 w-full h-full">
            {projectName === 'Project1' && <Project1Details />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectViewerApp;
