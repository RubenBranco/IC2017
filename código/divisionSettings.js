"use strict";

var currentTarget;
var foodQuantity = {};
var mealQuantity = {};

function tarefaMenu(divisao) {
    var menu = {
        'cozinha': ['Ligar o forno', 'Meter a mesa', 'Ligar a TV', 'Ligar maquina de lavar', 'Tratar do jantar',
            'Comprar alimentos', 'Refeição'],
        'jardim': ['Embelezamento e Piscina', 'Rega', 'Cortar relva', 'Limpar piscina', 'Acender luzes do pátio'],
        'sala': ['Sofá', 'Televisão', 'Consola', 'Aparelhagem', 'Karaoke']
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
        $(".division-settings").append("<h4>Encomendas</h4><ul id='encomendaResult'></ul>");
        for (var item in foodQuantity) {
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
            if (foodQuantity.hasOwnProperty($(currentTarget).prop("class").split(" ")[1])) {
                $(".inputQ").val(foodQuantity[$(currentTarget).prop("class").split(" ")[1]]);
            }
            $("#cancelQ").click(function () {
                $(".quantity").remove();
            });
            $("#confirmQ").click(function () {
                foodQuantity[$(currentTarget).prop("class").split(" ")[1]] = $(".inputQ").val();
                $(".quantity").remove();
                $(currentTarget).css('font-weight', foodQuantity[$(currentTarget).prop("class").split(" ")[1]] > 0 ? 'bold' : 'normal');
            });
        }
    });
}

function setTable() {
    $(".division-settings").append("<div><label>Número de pessoas <input type='text' class='form-control mesa'></label></div>");
}

function dinnerPrep() {
    $(".division-settings").append("<div class='checkbox'><label>Temperar Ingredientes <input type='checkbox' " +
        "id='season' value=''></label></div><div class='checkbox'><label>Descongelar Ingredientes " +
        "<input type='checkbox' id='defrost' value=''></label></div>");
}

function meal() {
    const meals = ['Bacalhau com natas', 'Lasanha', 'Lasanha vegetariana', 'Salmão grelhado', 'Bacalhau à lagareiro',
    'Bitoque', 'Entrecosto grelhado', 'Entremeado grelhado', 'Bolo de bolacha', 'Bolo de celebração', 'Molotov']
    $(".ui-wrapper").append("<div class='icon_wrapper_cozinha meal' style='z-index:10;overflow-y:scroll'><ul class='mealUL'>" +
        "</ul></div>");
    for (var i = 0; i < meals.length; i++) {
        $(".mealUL").append("<li class='mealLi " + meals[i] + "' style='cursor:pointer;list-style-type:none;'>" + meals[i] + "</li>");
    }
    $(".meal").append('<button type="button" class="btn-primary btn-md" id="encomendar" style="width:150px;">Encomendar</button>');
    $("#encomendar").click(function(){
        $(".meal").remove();
        $(".division-settings").append("<h4>Refeições</h4><ul id='encomendaResult'></ul>");
        for (var item in mealQuantity) {
            if (mealQuantity[item] > 0) {
                $("#encomendaResult").append("<li>" + item + ': ' + mealQuantity[item] + ' Pessoas');
            }

        }
    });
    $(".mealLi").click(function (e) {
        if (currentTarget === e.target && $(".quantity").length) {
            $(".quantity").remove();
        }
        else {
            currentTarget = e.target;
            if ($(".quantity").length) {
                $(".quantity").remove();
            }
            $(".ui-wrapper").append('<div style="height:300px;width:100px;z-index:10" class="quantity"><h4>Pessoas</h4><input type="text" class="inputQ form-control' +
                '"><button type="button" class="btn-primary btn-md" id="confirmQ">Confirmar</button><button id="cancelQ" type="button" class="btn-primary btn-md' +
                '">Cancelar</button></div>');
            $(".quantity").offset({top: $(currentTarget).offset().top + 30, left: $(currentTarget).offset().left + 20});
            if (mealQuantity.hasOwnProperty($(currentTarget).prop("class").split(" ")[1])) {
                $(".inputQ").val(mealQuantity[$(currentTarget).prop("class").split(" ")[1]]);
            }
            $("#cancelQ").click(function () {
                $(".quantity").remove();
            });
            $("#confirmQ").click(function () {
                mealQuantity[$(currentTarget).prop("class").split(" ")[1]] = $(".inputQ").val();
                $(".quantity").remove();
                $(currentTarget).css('font-weight', mealQuantity[$(currentTarget).prop("class").split(" ")[1]] > 0 ? 'bold' : 'normal');
            });
        }
    });
}

function tarefaSettings(tarefa) {
    switch (tarefa) {
        case 'Comprar alimentos':
            foodPurchase();
            break;
        case 'Meter a mesa':
            setTable();
            break;
        case 'Tratar do jantar':
            dinnerPrep();
            break;
        case 'Refeição':
            meal();
            break;
    }
}