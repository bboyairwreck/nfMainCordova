var patientID = localStorage.getItem("patient");

$(document).ready(function() {
    var today = new Date();
    //var dd = today.getDate();
    //var mm = today.getMonth() + 1;
    //var yyyy = today.getFullYear();
    //if (dd < 10) {
    //    dd = "0" + dd;
    //}
    // setup calendar for current month
    calendar(today.getMonth() + 1, today.getFullYear());
    //var $month = mm;
    //if (mm < 10) {
    //    $month = "0" + mm;
    //}
    //// adds the selected class and id=today for current date and returns reminders
    //var todayDate = yyyy + "-" + $month + "-" + dd;
    //$("td[data-date='" + todayDate + "']").attr('id', 'today');
    //$("td[data-date='" + todayDate + "']").addClass("selected");
    //getEvents(todayDate);

    //var taskTable = $("#taskTableWrap");
    //if (taskTable.clientHeight < taskTable.scrollHeight) {
    //    alert("too tall!");
    //} else {
    //    alert("not tall enough, sorry!");
    //}

    $(".arrowIndex").click(function(){
//$("#remindersWrap").scroll(function(){
        var delta = 1;

        if ($(this).attr("id") == "upArrowIndex"){
            delta = -1;
        }

        var $remWrap = $('#taskTableWrap');
        var scrollTop = $remWrap.scrollTop();
        scrollTop += (delta*500);

        //$remWrap.scrollTop(scrollTop + (delta*200));

        //scrollTop += 100;

        $remWrap.animate({
            scrollTop:scrollTop
        },500);

        //$("#dateTimeWrap h1").text(scrollTop);
    });

});

function calendar(month, year) {
    var mm = month;
    if (month < 10) {
        mm = "0" + month;
    }
    $("#cal tr:not(.calHeader)").remove();
    var monthYear = year + "-" + mm;
    var first = monthYear + "-01";
    var firstDay = new Date(first);
    var dayNum = firstDay.getDay() + 1;
    var $weekNum = 0;
    var $dateNum = 1;
    var $daysInMonth = daysInMonth(mm, year);
    while ($dateNum <= $daysInMonth) {
        $weekNum++;
        var $tr = $("<tr>");
        $tr.addClass("week" + $weekNum);
        $("#cal").append($tr);
        // add dates
        for (var i = 0; i < 7; i++) {
            if ($dateNum > $daysInMonth || dayNum > 0) {
                $("tr.week" + $weekNum).append("<td class='notMonth'></td>");
                dayNum--;
                $dateNum--;
            } else {
                var $dateString = monthYear;
                if ($dateNum < 10) {
                    $dateString = $dateString + "-0" + $dateNum;
                } else {
                    $dateString = $dateString + "-" + $dateNum;
                }
                var $td = $("<td>");
                $td.attr('data-date', $dateString);
                $td.text($dateNum);
                $("tr.week" + $weekNum).append($td);
            }
            $dateNum++;
        }
    }

    // updates the calendar Title with month year
    var monthString = getMonthString(month);
    var calTitle = monthString + " " + year;
    $("#monYr").html("<a class='navigate-left'></a>"+calTitle+"<a class='navigate-right'></a>");

    // adds class hasEvent
    setupCalendar(monthYear);

    // get today's date
    var today = new Date();
    var todayDay = today.getDate();
    var todayMonth = today.getMonth() + 1;
    var todayYear = today.getFullYear();
    if (todayDay < 10) {
        todayDay = "0" + todayDay;
    }
    if (todayMonth < 10) {
        todayMonth = "0" + todayMonth;
    }

    // adds the selected class and id=today for current date and returns reminders
    var todayDate = todayYear + "-" + todayMonth + "-" + todayDay;
    $("td[data-date='" + todayDate + "']").attr('id', 'today');
    $("td[data-date='" + todayDate + "']").addClass("selected");
    if (mm == todayMonth) {
        $("#monDay").html(getMonthString(month) + " " + today.getDate());
        getEvents(todayDate);
    }

    // hides task menu arrows if necessary
    $("img.arrowIndex").css("display", "none");
    $(".calTaskName").css("padding-right", "0px");

    // navigation
    $("a.navigate-left").click(function() {
        $("#taskTable").empty();
        var $noTask = "<tr><td class='noTask'>No Events</td></tr>";
        $("#taskTable").prepend($noTask);
        if (month == 1) {
            month = 12;
            year = year - 1;
        } else {
            month = month - 1;
        }
        $("#monDay").html(getMonthString(month));
        calendar(month, year);
    });
    $("a.navigate-right").click(function() {
        $("#taskTable").empty();
        var $noTask = "<tr><td class='noTask'>No Events</td></tr>";
        $("#taskTable").prepend($noTask);
        if (month == 12) {
            month = 1;
            year = year + 1;
        } else {
            month = month + 1;
        }
        $("#monDay").html(getMonthString(month));
        calendar(month, year);
    });

    // date cell click function
    $("#cal td").on("touchstart", function() {
        $("td.selected").removeClass("selected");
        $(this).addClass("selected");
        var day = $(this).text();
        var monthStr = getMonthString(month);
        $("#monDay").html(monthStr + " " + day);
        var date = parseInt(day);
        if (date < 10) {
            date = "0" + date;
        }
        var currDate = monthYear + "-" + date;
        getEvents(currDate);
    });
}

