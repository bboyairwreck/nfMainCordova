$(document).ready(function() {
    var createReminderButton = localStorage.getItem("createReminderButton");
    var callButton = localStorage.getItem("callButton");
    var remindersLayout = localStorage.getItem("layout");

    var viewRemindersHtml = "<a id='actionViewAllImg' href='viewCalendar.html' data-transition='slide-in'><img src='img/viewAllReminders.png' alt='View All Reminders' /></a>";
    if (remindersLayout == "List") {
        viewRemindersHtml = "<a id='actionViewAllImg' href='viewAllReminders.html' data-transition='slide-in'><img src='img/viewAllReminders.png' alt='View All Reminders' /></a>";
    }
    var createReminderHtml = "<a href='createReminderName.html' data-transition='slide-in'><img src='img/createReminder.png' alt='Create Reminder' /></a>";
    var callButtonHtml = "<a href='contacts.html' data-transition='slide-in'><img src='img/call.png' alt='Call' /></a>";

    if (createReminderButton == 1) {
        if (callButton == 1) {     // call button and create reminder button
            $("#actionTouchWrap").html(viewRemindersHtml + createReminderHtml + callButtonHtml);
        } else {                    // create reminder button only
            $("#actionTouchWrap").html(viewRemindersHtml + createReminderHtml);
        }
    } else if (callButton == 1) {   // call button only
        $("#actionTouchWrap").html(viewRemindersHtml + callButtonHtml);
    }  else {                       // no call or create reminder button
        $("#actionTouchWrap").html(viewRemindersHtml);
    }
});

if (localStorage.getItem("greetingSound") == 1) {
    document.addEventListener("deviceready", loadTTS, false);
}


function loadTTS() {
    //alert("loadTTS running");
    if (ttsPlugin != null) {
        ttsPlugin.setRate(0.1); // Set voice speed : default is "0.2"
        ttsPlugin.setLanguage("en-us"); // Set voice language : default is "en-US"
        ttsPlugin.initTTS(successCallBack, failCallBack); // Init Plugin : failCallBack doesn't work yet
    } else {
        alert("Error: text to speech plugin is undefined");
    }
}

function successCallBack() {
    var todaysDate = dateFormat(getCurDateString())["dateLine"];

    var name = localStorage.getItem("firstName");

    ttsPlugin.speak("What would you like to do?"); // What would you like to do?
}
function failCallBack() {}