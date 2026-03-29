import { useState, useEffect, useRef, useMemo } from 'react';
import { X, Minus, Square, ChevronRight, Grid3x3, Heart, Clock, Map, Video, Camera, Users, Trash2, Share2, FolderOpen, ChevronLeft } from 'lucide-react';
import useStore from '../store/useStore';

const PhotosApp = ({ onClose, onMinimize, isMinimized }) => {
  const { favorites, toggleFavorite, isFavorited } = useStore();
  const [selectedSection, setSelectedSection] = useState('library');
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [lightboxImages, setLightboxImages] = useState([]);
  const observerRef = useRef(null);

  // 10 project collections with their images
  const collections = [
    {
      id: 1,
      name: 'Obys Agency Clone',
      folder: 'project1',
      description: 'Full-stack e-commerce application with cart and checkout',
      images: ['Obys1.webp', 'Obys2.webp', 'Obys3.webp', 'Obys4.webp', 'Obys5.webp', 'Obys6.webp', 'Obys7.webp']
    },
    {
      id: 2,
      name: 'Referral Management System',
      folder: 'project2',
      description: 'Analytics dashboard for social media metrics',
      images: ['Referral1.webp', 'Referral2.webp', 'Referral3.webp', 'Referral4.webp', 'Referral5.webp', 'Referral6.webp', 'Referral7.webp', 'Referral8.webp']
    },
    {
      id: 3,
      name: 'Student Achievement Management System',
      folder: 'project3',
      description: 'Real-time weather application with forecasts',
      images: ['Student1.webp', 'Student2.webp', 'Student3.webp', 'Student4.webp', 'Student5.webp', 'Student6.webp', 'Student7.webp', 'Student8.webp', 'Student9.webp', 'Student10.webp', 'Student11.webp', 'Student12.webp', 'Student13.webp', 'Student14.webp', 'Student15.webp', 'Student16.webp', 'Student17.webp', 'Student18.webp', 'Student19.webp', 'Student20.webp']
    },
    {
      id: 4,
      name: 'Lead Management System',
      folder: 'project4',
      description: 'Productivity app for managing tasks and projects',
      images: ['Lead1.webp', 'Lead2.webp', 'Lead3.webp', 'Lead4.webp', 'Lead5.webp', 'Lead6.webp', 'Lead7.webp']
    },
    {
      id: 5,
      name: 'Binance Future Trading Bot',
      folder: 'project5',
      description: 'Personal portfolio showcasing projects and skills',
      images: ['Binance1.webp', 'Binance2.webp', 'Binance3.webp', 'Binance4.webp', 'Binance5.webp', 'Binance6.webp', 'Binance7.webp', 'Binance8.webp', 'Binance9.webp']
    },
    {
      id: 6,
      name: 'Calendar Management App',
      folder: 'project6',
      description: 'Real-time messaging application',
      images: ['Calender1.webp', 'Calender2.webp', 'Calender3.webp', 'Calender4.webp', 'Calender5.webp']
    },
    {
      id: 7,
      name: 'Omnifood Landing Page',
      folder: 'project7',
      description: 'Content management system for blogging',
      images: ['Omnifood1.webp', 'Omnifood2.webp', 'Omnifood3.webp', 'Omnifood4.webp', 'Omnifood5.webp', 'Omnifood6.webp', 'Omnifood7.webp', 'Omnifood8.webp']
    },
    {
      id: 8,
      name: 'Event Booking App',
      folder: 'project8',
      description: 'Streaming music player with playlists',
      images: ['Event1.webp', 'Event2.webp', 'Event3.webp', 'Event4.webp', 'Event5.webp', 'Event6.webp', 'Event7.webp', 'Event8.webp', 'Event9.webp']
    },
    {
      id: 9,
      name: 'Rodas Architect Website Landing Page',
      folder: 'project9',
      description: 'Health and fitness tracking application',
      images: ['Rodas1.webp', 'Rodas2.webp', 'Rodas3.webp', 'Rodas4.webp', 'Rodas5.webp', 'Rodas6.webp', 'Rodas7.webp', 'Rodas8.webp', 'Rodas9.webp', 'Rodas10.webp', 'Rodas11.webp', 'Rodas12.webp', 'Rodas13.webp']
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
    // Sort images naturally (Obys1, Obys2, ... Obys10)
    const sortedImages = [...collection.images].sort((a, b) => {
      return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
    });
    return sortedImages.map((img, index) => ({
      id: index + 1,
      url: `/assets/images/projects/${collection.folder}/${img}`,
      name: img,
      collection: collection.name
    }));
  };

  // Library photos - memoize to prevent reshuffling
  const libraryPhotos = useMemo(() => {
    const allImages = [];
    collections.forEach((collection) => {
      if (collection.images && collection.images.length > 0) {
        collection.images.forEach((img) => {
          allImages.push({
            url: `/assets/images/projects/${collection.folder}/${img}`,
            name: img,
            collection: collection.name
          });
        });
      }
    });
    // Shuffle the images for variety
    const shuffled = allImages.sort(() => Math.random() - 0.5);
    return shuffled.map((img, index) => ({
      id: index + 1,
      url: img.url,
      name: img.name,
      collection: img.collection,
      date: new Date(2025, 0, Math.floor(Math.random() * 30) + 1).toLocaleDateString()
    }));
  }, []);

  // Setup Intersection Observer for lazy loading
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.dataset.src;
            if (src) {
              img.src = src;
              img.removeAttribute('data-src');
              observerRef.current?.unobserve(img);
            }
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.01
      }
    );

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <div className={`fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-4 transition-opacity duration-300 ${isMinimized ? 'opacity-0 pointer-events-none' : ''}`}>
      <div className={`bg-[#1c1c1e] rounded-lg sm:rounded-xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ${isMaximized ? 'w-full h-full' : 'w-full max-w-7xl h-[90vh] sm:h-[85vh]'
        }`}>
        {/* Title Bar */}
        <div className="bg-[#28282a] px-4 py-2.5 flex items-center justify-between border-b border-black/40">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="window-control w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff4136] transition-colors group relative"
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
              className="window-control w-3 h-3 rounded-full bg-[#febc2e] hover:bg-[#ffb700] transition-colors group relative"
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
              className="window-control w-3 h-3 rounded-full bg-[#28c840] hover:bg-[#00d924] transition-colors group relative"
              title="Maximize"
            >
              <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-2 h-2 text-black/60" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 2h3v3M10 10H7V7M10 2H7v3M2 10h3V7" />
                </svg>
              </span>
            </button>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
            <Camera className="w-4 h-4 text-gray-400" />
            <span className="text-white text-sm font-medium">Photos</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-gray-400 hover:text-white transition-colors p-1.5 hover:bg-white/10 rounded" title="Share">
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setSelectedSection('favorites');
                setSelectedCollection(null);
              }}
              className={`transition-colors p-1.5 hover:bg-white/10 rounded ${selectedSection === 'favorites' ? 'text-red-500 bg-white/5' : 'text-gray-400 hover:text-white'}`}
              title="View Favorites"
            >
              <Heart className={`w-4 h-4 ${selectedSection === 'favorites' ? 'fill-current' : ''}`} />
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
                className={`w-full flex items-center gap-1.5 sm:gap-2.5 px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-md transition-all text-xs sm:text-sm ${selectedSection === 'library'
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
                    className={`w-full flex items-center justify-between px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-md transition-all text-xs sm:text-sm ${selectedCollection?.id === collection.id
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
                <button
                  onClick={() => {
                    setSelectedSection('favorites');
                    setSelectedCollection(null);
                  }}
                  className={`w-full flex items-center gap-1.5 sm:gap-2.5 px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-md transition-all text-xs sm:text-sm ${selectedSection === 'favorites'
                    ? 'bg-[#0a84ff] text-white shadow-sm'
                    : 'text-gray-300 hover:bg-white/5'
                    }`}
                >
                  <Heart className={`w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0 ${selectedSection === 'favorites' ? 'fill-white' : ''}`} />
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
                    {selectedSection === 'library' ? 'Library' : selectedSection === 'favorites' ? 'Favorites' : selectedCollection?.name}
                  </h2>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">
                    {selectedSection === 'library'
                      ? `Dec 1-4, 2025 • ${libraryPhotos.length} items`
                      : selectedSection === 'favorites'
                        ? `${favorites.length} items`
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
                  {libraryPhotos.map((photo, index) => (
                    <div
                      key={photo.id}
                      onClick={() => {
                        setLightboxImage(photo);
                        setLightboxImages(libraryPhotos);
                      }}
                      className="aspect-square rounded-sm overflow-hidden bg-gray-900 hover:ring-2 hover:ring-[#0a84ff] transition-all cursor-pointer group relative"
                    >
                      <img
                        src={photo.url}
                        alt={`${photo.collection} - ${photo.name}`}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        loading={index < 18 ? "eager" : "lazy"}
                        decoding="async"
                        fetchpriority={index < 6 ? "high" : "auto"}
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors">
                        <button
                          onClick={(e) => toggleFavorite(e, photo)}
                          className="absolute bottom-1 right-1 p-1 rounded-full bg-black/40 hover:bg-black/60 transition-colors"
                        >
                          <Heart className={`w-3 h-3 sm:w-4 sm:h-4 ${isFavorited(photo.url) ? 'text-red-500 fill-red-500' : 'text-white'}`} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : selectedSection === 'favorites' ? (
                favorites.length > 0 ? (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-0.5 sm:gap-1">
                    {favorites.map((photo, index) => (
                      <div
                        key={photo.id}
                        onClick={() => {
                          setLightboxImage(photo);
                          setLightboxImages(favorites);
                        }}
                        className="aspect-square rounded-sm overflow-hidden bg-gray-900 hover:ring-2 hover:ring-[#0a84ff] transition-all cursor-pointer group relative"
                      >
                        <img
                          src={photo.url}
                          alt={`${photo.collection} - ${photo.name}`}
                          width={300}
                          height={300}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          loading="eager"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors">
                          <button
                            onClick={(e) => toggleFavorite(e, photo)}
                            className="absolute bottom-1 right-1 p-1 rounded-full bg-black/40 hover:bg-black/60 transition-colors"
                          >
                            <Heart className={`w-3 h-3 sm:w-4 sm:h-4 text-red-500 fill-red-500`} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-24">
                    <Heart className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-400">No Favorites Yet</h3>
                    <p className="text-sm text-gray-600 mt-2">Click the heart icon on any photo to add it here.</p>
                  </div>
                )
              ) : selectedCollection && getCollectionImages(selectedCollection).length > 0 ? (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-0.5 sm:gap-1">
                  {getCollectionImages(selectedCollection).map((photo, index) => (
                    <div
                      key={photo.id}
                      onClick={() => {
                        setLightboxImage(photo);
                        setLightboxImages(getCollectionImages(selectedCollection));
                      }}
                      className="aspect-square rounded-sm overflow-hidden bg-gray-900 hover:ring-2 hover:ring-[#0a84ff] transition-all cursor-pointer group relative"
                    >
                      <img
                        src={photo.url}
                        alt={`${selectedCollection?.name} project screenshot ${index + 1}`}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        loading={index < 18 ? "eager" : "lazy"}
                        decoding="async"
                        fetchpriority={index < 6 ? "high" : "auto"}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors">
                        <button
                          onClick={(e) => toggleFavorite(e, photo)}
                          className="absolute bottom-1 right-1 p-1 rounded-full bg-black/40 hover:bg-black/60 transition-colors"
                        >
                          <Heart className={`w-3 h-3 sm:w-4 sm:h-4 ${isFavorited(photo.url) ? 'text-red-500 fill-red-500' : 'text-white'}`} />
                        </button>
                      </div>
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
                    Add your project screenshots to:<br />
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

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="fixed inset-0 z-[70] bg-black/95 flex items-center justify-center" onClick={() => setLightboxImage(null)}>
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => toggleFavorite(e, lightboxImage)}
            className="absolute top-4 left-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-2 px-4"
          >
            <Heart className={`w-5 h-5 ${isFavorited(lightboxImage.url) ? 'text-red-500 fill-red-500' : ''}`} />
            <span className="text-xs font-medium uppercase tracking-wider">{isFavorited(lightboxImage.url) ? 'Favorited' : 'Favorite'}</span>
          </button>

          {/* Previous Button */}
          {lightboxImages.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                const currentIndex = lightboxImages.findIndex(img => img.id === lightboxImage.id);
                const prevIndex = currentIndex > 0 ? currentIndex - 1 : lightboxImages.length - 1;
                setLightboxImage(lightboxImages[prevIndex]);
              }}
              className="absolute left-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Next Button */}
          {lightboxImages.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                const currentIndex = lightboxImages.findIndex(img => img.id === lightboxImage.id);
                const nextIndex = currentIndex < lightboxImages.length - 1 ? currentIndex + 1 : 0;
                setLightboxImage(lightboxImages[nextIndex]);
              }}
              className="absolute right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Image */}
          <div className="max-w-[90vw] max-h-[90vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightboxImage.url}
              alt={lightboxImage.name || `Photo ${lightboxImage.id}`}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              loading="eager"
              decoding="async"
            />
          </div>

          {/* Image Info */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full">
            <p className="text-white text-sm">
              {lightboxImage.name || `Photo ${lightboxImage.id}`}
              {lightboxImages.length > 1 && (
                <span className="text-gray-400 ml-2">
                  {lightboxImages.findIndex(img => img.id === lightboxImage.id) + 1} / {lightboxImages.length}
                </span>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotosApp;
