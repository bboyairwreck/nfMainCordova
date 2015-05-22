$(document).ready(function() {
    var data = localStorage.getItem("settings");
    var patID = localStorage.getItem("patient");

    alert(data[0]["Layout"]);
    alert(patID);
});
