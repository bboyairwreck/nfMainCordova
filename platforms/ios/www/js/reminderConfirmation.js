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
            eventDate = myParams["eventDate"];
            eventTime = myParams["eventTime"];
            alert(eventName + " on " + eventDate + " at " + eventTime);
        }
    });

    //$("#nextTime").click(function(){
    //
    //    // grab the name
    //    var evTime = $("#inputEventTime").val().trim();
    //
    //    // ensure Event Name has something
    //    if (evTime.length > 0) {
    //
    //        // Event name in param
    //        var eventInfo = [];
    //        eventInfo["eventName"] = eventName;
    //        eventInfo["eventDate"] = eventDate;
    //        eventInfo["eventTime"] = evTime;
    //        params.push(eventInfo);
    //
    //        // navigate to next to createDate
    //        var href = $(this).data("href");    // page location
    //        navWithParams(href);
    //    } else {
    //        alert("Please enter a time before continuing");
    //    }
    //
    //});


}());


