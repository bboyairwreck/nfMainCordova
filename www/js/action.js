$(document).ready(function() {
    var createReminderButton = localStorage.getItem("createReminderButton");
    var callButton = localStorage.getItem("callButton");

    if (createReminderButton == 1) {
        if (callButton == 1) {     // call button and create reminder button

        } else {                    // create reminder button only

        }
    } else if (callButton == 1) {   // call button only

    }  else {                       // no call or create reminder button

    }
});
