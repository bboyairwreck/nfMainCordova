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
});

if (localStorage.getItem("greetingSound") == 1) {
    speakPhrase("What would you like to do?");
}
