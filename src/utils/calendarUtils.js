export const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
};

export const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
};

export const generateCalendarGrid = (month, year) => {
    const daysInMonth = getDaysInMonth(month, year);
    const firstDay = getFirstDayOfMonth(month, year);
    const grid = [];

    // Add empty slots for days of previous month
    for (let i = 0; i < firstDay; i++) {
        grid.push(null);
    }

    // Add days of current month
    for (let i = 1; i <= daysInMonth; i++) {
        grid.push(i);
    }

    return grid;
};

export const getMonthName = (monthIndex) => {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[monthIndex];
};
