"use strict";

var date;

function updateTimeUI() {
    $("#dateDay").text(date.getDate() + ' /');
    $("#dateMonth").text(date.getMonth() + 1 + ' /');
    $("#dateYear").text(date.getFullYear());
    $("#dateTime").text(date.toLocaleTimeString());
}

function main() {
    date = new Date();
    updateTimeUI();
    setInterval(function () {
        date.setSeconds(date.getSeconds() + 1);
        updateTimeUI();
    }, 1000);
    $("#logoutA").click(function(){
       location.replace("login.html");
    });
    $("#lights").click(function(){
        $(".ui-wrapper").append("<div class='pop-up'><div class='content'><div class='popup-container'><h1>Luzes</h1>" +
            "<button class=\"btn-primary btn-md\" id=\"popup-close\">Fechar</button>" +
            "<div class='slider-container container'><input type='range' min='1' max='100' value='50' id='lightRange'>" +
            "</div></div></div></div>");
        if (localStorage.getItem('livingRoomLightState') !== undefined) {
            $("#lightRange").val(localStorage.getItem('livingRoomLightState'));
        }
        $("#popup-close").click(function(){
            $("#popup-close").unbind("click");
            localStorage.setItem("livingRoomLightState", $("#lightRange").val());
            $(".pop-up").remove();
        });
    });
    $("#console").click(function(){
        $(".ui-wrapper").append('<div class="pop-up"><div class="content"><div class="popup-container"><h1>Consola' +
            '</h1><button class="btn-primary btn-md" id="popup-close">Fechar</button>' +
            ' <div class="row"><span>Estado: </span><input type="checkbox" id="state"></div>' +
            '<div class="row"><span>Jogo:</span><select class="canal"><option value="89">89</option>' +
            '<option value="88">88</option><option value="87">87</option></select></div></div></div></div>');
        $("#popup-close").click(function () {
            $("#popup-close").unbind('click');
            $(".pop-up").remove();
        });
        $(".canal").select2();
        $("#state").bootstrapSwitch('size', 'mini');
        if (localStorage.getItem('consoleState') !== undefined) {
            if (localStorage.getItem('consoleState') === "true") {
                $("#state").bootstrapSwitch('state', true);
            }
            else {
                $("#state").bootstrapSwitch('state', false);
            }
        }
        $("#state").on('switchChange.bootstrapSwitch', function (event, state) {
            localStorage.setItem('consoleState', String(state));
        });
    });
    $("#tv").click(function () {
        $(".ui-wrapper").append('<div class="pop-up"><div class="content"><div class="popup-container"><h1>Televisão' +
            '</h1><button class="btn-primary btn-md" id="popup-close">Fechar</button>' +
            ' <div class="row"><span>Estado: </span><input type="checkbox" id="state"></div>' +
            '<div class="row"><span>Canal:</span><select class="canal"><option value="89">89</option>' +
            '<option value="88">88</option><option value="87">87</option></select></div></div></div></div>');
        $("#popup-close").click(function () {
            $("#popup-close").unbind('click');
            $(".pop-up").remove();
            if (localStorage.getItem("cenario") === 'Maria') {
                $('#myModal').modal('show');
            }
        });
        $(".canal").select2();
        $("#state").bootstrapSwitch('size', 'mini');
        if (localStorage.getItem('tvState') !== undefined) {
            if (localStorage.getItem('tvState') === "true") {
                $("#state").bootstrapSwitch('state', true);
            }
            else {
                $("#state").bootstrapSwitch('state', false);
            }
        }
        $("#state").on('switchChange.bootstrapSwitch', function (event, state) {
            localStorage.setItem('tvState', String(state));
        });
    });

}

$(document).ready(function () {
    main()
});
