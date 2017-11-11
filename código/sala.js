"use strict";

var date;

function updateTimeUI(){
    $("#dateDay").text(date.getDay());
    $("#dateMonth").text(date.getMonth());
    $("#dateYear").text(date.getFullYear());
    $("#dateTime").text(date.toLocaleTimeString());
}

function main(){
    date = new Date();
    updateTimeUI();
    setInterval(function(){
        date.setSeconds(date.getSeconds() + 1);
        updateTimeUI();
    }, 1000);
    $("#tv").click(function(){console.log("test");
        $(".ui-wrapper").append('<div class="pop-up"><div class="content"><div class="popup-container"><h1>Televisão' +
            '</h1><i class="material-icons close" id="popup-close">' +
                    'cancel</i><div class="row"><span>Estado: </span>OFF<label class="switch"><input type="checkbox"><span class="slider"></span></label>ON</span></div>' +
            '<div class="row"><span>Canal:</span><select class="canal"><option value="89">89</option>' +
            '<option value="88">88</option><option value="87">87</option></select></div></div></div></div>');
                $("#popup-close").click(function(){
                    $("#popup-close").unbind('click');
                    $(".pop-up").remove();
                });
        $(".canal").select2();
    });

}

$(document).ready(function(){main()});