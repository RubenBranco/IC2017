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
    $("#logoutA").click(function(){
       location.replace("login.html");
    });
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
    $("#foodInv").click(function(){
      $(".ui-wrapper").append('<div class="pop-up"><div class="content"><div class="popup-container"><h1>Inventário de comida' +
                              '</h1><button class="btn-primary btn-md" id="popup-close">Fechar</button>' +
                              '<div class="row"><span>Alimentos</span><select class="inventario"><option value="massa">Massa</option>' +
                              '<option value="arroz">Arroz</option><option value="chocolate">Chocolate</option></select>');
      $("#popup-close").click(function(){
          $("#popup-close").unbind('click');
          $(".pop-up").remove();
        });
    });

    $("#fogao").click(function(){
      $(".ui-wrapper").append('<div class="pop-up"><div class="content"><div class="popup-container"><h1>Fogão' +
                              '</h1><button class="btn-primary btn-md" id="popup-close">Fechar</button>' +
                              '<div class="row"><span>Estado: </span><input type="checkbox" id="state"></div>' +
                              '<div class="row"><span>Acender bico</span><select class="programa"><option value="normal">Bico 1</option>' +
                              '</select><div class="row"><span>Temperatura</span><select class="tempo"><option value="média">Média</option>');
      $("#popup-close").click(function(){
          $("#popup-close").unbind('click');
          $(".pop-up").remove();
        });
        $("#state").bootstrapSwitch('size', 'mini');
        if (localStorage.getItem('loicaState') !== undefined) {
                $("#state").bootstrapSwitch('state', localStorage.getItem('loicaState'));
            }
        $("#state").on('switchChange.bootstrapSwitch', function(event, state){
            localStorage.setItem('loicaState', state);
        });
    });


    $("#roupa").click(function(){
      $(".ui-wrapper").append('<div class="pop-up"><div class="content"><div class="popup-container"><h1>Máquina de Lavar roupa' +
                              '</h1><button class="btn-primary btn-md" id="popup-close">Fechar</button>' +
                              '<div class="row"><span>Estado: </span><input type="checkbox" id="state"></div>' +
                              '<div class="row"><span>Programa</span><select class="programa"><option value="normal">Lavar</option>' +
                              '</select><div class="row"><span>Temperatura</span><select class="programa"><option value="normal">180º</option>');
      $("#popup-close").click(function(){
          $("#popup-close").unbind('click');
          $(".pop-up").remove();
        });
        $("#state").bootstrapSwitch('size', 'mini');
        if (localStorage.getItem('loicaState') !== undefined) {
                $("#state").bootstrapSwitch('state', localStorage.getItem('loicaState'));
            }
        $("#state").on('switchChange.bootstrapSwitch', function(event, state){
            localStorage.setItem('loicaState', state);
        });
    });


    $("#fridge").click(function(){
      $(".ui-wrapper").append('<div class="pop-up"><div class="content"><div class="popup-container"><h1>Frigorífico' +
                              '</h1><button class="btn-primary btn-md" id="popup-close">Fechar</button>' +
                              '<div class="row"><span>Estado: </span><input type="checkbox" id="state"></div>' +
                              '</select><div class="row"><span>Nível de frio</span><select class="programa"><option value="normal">4</option>');
      $("#popup-close").click(function(){
          $("#popup-close").unbind('click');
          $(".pop-up").remove();
        });
        $("#state").bootstrapSwitch('size', 'mini');
        if (localStorage.getItem('loicaState') !== undefined) {
                $("#state").bootstrapSwitch('state', localStorage.getItem('loicaState'));
            }
        $("#state").on('switchChange.bootstrapSwitch', function(event, state){
            localStorage.setItem('loicaState', state);
        });
    });


    $("#roupaSec").click(function(){
      $(".ui-wrapper").append('<div class="pop-up"><div class="content"><div class="popup-container"><h1>Máquina de secar Roupa' +
                              '</h1><button class="btn-primary btn-md" id="popup-close">Fechar</button>' +
                              '<div class="row"><span>Estado: </span><input type="checkbox" id="state"></div>' +
                              '<div class="row"><span>Programa</span><select class="programa"><option value="normal">Secagem total</option>' +
                              '</select></div><div class="row"><div class="checkbox"><label><input type="checkbox" value="arrumar">Arrumar após finalizar: </label></div></div></div></div></div>');
      $("#popup-close").click(function(){
          $("#popup-close").unbind('click');
          $(".pop-up").remove();
        });
        $("#state").bootstrapSwitch('size', 'mini');
        if (localStorage.getItem('loicaState') !== undefined) {
                $("#state").bootstrapSwitch('state', localStorage.getItem('loicaState'));
            }
        $("#state").on('switchChange.bootstrapSwitch', function(event, state){
            localStorage.setItem('loicaState', state);
        });
    });


    $("#micro").click(function(){
      $(".ui-wrapper").append('<div class="pop-up"><div class="content"><div class="popup-container"><h1>Microondas' +
                              '</h1><button class="btn-primary btn-md" id="popup-close">Fechar</button>' +
                              '<div class="row"><span>Estado: </span><input type="checkbox" id="state"></div>' +
                              '<div class="row"><span>Watts</span><select class="programa"><option value="normal">850W</option>' +
                              '</select><div class="row"><span>Tempo</span><select class="programa"><option value="normal">10 minutos</option>');
      $("#popup-close").click(function(){
          $("#popup-close").unbind('click');
          $(".pop-up").remove();
        });
        $("#state").bootstrapSwitch('size', 'mini');
        if (localStorage.getItem('loicaState') !== undefined) {
                $("#state").bootstrapSwitch('state', localStorage.getItem('loicaState'));
            }
        $("#state").on('switchChange.bootstrapSwitch', function(event, state){
            localStorage.setItem('loicaState', state);
        });
    });


    $("#cafe").click(function(){
      $(".ui-wrapper").append('<div class="pop-up"><div class="content"><div class="popup-container"><h1>Máquina de cafe' +
                              '</h1><button class="btn-primary btn-md" id="popup-close">Fechar</button>' +
                              '<div class="row"><span>Estado: </span><input type="checkbox" id="state"></div>' +
                              '<div class="row"><span>Servir café</span><select class="programa"><option value="normal">Curto</option>');
      $("#popup-close").click(function(){
          $("#popup-close").unbind('click');
          $(".pop-up").remove();
        });
        $("#state").bootstrapSwitch('size', 'mini');
        if (localStorage.getItem('loicaState') !== undefined) {
                $("#state").bootstrapSwitch('state', localStorage.getItem('loicaState'));
            }
        $("#state").on('switchChange.bootstrapSwitch', function(event, state){
            localStorage.setItem('loicaState', state);
        });
    });


    $("#forno").click(function(){
      $(".ui-wrapper").append('<div class="pop-up"><div class="content"><div class="popup-container"><h1>Forno' +
                              '</h1><button class="btn-primary btn-md" id="popup-close">Fechar</button>' +
                              '<div class="row"><span>Estado: </span><input type="checkbox" id="state"></div>' +
                              '<div class="row"><span>Temperatura</span><select class="programa"><option value="normal">Alta</option>' +
                              '</select><div class="row"><span>Tempo</span><select class="programa"><option value="normal">30 min</option>');

      $("#popup-close").click(function(){
          $("#popup-close").unbind('click');
          $(".pop-up").remove();
        });
        $("#state").bootstrapSwitch('size', 'mini');
        if (localStorage.getItem('loicaState') !== undefined) {
                $("#state").bootstrapSwitch('state', localStorage.getItem('loicaState'));
            }
        $("#state").on('switchChange.bootstrapSwitch', function(event, state){
            localStorage.setItem('loicaState', state);
        });
    });


    $("#jantar").click(function(){
    $(".ui-wrapper").append('<div class="pop-up"><div class="content"><div class="popup-container"><h1>Preparar jantar' +
                            '</h1><button class="btn-primary btn-md" id="popup-close">Fechar</button>' +
                            "<div class='row'><label>Número de pessoas <input type='text' class='form-control mesa'></label></div></div></div></div>");
    $("#popup-close").click(function(){
        $("#popup-close").unbind('click');
        $(".pop-up").remove();
      });
    });

    $("#refeicoes").click(function(){
    $(".ui-wrapper").append('<div class="pop-up"><div class="content"><div class="popup-container"><h1>Refeições' +
                            '</h1><button class="btn-primary btn-md" id="popup-close">Fechar</button>' +
                            '<div class="row"><span>Prato</span><select class="programa"><option value="normal">Bitoque</option>' +
                            "</select><div class='row'><label>Número de pessoas <input type='text' class='form-control mesa'></label></div></div></div></div>");
    $("#popup-close").click(function(){
        $("#popup-close").unbind('click');
        $(".pop-up").remove();
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
