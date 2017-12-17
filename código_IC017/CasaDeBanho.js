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
    $("#chao").click(function () {
        $(".ui-wrapper").append("<div class='pop-up'><div class='content'><div class='popup-container'>" +
                                "<h1>Chão</h1><button class=\"btn-primary btn-md\" id=\"popup-close\">Fechar</button>" +
                                "<div class='row'>Estado: <input type='checkbox' id='stateChao'></div>" +
                                "<p>Temperatura: </p><div class='row slider-container container'><input type='range' min='16' max='30' value='24' id='tempChao'>" +
                                "</div></div></div></div>");
        $("#popup-close").click(function () {
            $("#popup-close").unbind("click");
            localStorage.setItem("temperatureStateChao", $("#tempChao").val());
            $(".pop-up").remove();
        });
        if (localStorage.getItem("temperatureStateChao") !== undefined) {
            $("#temp").val(localStorage.getItem("temperatureStateChao"));
        }
        $("#stateChao").bootstrapSwitch("size", "mini");
        stateSetter("stateChao", "ChaoState");
        stateHandler("stateChao", "ChaoState");
    });
    $("#banheira").click(function () {
        $(".ui-wrapper").append("<div class='pop-up'><div class='content'><div class='popup-container'>" +
                                "<h1>Banheira</h1><button class=\"btn-primary btn-md\" id=\"popup-close\">Fechar</button>" +
                                "<div class='row'>Estado: <input type='checkbox' id='stateBanheira'></div>"+
                                '<div class="row"><span>Massagem:</span><select class="massagem"><option value="forte">forte</option>' +
                                '<option value="media">media</option><option value="fraca">fraca</option></select></div>'+
                                "</div></div></div>");
        $("#stateBanheira").bootstrapSwitch("size", "mini");
        stateSetter("stateBanheira", "BanheiraState");
        stateHandler("stateBanheira", "BanheiraState");
        $("#popup-close").click(function () {
            $("#popup-close").unbind("click");
            localStorage.setItem("temperatureStateChao", $("#tempChao").val());
            $(".pop-up").remove();
        });
        $(".massagem").select2();
    });
    $("#musica").click(function () {
        $(".ui-wrapper").append("<div class='pop-up'><div class='content'><div class='popup-container'>" +
                                "<h1>Musica</h1><button class=\"btn-primary btn-md\" id=\"popup-close\">Fechar</button>" +
                                "<div class='row'>Estado: <input type='checkbox' id='stateMusica'></div>"+
                                '<div class="row"><span>Playlist:</span><select class="musica"><option value="Metal">Metal</option>' +
                                '<option value="Punk">Punk</option><option value="Jazz">Jazz</option></select></div>'+
                                "</div></div></div>");
        $("#stateMusica").bootstrapSwitch("size", "mini");
        stateSetter("stateMusica", "MusicaState");
        stateHandler("stateMusica", "MusicaState");
        $("#popup-close").click(function () {
            $("#popup-close").unbind("click");
            localStorage.setItem("musicaState", $("#stateMusica").val());
            $(".pop-up").remove();
        });
        $(".musica").select2();
    });
    
    
}

$(document).ready(function () {
    main()
});
