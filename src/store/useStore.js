import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
    persist(
        (set, get) => ({
            // App Definitions & States
            apps: {
                notes: { isOpen: false, isMinimized: false, name: 'Notes', icon: '/assets/icons/apple-notes.svg' },
                terminal: { isOpen: false, isMinimized: false, name: 'Terminal', icon: '/assets/icons/terminal.png?v=2' },
                photos: { isOpen: false, isMinimized: false, name: 'Photos', icon: '/assets/icons/apple-photos.svg' },
                finder: { isOpen: false, isMinimized: false, name: 'Finder', icon: '/assets/icons/finder.webp' },
                spotify: { isOpen: false, isMinimized: false, name: 'Spotify', icon: '/assets/icons/spotify.webp' },
                preview: { isOpen: false, isMinimized: false, name: 'Preview', icon: '/assets/images/preview.webp' },
                calendar: { isOpen: false, isMinimized: false, name: 'Calendar', icon: '/assets/icons/calendar.webp' },
                projectViewer: { isOpen: false, isMinimized: false, name: 'Project Viewer', icon: '/assets/images/preview.webp' },
            },

            // Window Management
            openWindows: [], // Array of app IDs in z-index order (last is top)
            activeApp: 'Finder',

            // System States
            controlCenterOpen: false,
            screenBrightness: 90,
            previewOpen: false,

            // User Data
            favorites: [],

            // Actions
            toggleApp: (appId, stateOverride = {}) => {
                const currentApp = get().apps[appId];
                const newState = { ...currentApp, ...stateOverride };

                // If opening or restoring, bring to front
                if ((stateOverride.isOpen || (currentApp.isOpen && !stateOverride.isMinimized)) && !newState.isMinimized) {
                    get().bringToFront(appId);
                }

                set((state) => ({
                    apps: {
                        ...state.apps,
                        [appId]: newState
                    },
                    // If closing, remove from openWindows
                    openWindows: stateOverride.isOpen === false
                        ? state.openWindows.filter(id => id !== appId)
                        : state.openWindows
                }));
            },

            bringToFront: (appId) => {
                set((state) => {
                    const newOpenWindows = state.openWindows.filter(id => id !== appId);
                    newOpenWindows.push(appId);
                    return {
                        openWindows: newOpenWindows,
                        activeApp: state.apps[appId]?.name || appId
                    };
                });
            },

            closeApp: (appId) => {
                set((state) => ({
                    apps: {
                        ...state.apps,
                        [appId]: { ...state.apps[appId], isOpen: false, isMinimized: false }
                    },
                    openWindows: state.openWindows.filter(id => id !== appId)
                }));
            },

            setControlCenterOpen: (isOpen) => set({ controlCenterOpen: isOpen }),
            setScreenBrightness: (brightness) => set({ screenBrightness: brightness }),

            toggleFavorite: (photo) => {
                set((state) => {
                    const isFav = state.favorites.some(f => f.url === photo.url);
                    const newFavorites = isFav
                        ? state.favorites.filter(f => f.url !== photo.url)
                        : [...state.favorites, { ...photo, date: new Date().toLocaleDateString() }];
                    return { favorites: newFavorites };
                });
            },

            isFavorited: (photoUrl) => get().favorites.some(f => f.url === photoUrl),
        }),
        {
            name: 'macos-portfolio-storage',
            partialize: (state) => ({
                favorites: state.favorites,
                screenBrightness: state.screenBrightness
            }),
        }
    )
);

export default useStore;
