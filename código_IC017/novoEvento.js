"use strict";

var date;
var idnum;
var chosenContacts = [];

function refreshTotalInvites() {
    var contacts = JSON.parse(localStorage.getItem('contacts'));
    var totalInvites = 0;
    for (var i = 0; i < chosenContacts.length; i++) {
        totalInvites += contacts[chosenContacts[i]]['size'];
    }
    $("#totalInvites").text(String(totalInvites));
}
function renderContacts() {
    var contacts = JSON.parse(localStorage.getItem('contacts'));
    for (var i = 0; i < chosenContacts.length; i++) {
        if (!$("#" + chosenContacts[i]).length) {
            $("<tr><td id='" + chosenContacts[i] + "'>" + contacts[chosenContacts[i]]['name'] + "" +
                " <img src='assets/imgs/delete.svg' style='height:24px;width:24px;cursor:pointer' class='delContact'>" +
                "</td><td>" + contacts[chosenContacts[i]]['size'] + "</td></tr>").insertBefore("#addTr");
        }
    }
    refreshTotalInvites();
}

function contacts() {
    localStorage.setItem('contacts', JSON.stringify({"1":{'name': 'Ze', 'size':1}, "2":{'name':'amigos casamento', 'size':89}}));
}

function renderAddContacts() {
    var contacts = localStorage.getItem('contacts') === null ? {} : JSON.parse(localStorage.getItem('contacts'));
    $(".ui-wrapper").append('<div class="container contacts-wrapper" style="top: 230px;"><h1>CONTACTOS</h1><div class="container contacts"></div></div>');
    for (var id in contacts) {
        if (chosenContacts.indexOf(id) === -1) {
            $(".contacts").append('<div class="row"><div id="_' + String(id) + '" class="col-md-12 contact" style="cursor:pointer">' +
                contacts[id]['name'] + '</div></div>');
        }
    }
    $(".contacts-wrapper").append('<button type="button" class="btn-primary btn-md" style="width:100px" id="addContacts">Adicionar</button><button type="button" style="width:100px" class="btn-primary btn-md" id="cancelContacts">Cancelar</button>');
    $(".contact").click(function(){
        $(this).toggleClass('selected');
    });
    $("#cancelContacts").click(function(){$(".contacts-wrapper").remove();});
    $("#addContacts").click(function(){
        $(".selected").each(function(){
            chosenContacts.push($(this).prop('id').slice(1));
        });
        renderContacts();
        $(".contacts-wrapper").remove();
    });
}

function updateTimeUI() {
    $("#dateDay").text(date.getDate() + ' /');
    $("#dateMonth").text(date.getMonth() + 1 + ' /');
    $("#dateYear").text(date.getFullYear());
    $("#dateTime").text(date.toLocaleTimeString());
}

function validate(visual) {
    var ret = true;
    if ($('#name').val().length > 0 && $('#date').val().length > 0 && $('#hour').val().length > 0) {
        if (!moment($("#date").val()).isSameOrAfter(moment().hour(0).minute(0).second(0).millisecond(0))) {
            ret = false;
            if (visual) {
                if (!$("#errorDateBefore").length) {
                    $("#dateGroup").addClass("has-error");
                    $("<span id='errorDateBefore' class='help-block'>Não pode escolher uma data no passado</span>").insertAfter("#date");
                }
            }
        } else {
            if ($("#errorDateBefore").length) {
                $("#dateGroup").removeClass("has-error");
                $("#errorDateBefore").remove();
            }
        }
        if (moment($("#date").val()).isSameOrAfter(moment().hour(0).minute(0).second(0).millisecond(0)) && $("#date").val().split("-")[0].length > 4) {
            ret = false;
            if (visual) {
                if (!$("#errorYear").length) {
                    $("#dateGroup").addClass("has-error");
                    $("<span id='errorYear' class='help-block'>Não pode escolher um ano acima de 4 digitos</span>").insertAfter("#date");
                }
            }
        } else {
            if ($("#errorYear").length) {
                $("#dateGroup").addClass("has-error");
                $("#errorYear").remove();
            }
        }
    } else {
        if (!$("#name").val().length) {
            if (visual) {
                if (!$("#noNameError").length) {
                    $("#nameGroup").addClass("has-error");
                    $("<span id='noNameError' class='help-block'>Escolha um nome</span>").insertAfter("#name");
                }
            }
        } else {
            if ($("#noNameError").length) {
                $("#nameGroup").removeClass("has-error");
                $("#noNameError").remove();
            }
        }
        if (!$("#date").val().length) {
            if (visual) {
                if (!$("#noDateError").length) {
                    $("#dateGroup").addClass("has-error");
                    $("<span id='noDateError' class='help-block'>Escolha uma data</span>").insertAfter("#date");
                }
            }
        } else {
            if ($("#noDateError").length) {
                $("#dateGroup").removeClass("has-error");
                $("#noDateError").remove();
            }
        }
        if (!$("#hour").val().length) {
            if (visual) {
                if (!$("#noTimeError").length) {
                    $("#hourGroup").addClass("has-error");
                    $("<span id='noTimeError' class='help-block'>Escolha uma hora</span>").insertAfter("#hour");
                }
            }
        } else {
            if ($("#noTimeError").length) {
                $("#hourGroup").removeClass("has-error");
                $("#noTimeError").remove();
            }
        }
        ret = false;
    }
    if (ret) {
        if ($("#agendar").hasClass("disabled")) $("#agendar").removeClass("disabled");
    }
    else {
        if (!$("#agendar").hasClass("disabled")) $("#agendar").addClass("disabled");
    }
    return ret;
}

