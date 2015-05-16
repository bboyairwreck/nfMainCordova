!(function(){
    var eventName = "";
    var eventDate = "";

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

    $("#nextTime").click(function(){

        // grab the name
        var evTime = $("#inputEventTime").val().trim();

        // ensure Event Name has something
        if (evTime.length > 0) {

            // Event name in param
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


