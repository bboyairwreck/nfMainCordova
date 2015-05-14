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
    });

    $("#nextDate").click(function() {
        var evDate = $("#inputEventDate").val().trim();

        if (evDate) {
            // add param data
            var eventInfo = [];
            eventInfo["eventName"] = eventName;
            eventInfo["eventDate"] = evDate;
            params.push(eventInfo);

            var href = $(this).data("href");    // page location
            navWithParams(href);
        } else {
            alert("Please enter a time before continuing");
        }
    });
}());
