/**
 * Created by eric on 5/14/15.
 */

!(function(){
    var eventName = "";

    $(document).ready(function() {
        myParams = getParams();

        if (myParams != null) {
            eventName = myParams["eventName"];
        }
        $("#details").html("<p>" + eventName + "</p>");

        // in right panel, setup calendar
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
    });

    $("#nextDate").click(function() {
        var evDate = $("td.selected").data("date");

        if (evDate) {
            // add param data
            var eventInfo = [];
            eventInfo["eventName"] = eventName;
            eventInfo["eventDate"] = evDate;
            params.push(eventInfo);

            var href = $(this).data("href");    // page location
            navWithParams(href);
        } else {
            alert("Please select a date before continuing");
        }
    });

    $("#backName").click(function() {
        params.pop();
        var href = $(this).data("href");
        navWithParams(href);
    });
}());


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
    $("#monthYear").html("<a class='navigate-left'></a>"+calTitle+"<a class='navigate-right'></a>");

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

    $("#cal td").on("touchstart", function() {
        $("td.selected").removeClass("selected");
        $(this).addClass("selected");
    });

}




