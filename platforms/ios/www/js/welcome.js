$(document).ready(function() {
    $("#welcomeTitle").html("Hello " + localStorage.getItem("firstName") + ".");
});

if (localStorage.getItem("greetingSound") == 1) {
    var name = localStorage.getItem("firstName");
    var todaysDate = dateFormat(getCurDateString())["dateLine"];
    var phrase = "Good morning " + name + ". Today is " + todaysDate; // Good Morning Sarah. Today is May 22, 2015.
    speakPhrase(phrase);
}
