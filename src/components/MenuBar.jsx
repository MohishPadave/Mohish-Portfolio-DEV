import { useEffect, useRef, useState } from 'react';
import useStore from '../store/useStore';

const MenuBar = ({ onLogout, onStartTour }) => {
  const { setControlCenterOpen, controlCenterOpen } = useStore();
  const timeRef = useRef(null);
  const [showAppleMenu, setShowAppleMenu] = useState(false);
  const [showFileMenu, setShowFileMenu] = useState(false);
  const [showEditMenu, setShowEditMenu] = useState(false);
  const [showViewMenu, setShowViewMenu] = useState(false);
  const [showGoMenu, setShowGoMenu] = useState(false);
  const [showWindowMenu, setShowWindowMenu] = useState(false);
  const [showHelpMenu, setShowHelpMenu] = useState(false);

  const closeAllMenus = () => {
    setShowAppleMenu(false);
    setShowFileMenu(false);
    setShowEditMenu(false);
    setShowViewMenu(false);
    setShowGoMenu(false);
    setShowWindowMenu(false);
    setShowHelpMenu(false);
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      const dayName = days[now.getDay()];
      const monthName = months[now.getMonth()];
      const day = now.getDate();
      const hours = now.getHours() % 12 || 12;
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = now.getHours() >= 12 ? 'PM' : 'AM';

      const timeString = `${dayName} ${monthName} ${day}   ${hours}:${minutes} ${ampm}`;
      if (timeRef.current) timeRef.current.innerHTML = timeString;
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Overlay for closing menu */}
      {(showAppleMenu || showFileMenu || showEditMenu || showViewMenu || showGoMenu || showWindowMenu || showHelpMenu) && (
        <div className="fixed inset-0 z-[40]" onClick={closeAllMenus}></div>
      )}

      <div className="absolute top-0 left-0 right-0 h-8 md:h-7 bg-black/30 backdrop-blur-2xl flex items-center justify-between px-6 md:px-8 text-white text-sm md:text-[14px] z-50 select-none">
        <div className="flex items-center gap-4 md:gap-6">
          <div className="relative">
            <button
              onClick={() => {
                closeAllMenus();
                setShowAppleMenu(true);
              }}
              className="hover:bg-white/10 p-1 rounded transition-colors"
            >
              <svg className="w-3.5 h-3.5 md:w-4 md:h-4" viewBox="0 0 814 1000" fill="currentColor">
                <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
              </svg>
            </button>

            {/* Apple Menu Dropdown */}
            {showAppleMenu && (
              <div className="absolute top-full left-0 mt-1 w-60 bg-gray-800/90 backdrop-blur-2xl rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] py-1.5 border border-white/20 animate-fadeIn z-[50] text-[13px]">
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">About This Mac</div>
                <div className="h-px bg-white/10 my-1.5 mx-1.5"></div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">System Preferences...</div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">App Store...</div>
                <div className="h-px bg-white/10 my-1.5 mx-1.5"></div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Recent Items</div>
                <div className="h-px bg-white/10 my-1.5 mx-1.5"></div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Force Quit...</div>
                <div className="h-px bg-white/10 my-1.5 mx-1.5"></div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Sleep</div>
                <div
                  className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeAllMenus();
                    setTimeout(() => {
                      window.location.reload();
                    }, 100);
                  }}
                >
                  Restart...
                </div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Shut Down...</div>
                <div className="h-px bg-white/10 my-1.5 mx-1.5"></div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Lock Screen</div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150" onClick={() => {
                  closeAllMenus();
                  onLogout();
                }}>Log Out...</div>
              </div>
            )}
          </div>
          <div className="font-semibold hidden sm:block">Finder</div>

          {/* File Menu */}
          <div className="relative hidden lg:block">
            <button onClick={() => { closeAllMenus(); setShowFileMenu(true); }} className="hover:bg-white/10 px-2 md:px-3 py-0.5 rounded cursor-pointer">File</button>
            {showFileMenu && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-gray-800/90 backdrop-blur-2xl rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] py-1.5 border border-white/20 animate-fadeIn z-[50] text-[13px]">
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">New Finder Window</div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">New Folder</div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">New Folder with Selection</div>
                <div className="h-px bg-white/10 my-1.5 mx-1.5"></div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Open</div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Open With</div>
                <div className="h-px bg-white/10 my-1.5 mx-1.5"></div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Close Window</div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Get Info</div>
                <div className="h-px bg-white/10 my-1.5 mx-1.5"></div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Compress</div>
                <div className="h-px bg-white/10 my-1.5 mx-1.5"></div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Eject</div>
              </div>
            )}
          </div>

          {/* Edit Menu */}
          <div className="relative hidden lg:block">
            <button onClick={() => { closeAllMenus(); setShowEditMenu(true); }} className="hover:bg-white/10 px-2 md:px-3 py-0.5 rounded cursor-pointer">Edit</button>
            {showEditMenu && (
              <div className="absolute top-full left-0 mt-1 w-56 bg-gray-800/90 backdrop-blur-2xl rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] py-1.5 border border-white/20 animate-fadeIn z-[50] text-[13px]">
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Undo</div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Redo</div>
                <div className="h-px bg-white/10 my-1.5 mx-1.5"></div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Cut</div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Copy</div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Paste</div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Select All</div>
                <div className="h-px bg-white/10 my-1.5 mx-1.5"></div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Show Clipboard</div>
                <div className="h-px bg-white/10 my-1.5 mx-1.5"></div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Start Dictation</div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Emoji & Symbols</div>
              </div>
            )}
          </div>

          {/* View Menu */}
          <div className="relative hidden lg:block">
            <button onClick={() => { closeAllMenus(); setShowViewMenu(true); }} className="hover:bg-white/10 px-2 md:px-3 py-0.5 rounded cursor-pointer">View</button>
            {showViewMenu && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-gray-800/90 backdrop-blur-2xl rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] py-1.5 border border-white/20 animate-fadeIn z-[50] text-[13px]">
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">as Icons</div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">as List</div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">as Columns</div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">as Gallery</div>
                <div className="h-px bg-white/10 my-1.5 mx-1.5"></div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Use Stacks</div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Clean Up</div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Clean Up By</div>
                <div className="h-px bg-white/10 my-1.5 mx-1.5"></div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Hide Sidebar</div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Show Preview</div>
                <div className="h-px bg-white/10 my-1.5 mx-1.5"></div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Show View Options</div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Show Status Bar</div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Show Path Bar</div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Show Tab Bar</div>
                <div className="h-px bg-white/10 my-1.5 mx-1.5"></div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Hide Toolbar</div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Customize Toolbar...</div>
              </div>
            )}
          </div>

          {/* Go Menu */}
          <div className="relative hidden xl:block">
            <button onClick={() => { closeAllMenus(); setShowGoMenu(true); }} className="hover:bg-white/10 px-2 md:px-3 py-0.5 rounded cursor-pointer">Go</button>
            {showGoMenu && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-gray-800/90 backdrop-blur-2xl rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] py-1.5 border border-white/20 animate-fadeIn z-[50] text-[13px]">
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Back</div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Forward</div>
                <div className="h-px bg-white/10 my-1.5 mx-1.5"></div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Select Startup Disk</div>
                <div className="h-px bg-white/10 my-1.5 mx-1.5"></div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Recents</div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Documents</div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Desktop</div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Downloads</div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Home</div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Computer</div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">AirDrop</div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Network</div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">iCloud Drive</div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Shared</div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Applications</div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Utilities</div>
                <div className="h-px bg-white/10 my-1.5 mx-1.5"></div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Recent Folders</div>
                <div className="h-px bg-white/10 my-1.5 mx-1.5"></div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Go to Folder...</div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Connect to Server...</div>
              </div>
            )}
          </div>

          {/* Window Menu */}
          <div className="relative hidden xl:block">
            <button onClick={() => { closeAllMenus(); setShowWindowMenu(true); }} className="hover:bg-white/10 px-2 md:px-3 py-0.5 rounded cursor-pointer">Window</button>
            {showWindowMenu && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-gray-800/90 backdrop-blur-2xl rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] py-1.5 border border-white/20 animate-fadeIn z-[50] text-[13px]">
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Minimize</div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Zoom</div>
                <div className="h-px bg-white/10 my-1.5 mx-1.5"></div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Fill</div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Center</div>
                <div className="h-px bg-white/10 my-1.5 mx-1.5"></div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Move & Resize</div>
                <div className="px-4 py-1.5 text-white/40 rounded-md mx-1.5">Full Screen Tile</div>
                <div className="h-px bg-white/10 my-1.5 mx-1.5"></div>
                <div className="px-4 py-1.5 text-white/40 rounded-md mx-1.5">Remove Window from Set</div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Cycle Through Windows</div>
                <div className="px-4 py-1.5 text-white/40 rounded-md mx-1.5">Show Progress Window</div>
                <div className="h-px bg-white/10 my-1.5 mx-1.5"></div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Bring All to Front</div>
                <div className="h-px bg-white/10 my-1.5 mx-1.5"></div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Show Previous Tab</div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Show Next Tab</div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Move Tab to New Window</div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Merge All Windows</div>
              </div>
            )}
          </div>

          {/* Help Menu */}
          <div className="relative hidden xl:block">
            <button onClick={() => { closeAllMenus(); setShowHelpMenu(true); }} className="hover:bg-white/10 px-2 md:px-3 py-0.5 rounded cursor-pointer">Help</button>
            {showHelpMenu && (
              <div className="absolute top-full left-0 mt-1 w-72 bg-gray-800/90 backdrop-blur-2xl rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] py-1.5 border border-white/20 animate-fadeIn z-[50] text-[13px]">
                <div className="px-4 py-3 border-b border-white/10">
                  <div className="flex items-center gap-2 bg-gray-600/50 rounded-lg px-3 py-2">
                    <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span className="text-white/50">Search</span>
                  </div>
                </div>
                <div className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150">Mac User Guide</div>
                <div
                  className="px-4 py-1.5 text-white hover:bg-blue-500/90 cursor-pointer rounded-md mx-1.5 transition-all duration-150"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeAllMenus();
                    if (onStartTour) {
                      setTimeout(() => {
                        onStartTour();
                      }, 100);
                    }
                  }}
                >
                  Tips for Your Mac
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <button
            className="hover:bg-white/10 p-0.5 md:p-1 rounded transition-colors hidden sm:block"
            title="Bluetooth"
          >
            <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a1 1 0 011 1v5.586l2.707-2.707a1 1 0 011.414 1.414L11.414 11l3.707 3.707a1 1 0 01-1.414 1.414L11 13.414V19a1 1 0 11-2 0v-5.586l-2.707 2.707a1 1 0 01-1.414-1.414L8.586 11 4.879 7.293a1 1 0 011.414-1.414L9 8.586V3a1 1 0 011-1z" />
            </svg>
          </button>
          <button
            className="hover:bg-white/10 p-0.5 md:p-1 rounded transition-colors hidden sm:block"
            title="WiFi"
          >
            <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            className="hover:bg-white/10 p-0.5 md:p-1 rounded transition-colors hidden md:block"
            title="Battery"
          >
            <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            onClick={() => setControlCenterOpen(!controlCenterOpen)}
            className="hover:bg-white/10 px-1.5 md:px-2 py-0.5 md:py-1 rounded transition-colors"
            title="Control Center"
          >
            <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
          </button>
          <button
            onClick={() => { }}
            className="hover:bg-white/10 px-2 py-0.5 rounded transition-colors"
          >
            <div ref={timeRef} className="font-medium text-xs sm:text-sm md:text-[14px] whitespace-pre">
              Mon Dec 1   9:14 AM
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default MenuBar;
