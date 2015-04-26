function hideKeyboard() {
    document.activeElement.blur();
    $("input").blur();
};

function timeFormat(time) {
    var timeString = "";

    var arrTime = time.split(":");

    var hours = arrTime[0];
    var mins = arrTime[1];
    var AMorPM = " AM";
    if (hours >= 12) {
        AMorPM = " PM";
    }

    hours = hours % 12;
    if (hours == 0) {
        hours = 12;
    }

    timeString = hours + ":" + mins + AMorPM;

    return timeString;
}

function datetimeFormat(datetime) {
    var datetimeArr = datetime.trim().split(" ");

    var result = [];
    result["date"] = datetimeArr[0];
    result["time"] = datetimeArr[1];

    return result;
}

var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var dayNames_abbrev = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

function dateFormat(dateString) {

    var dateObj = new Date(dateString);

    var year = dateObj.getYear();
    var month = dateObj.getMonth();
    var day = dateObj.getDate();
    var dayOfWeek = dateObj.getDay();

    var result = [];
    result["year"] = year;
    result["month"] = month;
    result["monthName"] = monthNames[month];
    result["day"] = day;
    result["dayName"] = dayNames[dayOfWeek];

    result["dateLine"] = monthNames[month] + " " + day + ", " + year;

    return result;
}

