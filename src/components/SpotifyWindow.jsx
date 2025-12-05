import { useState } from 'react';

const SpotifyWindow = ({ onClose, isMinimized, onMinimize }) => {
  const [isMaximized, setIsMaximized] = useState(false);
  
  const playlistUrl = "https://open.spotify.com/embed/playlist/2b6mOuqhtEnVSnJoWojcdG?utm_source=generator";
  const playlistPage = "https://open.spotify.com/playlist/2b6mOuqhtEnVSnJoWojcdG";

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center pb-16 px-4 pointer-events-none ${isMinimized ? 'hidden' : ''}`}>
      <div
        className={`relative bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col border border-white/10 pointer-events-auto ${
          isMaximized 
            ? 'w-full h-full max-w-none max-h-none m-0 transition-all duration-300' 
            : 'w-full max-w-4xl h-[75vh] max-h-[700px] transition-all duration-300'
        }`}
        role="dialog"
        aria-label="Spotify window"
      >
        {/* macOS-style Window Controls */}
        <div className="absolute top-3.5 left-4 flex gap-2 z-20">
          <button
            onClick={onClose}
            aria-label="Close window"
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
            aria-label="Minimize window"
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
            onClick={handleMaximize}
            aria-label="Maximize window"
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

        {/* Sleek Header */}
        <div className="flex items-center justify-between pl-20 pr-6 py-3 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm border-b border-white/5">
          <div className="flex items-center gap-3">
            {/* Spotify Icon */}
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
            </div>
            <div>
              <div className="text-white font-semibold text-sm">Spotify</div>
              <div className="text-xs text-gray-400">Mohish's Favorites</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Open in Spotify button with icon */}
            <a
              href={playlistPage}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-white transition-all border border-white/10 hover:border-white/20"
              aria-label="Open playlist in Spotify Web Player"
              title="Open in Spotify Web"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span>Open in Spotify</span>
            </a>
          </div>
        </div>

        {/* Content area - Full iframe */}
        <div className="flex-1 bg-black/20 p-3">
          <div className="w-full h-full rounded-lg overflow-hidden shadow-2xl ring-1 ring-white/10">
            <iframe
              data-testid="embed-iframe"
              title="Mohish's Favorites Playlist"
              style={{ borderRadius: 8 }}
              src={playlistUrl}
              width="100%"
              height="100%"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotifyWindow;