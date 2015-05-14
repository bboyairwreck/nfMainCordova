$(document).ready(function() {
    myParams = getParams();

    if (myParams != null) {
        var eventName = myParams["eventName"];
        var eventDate = myParams["eventDate"];
        alert(eventName + "; " + eventDate);
    }
});
