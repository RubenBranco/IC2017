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
    $("#chapSol").click(function () {
       $(".ui-wrapper").append("<div class='pop-up'><div class='content'><div class='popup-container'>" +
                                "<h1>Chapéus de Sol</h1><button class=\"btn-primary btn-md\" id=\"popup-close\">Fechar</button>" +
                                "<div class='row'>Estado: <input type='checkbox' id='stateChapSol'></div>"+
                                "</div></div>");
        $("#stateChapSol").bootstrapSwitch("size", "mini");
        stateSetter("stateChapSol", "ChapSolState");
        stateHandler("stateChapSol", "ChapSolState");
        $("#popup-close").click(function () {
            $("#popup-close").unbind("click");
            localStorage.setItem("ChapSolState", $("#stateChapSol").val());
            $(".pop-up").remove();
        });
    });
    $("#alarme").click(function () {
         $(".ui-wrapper").append("<div class='pop-up'><div class='content'><div class='popup-container'>" +
                                "<h1>Alarme</h1><button class=\"btn-primary btn-md\" id=\"popup-close\">Fechar</button>" +
                                "<div class='row'>Estado: <input type='checkbox' id='stateAlarme'></div>"+
                                "</div></div>");
        $("#stateAlarme").bootstrapSwitch("size", "mini");
        stateSetter("stateAlarme", "alarmeState");
        stateHandler("stateAlarme", "alarmeState");
        $("#popup-close").click(function () {
            $("#popup-close").unbind("click");
            localStorage.setItem("stateAlarme", $("#stateAlarme").val());
            $(".pop-up").remove();
        });
    });
    $("#rega").click(function () {
        $(".ui-wrapper").append("<div class='pop-up'><div class='content'><div class='popup-container'>" +
                                "<h1>Rega</h1><button class=\"btn-primary btn-md\" id=\"popup-close\">Fechar</button>" +
                                "<div class='row'>Estado: <input type='checkbox' id='stateRega'></div>"+
                                '<div class="row"><span>Modo:</span><select class="modoRega"><option value="Normal">Normal</option>' +
                                '<option value="Eco">Eco</option></select></div>'+
                                "</div></div></div>");
        $("#stateRega").bootstrapSwitch("size", "mini");
        stateSetter("stateRega", "RegaState");
        stateHandler("stateRega", "RegaState");
        $("#popup-close").click(function () {
            $("#popup-close").unbind("click");
            localStorage.setItem("stateRega", $("#stateRega").val());
            $(".pop-up").remove();
        });
        $(".modoRega").select2();
    });
    $("#bbq").click(function () {
        $(".ui-wrapper").append("<div class='pop-up'><div class='content'><div class='popup-container'>" +
                                "<h1>Grelhador</h1><button class=\"btn-primary btn-md\" id=\"popup-close\">Fechar</button>" +
                                "<div class='row'>Estado: <input type='checkbox' id='statebbq'></div>"+
                                '<div class="row"><span>Fogo:</span><select class="fogo"><option value="Normal">Normal</option>' +
                                '<option value="forte">Forte</option><option value="medio">Médio</option></select></div>'+
                                "</div></div></div>");
        $("#statebbq").bootstrapSwitch("size", "mini");
        stateSetter("statebbq", "BBQState");
        stateHandler("statebbq", "BBQState");
        $("#popup-close").click(function () {
            $("#popup-close").unbind("click");
            localStorage.setItem("statebbq", $("#statebbq").val());
            $(".pop-up").remove();
        });
        $(".fogo").select2();
    });
    $("#lights").click(function () {
        $(".ui-wrapper").append("<div class='pop-up'><div class='content'><div class='popup-container'><h1>Luzes</h1>" +
            "<button class=\"btn-primary btn-md\" id=\"popup-close\">Fechar</button>" +
            "<div class='slider-container container'><label>1</label><input type='range' min='0' max='100' value='50' id='lightRange'><label>100</label>" +
            "</div><div id='rangeControl'><i class='material-icons' style='cursor:pointer'>remove_circle</i><input type='number' style='width:50px;' max='100' min='1'><i style='cursor:pointer' class='material-icons'>add_circle</i></div></div></div></div>");
        if (localStorage.getItem('livingRoomLightState') !== undefined) {
            $("#lightRange").val(localStorage.getItem('livingRoomLightState'));
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
            localStorage.setItem("livingRoomLightState", $("#lightRange").val());
            $(".pop-up").remove();
        });
    });
    $("#animais").click(function () {
         $(".ui-wrapper").append("<div class='pop-up'><div class='content'><div class='popup-container'>" +
                                "<h1>Animais</h1><button class=\"btn-primary btn-md\" id=\"popup-close\">Fechar</button>" +
                                "<div class='row'>Reencher comida/àgua quando necessário: <input type='checkbox' id='stateAnimalComida'></div>"+
                                '<div class="row"><span>Dieta: </span><select class="comida"><option value="fit">Fitness</option>' +
                                '<option value="eco">Eco</option><option value="goodBoy">Delicious (only for good dogos)</option></select></div>'+
                                "</div></div></div>");
        $("#stateAnimalComida").bootstrapSwitch("size", "mini");
        stateSetter("stateAnimalComida", "animalStateComida");
        stateHandler("stateAnimalComida", "animalStateComida");
        $("#popup-close").click(function () {
            $("#popup-close").unbind("click");
            localStorage.setItem("stateAnimalComida", $("#stateAnimalComida").val());
            $(".pop-up").remove();
        });
        $(".comida").select2();
    });
}

$(document).ready(function () {
    main()
});
