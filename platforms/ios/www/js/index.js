var patientID = 17;

$(document).ready(function() {
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


/*

 <div class="reminderDayWrap">
     <h2>TODAY</h2>
     <div class="reminderContent">
        <div class="reminderLine">
            <div class="reminderTitle">Dinner with Sarah</div>
            <div class="reminderTime">9 PM</div>
        </div>
        <div class="reminderLine">
            <div class="reminderTitle">Take medication</div>
            <div class="reminderTime">10 AM</div>
        </div>
     </div>
 </div>
 */

function ajaxSuccess(data) {

    // TODO Remove this so that way we don't clear anything and only prepend
    $("#remindersWrap").html("");

    for (var i = 0; i < data.length; i++){
        var $newCard = $("#reminderTemplate .reminderDayWrap").clone();

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

        $eventDate = $newCard.find("h2");
        $eventDate.text(dateFormatArr["dateLine"]);

        //  dateFormatArr["dayName"] + dateFormatArr["monthName"]


        $("#remindersWrap").prepend($newCard);
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

$("#eventButton").click(function() {
    clearInterval(syncTimer);
});

