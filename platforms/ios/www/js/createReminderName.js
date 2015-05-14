/**
 * Created by eric on 5/14/15.
 */
$(document).ready(function() {


});

$("#nextName").click(function() {
    // grab the name
    var evName = $("#inputEventName").val().trim();

    // ensure Event Name has something
    if (evName.length > 0) {

        // Event name in param
        var eventInfo = [];
        eventInfo["eventName"] = evName;
        params.push(eventInfo);

        // navigate to next to createDate
        var href = $(this).data("href");    // page location
        navWithParams(href);
    } else {
        alert("Please enter a name before continuing");
    }
});