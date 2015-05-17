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

    var data = [{"EventID":"46","EventTitle":"Breakfast with George","EventTime":"2015-04-26 06:45:00"},{"EventID":"48","EventTitle":"Get groceries","EventTime":"2015-04-27 03:25:00"},{"EventID":"50","EventTitle":"Jackson coming to town","EventTime":"2015-07-14 15:00:00"},{"EventID":"51","EventTitle":"Dinner with Schmucks","EventTime":"2015-04-29 21:15:00"},{"EventID":"52","EventTitle":"Lunch at Chipotle","EventTime":"2015-04-30 12:32:00"},{"EventID":"53","EventTitle":"Walk to the picnic","EventTime":"2015-04-27 12:38:00"},{"EventID":"54","EventTitle":"Hang out with Mike","EventTime":"2015-04-27 13:18:00"},{"EventID":"55","EventTitle":"Walk to the park","EventTime":"2016-04-30 14:40:00"},{"EventID":"56","EventTitle":"Take medication","EventTime":"2016-04-30 00:40:00"},{"EventID":"57","EventTitle":"Christmas","EventTime":"2016-12-25 00:00:00"},{"EventID":"58","EventTitle":"Pick up newspaper","EventTime":"2013-03-17 23:18:00"},{"EventID":"59","EventTitle":"Brunch with George","EventTime":"2015-06-25 19:47:00"},{"EventID":"60","EventTitle":"Minervas Birthday","EventTime":"2015-05-30 15:54:00"},{"EventID":"63","EventTitle":"Wendy&#39;s Casino Night","EventTime":"2015-02-25 09:25:00"},{"EventID":"64","EventTitle":"lily&#39;s pad","EventTime":"2015-04-29 09:52:00"},{"EventID":"65","EventTitle":"stephen is awesome","EventTime":"2015-04-29 09:54:00"},{"EventID":"66","EventTitle":"charlie&#39;s angel","EventTime":"2015-02-25 10:05:00"},{"EventID":"67","EventTitle":"Trial 1","EventTime":"2015-05-06 09:30:00"},{"EventID":"68","EventTitle":"Trial 1","EventTime":"2015-05-06 09:30:00"},{"EventID":"69","EventTitle":"gardening","EventTime":"2015-05-04 09:35:00"},{"EventID":"70","EventTitle":"gardening","EventTime":"2015-05-04 09:35:00"},{"EventID":"71","EventTitle":"take out trash","EventTime":"2015-06-06 09:52:00"},{"EventID":"72","EventTitle":"test","EventTime":"2015-05-06 09:55:00"},{"EventID":"73","EventTitle":"test test","EventTime":"2015-09-11 10:02:00"},{"EventID":"74","EventTitle":"Dinner with Karen","EventTime":"2015-07-14 15:00:00"},{"EventID":"75","EventTitle":"web","EventTime":"0000-00-00 00:00:00"},{"EventID":"76","EventTitle":"take pills","EventTime":"2015-06-13 13:15:00"},{"EventID":"77","EventTitle":"Dinner with Sarah","EventTime":"2015-08-16 17:00:00"},{"EventID":"78","EventTitle":"Dinner with Sarah","EventTime":"2015-05-16 17:00:00"},{"EventID":"79","EventTitle":"Dinner with Wesley","EventTime":"2015-05-16 19:40:00"},{"EventID":"80","EventTitle":"Dinner with Eric","EventTime":"2015-05-16 19:53:00"}];
    ajaxSuccess(data);
}

//var syncTimer = null;
//$("#callButton").click(function() {
//
//
//    syncTimer = setInterval(function(){
//
//        fetchData();
//    }, 1000);
//
//});

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