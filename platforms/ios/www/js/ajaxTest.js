$(document).ready(function() {


    $("#ajaxButton").click(function(){
        var url = "http://ericchee.com/csaTally/csaTally.php";

        $.ajax(url, {
            dataType : "json",
            success : ajaxSuccess,
            error : ajaxError
        });
    });

});

function ajaxSuccess(data) {
    alert("Call count : " + data["count"]);
}

function ajaxError( xhr, status, errorThrown ) {
    alert( "Sorry, there was a problem!" );
    console.log( "Error: " + errorThrown );
    console.log( "Status: " + status );
    console.dir( xhr );
}