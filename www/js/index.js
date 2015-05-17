var patientID = 17;
var needConfirmation = false;
var syncTimer = null;

$(document).ready(function() {
    //if (getParams() != null) {
    //    needConfirmation = true;
    //    params.pop();
    //}
    if (params.length > 0) {
        needConfirmation = true;
        params.pop();
    }
    if (needConfirmation) {
        $("#confirmationBox").fadeIn(700).delay(2000).fadeOut(700);
        needConfirmation = false;
    }
    var date = getCurDateString();
    var dateString = dateFormat(date);
    $("#date").html(dateString["dayName"] + ", " + dateString["dateLine"]);
    fetchPatient();
    setTime();
    fetchData();
    syncTimer = setInterval(function(){
        setTime();
        fetchData();
    }, 30000);
});

function fetchPatient() {
    var url = "http://ericchee.com/neverforgotten/getPatient.php";

    $.ajax(url, {
        dataType : "json",
        data : {
            'n' : patientID
        },
        success : setupPatient,
        error : ajaxError
    });
}

function setupPatient(data) {
    var firstName = data[0]["PersonFName"];
    $("#intro").html("Hello " + firstName);
}

function setTime() {
    var d = new Date();
    var a_p = "";
    var curr_hour = d.getHours();
    if (curr_hour < 12) {
        a_p = "AM";
    } else {
        a_p = "PM";
    }
    if (curr_hour == 0) {
        curr_hour = 12;
    }
    if (curr_hour > 12) {
        curr_hour = curr_hour - 12;
    }
    var time = curr_hour + ":";
    var curr_min = d.getMinutes()
    if (curr_min < 10) {
        time = time + "0" + curr_min + " " + a_p;
    } else {
        time = time + curr_min + " " + a_p;
    }
    $("#time").html(time);
}

function fetchData() {
    var url = "http://ericchee.com/neverforgotten/getEvents_Patient.php";

    $.ajax(url, {
        dataType : "json",
        data : {
            'n' : patientID
        },
        success : ajaxSuccess,
        error : ajaxError
    });
}

function ajaxSuccess(data) {
    // TODO Remove this so that way we don't clear anything and only prepend
    //$("#remindersWrap").html("");
    //
    for (var i = 0; i < data.length; i++){
        var $newCard = $("#reminderTemplate .reminderCardWrap").clone();

        var evTitle = data[i]["EventTitle"];
        var evDatetime = data[i]["EventTime"];
        var evDatetimeArr = datetimeFormat(evDatetime);
        var evDate = evDatetimeArr["date"];


        var evTime = evDatetimeArr["time"];
        var evTimeFormatted = timeFormat(evTime);

        var dateFormatArr = dateFormat(evDate);

        // Check if date is today
        var dayString = dateFormatArr["dateLine"];
        if (evDate == getCurDateString()) {
            dayString = "Today";
        }

        // Get DayWrapper Card
        var $dayWrap = $('.dayWrap[data-date="'+ evDate + '"]');
        var $dayHeader;
        var $dayCardWrap;
        if ($dayWrap.length > 0) {
            // found date wrapper
            $dayHeader = $dayWrap.find(".dayHeader");
            $dayCardWrap = $dayWrap.find(".dayCardWrap");

        } else {
            // didnt find date wrapper
            $dayWrap = $('<div class="dayWrap">');
            $dayWrap.attr("data-date", evDate);

            $dayHeader = $('<h4 class="dayHeader">');
            $dayHeader.text(dayString);

            $dayCardWrap = $('<div class="dayCardWrap">');

            $dayWrap.append($dayHeader);
            $dayWrap.append($dayCardWrap);

            $('#remindersWrap').prepend($dayWrap);
        }


        // inject any thing inside of $newTask;
        $eventTitle = $newCard.find(".reminderTitle");
        $eventTitle.html(evTitle);

        $eventTime = $newCard.find(".reminderTime");
        $eventTime.text(evTimeFormatted);

        $eventDate = $newCard.find(".reminderDate");
        $eventDate.text(dayString);

        //  dateFormatArr["dayName"] + dateFormatArr["monthName"]



        //$("#remindersWrap").prepend($newCard);
        //$(".dayCardWrap").prepend($newCard);
        $dayCardWrap.prepend($newCard);

    }


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

function ajaxError( xhr, status, errorThrown ) {
    alert("Sorry, there was Ajax problem!");
    console.log("Error: " + errorThrown);
    console.log("Status: " + status);
    console.dir(xhr);
}

$(".actionButton").on("touchstart", function() {
   $(this).css("-webkit-transform", "scale(.96)");
});

$("body").on("touchend", function() {
    $(".actionButton").css("-webkit-transform", "scale(1.0)");
});

$("#sosButton").click(function() {
    clearInterval(syncTimer);
});

$("#greeting").click(function() {

    // add param data
    var eventInfo = [];
    eventInfo["eventName"] = "George is awesome";
    params.push(eventInfo);

    var href = $(this).data("href");    // page location
    navWithParams(href);
});

$(".arrowIndex").click(function(){
//$("#remindersWrap").scroll(function(){
    var delta = 1;

    if ($(this).attr("id") == "upArrowIndex"){
       delta = -1;
    }

    var $remWrap = $('#remindersWrap');
    var scrollTop = $remWrap.scrollTop();
    scrollTop += (delta*500);

    //$remWrap.scrollTop(scrollTop + (delta*200));

    //scrollTop += 100;

    $remWrap.animate({
        scrollTop:scrollTop
    },500);

    //$("#dateTimeWrap h1").text(scrollTop);
});