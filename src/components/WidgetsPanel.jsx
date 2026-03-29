import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { generateCalendarGrid, getMonthName } from '../utils/calendarUtils';
import { parseWeatherData } from '../utils/weatherUtils';

const WidgetsPanel = ({ onCalendarClick }) => {
    const panelRef = useRef(null);
    const contentRef = useRef(null);
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [location, setLocation] = useState('Mumbai');
    const [error, setError] = useState(null);

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const currentDate = now.getDate();
    const calendarGrid = generateCalendarGrid(currentMonth, currentYear);

    useEffect(() => {
        getLocation();

        // Simple entrance animation on mount
        if (panelRef.current) {
            gsap.fromTo(panelRef.current,
                { x: 50, opacity: 0 },
                { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }
            );
        }

        if (contentRef.current) {
            gsap.fromTo(contentRef.current.children,
                { y: 10, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out', delay: 0.3 }
            );
        }
    }, []);

    const fetchWeather = async (lat, lon, cityName) => {
        try {
            setLoading(true);
            const response = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
            );
            const data = await response.json();
            const parsed = parseWeatherData(data);
            setWeather(parsed);
            if (cityName) setLocation(cityName);
            setError(null);
        } catch (err) {
            console.error('Weather fetch error:', err);
            setError('Failed to load weather');
        } finally {
            setLoading(false);
        }
    };

    const getLocation = () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        const geoRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                        const geoData = await geoRes.json();
                        const city = geoData.address.city || geoData.address.town || geoData.address.village || 'Your Location';
                        fetchWeather(latitude, longitude, city);
                    } catch {
                        fetchWeather(latitude, longitude, 'Your Location');
                    }
                },
                () => {
                    fetchWeather(19.076, 72.8777, 'Mumbai');
                }
            );
        } else {
            fetchWeather(19.076, 72.8777, 'Mumbai');
        }
    };

    return (
        <div className="fixed top-12 right-6 w-[340px] sm:w-[500px] pointer-events-none select-none z-0">
            <div ref={panelRef} className="w-full">
                <div ref={contentRef} className="grid grid-cols-2 gap-4 items-stretch">
                    {/* Calendar Widget */}
                    <div
                        onClick={onCalendarClick}
                        className="bg-[#1c1c1e] rounded-[32px] p-5 md:p-6 border border-white/5 shadow-2xl pointer-events-auto flex flex-col h-full min-h-[170px] sm:min-h-[240px] cursor-pointer group hover:bg-[#2c2c2e] active:scale-95 transition-all duration-300"
                    >
                        <div className="text-[#ff3b30] font-bold text-[10px] md:text-[12px] uppercase mb-4 tracking-wider">
                            {getMonthName(currentMonth)}
                        </div>

                        <div className="grid grid-cols-7 text-center text-[10px] md:text-[12px] font-medium text-white/40 mb-2 gap-y-2 flex-grow">
                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                                <div key={i}>{day}</div>
                            ))}
                            {calendarGrid.map((day, i) => (
                                <div
                                    key={i}
                                    className={`relative flex items-center justify-center h-5 md:h-7 text-[11px] md:text-[13px] ${day === currentDate
                                        ? 'text-white font-bold'
                                        : day
                                            ? 'text-white/90'
                                            : 'text-transparent'
                                        }`}
                                >
                                    {day === currentDate && (
                                        <div className="absolute inset-0 bg-[#ff3b30] rounded-full scale-[0.8] z-0" />
                                    )}
                                    <span className="relative z-10">{day}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Weather Widget */}
                    <div className="bg-[#1c1c1e] rounded-[32px] p-5 md:p-6 border border-white/5 shadow-2xl pointer-events-auto relative flex flex-col justify-between overflow-hidden h-full min-h-[170px] sm:min-h-[240px]">
                        {loading ? (
                            <div className="animate-pulse space-y-4">
                                <div className="h-4 bg-white/10 rounded w-1/2"></div>
                                <div className="h-12 bg-white/10 rounded w-3/4"></div>
                                <div className="h-4 bg-white/10 rounded w-1/2 mt-auto"></div>
                            </div>
                        ) : error || !weather ? (
                            <div className="flex items-center justify-center h-full text-white/40 text-[10px] italic text-center">
                                {error || 'Weather info unavailable'}
                            </div>
                        ) : (
                            <>
                                <div className="text-white">
                                    <div className="text-[14px] md:text-[18px] font-semibold opacity-95 text-left truncate">{location}</div>
                                    <div className="text-[40px] md:text-[56px] font-thin leading-none tracking-tight text-left mt-1">
                                        {weather.temp}°
                                    </div>
                                </div>

                                <div className="text-white space-y-0.5 text-left mt-auto">
                                    <div className="flex items-center gap-1.5 opacity-90">
                                        {weather.icon <= 3 ? (
                                            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0z" />
                                            </svg>
                                        ) : (
                                            <svg className="w-4 h-4 text-blue-200" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
                                                <path d="M11 13a1 1 0 100-2 1 1 0 000 2z m-3-1a1 1 0 100-2 1 1 0 000 2z m6-1a1 1 0 100-2 1 1 0 000 2z" />
                                            </svg>
                                        )}
                                        <span className="text-[13px] md:text-[16px] font-medium">{weather.condition}</span>
                                    </div>
                                    <div className="text-[11px] md:text-[14px] font-medium opacity-70">
                                        H:{weather.high}° L:{weather.low}°
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Subtle blue depth for weather */}
                        <div className="absolute top-0 right-0 w-full h-full bg-blue-500/5 pointer-events-none" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WidgetsPanel;
