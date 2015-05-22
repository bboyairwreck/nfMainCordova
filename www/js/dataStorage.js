if (localStorage.getItem("Settings") == null) {
    var url = "http://ericchee.com/neverforgotten/getSettings_Patient.php"
    $.ajax(url, {
        dataType : "json",
        data : {
            'n': 17
        },
        success : ajaxSuccess,
        error : ajaxError
    });

    function ajaxSuccess(data) {
        alert(data);
        localStorage.setItem("Settings", data);
    }
}
if (localStorage.getItem("patientID") == null) {
    localStorage.setItem("patientID", 17);
}