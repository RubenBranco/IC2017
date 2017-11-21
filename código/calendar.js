"use strict";

var date;
var eventHolder;
var idnum;
var chosenContacts = [];
var renderedTasks = [];


function renderDivision(division){
    var menuLines = tarefaMenu(division);
    if ($("#division-setting-dropdown").length) {
        $(".division-settings").remove();
    }
    $(".add-task-row").append('<div class="col-md-3 division-settings"><select id="division-setting-dropdown"></select></div>');
    $("#division-setting-dropdown").select2();
    $("#division-setting-dropdown").append("<option value='' disabled selected>Escolha uma tarefa</option>");
    for (var i = 0; i < menuLines.length; i++) {
        $("#division-setting-dropdown").append("<option value='" + menuLines[i] + "'>" + menuLines[i] + "</option>");
    }
    $("#division-setting-dropdown").on('select2:select', function(e){
        tarefaSettings(e.params.data.text);
    });
}

function addTask(){
    $(".ui-wrapper").append("<div class='container icon_wrapper_index add-task-wrapper' style='z-index:10'>" +
        "<div class='row add-task-row'><div class='col-md-6'><h1>Escolha zona da casa:</h1><div class='row'>" +
        "<div class='col-md-2'></div><div class='col-md-2'><img src='assets/imgs/quarto.svg' class='small-images'></div>" +
        "<div class='col-md-2'><img src='assets/imgs/sala.svg' class='small-images'></div><div class='col-md-2'>" +
        "<img src='assets/imgs/casaDeBanho.svg' class='small-images'></div><div class='col-md-2'></div></div>" +
        "<div class='row'><div class='col-md-2'></div><div class='col-md-2'><img src='assets/imgs/cozinha.png' " +
        "class='small-images'></div><div class='col-md-2'><img src='assets/imgs/escritorio.svg' class='small-images'>" +
        "</div><div class='col-md-2'><img src='assets/imgs/jardim.svg' class='small-images'></div>" +
        "<div class='col-md-2'></div></div></div></div></div>");
    $(".small-images").click(function(){
       var division = $(this).prop('src').split('/');
       division = division[division.length - 1].split('.')[0];
       renderDivision(division);
    });
}

function renderTasks(){
    var eventsTasks = localStorage.getItem('eventsTasks') === null ? [] : JSON.parse(localStorage.getItem('eventsTasks'));
    for (var i = 0; i < eventsTasks.length; i++) {
        if (renderedTasks.indexOf(i) === -1) {
            $("<tr id='" + "Task-" + String(i) + "'><td>" + eventsTasks[i]['name'] + "</td><td>" + eventsTasks[i]['date']
                + "</td><td>" + eventsTasks[i]['time'] + "</td><td>" + eventHolder.title + "</td><td>" +
                "<img src='assets/imgs/edit.svg' style='height:24px;width:24px;cursor:pointer' class='editTask'> " +
                "<img src='assets/imgs/delete.svg' style='height:24px;width:24px;cursor:pointer' class='delTask'></td></tr>");
            chosenContacts.push(i);
        }
    }
}

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
    $(".icon_wrapper_index").append('<div class="container contacts-wrapper" style="height:500px;width:200px;z-index:10;"><h1>CONTACTOS</h1><div class="container contacts"></div></div>');
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

function updateTimeUI(){
    $("#dateDay").text(date.getDay() + ' /');
    $("#dateMonth").text(date.getMonth() + ' /');
    $("#dateYear").text(date.getFullYear());
    $("#dateTime").text(date.toLocaleTimeString());
}

