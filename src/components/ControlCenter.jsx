import { useState } from 'react';
import useStore from '../store/useStore';

const ControlCenter = ({ onClose }) => {
  const {
    controlCenterOpen: isOpen,
    screenBrightness: brightness,
    setScreenBrightness: onBrightnessChange,
    toggleApp
  } = useStore();

  const [wifiOn, setWifiOn] = useState(true);
  const [bluetoothOn, setBluetoothOn] = useState(true);
  const [airdropMode, setAirdropMode] = useState('Contacts Only');
  const [volume, setVolume] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [screenMirroring, setScreenMirroring] = useState(false);
  const [stageManager, setStageManager] = useState(false);
  const [screenCapture, setScreenCapture] = useState(false);

  const handleBrightnessChange = (value) => {
    const clampedValue = Math.max(20, parseInt(value));
    onBrightnessChange(clampedValue);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose}></div>
      <div className="fixed top-8 sm:top-10 md:top-8 right-2 sm:right-3 md:right-4 w-[calc(100vw-1rem)] sm:w-80 md:w-96 max-w-md z-50 animate-slideIn">
        <div className="bg-white/15 backdrop-blur-[40px] rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-2xl border border-white/20 max-h-[calc(100vh-5rem)] overflow-y-auto" style={{ backdropFilter: 'blur(40px) saturate(180%)' }}>
          {/* Siri Recently */}
          <div className="mb-3">
            <div className="bg-white/10 backdrop-blur-2xl rounded-2xl px-4 py-2 border border-white/15" style={{ backdropFilter: 'blur(20px) saturate(180%)' }}>
              <div className="flex items-center gap-2 text-white text-sm">
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
                <span className="font-medium">Siri recently</span>
              </div>
            </div>
          </div>

          {/* Top Row - WiFi, Bluetooth, Safari */}
          <div className="grid grid-cols-3 gap-3 mb-3">
            {/* WiFi */}
            <button
              onClick={() => setWifiOn(!wifiOn)}
              className={`col-span-2 ${wifiOn ? 'bg-blue-500/70' : 'bg-white/10'} backdrop-blur-2xl rounded-2xl p-4 border border-white/15 hover:scale-[1.02] transition-all`}
              style={{ backdropFilter: 'blur(20px) saturate(180%)' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                  <svg className="w-7 h-7 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3C7.03 3 2.73 5.16.5 8.5c-.3.45-.2 1.05.25 1.35.45.3 1.05.2 1.35-.25C4.13 6.5 7.83 4.5 12 4.5s7.87 2 9.9 5.1c.3.45.9.55 1.35.25.45-.3.55-.9.25-1.35C21.27 5.16 16.97 3 12 3zm0 4c-3.18 0-6.08 1.39-8 3.6-.3.35-.25.88.1 1.18.35.3.88.25 1.18-.1C6.82 9.89 9.28 8.5 12 8.5s5.18 1.39 6.72 3.18c.3.35.83.4 1.18.1.35-.3.4-.83.1-1.18C18.08 8.39 15.18 7 12 7zm0 4c-1.66 0-3.14.69-4.22 1.78-.3.3-.3.77 0 1.06.3.3.77.3 1.06 0C9.74 12.95 10.82 12.5 12 12.5s2.26.45 3.16 1.34c.3.3.77.3 1.06 0 .3-.3.3-.77 0-1.06C15.14 11.69 13.66 11 12 11zm0 4c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-white font-semibold">Wi-Fi</div>
                  <div className="text-white/80 text-sm">Mohish_5G</div>
                </div>
              </div>
            </button>

            {/* Safari */}
            <button
              onClick={() => window.open('https://www.google.com', '_blank')}
              className="bg-white/10 backdrop-blur-2xl rounded-2xl p-4 border border-white/15 hover:scale-[1.02] transition-all flex items-center justify-center"
              style={{ backdropFilter: 'blur(20px) saturate(180%)' }}
            >
              <img
                src="/assets/images/safari.webp"
                alt="Safari"
                className="w-12 h-12"
                loading="eager"
                decoding="async"
                fetchpriority="high"
              />
            </button>
          </div>

          {/* Focus Mode Row */}
          <div className="mb-3">
            <button
              onClick={() => setFocusMode(!focusMode)}
              className={`w-full ${focusMode ? 'bg-blue-500/70' : 'bg-white/10'} backdrop-blur-2xl rounded-2xl p-4 border border-white/15 hover:scale-[1.02] transition-all`}
              style={{ backdropFilter: 'blur(20px) saturate(180%)' }}
            >
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 ${focusMode ? 'bg-white' : 'bg-blue-500'} rounded-full flex items-center justify-center shadow-md`}>
                  <svg className={`w-7 h-7 ${focusMode ? 'text-blue-500' : 'text-white'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-left flex-1">
                  <div className="text-white font-semibold">Focus</div>
                  <div className="text-white/80 text-sm">{focusMode ? 'Do Not Disturb' : 'Off'}</div>
                </div>
                <svg className="w-5 h-5 text-white/60" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </button>
          </div>

          {/* Middle Row - Bluetooth, Media Controls */}
          <div className="grid grid-cols-3 gap-3 mb-3">
            {/* Bluetooth */}
            <button
              onClick={() => setBluetoothOn(!bluetoothOn)}
              className={`col-span-2 ${bluetoothOn ? 'bg-blue-500/80' : 'bg-white/10'} backdrop-blur-xl rounded-2xl p-4 border border-white/20 hover:scale-105 transition-transform`}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                  <svg className="w-7 h-7 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.71 7.71L12 2h-1v7.59L6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 11 14.41V22h1l5.71-5.71-4.3-4.29 4.3-4.29zM13 5.83l1.88 1.88L13 9.59V5.83zm1.88 10.46L13 18.17v-3.76l1.88 1.88z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-white font-semibold">Bluetooth</div>
                  <div className="text-white/80 text-sm">On</div>
                </div>
              </div>
            </button>

            {/* Media Controls */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-gray-700/40 backdrop-blur-2xl rounded-2xl p-4 border border-white/15 flex flex-col items-center justify-center gap-2 hover:bg-gray-700/60 transition-all"
              style={{ backdropFilter: 'blur(20px) saturate(180%)' }}
            >
              <div className="text-white hover:scale-110 transition-transform">
                {isPlaying ? (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                  </svg>
                )}
              </div>
            </button>
          </div>

          {/* Bottom Row - AirDrop, Screen Mirroring, Stage Manager */}
          <div className="grid grid-cols-3 gap-3 mb-3">
            {/* AirDrop */}
            <button
              onClick={() => {
                const modes = ['Off', 'Contacts Only', 'Everyone'];
                const currentIndex = modes.indexOf(airdropMode);
                const nextMode = modes[(currentIndex + 1) % modes.length];
                setAirdropMode(nextMode);
              }}
              className={`col-span-2 ${airdropMode !== 'Off' ? 'bg-blue-500/70' : 'bg-white/10'} backdrop-blur-2xl rounded-2xl p-4 border border-white/15 hover:scale-[1.02] transition-all`}
              style={{ backdropFilter: 'blur(20px) saturate(180%)' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                  <svg className="w-7 h-7 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-white font-semibold">AirDrop</div>
                  <div className="text-white/80 text-sm">{airdropMode}</div>
                </div>
              </div>
            </button>

            {/* Screen Mirroring */}
            <button
              onClick={() => setScreenMirroring(!screenMirroring)}
              className={`${screenMirroring ? 'bg-blue-500/70' : 'bg-white/10'} backdrop-blur-2xl rounded-2xl p-4 border border-white/15 hover:scale-[1.02] transition-all flex items-center justify-center`}
              style={{ backdropFilter: 'blur(20px) saturate(180%)' }}
            >
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
              </svg>
            </button>
          </div>

          {/* More Controls Row */}
          <div className="grid grid-cols-3 gap-3 mb-3">
            {/* Screen Capture */}
            <button
              onClick={() => setScreenCapture(!screenCapture)}
              className={`${screenCapture ? 'bg-blue-500/80' : 'bg-white/90'} backdrop-blur-xl rounded-full w-16 h-16 flex items-center justify-center border border-white/20 hover:scale-105 transition-transform`}
            >
              <svg className={`w-8 h-8 ${screenCapture ? 'text-white' : 'text-blue-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 9V6a2 2 0 012-2h3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21 9V6a2 2 0 00-2-2h-3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 15v3a2 2 0 002 2h3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21 15v3a2 2 0 01-2 2h-3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {/* Stage Manager */}
            <button
              onClick={() => setStageManager(!stageManager)}
              className={`${stageManager ? 'bg-blue-500/80' : 'bg-white/90'} backdrop-blur-xl rounded-full w-16 h-16 flex items-center justify-center border border-white/20 hover:scale-105 transition-transform`}
            >
              <svg className={`w-8 h-8 ${stageManager ? 'text-white' : 'text-blue-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="5" width="10" height="12" rx="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="15" y="3" width="6" height="6" rx="1" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="15" y="11" width="6" height="6" rx="1" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="15" y="19" width="6" height="2" rx="0.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {/* Screen Mirroring */}
            <button
              onClick={() => setScreenMirroring(!screenMirroring)}
              className={`${screenMirroring ? 'bg-blue-500/80' : 'bg-white/90'} backdrop-blur-xl rounded-full w-16 h-16 flex items-center justify-center border border-white/20 hover:scale-105 transition-transform`}
            >
              <svg className={`w-8 h-8 ${screenMirroring ? 'text-white' : 'text-blue-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="4" width="20" height="12" rx="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 20h8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 16v4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7 9l3 3 4-5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </button>
          </div>

          {/* Display Brightness */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 mb-3 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-semibold">Display</span>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
              </svg>
              <input
                type="range"
                min="20"
                max="100"
                value={brightness}
                onChange={(e) => handleBrightnessChange(e.target.value)}
                className="flex-1 h-1 bg-white/30 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, white ${brightness}%, rgba(255,255,255,0.3) ${brightness}%)`
                }}
              />
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
              </svg>
            </div>
          </div>

          {/* Sound Volume */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-semibold">Sound</span>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                className="flex-1 h-1 bg-white/30 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, white ${volume}%, rgba(255,255,255,0.3) ${volume}%)`
                }}
              />
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Spotify Quick Access */}
          <button
            onClick={() => {
              toggleApp('spotify', { isOpen: true, isMinimized: false });
              onClose();
            }}
            className="w-full bg-gradient-to-br from-green-500 to-green-600 backdrop-blur-xl rounded-2xl p-4 border border-white/20 mt-3 hover:scale-[1.02] transition-transform"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
              </div>
              <div className="flex-1 text-left">
                <div className="text-white font-semibold text-sm">Open Spotify</div>
                <div className="text-white/80 text-xs">Music Player</div>
              </div>
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default ControlCenter;
