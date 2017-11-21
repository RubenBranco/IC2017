"use strict";

var date;

function updateTimeUI(){
    $("#dateDay").text(date.getDay() +' /');
    $("#dateMonth").text(date.getMonth() + ' /');
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
    $("#tv").click(function(){
        $(".ui-wrapper").append('<div class="pop-up"><div class="content"><div class="popup-container"><h1>Televisão' +
            '</h1><i class="material-icons close" id="popup-close">' +
                    'cancel</i><div class="row"><span>Estado: </span><input type="checkbox" id="state"></div>' +
            '<div class="row"><span>Canal:</span><select class="canal"><option value="89">89</option>' +
            '<option value="88">88</option><option value="87">87</option></select></div></div></div></div>');
                $("#popup-close").click(function(){
                    $("#popup-close").unbind('click');
                    $(".pop-up").remove();
                });
        $(".canal").select2();
        $("#state").bootstrapSwitch('size', 'mini');
        if (localStorage.getItem('tvState') !== undefined) {
            $("#state").bootstrapSwitch('state', localStorage.getItem('tvState'));
        }
        $("#state").on('switchChange.bootstrapSwitch', function(event, state){
            localStorage.setItem('tvState', state);
        });
    });

}

$(document).ready(function(){main()});