"use strict";

var date;

function updateTimeUI() {
    $("#dateDay").text(date.getDate() + ' /');
    $("#dateMonth").text(date.getMonth() + 1 + ' /');
    $("#dateYear").text(date.getFullYear());
    $("#dateTime").text(date.toLocaleTimeString());
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
    $("#loica").click(function () {
        $(".ui-wrapper").append('<div class="pop-up"><div class="content"><div class="popup-container"><h1>Máquina Lavar Loiça' +
            '</h1><button class="btn-primary btn-md" id="popup-close">Fechar</button>' +
            '<div class="row"><span>Estado: </span><input type="checkbox" id="state"></div>' +
            '<div class="row"><span>Programa</span><select class="programa"><option value="normal">Normal</option>' +
            '</select></div><div class="row"><div class="checkbox"><label><input type="checkbox" value="arrumar">Arrumar após finalizar: </label></div></div></div></div></div>');
        $("#popup-close").click(function () {
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
        $("#state").on('switchChange.bootstrapSwitch', function (event, state) {
            localStorage.setItem('loicaState', state);
        });
    });
    $("#foodInv").click(function () {
        $(".ui-wrapper").append('<div class="pop-up"><div class="content"><div class="popup-container"><h1>Inventário de comida' +
            '</h1><button class="btn-primary btn-md" id="popup-close">Fechar</button>' +
            '<div class="row"><span>Alimentos</span><select class="inventario"><option value="massa">Massa</option>' +
            '<option value="arroz">Arroz</option><option value="chocolate">Chocolate</option></select>');
        $("#popup-close").click(function () {
            $("#popup-close").unbind('click');
            $(".pop-up").remove();
        });
        $(".inventario").select2();
        if (localStorage.getItem("inventarioOption") !== null) {
            $(".inventario").val(localStorage.getItem("inventarioOption"));
            $(".inventario").trigger("change");
        }
        $(".inventario").on("select2:select", function (e) {
            localStorage.setItem("inventarioOption", e.params.data.id);
        });
    });

    $("#fogao").click(function () {
        $(".ui-wrapper").append('<div class="pop-up"><div class="content"><div class="popup-container"><h1>Fogão' +
            '</h1><button class="btn-primary btn-md" id="popup-close">Fechar</button>' +
            '<div class="row"><span>Estado: </span><input type="checkbox" id="state"></div>' +
            '<div class="row"><span>Acender bico</span><select class="programa"><option value="normal">Bico 1</option>' +
            '</select><div class="row"><span>Temperatura</span><select class="tempo"><option value="média">Média</option></div></div></div>');
        $("#popup-close").click(function () {
            $("#popup-close").unbind('click');
            $(".pop-up").remove();
        });
        $(".programa").select2();
        $(".tempo").select2();
        if (localStorage.getItem("programaFogaoOption") !== null) {
            $(".programa").val(localStorage.getItem("programaFogaoOption"));
            $(".programa").trigger("change");
        }
        $(".programa").on("select2:select", function (e) {
            localStorage.setItem("programaFogaoOption", e.params.data.id);
        });
        if (localStorage.getItem("tempoFogaoOption") !== null) {
            $(".tempo").val(localStorage.getItem("tempoFogaoOption"));
            $(".tempo").trigger("change");
        }
        $(".tempo").on("select2:select", function (e) {
            localStorage.setItem("tempoFogaoOption", e.params.data.id);
        });
        $("#state").bootstrapSwitch('size', 'mini');
        if (localStorage.getItem('fogaoState') !== undefined) {
            $("#state").bootstrapSwitch('state', localStorage.getItem('fogaoState'));
        }
        $("#state").on('switchChange.bootstrapSwitch', function (event, state) {
            localStorage.setItem('fogaoState', state);
        });
    });


    $("#roupa").click(function () {
        $(".ui-wrapper").append('<div class="pop-up"><div class="content"><div class="popup-container"><h1>Máquina de Lavar roupa' +
            '</h1><button class="btn-primary btn-md" id="popup-close">Fechar</button>' +
            '<div class="row"><span>Estado: </span><input type="checkbox" id="state"></div>' +
            '<div class="row"><span>Programa</span><select class="programa"><option value="normal">Lavar</option>' +
            '</select><div class="row"><span>Temperatura</span><select class="temp"><option value="normal">180º</option>');
        $("#popup-close").click(function () {
            $("#popup-close").unbind('click');
            $(".pop-up").remove();
        });
        $(".programa").select2();
        $(".temp").select2();
        selectSave("programa", "programaRoupaState");
        selectSave("temp", "tempRoupaState");
        $("#state").bootstrapSwitch('size', 'mini');
        if (localStorage.getItem('roupaState') !== undefined) {
            $("#state").bootstrapSwitch('state', localStorage.getItem('roupaState'));
        }
        $("#state").on('switchChange.bootstrapSwitch', function (event, state) {
            localStorage.setItem('roupaState', state);
        });
    });


    $("#fridge").click(function () {
        $(".ui-wrapper").append('<div class="pop-up"><div class="content"><div class="popup-container"><h1>Frigorífico' +
            '</h1><button class="btn-primary btn-md" id="popup-close">Fechar</button>' +
            '<div class="row"><span>Estado: </span><input type="checkbox" id="state"></div>' +
            '</select><div class="row"><span>Nível de frio</span><select class="programa"><option value="normal">4</option>');
        $("#popup-close").click(function () {
            $("#popup-close").unbind('click');
            $(".pop-up").remove();
        });
        $(".programa").select2();
        selectSave("programa", "fridgeProgramState");
        $("#state").bootstrapSwitch('size', 'mini');
        if (localStorage.getItem('fridgeState') !== undefined) {
            $("#state").bootstrapSwitch('state', localStorage.getItem('fridgeState'));
        }
        $("#state").on('switchChange.bootstrapSwitch', function (event, state) {
            localStorage.setItem('fridgeState', state);
        });
    });


    $("#roupaSec").click(function () {
        $(".ui-wrapper").append('<div class="pop-up"><div class="content"><div class="popup-container"><h1>Máquina de secar Roupa' +
            '</h1><button class="btn-primary btn-md" id="popup-close">Fechar</button>' +
            '<div class="row"><span>Estado: </span><input type="checkbox" id="state"></div>' +
            '<div class="row"><span>Programa</span><select class="programa"><option value="normal">Secagem total</option>' +
            '</select></div><div class="row"><div class="checkbox"><label><input type="checkbox" value="arrumar">Arrumar após finalizar: </label></div></div></div></div></div>');
        $("#popup-close").click(function () {
            $("#popup-close").unbind('click');
            $(".pop-up").remove();
        });
        $(".programa").select2();
        selectSave("programa", "roupaSecOption");
        $("#state").bootstrapSwitch('size', 'mini');
        if (localStorage.getItem('roupaSecState') !== undefined) {
            $("#state").bootstrapSwitch('state', localStorage.getItem('roupaSecState'));
        }
        $("#state").on('switchChange.bootstrapSwitch', function (event, state) {
            localStorage.setItem('roupaSecState', state);
        });
    });


    $("#micro").click(function () {
        $(".ui-wrapper").append('<div class="pop-up"><div class="content"><div class="popup-container"><h1>Microondas' +
            '</h1><button class="btn-primary btn-md" id="popup-close">Fechar</button>' +
            '<div class="row"><span>Estado: </span><input type="checkbox" id="state"></div>' +
            '<div class="row"><span>Watts</span><select class="programa"><option value="normal">850W</option>' +
            '</select><div class="row"><span>Tempo</span><select class="programaTime"><option value="normal">10 minutos</option>');
        $("#popup-close").click(function () {
            $("#popup-close").unbind('click');
            $(".pop-up").remove();
        });
        $(".programa").select2();
        $(".programaTime").select2();
        selectSave("programa", "programaMicroOption");
        selectSave("programaTime", "programaTimeMicroOption");
        $("#state").bootstrapSwitch('size', 'mini');
        if (localStorage.getItem('microState') !== undefined) {
            $("#state").bootstrapSwitch('state', localStorage.getItem('microState'));
        }
        $("#state").on('switchChange.bootstrapSwitch', function (event, state) {
            localStorage.setItem('microState', state);
        });
    });


    $("#cafe").click(function () {
        $(".ui-wrapper").append('<div class="pop-up"><div class="content"><div class="popup-container"><h1>Máquina de cafe' +
            '</h1><button class="btn-primary btn-md" id="popup-close">Fechar</button>' +
            '<div class="row"><span>Estado: </span><input type="checkbox" id="state"></div>' +
            '<div class="row"><span>Servir café</span><select class="programa"><option value="normal">Curto</option>');
        $("#popup-close").click(function () {
            $("#popup-close").unbind('click');
            $(".pop-up").remove();
        });
        $(".programa").select2();
        selectSave("programa", "cafeStateOption");
        $("#state").bootstrapSwitch('size', 'mini');
        if (localStorage.getItem('cafeState') !== undefined) {
            $("#state").bootstrapSwitch('state', localStorage.getItem('cafeState'));
        }
        $("#state").on('switchChange.bootstrapSwitch', function (event, state) {
            localStorage.setItem('cafeState', state);
        });
    });


    $("#forno").click(function () {
        $(".ui-wrapper").append('<div class="pop-up"><div class="content"><div class="popup-container"><h1>Forno' +
            '</h1><button class="btn-primary btn-md" id="popup-close">Fechar</button>' +
            '<div class="row"><span>Estado: </span><input type="checkbox" id="state"></div>' +
            '<div class="row"><span>Temperatura</span><select class="programa"><option value="normal">Alta</option>' +
            '</select><div class="row"><span>Tempo</span><select class="programaTime"><option value="normal">30 min</option>');

        $("#popup-close").click(function () {
            $("#popup-close").unbind('click');
            $(".pop-up").remove();
        });
        $(".programa").select2();
        $(".programaTime").select2();
        selectSave("programa", "programaTempOption");
        selectSave("programaTime", "programaTimeOption");
        $("#state").bootstrapSwitch('size', 'mini');
        if (localStorage.getItem('fornoState') !== undefined) {
            $("#state").bootstrapSwitch('state', localStorage.getItem('fornoState'));
        }
        $("#state").on('switchChange.bootstrapSwitch', function (event, state) {
            localStorage.setItem('fornoState', state);
        });
    });


    $("#jantar").click(function () {
        $(".ui-wrapper").append('<div class="pop-up"><div class="content"><div class="popup-container"><h1>Preparar jantar' +
            '</h1><button class="btn-primary btn-md" id="popup-close">Fechar</button>' +
            "<div class='row'><label>Número de pessoas <input type='text' class='form-control mesa'></label></div></div></div></div>");
        $("#popup-close").click(function () {
            $("#popup-close").unbind('click');
            $(".pop-up").remove();
        });
    });

    $("#refeicoes").click(function () {
        $(".ui-wrapper").append('<div class="pop-up"><div class="content"><div class="popup-container"><h1>Refeições' +
            '</h1><button class="btn-primary btn-md" id="popup-close">Fechar</button>' +
            '<div class="row"><span>Prato</span><select class="programa"><option value="normal">Bitoque</option>' +
            "</select><div class='row'><label>Número de pessoas <input type='text' class='form-control mesa'></label></div></div></div></div>");
        $("#popup-close").click(function () {
            $("#popup-close").unbind('click');
            $(".pop-up").remove();
        });
    });

    $("#mesa").click(function () {
        $(".ui-wrapper").append("<div class='pop-up'><div class='content'><div class='popup-container'><h1>Meter a mesa" +
            "</h1><button class='btn-primary btn-md' id='popup-close'>Fechar</button>" +
            "<div class='row'><label>Número de pessoas <input type='text' class='form-control mesa'></label></div></div></div></div>");
        $("#popup-close").click(function () {
            $("#popup-close").unbind('click');
            $(".pop-up").remove();
            if (localStorage.getItem("cenario") === 'Maria') {
                $('#myModal').modal('show');
            }
        });
    });
}

$(document).ready(function () {
    main()
});