function setupCalendar(monthYear) {
    var url = "http://ericchee.com/neverforgotten/getEventTime_Month.php";
    $.ajax(url, {
        dataType : "json",
        data : {
            'n' : patientID,
            'date' : monthYear
        },
        success : setupCalendarSuccess,
        error : calendarError
    });
}

function setupCalendarSuccess(data) {
    if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            var $date = data[i]["EventTime"];
            var $dateCell = $("td[data-date='" + $date + "']");
            $dateCell.addClass("hasEvent");
        }
    }
}

function getEvents(checkDate) {
    var url = "http://ericchee.com/neverforgotten/getEvents_Day.php";
    $.ajax(url, {
        dataType : "json",
        data : {
            'n' : patientID,
            'date' : checkDate
        },
        success : getEventsSuccess,
        error : calendarError
    });
}

function getEventsSuccess(data) {
    $("#taskTable").empty();
    if (data.length > 0) {
        for (var i = 0; i < data.length; i++){
            var $newTask = $("#taskTemplate .calTaskCard").clone();
            var taskName = data[i]["EventTitle"];
            var taskDateTime = data[i]["EventTime"];
            var taskDateTimeArr = datetimeFormat(taskDateTime);
            var taskTime = taskDateTimeArr["time"];
            var taskTimeFormatted = timeFormat(taskTime);
            $time = $newTask.find(".calTaskTime");
            $time.text(taskTimeFormatted);
            $name = $newTask.find(".calTaskName");
            $name.html(taskName);
            $("#taskTable").prepend($newTask);
        }
    } else {
        var $noTask = "<tr><td class='noTask'>No Events</td></tr>";
        $("#taskTable").prepend($noTask);
    }
    if (localStorage.getItem("scrollingArrows") == 1) {
        var taskTable = $("#taskTableWrap")[0];
        if (taskTable.clientHeight < taskTable.scrollHeight) {
            // insert arrows
            $("img.arrowIndex").css("display", "block");
            $(".calTaskName").css("padding-right", "77px");
        } else {
            $("img.arrowIndex").css("display", "none");
            $(".calTaskName").css("padding-right", "0px");
        }
    }
}

function calendarError( xhr, status, errorThrown ) {
    alert( "Sorry, there was Ajax problem!" );
    console.log( "Error: " + errorThrown );
    console.log( "Status: " + status );
    console.dir( xhr );
}




