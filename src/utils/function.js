import dayjs from 'dayjs';
export function formatDateTime(datetime) {
    var day = datetime.getDate();
    var month = datetime.getMonth() + 1;
    var year = datetime.getFullYear();

    // Add leading zeros if necessary
    var formattedDay = (day < 10 ? '0' : '') + day;
    var formattedMonth = (month < 10 ? '0' : '') + month;

    return formattedDay + '-' + formattedMonth + '-' + year;
}

export function timeAgoOrDateTime(datetimeString) {
    var datetime = new Date(datetimeString);
    var now = new Date();

    var elapsed = now - datetime;

    var seconds = Math.floor(elapsed / 1000);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    var days = Math.floor(hours / 24);

    if (days > 7) {
        return formatDateTime(datetime);
    }
    if (days > 0) {
        return days + ' day' + (days > 1 ? 's' : '') + ' ago';
    } else if (hours > 0) {
        return hours + ' hour' + (hours > 1 ? 's' : '') + ' ago';
    } else if (minutes > 0) {
        return minutes + ' minute' + (minutes > 1 ? 's' : '') + ' ago';
    } else {
        return 'Just ago';
    }
}

export function datetimeToDayjs(datetime) {
    const birthdayConvert = dayjs(datetime).format('DD/MM/YYYY');
    return dayjs(birthdayConvert, 'DD/MM/YYYY');
}

export function dayjsToDateTime(dayjs) {
    return new Date(dayjs.format('YYYY-MM-DD'));
}
