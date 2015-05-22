$(document).ready(function() {
    checkPage();
});

window.addEventListener('push', checkPage);
var pageStack = [];

function getPageName() {
    var content = document.getElementsByClassName("content")[0];
    var pageName = content.id;
    return pageName;
}

function checkPage() {

    pageStack.push(getPageName());
    
    var content = document.getElementsByClassName("content")[0];
    var pageName = content.id;

    if(pageName) {

        var jsFileName = "js/" + pageName + ".js";
        //getJavascript(jsFileName);
        //if (pageName == "welcome") {
        //    getJavascript("js/settingsWelcome.js");
        //}
        $.getScript(jsFileName)

        .done(function( pageName, textStatus ) {
           console.log( textStatus );
        })

        .fail(function( jqxhr, statusText, errorThrown ) {
            console.log(errorThrown);
            console.log(statusText);
            console.log(jqxhr);
        });

        var cssFileName = "css/" + pageName +".css";
        var fileref = document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", cssFileName);
        fileref.id = "css_" + cssFileName;

        if (typeof fileref != "undefined") {
            document.getElementsByTagName("head")[0].appendChild(fileref);
        }
        //
        //disableOtherCSS(pageName);
    }
}

//function getJavascript(jsFileName) {
//    $.getScript(jsFileName)
//
//    .done(function( pageName, textStatus ) {
//        console.log( textStatus );
//    })
//
//    .fail(function( jqxhr, statusText, errorThrown ) {
//        console.log(errorThrown);
//        console.log(statusText);
//        console.log(jqxhr);
//    });
//}

function disableOtherCSS(pageName) {

    var $css = $('link:not([href="css/' + pageName + '.css"],' +
                 ' [href="css/ratchet-theme-ios.css"],' +
                 ' [href="css/ratchet.css"],' +
                 '[href="css/common.css"])');

    var string = "";
    $css.each(function(index){
        $(this).attr("disabled", "disabled");
        //string += "; " + $(this).attr("href");
    });

}

/*
// Example of adding params
    $("#SOME_BUTTON_ID").click(function() {

        // add param data
        var eventInfo = [];
        eventInfo["eventName"] = "George is awesome";
        params.push(eventInfo);

        var href = $(this).data("href");    // page location
        navWithParams(href);
    });
*/
function navWithParams(pageHref) {

    var targetElement = document.getElementById('ghost');
    targetElement.href = pageHref;

    var evt = document.createEvent('UIEvent');
    evt.initUIEvent('touchend', true, true, window, 1);
    targetElement.dispatchEvent(evt);
}



/*
// Example of getting params
     myParams = getParams();

     if (myParams != null) {
         var eventName = myParams["eventName"];
         alert(eventName);
     }
*/
var params = [];
function getParams() {
    if (params.length > 0){
        return params[params.length - 1];
    } else {
        return null;
    }
}