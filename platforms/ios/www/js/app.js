var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

    }
};

app.initialize();

//document.addEventListener("deviceready", loadTTS, false);
//
//function loadTTS() {
//    //alert("loadTTS running");
//    if (ttsPlugin != null) {
//
//        ttsPlugin.setRate(0.1); // Set voice speed : default is "0.2"
//
//        ttsPlugin.setLanguage("en-US"); // Set voice language : default is "en-US"
//
//        ttsPlugin.initTTS(successCallBack, failCallBack); // Init Plugin : failCallBack doesn't work yet
//
//
//    } else {
//        alert("nope");
//    }
//}
//
//function successCallBack() {
////                alert("tts worked?");
//
//    ttsPlugin.speak("Never Forgotten is a really cool application. And Wendy Kung is a poopy head."); // Say Hello
//}
//function failCallBack() {
//    alert("tts did not work?");
//}