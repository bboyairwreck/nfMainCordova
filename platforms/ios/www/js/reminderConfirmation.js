var personID = 46;

!(function(){
    var eventName = "";
    var eventDate = "";
    var eventTime = "";

    $(document).ready(function() {
        myParams = getParams();
        var eventDateString = "";
        var eventTimeString = "";

        if (myParams != null) {
            eventName = myParams["eventName"];
            eventDate = myParams["eventDate"];
            var eventDateStringArr = dateFormat(eventDate);
            eventDateString = eventDateStringArr["dateLine"];
            eventTime = myParams["eventTime"];
            eventTimeString = timeFormat(eventTime);
        }
        $("#details").html("<p>" + eventName + "</p><p>" + eventDateString + "</p><p>" + eventTimeString + "</p>");
    });

    $("#createReminder").click(function(){
        // ajax call to send in params
        var url = "http://ericchee.com/neverforgotten/addEventReminder.php";
        var datetime = eventDate + " " + eventTime;
        $.ajax(url, {
            dataType : "json",
            data : {
                'name': eventName,
                'time': datetime,
                'num': 0,
                'type': 'minutes',
                'id' : personID
            },
            success : ajaxSuccess,
            error : ajaxError
        });
        params.pop();
        params.pop();
        var href = $(this).data("href");    // page location
        navWithParams(href);
    });

    $("#backTime").click(function() {
        params.pop();
        var href = $(this).data("href");
        navWithParams(href);
    });
}());

function ajaxSuccess(data) {
    if (data["message"] == "success") {
        alert("Reminder was created!");
    } else {
        alert("Error: Reminder was NOT created");
    }

}

function ajaxError( xhr, status, errorThrown ) {
    alert(errorThrown);
    console.log( "Error: " + errorThrown );
    console.log( "Status: " + status );
    console.dir( xhr );
}

