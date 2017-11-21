"use strict";

var currentTarget;
var foodQuantity = {};

function tarefaMenu(divisao) {
    var menu = {
        'cozinha': ['Ligar o forno', 'Meter a mesa', 'Ligar a TV', 'Ligar maquina de lavar', 'Tratar do jantar',
            'Comprar alimentos']
    };
    return menu[divisao];
}


function foodPurchase() {
    const lists = {'CARNES': ['Entremeada', 'Bifana', 'Costoleta'], 'PEIXE': ['Pescada', 'Dourada', 'Salmão']};
    var additionalLists = localStorage.getItem('additionalFoodPurchase');
    $(".ui-wrapper").append("<div class='icon_wrapper_cozinha foodPurchase' style='z-index:10;overflow-y:scroll'></div>");
    for (var item in lists) {
        $(".foodPurchase").append('<h2>' + item + '</h2>');
        $(".foodPurchase").append('<ul class="' + item + 'list"></ul>');
        for (var i = 0; i < lists[item].length; i++) {
            $("." + item + "list").append("<li class='foodLi " + lists[item][i] + "' style='cursor:pointer;list-style-type:none;'>" + lists[item][i] + "</li>");
        }
    }
    $(".foodPurchase").append('<button type="button" class="btn-primary btn-md" id="encomendar" style="width:150px;">Encomendar</button>');
    $("#encomendar").click(function(){
        $(".foodPurchase").remove();
        $(".add-task-row").append("<h4>Encomendas</h4><ul id='encomendaResult'></ul>");
        for (var item in foodQuantity) {
            console.log(item);
            if (foodQuantity[item] > 0) {
                $("#encomendaResult").append("<li>" + item + ': ' + foodQuantity[item] + 'kg');
            }

        }
    });
    $(".foodLi").click(function (e) {
        if (currentTarget === e.target && $(".quantity").length) {
            $(".quantity").remove();
        }
        else {
            currentTarget = e.target;
            if ($(".quantity").length) {
                $(".quantity").remove();
            }
            $(".ui-wrapper").append('<div style="height:300px;width:100px;z-index:10" class="quantity"><h4>Quantidade</h4><input type="text" class="inputQ form-control' +
                '"><button type="button" class="btn-primary btn-md" id="confirmQ">Confirmar</button><button id="cancelQ" type="button" class="btn-primary btn-md' +
                '">Cancelar</button></div>');
            $(".quantity").offset({top: $(currentTarget).offset().top + 30, left: $(currentTarget).offset().left + 20});
            if (foodQuantity.hasOwnProperty($(currentTarget).prop("class").split()[1])) {
                $(".inputQ").val(foodQuantity[$(currentTarget).prop("class").split()[1]]);
            }
            $("#cancelQ").click(function () {
                $(".quantity").remove();
            });
            $("#confirmQ").click(function () {
                foodQuantity[$(currentTarget).prop("class").split()[1]] = $(".inputQ").val();
                $(".quantity").remove();
                $(currentTarget).css('font-weight', foodQuantity[$(currentTarget).prop("class").split()[1]] > 0 ? 'bold' : 'normal');
            });
        }
    });
}

function setTable() {
    $(".division-settings").append("<div><label>Número de pessoas <input type='text' class='form-control'></label></div>");
}

function tarefaSettings(tarefa) {
    switch (tarefa) {
        case 'Comprar alimentos':
            foodPurchase();
            break;
        case 'Meter a mesa':
            setTable();
            break;
    }
}