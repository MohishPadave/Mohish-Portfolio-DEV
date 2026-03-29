import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Search } from 'lucide-react';

const CalendarApp = ({ onClose, onMinimize, isMinimized }) => {
    const [viewMode, setViewMode] = useState('Year');
    const [focusedDate, setFocusedDate] = useState(new Date());
    const [isMaximized, setIsMaximized] = useState(false);
    const scrollRef = useRef(null);

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDate = today.getDate();

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const handlePrev = () => {
        const newDate = new Date(focusedDate);
        if (viewMode === 'Year') newDate.setFullYear(focusedDate.getFullYear() - 1);
        else if (viewMode === 'Month') newDate.setMonth(focusedDate.getMonth() - 1);
        else if (viewMode === 'Week') newDate.setDate(focusedDate.getDate() - 7);
        else if (viewMode === 'Day') newDate.setDate(focusedDate.getDate() - 1);
        setFocusedDate(newDate);
    };

    const handleNext = () => {
        const newDate = new Date(focusedDate);
        if (viewMode === 'Year') newDate.setFullYear(focusedDate.getFullYear() + 1);
        else if (viewMode === 'Month') newDate.setMonth(focusedDate.getMonth() + 1);
        else if (viewMode === 'Week') newDate.setDate(focusedDate.getDate() + 7);
        else if (viewMode === 'Day') newDate.setDate(focusedDate.getDate() + 1);
        setFocusedDate(newDate);
    };

    const goToToday = () => setFocusedDate(new Date());

    const renderYearView = () => {
        const year = focusedDate.getFullYear();
        const yearsToShow = [year, year + 1];
        return (
            <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-[#1c1c1e] custom-scrollbar">
                {yearsToShow.map(y => (
                    <div key={y} className="mb-16">
                        <h2 className="text-4xl font-bold mb-8 text-white border-b border-white/5 pb-4">{y}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                            {months.map((_, idx) => renderMonthGrid(y, idx, true))}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const renderMonthGrid = (year, monthIdx, isHeaderSmall = false) => {
        const daysInMonth = getDaysInMonth(year, monthIdx);
        const firstDay = getFirstDayOfMonth(year, monthIdx);
        const days = [];

        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-8 w-8" />);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const isToday = year === currentYear && monthIdx === currentMonth && day === currentDate;
            const isFocused = year === focusedDate.getFullYear() && monthIdx === focusedDate.getMonth() && day === focusedDate.getDate();

            days.push(
                <div
                    key={day}
                    onClick={() => {
                        if (viewMode === 'Year') {
                            setFocusedDate(new Date(year, monthIdx, day));
                            setViewMode('Day');
                        }
                    }}
                    className={`h-8 w-8 flex items-center justify-center text-xs rounded-full transition-colors cursor-pointer ${isToday
                        ? 'bg-red-500 text-white font-bold'
                        : isFocused && viewMode !== 'Year'
                            ? 'bg-white/20 text-white'
                            : 'text-gray-300 hover:bg-white/10'
                        }`}
                >
                    {day}
                </div>
            );
        }

        return (
            <div key={`${year}-${monthIdx}`} className={`p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors`}>
                <h4 className={`${isHeaderSmall ? 'text-sm' : 'text-lg'} font-semibold mb-3 ${monthIdx === currentMonth && year === currentYear ? 'text-red-500' : 'text-white'}`}>
                    {months[monthIdx]}
                </h4>
                <div className="grid grid-cols-7 gap-1">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                        <div key={day} className="h-8 w-8 flex items-center justify-center text-[10px] text-gray-500 font-bold uppercase">
                            {day}
                        </div>
                    ))}
                    {days}
                </div>
            </div>
        );
    };

    const renderMonthView = () => (
        <div className="flex-1 p-6 sm:p-10 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
            <h2 className="text-3xl font-bold text-white">{months[focusedDate.getMonth()]} {focusedDate.getFullYear()}</h2>
            <div className="flex-1 flex items-center justify-center">
                <div className="scale-125 md:scale-150">
                    {renderMonthGrid(focusedDate.getFullYear(), focusedDate.getMonth())}
                </div>
            </div>
        </div>
    );

    const renderWeekView = () => {
        const startOfWeek = new Date(focusedDate);
        startOfWeek.setDate(focusedDate.getDate() - focusedDate.getDay());

        const weekDays = [];
        for (let i = 0; i < 7; i++) {
            const day = new Date(startOfWeek);
            day.setDate(startOfWeek.getDate() + i);
            weekDays.push(day);
        }

        return (
            <div className="flex-1 flex flex-col p-6 overflow-hidden">
                <div className="grid grid-cols-8 border-b border-white/10 pb-4">
                    <div className="text-gray-500 text-xs font-bold uppercase py-2">GMT</div>
                    {weekDays.map((day, i) => (
                        <div key={i} className="flex flex-col items-center">
                            <span className="text-[10px] text-gray-500 font-bold uppercase">{['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][i]}</span>
                            <span className={`text-xl font-medium mt-1 w-8 h-8 flex items-center justify-center rounded-full ${day.toDateString() === today.toDateString() ? 'bg-red-500 text-white' : 'text-white'}`}>
                                {day.getDate()}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                    {Array.from({ length: 24 }).map((_, hour) => (
                        <div key={hour} className="grid grid-cols-8 border-b border-white/5 group">
                            <div className="text-[10px] text-gray-500 py-4 text-right pr-4 italic">
                                {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
                            </div>
                            {weekDays.map((_, i) => (
                                <div key={i} className="border-l border-white/5 min-h-[60px] group-hover:bg-white/[0.02] transition-colors" />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderDayView = () => {
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return (
            <div className="flex-1 flex flex-col p-6 overflow-hidden">
                <div className="border-b border-white/10 pb-6 mb-4">
                    <h2 className="text-3xl font-bold text-white">{dayNames[focusedDate.getDay()]}, {months[focusedDate.getMonth()]} {focusedDate.getDate()}</h2>
                    <p className="text-gray-400 mt-1">No events scheduled for today</p>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                    {Array.from({ length: 24 }).map((_, hour) => (
                        <div key={hour} className="flex border-b border-white/5 group">
                            <div className="w-20 text-[10px] text-gray-500 py-6 text-right pr-6 italic shrink-0">
                                {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
                            </div>
                            <div className="flex-1 min-h-[80px] group-hover:bg-white/[0.02] transition-colors relative">
                                {hour === today.getHours() && focusedDate.toDateString() === today.toDateString() && (
                                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-red-500 z-10">
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-red-500 rounded-full" />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const getHeaderTitle = () => {
        if (viewMode === 'Year') return focusedDate.getFullYear();
        if (viewMode === 'Month') return `${months[focusedDate.getMonth()]} ${focusedDate.getFullYear()}`;
        if (viewMode === 'Week') {
            const start = new Date(focusedDate);
            start.setDate(focusedDate.getDate() - focusedDate.getDay());
            const end = new Date(start);
            end.setDate(start.getDate() + 6);
            if (start.getMonth() === end.getMonth()) return `${months[start.getMonth()]} ${start.getFullYear()}`;
            return `${months[start.getMonth()]} - ${months[end.getMonth()]} ${end.getFullYear()}`;
        }
        return `${months[focusedDate.getMonth()]} ${focusedDate.getDate()}, ${focusedDate.getFullYear()}`;
    };

    return (
        <div className={`fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-4 transition-all duration-300 ${isMinimized ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
            <div className={`bg-[#1c1c1e] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-white/10 transition-all duration-300 ${isMaximized ? 'w-full h-full' : 'w-full max-w-6xl h-[85vh]'}`}>

                {/* macOS Style Header */}
                <div className="bg-[#28282a] px-4 py-3 flex items-center justify-between border-b border-black/40 shrink-0">
                    <div className="flex items-center gap-2">
                        <button onClick={onClose} className="window-control w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff4136] transition-colors group relative">
                            <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <svg className="w-1.5 h-1.5 text-black/60" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="3">
                                    <path d="M2 2l8 8M10 2l-8 8" />
                                </svg>
                            </span>
                        </button>
                        <button onClick={onMinimize} className="window-control w-3 h-3 rounded-full bg-[#febc2e] hover:bg-[#ffb700] transition-colors group relative">
                            <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <svg className="w-1.5 h-1.5 text-black/60" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="3">
                                    <path d="M2 6h8" />
                                </svg>
                            </span>
                        </button>
                        <button onClick={() => setIsMaximized(!isMaximized)} className="window-control w-3 h-3 rounded-full bg-[#28c840] hover:bg-[#00d924] transition-colors group relative">
                            <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <svg className="w-1.5 h-1.5 text-black/60" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M2 2h3v3M10 10H7V7M10 2H7v3M2 10h3V7" />
                                </svg>
                            </span>
                        </button>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-white/5 rounded-lg px-2 py-1">
                            <button onClick={handlePrev} className="text-gray-400 hover:text-white transition-colors p-1"><ChevronLeft size={14} /></button>
                            <button onClick={goToToday} className="text-[11px] font-medium text-white px-2 py-0.5 hover:bg-white/10 rounded transition-colors">Today</button>
                            <button onClick={handleNext} className="text-gray-400 hover:text-white transition-colors p-1"><ChevronRight size={14} /></button>
                        </div>
                        <span className="text-sm font-semibold text-white min-w-[120px] text-center">{getHeaderTitle()}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex bg-white/5 rounded-lg p-0.5">
                            {['Day', 'Week', 'Month', 'Year'].map(mode => (
                                <button
                                    key={mode}
                                    onClick={() => setViewMode(mode)}
                                    className={`px-3 py-1 rounded-[6px] text-[11px] transition-all ${viewMode === mode ? 'bg-[#3e3e40] text-white shadow-lg' : 'text-gray-400 hover:text-gray-200'}`}
                                >
                                    {mode}
                                </button>
                            ))}
                        </div>
                        <button className="text-gray-400 hover:text-white transition-colors p-1.5 bg-white/5 rounded-lg"><Search size={14} /></button>
                    </div>
                </div>

                {/* Main View Area */}
                <div ref={scrollRef} className="flex-1 flex overflow-hidden">
                    {viewMode === 'Year' && renderYearView()}
                    {viewMode === 'Month' && renderMonthView()}
                    {viewMode === 'Week' && renderWeekView()}
                    {viewMode === 'Day' && renderDayView()}
                </div>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                  width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                  background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                  background: rgba(255, 255, 255, 0.1);
                  border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                  background: rgba(255, 255, 255, 0.2);
                }
            `}</style>
        </div>
    );
};

export default CalendarApp;
