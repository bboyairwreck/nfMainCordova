document.addEventListener("deviceready", loadNotif, false);

function loadNotif() {

    // ajax to get Reminders of Patient
    var url = "http://ericchee.com/neverforgotten/getReminders_Patient.php";

    $.ajax(url, {
        dataType: "json",
        data: {
            'n': localStorage.getItem("patient")
        },
        success: receivedAllRemindersOfPatient,
        error: ajaxError
    });

    // Show Notification Modal on receive
    cordova.plugins.notification.local.on("trigger", function(notification) {
        //alert("triggered: " + notification.id);
        var dataJSON = JSON.parse(notification.data);

        var curEventDate = new Date(dataJSON["eventTime"]);
        var curEventID = dataJSON["eventID"];
        var curEventTitle = dataJSON["eventTitle"];

        var $notifModalWrap = $("#notificationModalWrap");
        $("#notificationModalWrap h1").text(dataJSON["eventTitle"]);
        $notifModalWrap.fadeIn(500);

        // Speak notification
        var name = localStorage.getItem("firstName");
        var phrase = "Hello " + name + ". Don't forget. " + curEventTitle + " is at " + curEventDate.toString();
        speakPhrase(phrase);
    });

    // Show Notification Modal on receive
    cordova.plugins.notification.local.on("schedule", function(notification) {
        //alert("triggered: " + notification.id);
        var dataJSON = JSON.parse(notification.data);

        var curEventDate = new Date(dataJSON["eventTime"]);

        //alert(curEventDate);
    });
}

function receivedAllRemindersOfPatient(data) {

    // Clear All notifications
    cordova.plugins.notification.local.clearAll(function() {
        //alert("cleared All notifications");
    }, this);

    // TODO need to add month's to value
    var timeUnitMap = {'Minutes' : 60*1000,
                       'Hours': 60*60*1000,
                       'Days': 24*60*60*1000
                      };

    for (var i = 0; i < data.length; i++) {
        var reminder = data[i];

        // Get "EventID", "EventTitle" and "EventTime"
        var evID = reminder["EventID"];
        var eventTime = reminder["EventTime"];
        var eventTitle = reminder["EventTitle"];

        // Get Reminder quantity
        var quantityNum = reminder["QuantityNum"];  // 5 or 10 units of time measure

        // Get ReminderType and Unit i.e. 'Minutes' => 60000 ms
        var remTypeName = reminder["ReminderTypeName"]; // Minutes/ Hours / Days
        var remTypeMilli = timeUnitMap[remTypeName];        // i.e. 60*1000

        // get EventTime in milliseconds
        var eventTimeObj = dateTimeToDateObj(eventTime);
        var eventTimeMilli = eventTimeObj.getTime();   // get Datetime in milliseconds

        // get datetime of Reminder by subtracking EventTime - quant
        var reminderTime = new Date(eventTimeMilli - (quantityNum * remTypeMilli));

        var remID = reminder["ReminderID"];

        //alert(eventTimeObj.toString() + "  vs  " + reminderTime.toString());
        scheduleNotification(remID, reminderTime, evID, eventTitle, eventTimeObj);
    }


    //var now = new Date().getTime();                 // TODO eventDateTime
    //var _5_sec_from_now = new Date(now + 1*1000);   // TODO
    //
    //var evID = 1234;
    //
    //// Notifications
    //cordova.plugins.notification.local.schedule({
    //    id: 1,
    //    at:_5_sec_from_now,
    //    data: {
    //        eventID   : evID,
    //        eventTitle:"This is data from a notification",
    //        eventTime : _5_sec_from_now
    //    }
    //});


}

function scheduleNotification(remID, remTime, evID, evTitle, evTime) {
    // Notifications
    cordova.plugins.notification.local.schedule({
        id: remID,
        at: remTime,
        data: {
            eventID   : evID,
            eventTitle: evTitle,
            eventTime : evTime
        }
    });
}

function dateTimeToDateObj(dateTimeString) {
    // Split timestamp into [ Y, M, D, h, m, s ]
    var t = dateTimeString.split(/[- :]/);

    // Apply each element to the Date function
    var d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);

    return d;
}

$("#notifDismissBtn").on("touchend", function(){
    var $notifModalWrap = $("#notificationModalWrap");
    $notifModalWrap.fadeOut(300);
});