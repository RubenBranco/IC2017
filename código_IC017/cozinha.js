"use strict";

var date;

function updateTimeUI(){
    $("#dateDay").text(date.getDate() + ' /');
    $("#dateMonth").text(date.getMonth() + 1 + ' /');
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
                                '</h1><button class="btn-primary btn-md" id="popup-close">Fechar</button>' +
                                '<div class="row"><span>Estado: </span><input type="checkbox" id="state"></div>' +
                                '<div class="row"><span>Programa</span><select class="programa"><option value="normal">Normal</option>' +
                                '</select></div><div class="row"><div class="checkbox"><label><input type="checkbox" value="arrumar">Arrumar após finalizar: </label></div></div></div></div></div>');
        $("#popup-close").click(function(){
            $("#popup-close").unbind('click');
            $(".pop-up").remove();
            if (localStorage.getItem("cenario") === 'Maria') {
                $('#myModal').modal('show');
            }
        });
        $("#state").bootstrapSwitch('size', 'mini');
        if (localStorage.getItem('loicaState') !== undefined) {
                $("#state").bootstrapSwitch('state', localStorage.getItem('loicaState'));
            }
        $("#state").on('switchChange.bootstrapSwitch', function(event, state){
            localStorage.setItem('loicaState', state);
        });
    });
    $("#mesa").click(function(){
       $(".ui-wrapper").append("<div class='pop-up'><div class='content'><div class='popup-container'><h1>Meter a mesa" +
           "</h1><button class='btn-primary btn-md' id='popup-close'>Fechar</button>" +
           "<div class='row'><label>Número de pessoas <input type='text' class='form-control mesa'></label></div></div></div></div>");
        $("#popup-close").click(function(){
            $("#popup-close").unbind('click');
            $(".pop-up").remove();
            if (localStorage.getItem("cenario") === 'Maria') {
                $('#myModal').modal('show');
            }
        });
        
    });
}

$(document).ready(function(){main()});