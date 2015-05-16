/**
 * Created by eric on 5/14/15.
 */
!(function(){
    var eventName = "";
    var eventDate = "";
    var eventTime = "";

    $(document).ready(function() {
        myParams = getParams();

        if (myParams != null) {
            eventName = myParams["eventName"];
            var eventDateString = myParams["eventDate"];
            var eventDateStringArr = dateFormat(eventDateString);
            eventDate = eventDateStringArr["dateLine"];
            var eventTimeString = myParams["eventTime"];
            eventTime = timeFormat(eventTimeString);
        }
        $("#details").html("<p>" + eventName + "</p><p>" + eventDate + "</p><p>" + eventTime + "</p>");
    });

    $("#createReminder").click(function(){


        var href = $(this).data("href");    // page location
        navWithParams(href);
    });

    $("#backTime").click(function() {
        params.pop();
        var href = $(this).data("href");
        navWithParams(href);
    });
}());


