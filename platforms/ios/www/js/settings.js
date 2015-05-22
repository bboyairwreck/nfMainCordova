var patientID = 17;

$(document).ready(function() {
    getSettings();
});

function getSettings() {
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
        for (var i = 0; i < data.length; i++){
            var layoutType = data[i]["Layout"];
            var crButton = data[i]["CreateReminderButton"];
            var callButton = data[i]["CallButton"];
            if (crButton == 1) {

            }
            if (callButton == 1) {

            }
            if (layoutType == "Calendar") {

            }
            if (layoutType == "List") {

            }





            var taskName = data[i]["EventTitle"];
            var taskDateTime = data[i]["EventTime"];
            var taskDateTimeArr = datetimeFormat(taskDateTime);
            var taskTime = taskDateTimeArr["time"];
            var taskTimeFormatted = timeFormat(taskTime);
            $time = $newTask.find(".calTaskTime");
            $time.text(taskTimeFormatted);
            $name = $newTask.find(".calTaskName");
            $name.html(taskName);
            $("#taskTable").prepend($newTask);
        }
    }
}

function ajaxError( xhr, status, errorThrown ) {
    alert(errorThrown);
    console.log("Error: " + errorThrown);
    console.log("Status: " + status);
    console.dir(xhr);
}