function main() {
    date = new Date();
    updateTimeUI();
    setInterval(function(){
        date.setSeconds(date.getSeconds() + 1);
        updateTimeUI();
    }, 1000);
    $("#Calendar").fullCalendar({
        customButtons: {
            create: {
                text: 'Criar',
                click: function() {
                    localStorage.setItem('newEventDate', $("#Calendar").fullCalendar('getDate').format());
                    location.replace('./novoEvento.html');
                }
            }
        },
        header: {
            left:   'today create prev,next',
            center: 'title',
            right:  'month,agendaWeek,agendaDay'
        },
        editable: true,
        height: 430,
        nowIndicator: true,
        dayClick: function(date, e, view) {
            $("#Calendar").fullCalendar('changeView', 'agendaDay', date);
        },
        eventClick: function(event, e, view) {
            eventHolder = event;
            if ($(".eventClickNav").length) {
                $(".eventClickNav").remove();
            }
            $(".ui-wrapper").append('<ul class="eventClickNav"><li><img src="assets/imgs/edit.svg" ' +
                'style="height:24px;width:24px;cursor:pointer" id="editEvent"></li><li><img src="assets/imgs/add.svg" ' +
                'style="height:24px;width:24px;cursor:pointer" id="addInvites"</li><li><img src="assets/imgs/delete.svg" ' +
                'style="height:24px;width:24px;cursor:pointer;" id="deleteEvent"></li></ul>');
            $(".eventClickNav").offset({top:$(e.currentTarget).offset().top - 120, left: $(e.currentTarget).offset().left - 35});
            $("#addInvites").click(function(){
                idnum = eventHolder.id;
                $(".ui-wrapper").append('<div class="container icon_wrapper_index" style="z-index:10;"></div>');
                $(".icon_wrapper_index").append('<h1>Lista de convidados</h1><table><thead><tr><th>NOME</th>' +
                '<th>NÚMERO DE PESSOAS</th></tr></thead><tbody><tr id="addTr"><td><img id="addImage" style="height:24px;width:24px;cursor:pointer" ' +
                'src="assets/imgs/add.svg"> <span id="addText" style="cursor:pointer">Adicionar Pessoas</span>' +
                '</td></tr></tbody><tfoot><tr><td>TOTAL</td><td id="totalInvites">0</td></tr></tfoot></table>' +
                '<button type="button" class="btn-primary btn-md" id="convidar" style="width:100px;">Convidar</button>');
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
                    $(".icon-wrapper-index").remove();
                });
            });
            $("#deleteEvent").click(function(){
                var events = JSON.parse(localStorage.getItem('events'));
                delete events[event.id];
                localStorage.setItem('events', JSON.stringify(events));
                $("#Calendar").fullCalendar('removeEvents', event.id);
                $(".eventClickNav").remove();
            });
            $("#editEvent").click(function(){
                if ($("#Calendar").fullCalendar('getView').title !== 'agendaDay') {
                    $("#Calendar").fullCalendar('changeView', 'agendaDay', eventHolder.start);
                }
                $(".ui-wrapper").append('<div class="container icon_wrapper_index" style="z-index:10;">' +
                    '<h1>Lista de Tarefas</h1><table><thead><tr><th>NOME</th><th>DATA</th><th>' +
                    'HORA</th><th>EVENTO</th><th>OPÇÕES</th></tr></thead><tbody><tr id="addTaskTr"><td colspan="5"><img id="addTask" style="height:24px;width:24px' +
                    ';cursor:pointer;" src="assets/imgs/add-task.svg"> <span id="addTaskText" style="cursor:pointer">' +
                    'Adicionar Tarefas</span></td></tr></tbody></table></div>');
                renderTasks();
                $("#addTaskText").click(function(){
                    addTask();
                });
                $("#addTask").click(function(){
                    addTask();
                });
                $("body").on('click', '.delTask', function(){
                   var taskID = Number($(this).parent().prop('id').split('-')[1]);
                   var eventTasks = JSON.parse(localStorage.getItem('eventsTasks'));
                   events.splice(taskID, 1);
                   $(this).parent().remove();
                   localStorage.setItem('eventsTasks', JSON.stringify(eventTasks));
                });
                $("body").on('click', '.editTask', function(){

                });
            });
        },
        viewRender: function(view, element){
            if ($(".eventClickNav").length) {
                $(".eventClickNav").remove();
            }
        }
    });
    if (localStorage.getItem('events') !== null) {
        var events = JSON.parse(localStorage.getItem('events'));
        for (var id in events) {
            $("#Calendar").fullCalendar('renderEvent',{title: events[id]['name'],
                start: events[id]['date'] + 'T' + events[id]['time'], allDay: false, editable:true,
                id:id}, true);
        }
    }
    if (localStorage.getItem('setCurrentDate') !== null) {
        $("#Calendar").fullCalendar('changeView', 'agendaDay', moment(localStorage.getItem('setCurrentDate')));
        localStorage.removeItem('setCurrentDate');
    }
    $("#back").click(function(){
       history.back();
    });
}

$(document).ready(function(){main()});