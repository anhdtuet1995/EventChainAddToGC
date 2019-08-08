function formatTime(date) {
    return date.toISOString().replace(/-|:|\.\d+/g, '');
};

function calculateEndTime(event) {
    return formatTime(event.end)
};

function generateCalendars(event) {
    var startTime = formatTime(event.start);
    var endTime = calculateEndTime(event);

    var href = encodeURI([
        'https://calendar.google.com/calendar/r/eventedit',
        '?text=' + (event.title || ''),
        '&dates=' + (startTime || ''),
        '/' + (endTime || ''),
        '&ctz=' + event.ctz,
        '&details=' + (event.description || ''),
        // '&location=' + (event.address || ''),
    ].join(''));
    openInNewTab(href);
};


function openInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
}