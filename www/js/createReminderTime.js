!(function(){
    var eventName = "";
    var eventDate = "";
    var hours = null;
    var minutes = null;

    $(document).ready(function() {
        myParams = getParams();
        var eventDateString = "";

        if (myParams != null) {
            eventName = myParams["eventName"];
            eventDate = myParams["eventDate"];
            var eventDateStringArr = dateFormat(eventDate);
            eventDateString = eventDateStringArr["dateLine"];
        }

        $("#details").html("<p>" + eventName + "</p><p>" + eventDateString + "</p>");
    });

    $("#amButton").click(function() {
        $("#pmButton").attr('src', 'img/pm_yellow.png');
        $(this).attr('src', 'img/am_yellow_selected.png');
        if ($("#hourNum").val() != "") {
            hours = parseInt($("#hourNum").val());
            if (hours == 12) {
                hours = 0;
            }
        }
        if ($("#minuteNum").val() != "") {
            minutes = $("#minuteNum").val();
        }
    });

    $("#pmButton").click(function() {
        $("#amButton").attr('src', 'img/am_yellow.png');
        $(this).attr('src', 'img/pm_yellow_selected.png');
        if ($("#hourNum").val() != "") {
            hours = parseInt($("#hourNum").val());
            if (hours != 12) {
                hours = hours + 12;
            }
        }
        if ($("#minuteNum").val() != "") {
            minutes = $("#minuteNum").val();
        }
    });

    $("#nextTime").click(function(){
        // ensure Event Name has something
        if (hours != null && minutes != null) {

            // grab event time
            var evTime = "";
            if (hours < 10) {
                evTime = "0" + hours + ":" + minutes;
            } else {
                evTime = hours + ":" + minutes;
            }

            // Event time in param
            var eventInfo = [];
            eventInfo["eventName"] = eventName;
            eventInfo["eventDate"] = eventDate;
            eventInfo["eventTime"] = evTime;
            params.push(eventInfo);

            // navigate to next to createDate
            var href = $(this).data("href");    // page location
            navWithParams(href);
        } else {
            alert("Please enter a time before continuing");
        }

    });

    $("#backDate").click(function() {
        params.pop();
        var href = $(this).data("href");
        navWithParams(href);
    });

}());


