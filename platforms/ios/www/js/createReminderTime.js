$(document).ready(function() {
    myParams = getParams();

    if (myParams != null) {
        var eventName = myParams["eventName"];
        alert(eventName);
    }
});
