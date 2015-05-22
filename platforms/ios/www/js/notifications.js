document.addEventListener("deviceready", loadNotif, false);

function loadNotif() {
    var now = new Date().getTime();
    var _5_sec_from_now = new Date(now + 5*1000);

    // Notifications
    cordova.plugins.notification.local.schedule({
        id: 1,
        at:_5_sec_from_now,
        data: { meetingID:"Hello"}
    });

    cordova.plugins.notification.local.on("trigger", function(notification) {
        //alert("triggered: " + notification.id);
        var dataJSON = JSON.parse(notification.data);

        alert(dataJSON["meetingID"]);
    });
}