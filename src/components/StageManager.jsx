import { useEffect } from 'react';
import gsap from 'gsap';

const StageManager = ({ minimizedApps, onRestore }) => {
    useEffect(() => {
        if (minimizedApps.length > 0) {
            gsap.fromTo('.stage-manager-item',
                { x: -100, opacity: 0, rotateY: 45 },
                {
                    x: 0,
                    opacity: 1,
                    rotateY: 25,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'back.out(1.2)'
                }
            );
        }
    }, [minimizedApps.length]);

    if (minimizedApps.length === 0) return null;

    return (
        <div
            className="fixed left-4 top-[500px] sm:top-[540px] md:top-[560px] z-40 flex flex-col gap-3 pointer-events-none hidden md:flex max-h-[calc(100vh-600px)] overflow-y-visible"
            style={{ perspective: '1200px' }}
        >
            {minimizedApps.map((app) => (
                <div
                    key={app.key}
                    className="stage-manager-item group pointer-events-auto cursor-pointer relative transition-all duration-500"
                    onClick={() => onRestore(app)}
                    style={{ transformStyle: 'preserve-3d', transform: 'rotateY(25deg)' }}
                >
                    {/* Mini Window Frame */}
                    <div className="relative w-20 h-14 sm:w-24 sm:h-16 bg-[#1a1a1b]/90 backdrop-blur-2xl border border-white/10 rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.4)] overflow-hidden transition-all duration-300 group-hover:rotateY-0 group-hover:scale-105 group-hover:translate-x-3 group-hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)] group-hover:border-white/30 ring-1 ring-white/5 group-hover:ring-blue-400/20">

                        {/* Mini Window Header */}
                        <div className="h-2.5 bg-white/5 border-b border-white/5 flex items-center px-1.5 gap-0.5">
                            <div className="w-0.8 h-0.8 rounded-full bg-[#ff5f57] opacity-40"></div>
                            <div className="w-0.8 h-0.8 rounded-full bg-[#febc2e] opacity-40"></div>
                            <div className="w-0.8 h-0.8 rounded-full bg-[#28c840] opacity-40"></div>
                        </div>

                        {/* App Preview Content */}
                        <div className="absolute inset-x-0 bottom-0 top-2.5 flex items-center justify-center p-1.5">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 relative">
                                <img
                                    src={app.icon}
                                    alt={app.name}
                                    className="w-full h-full object-contain drop-shadow-[0_3px_10px_rgba(0,0,0,0.4)] relative z-10"
                                />
                            </div>
                        </div>

                        {/* Hover Overlay with Label */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-[9px] text-white font-medium px-2 py-0.5 bg-zinc-900/90 rounded-full border border-white/10 shadow-lg">
                                {app.name}
                            </span>
                        </div>
                    </div>

                    {/* Stack layer effect */}
                    <div className="absolute -z-10 inset-0 -translate-x-1 translate-y-1 bg-white/5 border border-white/5 rounded-xl opacity-40 group-hover:opacity-100 transition-all duration-500" />
                </div>
            ))}
        </div>
    );
};

export default StageManager;
