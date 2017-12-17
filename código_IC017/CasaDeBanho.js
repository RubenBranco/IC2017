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
            "<div class='row slider-container container'><span class='minArcon'>16</span><input type='range' min='16' max='30' value='24' id='temp'><span class='maxArcon'>30</span>" +
            "</div><div id='rangeControl'><i class='material-icons' style='cursor:pointer'>remove_circle</i><input type='number' style='width:50px;' max='30' min='16'><i style='cursor:pointer' class='material-icons'>add_circle</i></div></div></div></div>");
        $("#popup-close").click(function () {
            $("#popup-close").unbind("click");
            localStorage.setItem("bathroomTemperatureState", $("#temp").val());
            $(".pop-up").remove();
        });
        if (localStorage.getItem("bathroomTemperatureState") !== undefined) {
            $("#temp").val(localStorage.getItem("bathroomTemperatureState"));
        }
        $("#rangeControl input").val($("#temp").val());
        $("#rangeControl input").change(function(){
            $("#temp").val($(this).val());
        });
        $("#rangeControl i").click(function(){
            var which = $(this).text();
            var value = which === "add_circle" ? 1 : -1;
            var op = Number($("#rangeControl input").val()) + value
            if (op >= 16 && op <= 30) {
                $("#rangeControl input").val(String(op));
                $("#temp").val(String(op));
            }
        });
        $("#state").bootstrapSwitch("size", "mini");
        stateSetter("state", "airconWCState");
        stateHandler("state", "airconWCState");
    });
    $("#lights").click(function () {
        $(".ui-wrapper").append("<div class='pop-up'><div class='content'><div class='popup-container'><h1>Luzes</h1>" +
            "<button class=\"btn-primary btn-md\" id=\"popup-close\">Fechar</button>" +
            "<div class='slider-container container'><span class='minArcon'>0</span><input type='range' min='0' max='100' value='50' id='lightRange'><span class='maxArcon'>100</span>" +
            "</div><div id='rangeControl'><i class='material-icons' style='cursor:pointer'>remove_circle</i><input type='number' style='width:50px;' max='100' min='0'><i style='cursor:pointer' class='material-icons'>add_circle</i></div></div></div></div>");
        if (localStorage.getItem('WCLightState') !== undefined) {
            $("#lightRange").val(localStorage.getItem('WCLightState'));
        }
        $("#rangeControl input").val($("#lightRange").val());
        $("#rangeControl input").change(function(){
            $("#lightRange").val($(this).val());
        });
        $("#rangeControl i").click(function(){
            var which = $(this).text();
            var value = which === "add_circle" ? 1 : -1;
            var op = Number($("#rangeControl input").val()) + value
            if (op >= 0 && op <= 100) {
                $("#rangeControl input").val(String(op));
                $("#lightRange").val(String(op));
            }
        });
        $("#popup-close").click(function () {
            $("#popup-close").unbind("click");
            localStorage.setItem("WCLightState", $("#lightRange").val());
            $(".pop-up").remove();
        });
    });
    $("#chao").click(function () {
        $(".ui-wrapper").append("<div class='pop-up'><div class='content'><div class='popup-container'>" +
                                "<h1>Chão</h1><button class=\"btn-primary btn-md\" id=\"popup-close\">Fechar</button>" +
                                "<div class='row'>Estado: <input type='checkbox' id='stateChao'></div>" +
                                "<p>Temperatura: </p><div class='row slider-container container'><span class='minArcon'>16</span><input type='range' min='16' max='30' value='24' id='tempChao'><span class='maxArcon'>30</span>" +
                                "</div><div id='rangeControl'><i class='material-icons' style='cursor:pointer'>remove_circle</i><input type='number' style='width:50px;' max='30' min='16'><i style='cursor:pointer' class='material-icons'>add_circle</i></div></div></div></div>");
        $("#popup-close").click(function () {
            $("#popup-close").unbind("click");
            localStorage.setItem("temperatureStateChao", $("#tempChao").val());
            $(".pop-up").remove();
        });
        if (localStorage.getItem("temperatureStateChao") !== undefined) {
            $("#tempChao").val(localStorage.getItem("temperatureStateChao"));
        }
        $("#rangeControl input").val($("#tempChao").val());
        $("#rangeControl input").change(function(){
            $("#tempChao").val($(this).val());
        });
        $("#rangeControl i").click(function(){
            var which = $(this).text();
            var value = which === "add_circle" ? 1 : -1;
            var op = Number($("#rangeControl input").val()) + value
            if (op >= 16 && op <= 30) {
                $("#rangeControl input").val(String(op));
                $("#tempChao").val(String(op));
            }
        });
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
            $(".pop-up").remove();
        });
        $(".massagem").select2();
        if (localStorage.getItem("massageOption") !== null) {
            $(".massagem").val(localStorage.getItem("massageOption"));
            $(".massagem").trigger("change");
        }
        $(".massagem").on("select2:select", function(e){
            localStorage.setItem("massageOption", e.params.data.id);
        });
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
            $(".pop-up").remove();
        });
        $(".musica").select2();
        if (localStorage.getItem("musicOption") !== null) {
            $(".musica").val(localStorage.getItem("musicOption"));
            $(".musica").trigger("change");
        }
        $(".musica").on("select2:select", function(e){
            localStorage.setItem("musicOption", e.params.data.id);
        });
    });
    
    
}

$(document).ready(function () {
    main()
});
