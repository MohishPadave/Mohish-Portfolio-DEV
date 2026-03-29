import { useState } from 'react';

const FinderWindow = ({ onClose, onOpenPreview, onMinimize, isMinimized, onOpenProjectViewer }) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [openedFolder, setOpenedFolder] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const folders = [
    { id: 1, name: 'Project1', type: 'folder' },
    { id: 2, name: 'Project2', type: 'folder' },
    { id: 3, name: 'Project3', type: 'folder' },
    { id: 4, name: 'Project4', type: 'folder' },
    { id: 5, name: 'Project5', type: 'folder' },
    { id: 6, name: 'Project6', type: 'folder' },
    { id: 7, name: 'Project7', type: 'folder' },
    { id: 8, name: 'Project8', type: 'folder' },
    { id: 9, name: 'Project9', type: 'folder' },
    { id: 10, name: 'Project10', type: 'folder' },
  ];

  const handleFolderClick = (folder) => {
    setSelectedFolder(folder);
    setSelectedFile(null);
  };

  const handleFolderDoubleClick = (folder) => {
    if (folder.name === 'Project1') {
      if (onOpenProjectViewer) {
        onOpenProjectViewer(folder.name);
      }
      return;
    }
    setOpenedFolder(folder);
    setSelectedFolder(null);
    setSelectedFile(null);
  };

  const handleBackClick = () => {
    setOpenedFolder(null);
    setSelectedFile(null);
  };

  const handleFileClick = (file) => {
    setSelectedFile(file);
  };

  const handleFileDoubleClick = (file) => {
    if (onOpenPreview) {
      onOpenPreview();
    }
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center pb-24 sm:pb-32 px-2 sm:px-4 pointer-events-none transition-opacity duration-300 ${isMinimized ? 'opacity-0 pointer-events-none' : ''}`}>
      <div
        className={`relative bg-[#1e1e1e] rounded-lg sm:rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col border border-gray-700 pointer-events-auto ${isMaximized
          ? 'w-full h-full max-w-none max-h-none m-0 transition-all duration-300'
          : 'w-full max-w-4xl h-[75vh] sm:h-[70vh] max-h-[650px] transition-all duration-300'
          }`}
        role="dialog"
        aria-label="Finder window"
      >
        {/* Finder Header */}
        <div className="bg-[#2d2d2d] px-4 py-2.5 flex items-center justify-between border-b border-gray-700">
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

          {/* Finder Title */}
          <div className="absolute left-1/2 -translate-x-1/2 text-gray-300 text-sm font-medium flex items-center gap-2">
            {openedFolder && (
              <button
                onClick={handleBackClick}
                className="text-blue-400 hover:text-blue-300 transition-colors"
                title="Back"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            <span>{openedFolder ? openedFolder.name : 'Projects'}</span>
          </div>

          {/* View Options */}
          <div className="flex gap-2">
            <button className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Sidebar and Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-28 sm:w-36 md:w-40 lg:w-48 bg-[#252525] border-r border-gray-700 p-2 sm:p-3 overflow-y-auto flex-shrink-0">
            <div className="mb-3 sm:mb-4">
              <div className="text-[10px] sm:text-xs text-gray-500 font-semibold mb-1.5 sm:mb-2 px-1.5 sm:px-2">Favorites</div>
              <div className="space-y-0.5 sm:space-y-1">
                <div className="flex items-center gap-1.5 sm:gap-2 px-1.5 sm:px-2 py-1 sm:py-1.5 text-xs sm:text-sm text-gray-300 hover:bg-gray-700/50 rounded cursor-pointer">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                  </svg>
                  <span className="truncate">Projects</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 px-1.5 sm:px-2 py-1 sm:py-1.5 text-xs sm:text-sm text-gray-400 hover:bg-gray-700/50 rounded cursor-pointer">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                  </svg>
                  <span className="truncate">Documents</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 px-1.5 sm:px-2 py-1 sm:py-1.5 text-xs sm:text-sm text-gray-400 hover:bg-gray-700/50 rounded cursor-pointer">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="truncate">Downloads</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 bg-[#1e1e1e] p-3 sm:p-4 md:p-6 overflow-y-auto">
            {!openedFolder ? (
              // Show folders
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
                {folders.map((folder) => (
                  <div
                    key={folder.id}
                    onClick={() => handleFolderClick(folder)}
                    onDoubleClick={() => handleFolderDoubleClick(folder)}
                    className={`flex flex-col items-center gap-1 sm:gap-2 cursor-pointer group p-1.5 sm:p-2 rounded-lg transition-colors ${selectedFolder?.id === folder.id ? 'bg-blue-600/20' : 'hover:bg-gray-700/30'
                      }`}
                  >
                    {/* Folder Icon */}
                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 flex items-center justify-center">
                      <img
                        src="https://img.icons8.com/?size=100&id=jHteWfDDRFlK&format=png&color=000000"
                        alt="folder"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    {/* Folder Name */}
                    <span className={`text-[10px] sm:text-xs text-center transition-colors truncate w-full ${selectedFolder?.id === folder.id ? 'text-white font-medium' : 'text-gray-300 group-hover:text-white'
                      }`}>
                      {folder.name}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              // Show PDF file inside opened folder
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
                <div
                  onClick={() => handleFileClick('resume')}
                  onDoubleClick={() => handleFileDoubleClick('resume')}
                  className={`flex flex-col items-center gap-1 sm:gap-2 cursor-pointer group p-1.5 sm:p-2 rounded-lg transition-colors ${selectedFile === 'resume' ? 'bg-blue-600/20' : 'hover:bg-gray-700/30'
                    }`}
                >
                  {/* PDF Icon */}
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 flex items-center justify-center">
                    <svg className="w-full h-full text-red-500 group-hover:text-red-400 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                  </div>
                  {/* PDF Name */}
                  <span className={`text-[10px] sm:text-xs text-center transition-colors truncate w-full ${selectedFile === 'resume' ? 'text-white font-medium' : 'text-gray-300 group-hover:text-white'
                    }`}>
                    Resume.pdf
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Status Bar */}
        <div className="bg-[#252525] px-3 sm:px-4 py-1 sm:py-1.5 border-t border-gray-700 text-[10px] sm:text-xs text-gray-400">
          {openedFolder ? '1 item' : `${folders.length} items`}
        </div>
      </div>
    </div>
  );
};

export default FinderWindow;
