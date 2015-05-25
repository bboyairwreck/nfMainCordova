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
var dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
var dayNames_abbrev = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

function dateFormat(dateString) {

    var dateObj = new Date(dateString);

    var year = dateObj.getFullYear();
    var month = dateObj.getMonth() + 1;
    var day = dateObj.getDate() + 1;    // day of the month
    var dayOfWeek = dateObj.getDay();

    var result = [];
    result["year"] = year;
    result["month"] = month;
    result["monthName"] = monthNames[month-1];
    result["day"] = day;
    result["dayName"] = dayNames[dayOfWeek];
    // dateLine ~ "April 12, 2015"
    result["dateLine"] = monthNames[month-1] + " " + day + ", " + year;

    return result;
}

function getMonthString(monthNum) {
    return monthNames[monthNum - 1];
}

function getMonthNum(monthString) {
    if($.inArray(monthString, monthNames)) {
        var day = monthNames.indexOf(monthString) + 1;
        if (day < 10) {
            return "0" + day.toString();
        } else {
            return day.toString();
        }
    } else {
        return null;
    }
}

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

function getCurDateString() {
    var nowDate = new Date();
    var monthString = "" + (nowDate.getMonth() + 1);
    var dayString = "" + nowDate.getDate();

    if ((nowDate.getMonth() + 1) < 10) {
        monthString = "0" + "" + monthString;
    }

    if (nowDate.getDate() < 10) {
        dayString = "0" + "" + dayString;
    }

    var nowDateString = nowDate.getFullYear() + "-" + monthString + "-" + dayString;

    return nowDateString;
}


function speakPhrase(phrase) {
    //alert("loadTTS running");
    document.addEventListener("deviceready", function() {

        if (ttsPlugin != null) {
            ttsPlugin.setRate(0.1); // Set voice speed : default is "0.2"
            ttsPlugin.setLanguage("en-us"); // Set voice language : default is "en-US"
            ttsPlugin.initTTS(function() {
                ttsPlugin.speak(phrase);
            }, function(){}); // Init Plugin : failCallBack doesn't work yet
        } else {
            alert("Error: text to speech plugin is undefined");
        }

    }, false);

}