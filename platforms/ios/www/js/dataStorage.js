//localStorage.removeItem("layout");
//localStorage.removeItem("createReminderButton");
//localStorage.removeItem("callButton");
//localStorage.removeItem("greetingSound");
//localStorage.removeItem("textSize");
//localStorage.removeItem("input");
//localStorage.removeItem("scrollingArrows");
//localStorage.removeItem("patient");

if (localStorage.getItem("layout") === null) {
    fetchSettings();
}
if (localStorage.getItem("patient") === null) {
    localStorage.setItem("patient", 17);
}
if (localStorage.getItem("firstName") === null) {
    fetchName();
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

function fetchName() {
    var url = "http://ericchee.com/neverforgotten/getPatient.php";
    $.ajax(url, {
        dataType : "json",
        data : {
            'n' : 17
        },
        success : getFName,
        error : ajaxError
    });
}


function getFName(data) {
    localStorage.setItem("firstName", data["PersonFName"]);
    localStorage.setItem("lastName", data["PersonLName"]);
}

function ajaxSuccess(data) {
    //var settings = [data["Layout"], data["CreateReminderButton"], data["CallButton"], data["GreetingSound"], data["TextSize"], data["Input"], data["ScrollingArrows"]];

    localStorage.setItem("layout", data["Layout"]);
    localStorage.setItem("createReminderButton", data["CreateReminderButton"]);
    localStorage.setItem("callButton", data["CallButton"]);
    localStorage.setItem("greetingSound", data["GreetingSound"]);
    localStorage.setItem("textSize", data["TextSize"]);
    localStorage.setItem("input", data["Input"]);
    localStorage.setItem("scrollingArrows", data["ScrollingArrows"]);
}

function ajaxError( xhr, status, errorThrown ) {
    alert(errorThrown);
    console.log( "Error: " + errorThrown );
    console.log( "Status: " + status );
    console.dir( xhr );
}
