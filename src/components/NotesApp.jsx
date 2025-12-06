import { useState } from 'react';

const NotesApp = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('I\'m Steve');
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const tabs = [
    { id: 'I\'m Steve', name: 'I\'m Steve' },
    { id: 'What I Offer', name: 'What I Offer' },
    { id: 'Awards & Press', name: 'Awards & Press' },
    { id: 'Clients', name: 'Clients' },
  ];

  const getContent = () => {
    switch (activeTab) {
      case 'I\'m Steve':
        return (
          <div className="p-4 sm:p-6 md:p-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl mb-4 sm:mb-6">
              Hello, my name is <span className="text-blue-500 font-semibold">Steve</span> — I'm a <span className="text-red-400 font-semibold">creative designer.</span>
            </h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop" 
                alt="Profile 1" 
                className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg"
                loading="lazy"
                decoding="async"
              />
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" 
                alt="Profile 2" 
                className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg"
                loading="lazy"
                decoding="async"
              />
              <img 
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop" 
                alt="Profile 3" 
                className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3">What I Do</h2>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  I craft websites, visual identities, and interactive projects that are both beautiful and user-friendly. My work focuses on translating complex ideas into clear, engaging experiences.
                </p>
              </div>

              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3">My Approach</h2>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  I believe design should tell a story and solve problems. I start by understanding the user and project goals, then iterate concepts until I find the perfect balance of form and function.
                </p>
              </div>

              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3">Social</h2>
                <div className="space-y-2">
                  <a href="#" className="text-blue-500 hover:underline block text-sm sm:text-base">Instagram</a>
                  <a href="#" className="text-blue-500 hover:underline block text-sm sm:text-base">X (Twitter)</a>
                </div>
              </div>
            </div>
          </div>
        );
      case 'What I Offer':
        return (
          <div className="p-4 sm:p-6 md:p-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6">What I Offer</h1>
            <div className="space-y-3 sm:space-y-4">
              <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-1 sm:mb-2">Web Design</h3>
                <p className="text-sm sm:text-base text-gray-700">Creating beautiful and functional websites that engage users.</p>
              </div>
              <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-1 sm:mb-2">Brand Identity</h3>
                <p className="text-sm sm:text-base text-gray-700">Developing unique visual identities that tell your story.</p>
              </div>
              <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-1 sm:mb-2">UI/UX Design</h3>
                <p className="text-sm sm:text-base text-gray-700">Designing intuitive interfaces that users love.</p>
              </div>
            </div>
          </div>
        );
      case 'Awards & Press':
        return (
          <div className="p-4 sm:p-6 md:p-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6">Awards & Press</h1>
            <div className="space-y-3 sm:space-y-4">
              <div className="border-l-4 border-blue-500 pl-3 sm:pl-4">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold">Best Design Award 2023</h3>
                <p className="text-sm sm:text-base text-gray-600">Awwwards - Site of the Day</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-3 sm:pl-4">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold">Featured Designer</h3>
                <p className="text-sm sm:text-base text-gray-600">Design Magazine - Top 100 Designers</p>
              </div>
            </div>
          </div>
        );
      case 'Clients':
        return (
          <div className="p-4 sm:p-6 md:p-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6">Clients</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              <div className="text-center p-4 sm:p-5 md:p-6 bg-gray-50 rounded-lg">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold">Apple</h3>
              </div>
              <div className="text-center p-4 sm:p-5 md:p-6 bg-gray-50 rounded-lg">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold">Google</h3>
              </div>
              <div className="text-center p-4 sm:p-5 md:p-6 bg-gray-50 rounded-lg">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold">Microsoft</h3>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (isMinimized) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="absolute inset-0 bg-black/20" onClick={onClose}></div>
      
      <div className={`relative bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden flex transition-all duration-300 ${
        isMaximized 
          ? 'w-full h-full max-w-none max-h-none m-0' 
          : 'w-full max-w-5xl h-[75vh] sm:h-[600px]'
      }`}>
        {/* Window Controls */}
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex gap-2 z-10">
          <button 
            onClick={onClose} 
            className="window-control w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-all shadow-sm group relative"
            title="Close"
          >
            <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <svg className="w-2 h-2 text-black/60" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="2">
                <path d="M2 2l8 8M10 2l-8 8" />
              </svg>
            </span>
          </button>
          <button 
            onClick={() => setIsMinimized(true)}
            className="window-control w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-all shadow-sm group relative"
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
            className="window-control w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-all shadow-sm group relative"
            title="Maximize"
          >
            <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <svg className="w-2 h-2 text-black/60" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 2h3v3M10 10H7V7M10 2H7v3M2 10h3V7" />
              </svg>
            </span>
          </button>
        </div>

        {/* Sidebar */}
        <div className="w-32 sm:w-48 md:w-56 lg:w-64 bg-gray-100 border-r border-gray-200 pt-12 sm:pt-16 pb-3 sm:pb-4 flex-shrink-0">
          <div className="px-2 sm:px-3 md:px-4 mb-2 sm:mb-3 md:mb-4">
            <h2 className="text-gray-500 text-[10px] sm:text-xs md:text-sm font-semibold mb-1.5 sm:mb-2 md:mb-3">About me</h2>
          </div>
          <div className="space-y-0.5 sm:space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-2 sm:px-4 md:px-6 py-1.5 sm:py-2 transition-colors text-[10px] sm:text-xs md:text-sm truncate ${
                  activeTab === tab.id
                    ? 'bg-yellow-400 text-gray-900 font-medium'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-white">
          {getContent()}
        </div>
      </div>
    </div>
  );
};

export default NotesApp;
