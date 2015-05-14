var patientID = 17;
var needConfirmation = true;

$(document).ready(function() {
    if (needConfirmation) {
        $("#confirmationBox").fadeIn(700).delay(2000).fadeOut(700);
    }
    fetchData();
});

function fetchData() {
    var url = "http://ericchee.com/neverforgotten/getEvents_Patient.php";

    $.ajax(url, {
        dataType : "json",
        data : {
            'n' : patientID
        },
        success : ajaxSuccess,
        error : ajaxError
    });
}

function ajaxSuccess(data) {

    // TODO Remove this so that way we don't clear anything and only prepend
    //$("#remindersWrap").html("");
    //
    for (var i = 0; i < data.length; i++){
        var $newCard = $("#reminderTemplate .reminderCardWrap").clone();

        var evTitle = data[i]["EventTitle"];
        var evDatetime = data[i]["EventTime"];
        var evDatetimeArr = datetimeFormat(evDatetime);
        var evDate = evDatetimeArr["date"];


        var evTime = evDatetimeArr["time"];
        var evTimeFormatted = timeFormat(evTime);

        var dateFormatArr = dateFormat(evDate);

        // inject any thing inside of $newTask;
        $eventTitle = $newCard.find(".reminderTitle");
        $eventTitle.html(evTitle);

        $eventTime = $newCard.find(".reminderTime");
        $eventTime.text(evTimeFormatted);

        $eventDate = $newCard.find(".reminderDate");
        $eventDate.text(dateFormatArr["dateLine"]);

        //  dateFormatArr["dayName"] + dateFormatArr["monthName"]



        //$("#remindersWrap").prepend($newCard);
        $(".dayCardWrap").prepend($newCard);

        $(".dayWrap").attr("data-dateTime", evDatetime);
    }


}

function ajaxError( xhr, status, errorThrown ) {
    alert("Sorry, there was Ajax problem!");
    console.log("Error: " + errorThrown);
    console.log("Status: " + status);
    console.dir(xhr);
}

var syncTimer = null;
$("#callButton").click(function() {


    syncTimer = setInterval(function(){

        fetchData();
    }, 1000);

});

$(".actionButton").on("touchstart", function() {
   $(this).css("-webkit-transform", "scale(.96)");
});

$("body").on("touchend", function() {
    $(".actionButton").css("-webkit-transform", "scale(1.0)");
});

$("#sosButton").click(function() {
    clearInterval(syncTimer);
});
