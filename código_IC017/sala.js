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
            "<div class='row slider-container container'><span class='minArcon'>1</span><input type='range' min='16' max='30' value='24' id='temp'><span class='maxArcon'>30</span>" +
            "</div><div id='rangeControl'><i class='material-icons' style='cursor:pointer'>remove_circle</i><input type='number' style='width:50px;' max='30' min='16'><i style='cursor:pointer' class='material-icons'>add_circle</i></div></div></div></div>");
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
    });
    $("#boxtv").click(function () {
        $(".ui-wrapper").append('<div class="pop-up"><div class="content"><div class="popup-container"><h1>Box TV' +
            '</h1><button class="btn-primary btn-md" id="popup-close">Fechar</button>' +
            ' <div class="row"><span>Estado: </span><input type="checkbox" id="state"></div>' +
            '<div class="row"><span>Canal:</span><select class="canal"><option value="89">89</option>' +
            '<option value="88">88</option><option value="87">87</option></select></div>' +
            '<div class="row"><button type="button" class="btn-primary btn-md btnGravar">' +
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
            "<div class='slider-container container'><span class='minArcon'>1</span><input type='range' min='0' max='100' value='50' id='lightRange'><span class='maxArcon'>100</span>" +
            "</div><div id='rangeControl'><i class='material-icons' style='cursor:pointer'>remove_circle</i><input type='number' style='width:50px;' max='100' min='0'><i style='cursor:pointer' class='material-icons'>add_circle</i></div></div></div></div>");
        if (localStorage.getItem('livingRoomLightState') !== undefined) {
            $("#lightRange").val(localStorage.getItem('livingRoomLightState'));
        }
        $("#popup-close").click(function () {
            $("#popup-close").unbind("click");
            localStorage.setItem("livingRoomLightState", $("#lightRange").val());
            $(".pop-up").remove();
        });
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
