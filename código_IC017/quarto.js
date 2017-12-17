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

function selectSave(id, key) {
    if (localStorage.getItem(key) !== null) {
        $("." + id).val(localStorage.getItem(key));
        $("." + id).trigger("change");
    }
    $("." + id).on("select2:select", function (e) {
        localStorage.setItem(key, e.params.data.id);
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
    $("#chao").click(function () {
        $(".ui-wrapper").append('<div class="pop-up"><div class="content"><div class="popup-container"><h1>Chão' +
            '</h1><button class="btn-primary btn-md" id="popup-close">Fechar</button>' +
            '<div class="row"><span>Limpeza</span><select class="chaoTemp"><option value="minima">Mínima</option>' +
            '<option value="total">Total</option><option value="parcial">Parcial</option></select>');
        $(".chaoTemp").select2();
        selectSave("chaoTemp", "chaoTempOption");
        $("#popup-close").click(function () {
            $("#popup-close").unbind('click');
            $(".pop-up").remove();
        });

    });

    $("#Cama").click(function () {
        $(".ui-wrapper").append('<div class="pop-up"><div class="content"><div class="popup-container"><h1>Cama' +
            '</h1><button class="btn-primary btn-md" id="popup-close">Fechar</button>' +
            '<div class="row"><span>Fazer a cama: </span><input type="checkbox" id="state"></div>' +
            '<div class="row"><span>Reclinar: </span><input type="checkbox" id="stateR"></div>');
        $("#popup-close").click(function () {
            $("#popup-close").unbind('click');
            $(".pop-up").remove();
        });
        $("#state").bootstrapSwitch('size', 'mini');
        if (localStorage.getItem('camaState') !== undefined) {
            $("#state").bootstrapSwitch('state', localStorage.getItem('camaState'));
        }
        $("#state").on('switchChange.bootstrapSwitch', function (event, state) {
            localStorage.setItem('camaState', state);
        });
        $("#stateR").bootstrapSwitch('size', 'mini');
        if (localStorage.getItem('camaRState') !== undefined) {
            $("#state").bootstrapSwitch('state', localStorage.getItem('camaRState'));
        }
        $("#stateR").on('switchChange.bootstrapSwitch', function (event, state) {
            localStorage.setItem('camaRState', state);
        });
    });

    $("#lights").click(function () {
        $(".ui-wrapper").append("<div class='pop-up'><div class='content'><div class='popup-container'><h1>Luzes</h1>" +
            "<button class=\"btn-primary btn-md\" id=\"popup-close\">Fechar</button>" +
            "<div class='slider-container container'><span>Intensidade</span><input type='range' min='0' max='100' value='50' id='lightRange'>" +
            "</div><div id='rangeControl'><i class='material-icons' style='cursor:pointer'>remove_circle</i><input type='number' style='width:50px;' max='100' min='0'><i style='cursor:pointer' class='material-icons'>add_circle</i></div></div></div></div>");
        if (localStorage.getItem('quartoLightState') !== undefined) {
            $("#lightRange").val(localStorage.getItem('quartoLightState'));
        }
        $("#popup-close").click(function () {
            $("#popup-close").unbind("click");
            localStorage.setItem("quartoLightState", $("#lightRange").val());
            $(".pop-up").remove();
        });
        $("#rangeControl input").val($("#temp").val());
        $("#rangeControl input").change(function () {
            $("#temp").val($(this).val());
        });
        $("#rangeControl input").val($("#lightRange").val());
        $("#rangeControl input").change(function () {
            $("#lightRange").val($(this).val());
        });
        $("#rangeControl i").click(function () {
            var which = $(this).text();
            var value = which === "add_circle" ? 1 : -1;
            var op = Number($("#rangeControl input").val()) + value;
            if (op >= 0 && op <= 100) {
                $("#rangeControl input").val(String(op));
                $("#lightRange").val(String(op));
            }
        });
    });

    $("#aircon").click(function () {
        $(".ui-wrapper").append("<div class='pop-up'><div class='content'><div class='popup-container'>" +
            "<h1>Ar Condicionado</h1><button class=\"btn-primary btn-md\" id=\"popup-close\">Fechar</button>" +
            "<div class='row'>Estado: <input type='checkbox' id='state'></div>" +
            "<div class='row slider-container container'><span>Temperatura</span><input type='range' min='16' max='30' value='24' id='temp'>" +
            "</div><div id='rangeControl'><i class='material-icons' style='cursor:pointer'>remove_circle</i><input type='number' style='width:50px;' max='30' min='16'><i style='cursor:pointer' class='material-icons'>add_circle</i></div></div></div></div>");
        $("#popup-close").click(function () {
            $("#popup-close").unbind("click");
            localStorage.setItem("temperatureBRState", $("#temp").val());
            $(".pop-up").remove();
        });
        if (localStorage.getItem("temperatureBRState") !== undefined) {
            $("#temp").val(localStorage.getItem("temperatureBRState"));
        }
        $("#state").bootstrapSwitch("size", "mini");
        stateSetter("state", "airconBRState");
        stateHandler("state", "airconBRState");
        $("#rangeControl input").val($("#temp").val());
        $("#rangeControl input").change(function () {
            $("#temp").val($(this).val());
        });
        $("#rangeControl i").click(function () {
            var which = $(this).text();
            var value = which === "add_circle" ? 1 : -1;
            var op = Number($("#rangeControl input").val()) + value;
            if (op >= 16 && op <= 30) {
                $("#rangeControl input").val(String(op));
                $("#temp").val(String(op));
            }
        });
    });

    $("#musica").click(function () {
        $(".ui-wrapper").append('<div class="pop-up"><div class="content"><div class="popup-container"><h1>Música' +
            '</h1><button class="btn-primary btn-md" id="popup-close">Fechar</button>' +
            '<div class="row"><span>Playlist</span><select class="musicSelect"><option value="hiphop">Hip hop</option>' +
            '<option value="jazz">Jazz</option><option value="soul">Soul</option></select>');
        $(".musicSelect").select2();
        selectSave("musicSelect", "musicBROption");
        $("#popup-close").click(function () {
            $("#popup-close").unbind('click');
            $(".pop-up").remove();
        });
    });

}

$(document).ready(function () {
    main()
});
