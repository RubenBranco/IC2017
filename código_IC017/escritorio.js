"use strict";

var date;
var PCInterval;

function pcOnSet() {
    $(".popup-container").append("<div id='pcOn'><div class='row'>Espaço Disponível: 524GB/930GB (56%)</div><div class='row'>RAM Disponível: " +
    "<span id='ramUsage'></span>/8192 (<span id='ramPercentage'></span>%)</div><div class='row'>Uso CPU: <span id='CPUUsage'></span>%</div></div>");
    $("#ramUsage").text(String(Math.floor((Math.random() * 7000) + 1193)));
    $("#ramPercentage").text(String(Math.floor(((Number($("#ramUsage").text())/8192) * 100))));
    $("#CPUUsage").text(String(Math.floor((Math.random() * 100) + 1)));
    PCInterval = setInterval(function(){
        $("#ramUsage").text(String(Math.floor((Math.random() * 7000) + 1193)));
        $("#ramPercentage").text(String(Math.floor(((Number($("#ramUsage").text())/8192) * 100))));
        $("#CPUUsage").text(String(Math.floor((Math.random() * 100) + 1)));
    }, 2000);
}
function stateSetter(id, key) {
    if (localStorage.getItem(key) !== undefined) {
        if (localStorage.getItem(key) === "true") {
            $("#" + id).bootstrapSwitch('state', true);
            pcOnSet();
        }
        else {
            $("#" + id).bootstrapSwitch('state', false);
        }
    }
}

function stateHandler(id, stateKey) {
    $("#" + id).on('switchChange.bootstrapSwitch', function (event, state) {
        localStorage.setItem(stateKey, String(state));
        if (stateKey === "PCState" && state) {
            pcOnSet();
        } else if(stateKey === "PCState" && !state) {
            $("#pcOn").remove();
            clearInterval(PCInterval);
        }
    });
}

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
    $("#logoutA").click(function () {
        location.replace("login.html");
    });
    $("#back").click(function () {
        history.back();
    });
    $("#PC").click(function(){
        $(".ui-wrapper").append("<div class='pop-up'><div class='content'><div class='popup-container'><h1>Computador</h1>" + 
        "<button class='btn-primary btn-md' id='popup-close'>Fechar</button><div class='row'>Estado: <input type='checkbox' id='state'></div></div></div></div>");
        $("#popup-close").click(function () {
            $("#popup-close").unbind("click");
            $(".pop-up").remove();
        });
        $("#state").bootstrapSwitch('size', 'mini');
        stateSetter("state", "PCState");
        stateHandler("state", "PCState");
    });
    $("#lights").click(function(){
        $(".ui-wrapper").append("<div class='pop-up'><div class='content'><div class='popup-container'><h1>Luzes</h1>" + 
        "<button class='btn-primary btn-md' id='popup-close'>Fechar</button>" + 
        "<div class='slider-container container'><input type='range' min='0' max='100' value='50' id='lightRange'>" +
        "</div><div id='rangeControl'><i class='material-icons' style='cursor:pointer'>remove_circle</i><input type='number' style='width:50px;' max='100' min='0'><i style='cursor:pointer' class='material-icons'>add_circle</i></div></div></div></div>");
        if (localStorage.getItem('officeLightState') !== undefined) {
            $("#lightRange").val(localStorage.getItem('officeLightState'));
        }
        $("#popup-close").click(function () {
            $("#popup-close").unbind("click");
            localStorage.setItem("officeLightState", $("#lightRange").val());
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
    $("#desk").click(function () {
        $(".ui-wrapper").append("<div class='pop-up'><div class='content'><div class='popup-container'><h1>Secretária</h1></div></div></div>");
    });
    $("#frigobar").click(function () {
        $(".ui-wrapper").append("<div class='pop-up'><div class='content'><div class='popup-container'>" + 
        "<h1>Frigobar</h1><div class='row'>Estado: <input type='checkbox' id='state'></div></div></div></div>");
        $("#popup-close").click(function () {
            $("#popup-close").unbind("click");
            $(".pop-up").remove();
        });
        $("#state").bootstrapSwitch("size", "mini");
        stateSetter("state", "frigobarState");
        stateHandler("state", "frigobarState");
    });
}

$(document).ready(function(){main()});