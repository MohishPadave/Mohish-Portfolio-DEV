import { useState } from 'react';
import { X, Minus, Square, ChevronRight, Grid3x3, Heart, Clock, Map, Video, Camera, Users, Trash2, Share2, FolderOpen } from 'lucide-react';

const PhotosApp = ({ onClose, onMinimize, isMinimized }) => {
  const [selectedSection, setSelectedSection] = useState('library');
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [isMaximized, setIsMaximized] = useState(false);

  // 10 project collections with their images
  const collections = [
    { 
      id: 1, 
      name: 'E-Commerce Platform', 
      folder: 'project1',
      description: 'Full-stack e-commerce application with cart and checkout',
      images: [] // Add your images: ['image1.png', 'image2.jpg', ...]
    },
    { 
      id: 2, 
      name: 'Social Media Dashboard', 
      folder: 'project2',
      description: 'Analytics dashboard for social media metrics',
      images: []
    },
    { 
      id: 3, 
      name: 'Weather App', 
      folder: 'project3',
      description: 'Real-time weather application with forecasts',
      images: []
    },
    { 
      id: 4, 
      name: 'Task Manager', 
      folder: 'project4',
      description: 'Productivity app for managing tasks and projects',
      images: []
    },
    { 
      id: 5, 
      name: 'Portfolio Website', 
      folder: 'project5',
      description: 'Personal portfolio showcasing projects and skills',
      images: []
    },
    { 
      id: 6, 
      name: 'Chat Application', 
      folder: 'project6',
      description: 'Real-time messaging application',
      images: []
    },
    { 
      id: 7, 
      name: 'Blog Platform', 
      folder: 'project7',
      description: 'Content management system for blogging',
      images: []
    },
    { 
      id: 8, 
      name: 'Music Player', 
      folder: 'project8',
      description: 'Streaming music player with playlists',
      images: []
    },
    { 
      id: 9, 
      name: 'Fitness Tracker', 
      folder: 'project9',
      description: 'Health and fitness tracking application',
      images: []
    },
    { 
      id: 10, 
      name: 'Recipe App', 
      folder: 'project10',
      description: 'Recipe discovery and meal planning app',
      images: []
    },
  ];

  // Get images for selected collection
  const getCollectionImages = (collection) => {
    if (!collection || !collection.images || collection.images.length === 0) {
      return [];
    }
    return collection.images.map((img, index) => ({
      id: index + 1,
      url: `/assets/images/projects/${collection.folder}/${img}`,
      name: img
    }));
  };

  // Random library photos (placeholder images)
  const libraryPhotos = Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    url: `https://picsum.photos/400/300?random=${i + 1}`,
    date: new Date(2025, 0, Math.floor(Math.random() * 30) + 1).toLocaleDateString()
  }));

  if (isMinimized) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-4">
      <div className={`bg-[#1c1c1e] rounded-lg sm:rounded-xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ${
        isMaximized ? 'w-full h-full' : 'w-full max-w-7xl h-[90vh] sm:h-[85vh]'
      }`}>
        {/* Title Bar */}
        <div className="bg-[#28282a] px-4 py-2.5 flex items-center justify-between border-b border-black/40">
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="window-control w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff4136] transition-colors" />
            <button onClick={onMinimize} className="window-control w-3 h-3 rounded-full bg-[#febc2e] hover:bg-[#ffb700] transition-colors" />
            <button onClick={() => setIsMaximized(!isMaximized)} className="window-control w-3 h-3 rounded-full bg-[#28c840] hover:bg-[#00d924] transition-colors" />
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
            <Camera className="w-4 h-4 text-gray-400" />
            <span className="text-white text-sm font-medium">Photos</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-gray-400 hover:text-white transition-colors p-1.5 hover:bg-white/10 rounded">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="text-gray-400 hover:text-white transition-colors p-1.5 hover:bg-white/10 rounded">
              <Heart className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-32 sm:w-44 md:w-48 lg:w-52 xl:w-56 bg-[#1c1c1e] border-r border-black/40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent flex-shrink-0">
            {/* Library Section */}
            <div className="p-1.5 sm:p-2 pt-2 sm:pt-3">
              <button
                onClick={() => {
                  setSelectedSection('library');
                  setSelectedCollection(null);
                }}
                className={`w-full flex items-center gap-1.5 sm:gap-2.5 px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-md transition-all text-xs sm:text-sm ${
                  selectedSection === 'library' 
                    ? 'bg-[#0a84ff] text-white shadow-sm' 
                    : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                <Grid3x3 className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="font-medium truncate">Library</span>
              </button>
            </div>

            {/* Collections Section */}
            <div className="px-1.5 sm:px-2 pb-1.5 sm:pb-2">
              <div className="text-[9px] sm:text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1 sm:mb-1.5 px-1.5 sm:px-2.5 mt-2 sm:mt-3">
                Collections
              </div>
              <div className="space-y-0.5">
                {collections.map((collection) => (
                  <button
                    key={collection.id}
                    onClick={() => {
                      setSelectedSection('collection');
                      setSelectedCollection(collection);
                    }}
                    className={`w-full flex items-center justify-between px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-md transition-all text-xs sm:text-sm ${
                      selectedCollection?.id === collection.id 
                        ? 'bg-[#0a84ff] text-white shadow-sm' 
                        : 'text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
                      <FolderOpen className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                      <span className="text-[10px] sm:text-xs truncate">{collection.name}</span>
                    </div>
                    <span className={`text-[9px] sm:text-[11px] flex-shrink-0 ml-1 ${selectedCollection?.id === collection.id ? 'text-white/70' : 'text-gray-500'}`}>
                      {collection.images.length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Pinned Section */}
            <div className="px-1.5 sm:px-2 pb-2 sm:pb-3 border-t border-white/5 pt-1.5 sm:pt-2 mt-1.5 sm:mt-2">
              <div className="text-[9px] sm:text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1 sm:mb-1.5 px-1.5 sm:px-2.5">
                Pinned
              </div>
              <div className="space-y-0.5">
                <button className="w-full flex items-center gap-1.5 sm:gap-2.5 px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-md text-gray-300 hover:bg-white/5 transition-all text-xs sm:text-sm">
                  <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                  <span className="text-[10px] sm:text-xs truncate">Favorites</span>
                </button>
                <button className="w-full flex items-center gap-1.5 sm:gap-2.5 px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-md text-gray-300 hover:bg-white/5 transition-all text-xs sm:text-sm">
                  <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                  <span className="text-[10px] sm:text-xs truncate">Recently Saved</span>
                </button>
                <button className="w-full flex items-center gap-1.5 sm:gap-2.5 px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-md text-gray-300 hover:bg-white/5 transition-all text-xs sm:text-sm">
                  <Video className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                  <span className="text-[10px] sm:text-xs truncate">Videos</span>
                </button>
                <button className="w-full flex items-center gap-1.5 sm:gap-2.5 px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-md text-gray-300 hover:bg-white/5 transition-all text-xs sm:text-sm">
                  <Camera className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                  <span className="text-[10px] sm:text-xs truncate">Screenshots</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto bg-[#000000] scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
            {/* Header */}
            <div className="sticky top-0 bg-[#000000]/95 backdrop-blur-xl border-b border-white/5 px-3 sm:px-4 md:px-6 py-2 sm:py-3 z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white truncate max-w-[150px] sm:max-w-none">
                    {selectedSection === 'library' ? 'Library' : selectedCollection?.name}
                  </h2>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">
                    {selectedSection === 'library' 
                      ? `Dec 1-4, 2025 • ${libraryPhotos.length} items`
                      : `${selectedCollection?.images?.length || 0} items`
                    }
                  </p>
                </div>
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <button className="hidden sm:block px-2 sm:px-3 py-1 sm:py-1.5 bg-white/5 hover:bg-white/10 text-gray-300 rounded-md text-[10px] sm:text-xs transition-colors font-medium">
                    Years
                  </button>
                  <button className="hidden sm:block px-2 sm:px-3 py-1 sm:py-1.5 bg-white/5 hover:bg-white/10 text-gray-300 rounded-md text-[10px] sm:text-xs transition-colors font-medium">
                    Months
                  </button>
                  <button className="px-2 sm:px-3 py-1 sm:py-1.5 bg-[#0a84ff] hover:bg-[#0077ed] text-white rounded-md text-[10px] sm:text-xs transition-colors font-medium">
                    All Photos
                  </button>
                </div>
              </div>
            </div>

            {/* Photo Grid */}
            <div className="p-2 sm:p-3 md:p-4">
              {selectedSection === 'library' ? (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-0.5 sm:gap-1">
                  {libraryPhotos.map((photo) => (
                    <div
                      key={photo.id}
                      className="aspect-square rounded-sm overflow-hidden bg-gray-900 hover:ring-2 hover:ring-[#0a84ff] transition-all cursor-pointer group relative"
                    >
                      <img
                        src={photo.url}
                        alt={`Photo ${photo.id}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        loading="lazy"
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
                    </div>
                  ))}
                </div>
              ) : selectedCollection && getCollectionImages(selectedCollection).length > 0 ? (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-0.5 sm:gap-1">
                  {getCollectionImages(selectedCollection).map((photo) => (
                    <div
                      key={photo.id}
                      className="aspect-square rounded-sm overflow-hidden bg-gray-900 hover:ring-2 hover:ring-[#0a84ff] transition-all cursor-pointer group relative"
                    >
                      <img
                        src={photo.url}
                        alt={photo.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 sm:py-16 md:py-24 px-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/5 mb-3 sm:mb-4">
                    <FolderOpen className="w-8 h-8 sm:w-10 sm:h-10 text-gray-600" />
                  </div>
                  <h3 className="text-base sm:text-lg font-medium text-gray-300 mb-2">
                    {selectedCollection?.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4 max-w-sm mx-auto">
                    {selectedCollection?.description}
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-600 mb-4 sm:mb-6 max-w-md mx-auto">
                    Add your project screenshots to:<br/>
                    <code className="bg-white/5 px-2 py-1 rounded mt-2 inline-block text-[9px] sm:text-xs break-all">
                      /public/assets/images/projects/{selectedCollection?.folder}/
                    </code>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotosApp;
