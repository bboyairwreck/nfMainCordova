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
}

function receivedAllRemindersOfPatient(data) {

    // TODO need to add month's to value
    var timeUnitMap = {'Minutes' : 60*1000,
                       'Hours': 60*60*1000,
                       'Days': 24*60*60*1000
                      };

    for (var i = 0; i < data.length; i++) {
        var reminder = data[i];

        // Get "EventID" and "EventTime"
        var evID = reminder["EventID"];
        var eventTime = reminder["EventTime"];

        // Get Reminder quantity
        var quantityNum = reminder["QuantityNum"];  // 5 or 10 units of time measure

        // Get ReminderType and Unit i.e. 'Minutes' => 60000 ms
        var remTypeName = reminder["ReminderTypeName"]; // Minutes/ Hours / Days
        var remTypeMilli = timeUnitMap[remTypeName];        // i.e. 60*1000

        // get EventTime in milliseconds
        var eventTimeMilli = dateTimeToDateObj(eventTime).getTime();   // get Datetime in milliseconds

        // get datetime of Reminder by subtracking EventTime - quant
        var reminderTime = new Date(eventTimeMilli - (quantityNum * remTypeMilli));

        var remID = reminder["ReminderID"];

        //alert(dateTimeToDateObj(eventTime).toString() + "  vs  " + reminderTime.toString());

    }


    var now = new Date().getTime();                 // TODO eventDateTime
    var _5_sec_from_now = new Date(now + 2*1000);   // TODO

    // Notifications
    cordova.plugins.notification.local.schedule({
        id: 1,
        at:_5_sec_from_now,
        data: { eventName:"This is data from a notification"}
    });

    cordova.plugins.notification.local.on("trigger", function(notification) {
        //alert("triggered: " + notification.id);
        var dataJSON = JSON.parse(notification.data);

        alert(dataJSON["eventName"]);

        var $notifModalWrap = $("#notificationModalWrap");
        $("#notificationModalWrap h1").text(dataJSON["eventName"]);
        //$notifModalWrap.fadeIn(1000);
        //$notifModalWrap.css("display", "block");


    });
}

function dateTimeToDateObj(dateTimeString) {
    // Split timestamp into [ Y, M, D, h, m, s ]
    var t = dateTimeString.split(/[- :]/);

    // Apply each element to the Date function
    var d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);

    return d;
}