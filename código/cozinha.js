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
    $("#loica").click(function(){
        $(".ui-wrapper").append('<div class="pop-up"><div class="content"><div class="popup-container"><h1>Máquina Lavar Loiça' +
            '</h1><i class="material-icons close" id="popup-close">' +
                    'cancel</i><div class="row"><span>Estado: </span><input type="checkbox" id="state"></div>' +
            '<div class="row"><span>Programa</span><select class="programa"><option value="normal">Normal</option>' +
            '</select></div><div class="row"><div class="checkbox"><label>Arrumar após finalizar: <input type="checkbox" value="arrumar"></label></div></div></div></div></div>');
            $("#popup-close").click(function(){
                $("#popup-close").unbind('click');
                $(".pop-up").remove();
            });
            $("#state").bootstrapSwitch('size', 'mini');
            if (localStorage.getItem('loicaState') !== undefined) {
                $("#state").bootstrapSwitch('state', localStorage.getItem('loicaState'));
            }
            $("#state").on('switchChange.bootstrapSwitch', function(event, state){
                localStorage.setItem('loicaState', state);
            });
    });
}

$(document).ready(function(){main()});