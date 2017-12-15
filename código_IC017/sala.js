"use strict";

var date;

function updateTimeUI() {
    $("#dateDay").text(date.getDate() + ' /');
    $("#dateMonth").text(date.getMonth() + 1 + ' /');
    $("#dateYear").text(date.getFullYear());
    $("#dateTime").text(date.toLocaleTimeString());
}

function stateSetter(id, key) {
    if (localStorage.getItem(key) !== undefined) {
        if (localStorage.getItem(key) === "true") {
            $("#" + id).bootstrapSwitch('state', true);
        }
        else {
            $("#" + id).bootstrapSwitch('state', false);
        }
    }
}

function stateHandler(id, stateKey) {
    $("#" + id).on('switchChange.bootstrapSwitch', function (event, state) {
        localStorage.setItem(stateKey, String(state));
    });
}

function main() {
    date = new Date();
    updateTimeUI();
    setInterval(function () {
        date.setSeconds(date.getSeconds() + 1);
        updateTimeUI();
    }, 1000);
    $("#logoutA").click(function () {
        location.replace("login.html");
    });
    $("#sofa").click(function () {
        $(".ui-wrapper").append("<div class='pop-up'><div class='content'><div class='popup-container'>" +
            "<h1>Sofa</h1><button class='btn-primary btn-md' id='popup-close'>Fechar</button>" +
            "<div class='row'>Massagem: <input type='checkbox' id='state'></div>" +
            "<div class='row'>Reclinação: <input type='checkbox' id='reclineState'></div>" +
            "<div class='row'>Modo cama: <input type='checkbox' id='sofaBedState'></div></div></div></div>");
        $("#popup-close").click(function () {
            $("#popup-close").unbind("click");
            $(".pop-up").remove();
        });
        $("#sofaBedState").bootstrapSwitch("size", "mini");
        $("#reclineState").bootstrapSwitch("size", "mini");
        $("#state").bootstrapSwitch('size', 'mini');
        stateSetter('state', 'sofaMassageState');
        stateSetter('reclineState', 'sofaReclineState');
        stateHandler("state", "sofaMassageState");
        stateHandler("reclineState", "sofaReclineState");
        stateSetter('sofaBedState', 'sofaBedState');
        stateHandler('sofaBedState', 'sofaBedState');
    });
    $("#aircon").click(function () {
        $(".ui-wrapper").append("<div class='pop-up'><div class='content'><div class='popup-container'>" +
            "<h1>Ar Condicionado</h1><button class=\"btn-primary btn-md\" id=\"popup-close\">Fechar</button>" +
            "<div class='row'>Estado: <input type='checkbox' id='state'></div>" +
            "<div class='row slider-container container'><input type='range' min='16' max='30' value='24' id='temp'>" +
            "</div></div></div></div>");
        $("#popup-close").click(function () {
            $("#popup-close").unbind("click");
            localStorage.setItem("temperatureState", $("#temp").val());
            $(".pop-up").remove();
        });
        if (localStorage.getItem("temperatureState") !== undefined) {
            $("#temp").val(localStorage.getItem("temperatureState"));
        }
        $("#state").bootstrapSwitch("size", "mini");
        stateSetter("state", "airconState");
        stateHandler("state", "airconState");
    });
    $("#boxtv").click(function () {
        $(".ui-wrapper").append('<div class="pop-up"><div class="content"><div class="popup-container"><h1>Box TV' +
            '</h1><button class="btn-primary btn-md" id="popup-close">Fechar</button>' +
            ' <div class="row"><span>Estado: </span><input type="checkbox" id="state"></div>' +
            '<div class="row"><span>Canal:</span><select class="canal"><option value="89">89</option>' +
            '<option value="88">88</option><option value="87">87</option></select></div>' +
            '<div class="row"><button type="button" class="btn-primary btn-md">' +
            'Gravar programa atual</button></div></div></div></div>');
        $("#popup-close").click(function () {
            $("#popup-close").unbind("click");
            $(".pop-up").remove();
        });
        $("#state").bootstrapSwitch("size", "mini");
        stateSetter("state", "boxTvState");
        stateHandler("state", "boxTvState");
    });
    $("#lights").click(function () {
        $(".ui-wrapper").append("<div class='pop-up'><div class='content'><div class='popup-container'><h1>Luzes</h1>" +
            "<button class=\"btn-primary btn-md\" id=\"popup-close\">Fechar</button>" +
            "<div class='slider-container container'><input type='range' min='1' max='100' value='50' id='lightRange'>" +
            "</div></div></div></div>");
        if (localStorage.getItem('livingRoomLightState') !== undefined) {
            $("#lightRange").val(localStorage.getItem('livingRoomLightState'));
        }
        $("#popup-close").click(function () {
            $("#popup-close").unbind("click");
            localStorage.setItem("livingRoomLightState", $("#lightRange").val());
            $(".pop-up").remove();
        });
    });
    $("#console").click(function () {
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
        stateSetter("state", "consoleState");
        stateHandler("state", "consoleState");
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
        stateSetter("state", "tvState");
        stateHandler("state", "tvState");
    });

}

$(document).ready(function () {
    main()
});
