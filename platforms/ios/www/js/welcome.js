$(document).ready(function() {
    var data = localStorage.getItem("settings");
    var patID = localStorage.getItem("patient");

    alert(data[0]["GreetingSound"]);
    alert(patID);
});

document.addEventListener("deviceready", loadTTS, false);

function loadTTS() {
    //alert("loadTTS running");
    if (ttsPlugin != null) {

        ttsPlugin.setRate(0.1); // Set voice speed : default is "0.2"

        ttsPlugin.setLanguage("en-us"); // Set voice language : default is "en-US"

        ttsPlugin.initTTS(successCallBack, failCallBack); // Init Plugin : failCallBack doesn't work yet


    } else {
        alert("nope");
    }
}

function successCallBack() {
//                alert("tts worked?");
    var todaysDate = dateFormat(getCurDateString())["dateLine"];
    alert(todaysDate);

    ttsPlugin.speak("Good morning Sarah. Today is " + todaysDate); // Say Hello
}
function failCallBack() {
    alert("tts did not work?");
}


function getCurDateString() {
    var nowDate = new Date();
    var monthString = "" + (nowDate.getMonth() + 1);
    var dayString = "" + nowDate.getDate();

    if ((nowDate.getMonth() + 1) < 10) {
        monthString = "0" + "" + monthString;
    }

    if (nowDate.getDate() < 10) {
        dayString = "0" + "" + dayString;
    }

    var nowDateString = nowDate.getFullYear() + "-" + monthString + "-" + dayString;

    return nowDateString;
}