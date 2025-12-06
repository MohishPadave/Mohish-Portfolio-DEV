import { useState } from 'react';

const NotesApp = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('About Me');
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const tabs = [
    { id: 'About Me', name: 'About Me' },
  ];

  const getContent = () => {
    switch (activeTab) {
      case 'About Me':
        return (
          <div className="p-4 sm:p-6 md:p-8 lg:p-12 w-full flex justify-center">
            <div className="w-full max-w-4xl">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-light mb-6 sm:mb-8 text-gray-900">
                About Me
              </h1>
              
              <div className="space-y-5 sm:space-y-6 text-gray-700 leading-relaxed text-justify">
                <p className="text-sm sm:text-base md:text-lg w-full">
                  I'm <span className="font-semibold text-gray-900">Mohish Padave</span>, and my journey into software wasn't sparked by a textbook or a classroom, it began with a quiet fascination for how things work. I've always been drawn to moments where something complex suddenly feels simple, where a screen responds in just the right way, where a product understands you before you even ask.
                </p>

                <p className="text-sm sm:text-base md:text-lg w-full">
                  That feeling of clarity, of connection, of intention is what made me fall in love with building digital experiences.
                </p>

                <p className="text-sm sm:text-base md:text-lg w-full">
                  For me, technology isn't just code or systems. It's a bridge between people and possibilities. It's a way to remove friction from someone's day, a way to give shape to ideas that were once abstract, a way to make someone feel understood. Every project I take on is a chance to create that moment for someone else, the moment where everything just clicks.
                </p>

                <p className="text-sm sm:text-base md:text-lg w-full">
                  As I've grown, so has my approach. I've learned to listen before I build, to understand the story behind the problem, and to design solutions that respect the user's time, attention, and emotions. I care deeply about the experience, the intention behind each decision, and the quiet details that most people never see but always feel.
                </p>

                <p className="text-sm sm:text-base md:text-lg w-full">
                  What I'm seeking now is simple: a place where my curiosity can meet purpose. A team that values thoughtful design, honest work, and ideas that make a difference. A space where I can contribute, learn, and grow, not just as an engineer, but as someone who builds with heart.
                </p>

                <p className="text-sm sm:text-base md:text-lg font-medium text-gray-900 w-full">
                  If you're looking for someone who brings passion, empathy, and intention to their craft, I'd love to be part of your story.
                </p>
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
            <h2 className="text-gray-500 text-[10px] sm:text-xs md:text-sm font-semibold mb-1.5 sm:mb-2 md:mb-3">Notes</h2>
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
