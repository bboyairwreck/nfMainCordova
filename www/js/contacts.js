var patientID = localStorage.getItem("patient");

$(document).ready(function() {
    fetchContacts();
});

function fetchContacts() {
    var url = "http://ericchee.com/neverforgotten/getContacts.php";

    $.ajax(url, {
        dataType : "json",
        data : {
            'n' : patientID
        },
        success : contactsSuccess,
        error : ajaxError
    });
}

function contactsSuccess(data) {

    // TODO Remove this so that way we don't clear anything and only prepend
    //$("#remindersWrap").html("");
    //
    for (var i = 0; i < data.length; i++){
        var $newCard = $("#contactTemplate .contactCardWrap").clone();

        var name = data[i]["PersonFName"] + " " + data[i]["PersonLName"];
        var image = data[i]["PersonImage"];

        $contactName = $newCard.find(".contactName");
        $contactName.html(name);

        $contactImage = $newCard.find(".contactImg");
        $contactImage.attr('src', 'img/' + image);

        $("#contactsWrap").append($newCard);
    }
}
