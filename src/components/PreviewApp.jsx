import { useState } from 'react';

const PreviewApp = ({ onClose, onMinimize, isMinimized, filePath, fileName }) => {
  const [isMaximized, setIsMaximized] = useState(false);

  return (
    <div className={`fixed inset-0 z-[60] flex items-center justify-center pb-16 px-4 pointer-events-none transition-opacity duration-300 ${isMinimized ? 'opacity-0 pointer-events-none' : ''}`}>
      <div
        className={`relative bg-[#2d2d2d] rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col border border-gray-700 pointer-events-auto ${isMaximized
          ? 'w-full h-full max-w-none max-h-none m-0 transition-all duration-300'
          : 'w-full max-w-5xl h-[85vh] max-h-[900px] transition-all duration-300'
          }`}
        role="dialog"
        aria-label="Preview window"
      >
        {/* Preview Header */}
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

          {/* Preview Title */}
          <div className="absolute left-1/2 -translate-x-1/2 text-gray-300 text-sm font-medium">
            {fileName}
          </div>

          {/* Toolbar Icons */}
          <div className="flex gap-3 items-center">
            <button className="text-gray-400 hover:text-white transition-colors" title="Share">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
            <button className="text-gray-400 hover:text-white transition-colors" title="Markup">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 bg-[#2d2d2d] overflow-auto flex items-center justify-center p-4">
          <div className="w-full h-full bg-white rounded-lg shadow-2xl overflow-hidden">
            <iframe
              src={filePath}
              className="w-full h-full"
              title={fileName}
            />
          </div>
        </div>

        {/* Bottom Toolbar */}
        <div className="bg-[#3a3a3a] px-4 py-2 border-t border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="text-gray-400 hover:text-white transition-colors" title="Zoom Out">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
              </svg>
            </button>
            <span className="text-xs text-gray-400">100%</span>
            <button className="text-gray-400 hover:text-white transition-colors" title="Zoom In">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </button>
          </div>

          <div className="text-xs text-gray-400">
            Page 1 of 1
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewApp;
