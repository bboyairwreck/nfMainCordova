$(document).ready(function() {
    var createReminderButton = localStorage.getItem("createReminderButton");
    var callButton = localStorage.getItem("callButton");
    var remindersLayout = localStorage.getItem("layout");

    var $viewReminder = $('#aViewRemindersBtn');
    var $createBtn = $("#aCreateBtn");
    var $callBtn = $("#aCallBtn");

    if (remindersLayout == "List") {
        $viewReminder.attr('href', 'viewAllReminders.html');
    }

    if (createReminderButton == 1) {
        $createBtn.css("display", "block");
    }

    if (callButton == 1) {   // call button only
        $callBtn.css("display", "block");
    }

    // Firebase - Check for changes
    var fire = new Firebase('https://neverforgotten.firebaseio.com/');
    var patID = localStorage.getItem("patient");
    var patFire = fire.child(patID);
    patFire.on('child_changed', fbSettingChanged);
    patFire.on('child_added', fbSettingChanged);

    if (localStorage.getItem("greetingSound") == 1) {
        speakPhrase("What would you like to do?");
    }
});


function fbSettingChanged(snapshot) {
    var value = snapshot.val();
    var key = snapshot.key();
    //alert("key = " + key + "; value = " + value);

    if (key == "CreateReminderButton") {
        var $createBtn = $("#aCreateBtn");

        if (value == 0) {
            $createBtn.css("display", "none");
        } else {
            $createBtn.css("display", "block");
        }

    } else if (key == "CallButton") {
        var $callBtn = $("#aCallBtn");
        if (value == 0) {
            $callBtn.css("display", "none");
        } else {
            $callBtn.css("display", "block");
        }
    }
}

