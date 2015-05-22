//localStorage.removeItem("Settings");
//localStorage.removeItem("patientID");

if (localStorage.getItem("settings") === null) {
    alert("null settings");
    fetchSettings();
}
if (localStorage.getItem("patient") === null) {
    alert("null patient");
    localStorage.setItem("patient", 17);
}

//$(document).ready(function() {
//    if (localStorage.getItem("Settings") === null) {
//        fetchSettings();
//    }
//    if (localStorage.getItem("PatientID") === null) {
//        localStorage.setItem("PatientID", 17);
//    }
//});

function fetchSettings() {
    var url = "http://ericchee.com/neverforgotten/getSettings_Patient.php";
    $.ajax(url, {
        dataType : "json",
        data : {
            'n' : 17
        },
        success : ajaxSuccess,
        error : ajaxError
    });
}

function ajaxSuccess(data) {
    alert("Success!");
    alert(data);
    localStorage.setItem("settings", data);
}

function ajaxError( xhr, status, errorThrown ) {
    alert(errorThrown);
    console.log( "Error: " + errorThrown );
    console.log( "Status: " + status );
    console.dir( xhr );
}

//$(document).ready(function() {
    //if (localStorage.getItem("Settings") === null) {

    //

    //

    //}
    //if (localStorage.getItem("patientID") === null) {
    //    alert("new patient!");
    //    localStorage.setItem("patientID", 17);
    //}
//});
