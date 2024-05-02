export function formatDateTime(datetime) {
    var hours = datetime.getHours();
    var minutes = datetime.getMinutes();
    var day = datetime.getDate();
    var month = datetime.getMonth() + 1;
    var year = datetime.getFullYear();

    // Add leading zeros if necessary
    var formattedHours = (hours < 10 ? "0" : "") + hours;
    var formattedMinutes = (minutes < 10 ? "0" : "") + minutes;
    var formattedDay = (day < 10 ? "0" : "") + day;
    var formattedMonth = (month < 10 ? "0" : "") + month;

    return formattedHours + ":" + formattedMinutes + " " + formattedDay + "-" + formattedMonth + "-" + year;
}

export function timeAgoOrDateTime(datetimeString) {
    var datetime = new Date(datetimeString);
    var now = new Date();

    var elapsed = now - datetime;

    var seconds = Math.floor(elapsed / 1000);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    var days = Math.floor(hours / 24);

    if (days > 0) {
        return formatDateTime(datetime);
    } else if (hours > 0) {
        return hours + " hour" + (hours > 1 ? "s" : "") + " ago";
    } else if (minutes > 0) {
        return minutes + " minute" + (minutes > 1 ? "s" : "") + " ago";
    } else {
        return "Just ago";
    }
}