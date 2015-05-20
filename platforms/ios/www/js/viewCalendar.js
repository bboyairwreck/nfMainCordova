/**
 * Created by wendykung on 5/16/15.
 */
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

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = "0" + dd;
    }
    var $month = mm;
    if (mm < 10) {
        $month = "0" + mm;
    }

    // adds the selected class and id=today for current date and returns reminders
    var todayDate = yyyy + "-" + $month + "-" + dd;
    $("td[data-date='" + todayDate + "']").attr('id', 'today');
    $("td[data-date='" + todayDate + "']").addClass("selected");
    getEvents(todayDate);

    // navigation
    $("a.navigate-left").click(function() {
        if (month == 1) {
            month = 12;
            year = year - 1;
        } else {
            month = month - 1;
        }
        calendar(month, year);
        $("#taskTable").empty();
        var $noTask = "<tr><td class='noTask'>No Events</td></tr>";
        $("#taskTable").prepend($noTask);
    });
    $("a.navigate-right").click(function() {
        if (month == 12) {
            month = 1;
            year = year + 1;
        } else {
            month = month + 1;
        }
        calendar(month, year);
        $("#taskTable").empty();
        var $noTask = "<tr><td class='noTask'>No Events</td></tr>";
        $("#taskTable").prepend($noTask);
    });

    // date cell click function
    $("#cal td").click(function() {
        $("td.selected").removeClass("selected");
        $(this).addClass("selected");
        var monthYear = $("#monthYear").text();
        var monYrArr = monthYear.split(" ");
        var month = getMonthNum(monYrArr[0]);
        var day = $(this).text();
        if (parseInt(day) < 10) {
            day = "0" + day;
        }
        var year = monYrArr[1];
        var date = year + "-" + month + "-" + day;
        getEvents(date);
    });
}

function setupCalendar(monthYear) {
    var url = "http://ericchee.com/neverforgotten/getEventTime_Month.php";
    $.ajax(url, {
        dataType : "json",
        data : {
            'n' : monthYear
        },
        success : setup,
        error : ajaxError
    });
}

function setup(data) {
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
            'n' : checkDate
        },
        success : ajaxSuccess,
        error : ajaxError
    });
}

function ajaxSuccess(data) {
    $("#taskTable").empty();
    if (data.length > 0) {
        for (var i = 0; i < data.length; i++){
            var $newTask = $("#taskTemplate .taskCard").clone();
            var taskName = data[i]["EventTitle"];
            var taskDateTime = data[i]["EventTime"];
            var taskDateTimeArr = datetimeFormat(taskDateTime);
            var taskTime = taskDateTimeArr["time"];
            var taskTimeFormatted = timeFormat(taskTime);
            $time = $newTask.find(".taskTime");
            $time.text(taskTimeFormatted);
            $name = $newTask.find(".taskName");
            $name.html(taskName);
            $("#taskTable").prepend($newTask);
        }
    } else {
        var $noTask = "<tr><td class='noTask'>No Events</td></tr>";
        $("#taskTable").prepend($noTask);
    }
}

function ajaxError( xhr, status, errorThrown ) {
    alert( "Sorry, there was Ajax problem!" );
    console.log( "Error: " + errorThrown );
    console.log( "Status: " + status );
    console.dir( xhr );
}




