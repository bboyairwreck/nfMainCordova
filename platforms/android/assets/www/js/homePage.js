$(document).ready(function() {
    myFunction();
    document.querySelector("#addSound").addEventListener('toggle', greetingsFunction);
});

function greetingsFunction() {
    if ($("#addSound").hasClass('active')) {
        $("#addTime").css("opacity", 1);
        $("#welcomeTime").prop('disabled', false);
    } else {
        $("#addTime").css("opacity", 0.2);
        $("#welcomeTime").prop('disabled', true);
        hideKeyboard();
    }
}

function myFunction() {
    $('h1').text("Home Page");

    var i = 0;

    $("#welcomeTime").change(function() {

        var time = $("#welcomeTime").val();

        var timeString;
        if (time) {
            var arrTime = time.split(":");

            var hours = arrTime[0];
            var mins = arrTime[1];
            var AMorPM = " AM";
            if (hours >= 12) {
                AMorPM = " PM";
            }

            hours = hours % 12;
            if (hours == 0) {
                hours = 12;
            }

            timeString = hours + ":" + mins + AMorPM;
        } else {
            var time = $("#welcomeTime").val("00:00");
            timeString = "12:00 AM";
        }

        $('#welcomeTimeString').text(timeString);
    });
}