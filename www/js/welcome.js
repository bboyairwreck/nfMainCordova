$(document).ready(function() {
    $("#welcomeTitle").html("Hello " + localStorage.getItem("firstName") + ".");
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

    ttsPlugin.speak("Good morning " + name + ". Today is " + todaysDate); // Good Morning Sarah. Today is May 22, 2015.
}
function failCallBack() {}