//localStorage.removeItem("Settings");
//localStorage.removeItem("patientID");

if (localStorage.getItem("settings") === null) {
    fetchSettings();
}
if (localStorage.getItem("patient") === null) {
    localStorage.setItem("patient", 17);
}

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
    localStorage.setItem("settings", data);
}

function ajaxError( xhr, status, errorThrown ) {
    alert(errorThrown);
    console.log( "Error: " + errorThrown );
    console.log( "Status: " + status );
    console.dir( xhr );
}
