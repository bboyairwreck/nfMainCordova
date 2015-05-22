var patientID = 17;

$(document).ready(function() {
    getGreetingSettings();
});

function getGreetingSettings() {
    var url = "http://ericchee.com/neverforgotten/getSettings_Patient.php"
    $.ajax(url, {
        dataType : "json",
        data : {
            'n': patientID
        },
        success : ajaxSuccess,
        error : ajaxError
    });
}

function ajaxSuccess(data) {
    if (data.length > 0) {

        //for (var i = 0; i < data.length; i++){
        //    var greeting = data["GreetingSound"];
            if (data["GreetingSound"] == 1) {
                alert("Set Greeting Sound!");
                // set greeting sound
            }
        //}
    }
}

function ajaxError( xhr, status, errorThrown ) {
    alert(errorThrown);
    console.log("Error: " + errorThrown);
    console.log("Status: " + status);
    console.dir(xhr);
}