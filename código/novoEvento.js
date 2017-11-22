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
    $(".ui-wrapper").append('<div class="container contacts-wrapper" style="height:500px;width:200px"><h1>CONTACTOS</h1><div class="container contacts"></div></div>');
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

function main() {
    date = new Date();
    updateTimeUI();
    setInterval(function () {
        date.setSeconds(date.getSeconds() + 1);
        updateTimeUI();
    }, 1000);
    $("#back").click(function(){
       history.back();
    });
    var newEventDate = localStorage.getItem('newEventDate');
    $("#date").val(newEventDate);
    $("#agendar").click(function(){
        var events = localStorage.getItem('events') === null ? {} : JSON.parse(localStorage.getItem('events'));
        var id = localStorage.getItem('nextID') === null ? "1" : localStorage.getItem('nextID');
        events[id] = {'name': $("#name").val(), 'date': $("#date").val(), 'time': $("#hour").val()};
        idnum = id;
        localStorage.setItem('events', JSON.stringify(events));
        localStorage.setItem('setCurrentDate', $("#date").val());
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
                '<button type="button" class="btn-primary btn-md" id="convidar">Convidar</button>');
            $("#addImage").click(function(){renderAddContacts()});
            $("#addText").click(function(){renderAddContacts()});
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
                location.replace('calendar.html');
            });
        });
        $("#no").click(function(){
           location.replace('calendar.html');
        });
    });
}

$(document).ready(function(){main()});