function keyboardAppear(){
  $('input[class="form-control keyboardNeed"]').click(function(){
    $('#keyboard').show();
  });

  $("div[id='keyboard']").click(function(){
    $('#keyboard').hide();
  });
}

function keyboardAppear(){
  $('input[class="form-control keyboardNeed"]').click(function(){
    $('#keyboard').show();
  });

  $("div[id='keyboard']").click(function(){
    $('#keyboard').hide();
  });
}


function main() {
    date = new Date();
    $(".ui-wrapper").append("<div id='keyboard' class='keyboard' style='display:none'><img src='./assets/imgs/keyboard.png'</div>");
    keyboardAppear();
    updateTimeUI();
    $(".ui-wrapper").append("<div id='keyboard' style='display:none' class='keyboard'><img src='./assets/imgs/keyboard.png'</div>");
    keyboardAppear();
    setInterval(function () {
        date.setSeconds(date.getSeconds() + 1);
        updateTimeUI();
    }, 1000);
    $("#logoutA").click(function(){
       location.replace("login.html");
    });
    $("#back").click(function(){
       history.back();
    });
    var newEventDate = localStorage.getItem('newEventDate');
    if (newEventDate !== null) {
        $("#date").val(newEventDate);
        localStorage.removeItem("newEventDate");
    }
    else {
        $("#date").val(moment().format("YYYY-MM-DD"));
        $("#hour").val(moment().format("HH:mm"));
    }
    $("#agendar").click(function(){
        if (validate(true)) {
            var events = localStorage.getItem('events') === null ? {} : JSON.parse(localStorage.getItem('events'));
            var id = localStorage.getItem('nextID') === null ? "1" : localStorage.getItem('nextID');
            events[id] = {'name': $("#name").val(), 'date': $("#date").val(), 'time': $("#hour").val()};
            idnum = id;
            localStorage.setItem('events', JSON.stringify(events));
            localStorage.setItem('setCurrentDate', id);
            localStorage.setItem('nextID', String(Number(id) + 1));
            $(".icon_wrapper_index").empty();
            $(".icon_wrapper_index").append('<h1>Deseja fazer os convites para o evento?</h1>' +
                '<button type="button" style="width:100px" class="btn-primary btn-md" id="yes">Sim</button><button type="button" ' +
                'class="btn-primary btn-md" style="width:100px" id="no">Não</button>');
            $("#yes").click(function(){
                $(".icon_wrapper_index").empty();
                $(".icon_wrapper_index").append('<h1>Lista de convidados</h1><table><thead><tr><th>NOME</th>' +
                    '<th>NÚMERO DE PESSOAS</th></tr></thead><tbody><tr id="addTr"><td><img id="addImage" style="height:24px;width:24px;cursor:pointer" ' +
                    'src="assets/imgs/add.svg"> <span id="addText" style="cursor:pointer">Adicionar Pessoas</span>' +
                    '</td></tr></tbody><tfoot><tr><td>TOTAL</td><td id="totalInvites">0</td></tr></tfoot></table>' +
                    '<button type="button" class="btn-primary btn-md" style="width:100px;" id="convidar">Convidar</button>');
                $("#addImage").click(function(){
                    if (!$(".contacts-wrapper").length) renderAddContacts()
                });
                $("#addText").click(function(){
                    if (!$(".contacts-wrapper").length) renderAddContacts()
                });
                $("body").on("click", ".delContact", function(){
                    var delID = $(this).parent().prop('id');
                    chosenContacts.splice(chosenContacts.indexOf(delID), 1);
                    $("#" + delID).parent().remove();
                    refreshTotalInvites();
                });
                $("#convidar").click(function(){
                    var invites = localStorage.getItem('invites') === null ? {} : JSON.parse(localStorage.getItem('invites'));
                    invites[idnum] = chosenContacts;
                    localStorage.setItem('invites', JSON.stringify(invites));
                    localStorage.setItem("convidados", "True");
                    location.replace('calendar.html');
                });
            });
            $("#no").click(function(){
                location.replace('calendar.html');
            });
        }
    });
    $("#name, #date, #hour").change(function(){validate(false)});
    
}

$(document).ready(function(){main()});
