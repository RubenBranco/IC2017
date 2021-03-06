"use strict";

var date;
var eventHolder;
var idnum;
var chosenContacts = [];
var renderedTasks = [];
var division;
var delTaskEvent;

function renderDivision(division) {
    var menuLines = tarefaMenu(division);
    if ($("#division-setting-dropdown").length) {
        $(".division-settings").empty();
    }
    $(".division-settings").append('<select id="division-setting-dropdown"></select>');
    $("#division-setting-dropdown").select2();
    $("#division-setting-dropdown").append("<option value='' disabled selected>Escolha uma tarefa</option>");
    for (var i = 0; i < menuLines.length; i++) {
        $("#division-setting-dropdown").append("<option value='" + menuLines[i] + "'>" + menuLines[i] + "</option>");
    }
    $("#division-setting-dropdown").on('select2:select', function (e) {
        $("#taskName").val(e.params.data.text);
        $(".division-settings").css({'border': 'none', 'border-radius': 'none', 'animation': 'none'});
        if ($(".division-settings").children().length > 2) {
            $(".division-settings").children().each(function () {
                if ($(this).prop('id') !== 'division-setting-dropdown' && !$(this).hasClass("select2")) {
                    $(this).remove();
                }
            });
        }
        tarefaSettings(e.params.data.text);
    });
}

function saveTask() {
    if (validate(true)) {
        var eventsTasks = localStorage.getItem('eventsTasks') === null ? {} : JSON.parse(localStorage.getItem('eventsTasks'));
        var taskObj = {
            'name': $("#taskName").val(), 'date': $("#taskDate").val(),
            'time': $("#taskTime").val(), 'division': division, 'type': $("#division-setting-dropdown").val()
        };
        switch (taskObj['type']) {
            case 'Meter a mesa':
                taskObj['value'] = $(".mesa").val();
                break;
            case 'Comprar alimentos':
                taskObj['value'] = foodQuantity;
                break;
            case 'Tratar do jantar':
                var vals = [];
                $("div.division-settings input[type='checkbox']").each(function () {
                    if ($(this).is(":checked")) {
                        vals.push($(this).prop("id"));
                    }
                });
                taskObj['value'] = vals;
                break;
            case 'Refeição':
                taskObj['value'] = mealQuantity;
                break;
        }
        if (taskObj['type'] === 'Refeição') {
            if (localStorage.getItem("cenario") === "Fernandes") {
                $(".add-task-wrapper").append("<div class='container mealWarn' style='z-index:10;height:400px;width:300px'>" +
                "<h2>AVISO</h2><p>Não tem ingredientes suficientes para</p><ul><li>Bacalhau com natas</li>" +
                "<li>Lasanha vegetariana</li></ul><p>Deseja encomendar ingredientes na mercearia local?</p>" +
                "<button type='button' style='width:100px' id='orderY' class='btn-primary btn-md'>Sim</button>" +
                "<button type='button' style='width:100px' id='orderN' class='btn-primary btn-md'>Não</button></div>");
                $("#orderY").click(function () {
                    if (eventsTasks.hasOwnProperty(eventHolder.id)) {
                        eventsTasks[eventHolder.id].push(taskObj);
                    }
                    else {
                        eventsTasks[eventHolder.id] = [taskObj];
                    }
                    localStorage.setItem('eventsTasks', JSON.stringify(eventsTasks));
                    $(".add-task-wrapper").remove();
                    $(".mealWarn").remove();
                    $(".editEventDiv").show();
                    renderTasks();
                });
                $("#orderN").click(function () {
                    $(".mealWarn").remove();
                });
            }
        }
        else {
            if (eventsTasks.hasOwnProperty(eventHolder.id)) {
                eventsTasks[eventHolder.id].push(taskObj);
            }
            else {
                eventsTasks[eventHolder.id] = [taskObj];
            }
            localStorage.setItem('eventsTasks', JSON.stringify(eventsTasks));
            $(".add-task-wrapper").remove();
            renderTasks();
            $(".editEventDiv").show();
        }
        return taskObj;
    }
}

function addTaskMenu() {
    if (!$(".add-task-wrapper").length) {
        addTask();
        $(".ui-wrapper").append("<div id='keyboard' style='display:none'><img src='./assets/imgs/keyboard.png'</div>");
        keyboardAppear();
        $(".editEventDiv").hide();
    }
}
function editEvent() {
    $(".ui-wrapper").append('<div class="container icon_wrapper_index editEventDiv" style="z-index:10;">' +
        '<h1>Lista de Tarefas</h1><table><thead><tr><th style="padding-right:80px;">NOME</th><th style="padding-right:80px;">DATA</th><th style="padding-right:80px;">' +
        'HORA</th><th style="padding-right:80px;">EVENTO</th><th>OPÇÕES</th></tr></thead><tbody><tr id="addTaskTr"><td colspan="5"><img id="addTask" style="height:24px;width:24px' +
        ';cursor:pointer;" src="assets/imgs/add-task.svg"> <span id="addTaskText" style="cursor:pointer">' +
        'Adicionar Tarefas</span></td></tr></tbody></table><button type="button" style="width:100px;" class="btn-primary btn-md" id="exitEditEvent">Sair</button></div>');
    $("#Calendar").hide();
    $("#exitEditEvent").click(function () {
        $(".editEventDiv").remove();
        if ($(".add-task-wrapper").length) {
            $(".add-task-wrapper").remove();
        }
        renderedTasks = [];
        $("#Calendar").show();
    });
    renderTasks();
    $("#addTaskText").click(function () {
        addTaskMenu();
    });
    $("#addTask").click(function () {
        addTaskMenu();
    });
    $("body").on('click', '.delTask', function () {
        $('#myModal1').modal('show');
        delTaskEvent = $(this);
    }); 
    $("body").on('click', '.editTask', function () {
        if (!$(".add-task-wrapper").length) {
            $(".editEventDiv").hide();
            var taskID = Number($(this).parent().parent().prop('id').split('-')[1]);
            var eventTasks = JSON.parse(localStorage.getItem('eventsTasks'));
            $(".ui-wrapper").append("<div class='container icon_wrapper_index add-task-wrapper' style='z-index:10'>" +
                "<div class='row add-task-row'><div class='col-md-6'><h1>Escolha zona da casa:</h1><div class='row'>" +
                "<div class='col-md-2'></div><div class='col-md-2'><img src='assets/imgs/quarto.svg' class='small-images'></div>" +
                "<div class='col-md-2'><img src='assets/imgs/sala.svg' class='small-images'></div><div class='col-md-2'>" +
                "<img src='assets/imgs/casaDeBanho.svg' class='small-images'></div><div class='col-md-2'></div></div>" +
                "<div class='row'><div class='col-md-2'></div><div class='col-md-2'><img src='assets/imgs/cozinha.png' " +
                "class='small-images'></div><div class='col-md-2'><img src='assets/imgs/escritorio.svg' class='small-images'>" +
                "</div><div class='col-md-2'><img src='assets/imgs/jardim.svg' class='small-images'></div>" +
                "<div class='col-md-2'></div></div></div><div class='col-md-3 division-settings'></div><div class='col-md-3 " +
                "name-settings'><div class='form-group' id='nameGroup'><label for='taskName'>Nome da tarefa" +
                "<span style='color:red'>*</span>:</label><input type='text' class='form-control keyboardNeed'" +
                " id='taskName' placeholder='Máx. 80 caracteres' maxlength='80'></div><div class='form-group' id='dateGroup'>" +
                "<label for='taskDate'>Data<span style='color:red'>*</span>:</label><input type='date' id='taskDate' class='form-group'>" +
                "</div><div class='form-group' id='timeGroup'><label for='taskTime'>Hora<span style='color:red'>*</span>:</label>" +
                "<input type='time' class='form-group' id='taskTime'></div><button type='button' id='scheduleTask' class='btn-primary btn-md' style='width:100px'>" +
                "Agendar</button><button type='button' id='cancelTask' class='btn-primary btn-md' style='width:100px'>Cancelar</button></div></div></div>");
            division = eventTasks[eventHolder.id][taskID]['division'];
            renderDivision(eventTasks[eventHolder.id][taskID]['division']);
            $("#division-setting-dropdown").val(eventTasks[eventHolder.id][taskID]['type']);
            $("#division-setting-dropdown").trigger('change');
            if (eventTasks[eventHolder.id][taskID]['type'] !== "Refeição" && eventTasks[eventHolder.id][taskID]['type'] !== "Comprar alimentos") {
                tarefaSettings(eventTasks[eventHolder.id][taskID]['type']);
            }
            $("#taskDate").val(eventTasks[eventHolder.id][taskID]['date']);
            $("#taskName").val(eventTasks[eventHolder.id][taskID]['name']);
            $("#taskTime").val(eventTasks[eventHolder.id][taskID]['time']);
            if (eventTasks[eventHolder.id][taskID]['type'] === 'Tratar do jantar') {
                var vals = eventTasks[eventHolder.id][taskID]['value'];
                for (var i = 0; i < vals.length; i++) {
                    $("#" + vals[i]).prop("checked", true);
                }
            }
            else if (eventTasks[eventHolder.id][taskID]['type'] === "Meter a mesa") {
                    $(".mesa").val(eventTasks[eventHolder.id][taskID]['value']);
            } else {
                if (eventTasks[eventHolder.id][taskID]['type'] === "Comprar alimentos") {
                    foodQuantity = eventTasks[eventHolder.id][taskID]['value'];
                    $(".division-settings").append("<div class='orderRender'><h4>Encomendas</h4><ul id='encomendaResult'></ul></div>");
                    for (var item in foodQuantity) {
                        if (foodQuantity[item] > 0) {
                            $("#encomendaResult").append("<li>" + item + ': ' + foodQuantity[item] + 'kg');
                        }
                    }
                    $(".orderRender").append("<button type='button' class='btn-primary btn-md' style='width:100px' id='orderRenderButton'>Adicionar outros alimentos</button>");
                    $("#orderRenderButton").click(function(){
                       foodPurchase();
                    });
                } else if (eventTasks[eventHolder.id][taskID]['type'] === "Refeição") {
                    mealQuantity = eventTasks[eventHolder.id][taskID]['value'];
                    $(".division-settings").append("<div class='mealRender'><h4>Refeições</h4><ul id='encomendaResult'></ul></div>");
                    for (var item in mealQuantity) {
                        if (mealQuantity[item] > 0) {
                            $("#encomendaResult").append("<li>" + item + ': ' + mealQuantity[item] + ' Pessoas');
                        }
                    }
                    $(".mealRender").append("<button type='button' class='btn-primary btn-md' style='width:100px' id='mealRenderButton'>Adicionar refeições</button>");
                    $("#mealRenderButton").click(function(){
                        meal();
                    });
                }
            }
            $("#scheduleTask").click(function () {
                if (validate(true)) {
                    eventTasks[eventHolder.id].splice(taskID, 1);
                    localStorage.setItem("eventsTasks", JSON.stringify(eventTasks));
                    var taskObj = saveTask();
                    console.log("taskObj");
                    $("#Task-" + taskID).empty();
                    $("#Task-" + taskID).append("<td>" + taskObj['name'] + "</td><td>" + taskObj['date'] + "</td><td>" + taskObj['time'] + "</td><td>" + eventHolder.title + 
                    "</td><td><img src='assets/imgs/edit.svg' style='height:24px;width:24px;cursor:pointer' class='editTask'> " +
                    "<img src='assets/imgs/delete.svg' style='height:24px;width:24px;cursor:pointer' class='delTask'></td></tr>");
                }
            });
            $("#cancelTask").click(function () {
                $(".add-task-wrapper").remove();
                $(".editEventDiv").show();
            });
        }
    });
}

function addTask() {
    $(".ui-wrapper").append("<div class='container icon_wrapper_index icon_wrapper_zona add-task-wrapper' style='z-index:10'>" +
        "<div class='row add-task-row'><div class='col-md-6' id='division-choice'><h1>Escolha zona da casa:</h1><div class='row'>" +
        "<div class='col-md-2'></div><div class='col-md-2'><img src='assets/imgs/quarto.svg' class='small-images'></div>" +
        "<div class='col-md-2'><img src='assets/imgs/sala.svg' class='small-images'></div><div class='col-md-2'>" +
        "<img src='assets/imgs/casaDeBanho.svg' class='small-images'></div><div class='col-md-2'></div></div>" +
        "<div class='row'><div class='col-md-2'></div><div class='col-md-2'><img src='assets/imgs/cozinha.png' " +
        "class='small-images'></div><div class='col-md-2'><img src='assets/imgs/escritorio.svg' class='small-images'>" +
        "</div><div class='col-md-2'><img src='assets/imgs/jardim.svg' class='small-images'></div>" +
        "<div class='col-md-2'></div></div></div><div class='col-md-3 division-settings'></div><div class='col-md-3 " +
        "name-settings'><div class='form-group' id='nameGroup'><label for='taskName'>Nome da tarefa" +
        "<span style='color:red'>*</span>:</label><input type='text' class='form-control keyboardNeed'" +
        " id='taskName' placeholder='Máx. 80 caracteres' maxlength='80'></div><div class='form-group' id='dateGroup'>" +
        "<label for='taskDate'>Data<span style='color:red'>*</span>:</label><input type='date' id='taskDate' class='form-control keyboardNeed'>" +
        "</div><div class='form-group' id='timeGroup'><label for='taskTime'>Hora<span style='color:red'>*</span>:</label>" +
        "<input type='time' class='form-control keyboardNeed' id='taskTime'></div><button type='button' id='agendar' class='btn-primary btn-md disabled' style='width:100px'" +
        ">Agendar</button><button type='button' id='cancelTask' class='btn-primary btn-md' style='width:100px'>Cancelar</button></div></div></div>");
    $("#taskDate").val(moment().format("YYYY-MM-DD"));
    $("#taskTime").val(moment().format("HH:mm"));
    $("#taskDate, #taskName, #taskTime").change(function () {
        validate(false)
    });
    $("#cancelTask").click(function () {
        $(".add-task-wrapper").remove();
        $(".editEventDiv").show();
    });
    $("#agendar").click(function () {
        saveTask();
    });
    $(".small-images").click(function () {
        $("#division-choice").css({'border': 'none', 'border-radius': 'none', 'animation': 'none'});
        division = $(this).prop('src').split('/');
        division = division[division.length - 1].split('.')[0];
        renderDivision(division);
    });
}

function renderTasks() {
    var eventsTasks = localStorage.getItem('eventsTasks') === null ? {} : JSON.parse(localStorage.getItem('eventsTasks'));
    if (eventsTasks.hasOwnProperty(eventHolder.id)) {
        for (var i = 0; i < eventsTasks[eventHolder.id].length; i++) {
            if (renderedTasks.indexOf(i) === -1) {
                $("<tr id='" + "Task-" + String(i) + "'><td>" + eventsTasks[eventHolder.id][i]['name'] + "</td><td>" + eventsTasks[eventHolder.id][i]['date']
                    + "</td><td>" + eventsTasks[eventHolder.id][i]['time'] + "</td><td>" + eventHolder.title + "</td><td>" +
                    "<img src='assets/imgs/edit.svg' style='height:24px;width:24px;cursor:pointer' class='editTask'> " +
                    "<img src='assets/imgs/delete.svg' style='height:24px;width:24px;cursor:pointer' class='delTask'></td></tr>").insertBefore('#addTaskTr');
                renderedTasks.push(i);
            }
        }
    }
    if ((eventHolder.start.title === 'Jantar de Amigos' || eventHolder.title === 'Jantar de Amigos') && eventsTasks[eventHolder.id] !== undefined) {
        if (Object.keys(eventsTasks[eventHolder.id]).length === 2 && localStorage.getItem("cenario") === "João") {
            $(".ui-wrapper").append("<div class='icon_wrapper_tasks late alert alert-danger' style='z-index:99'><p>Atividades propostas ultrapassam a hora do evento!</p><button type='button' class='btn-primary lateButton btn-md'>Adiar o evento e notificar convidades</button></div>");
            $(".lateButton").click(function () {
                $(".late").remove()
            });
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
    $(".contact").click(function () {
        $(this).toggleClass('selected');
    });
    $("#cancelContacts").click(function () {
        $(".contacts-wrapper").remove();
    });
    $("#addContacts").click(function () {
        $(".selected").each(function () {
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
    if ($("#division-setting-dropdown").length) {
        if ($("#division-setting-dropdown").find(":selected")[0].innerText === 'Escolha uma tarefa') {
            if (visual) {
                $(".division-settings").css({
                    'border': '2px solid red', 'border-radius': '20px',
                    'animation': 'border-pulse 3s infinite'
                });
            }
            ret = false;
        }
        else {
            if (visual) {
                $(".division-settings").css({'border': 'none', 'border-radius': 'none', 'animation': 'none'});
            }
        }
        if (visual) {
            $("#division-choice").css({'border': 'none', 'border-radius': 'none', 'animation': 'none'});
        }
    }
    else {
        if (visual) {
            if ($("#division-choice").css('borderTopColor') !== "rgba(255, 0, 0)") {
                $("#division-choice").css({
                    'border': '2px solid red', 'border-radius': '20px',
                    'animation': 'border-pulse 3s infinite'
                });
            }
        }
    }
    if ($('#taskName').val().length > 0 && $('#taskDate').val().length > 0 && $('#taskTime').val().length > 0) {
        console
        if (!moment($("#taskDate").val()).isSameOrAfter(moment().hour(0).minute(0).second(0).millisecond(0))) {
            ret = false;
            if (visual) {
                if (!$("#errorDateBefore").length) {
                    $("#dateGroup").addClass("has-error");
                    $("<span id='errorDateBefore' class='help-block'>Não pode escolher uma data no passado</span>").insertAfter("#taskDate");
                }
            }
        } else {
            if ($("#errorDateBefore").length) {
                $("#dateGroup").removeClass("has-error");
                $("#errorDateBefore").remove();
            }
        }
        if (moment($("#taskDate").val()).isSameOrAfter(moment().hour(0).minute(0).second(0).millisecond(0)) && $("#taskDate").val().split("-")[0].length > 4) {
            ret = false;
            if (visual) {
                if (!$("#errorYear").length) {
                    $("#dateGroup").addClass("has-error");
                    $("<span id='errorYear' class='help-block'>Não pode escolher um ano acima de 4 digitos</span>").insertAfter("#taskDate");
                }
            }
        } else {
            if ($("#errorYear").length) {
                $("#dateGroup").addClass("has-error");
                $("#errorYear").remove();
            }
        }
    } else {
        if (!$("#taskName").val().length) {
            if (visual) {
                if (!$("#noNameError").length) {
                    $("#nameGroup").addClass("has-error");
                    $("<span id='noNameError' class='help-block'>Escolha um nome</span>").insertAfter("#taskName");
                }
            }
        }
        else {
            if ($("#noNameError").length) {
                $("#nameGroup").removeClass("has-error");
                $("#noNameError").remove();
            }
        }
        if (!$("#taskDate").val().length) {
            if (visual) {
                if (!$("#noDateError").length) {
                    $("#dateGroup").addClass("has-error");
                    $("<span id='noDateError' class='help-block'>Escolha uma data</span>").insertAfter("#taskDate");
                }
            }
        } else {
            if ($("#noDateError").length) {
                $("#dateGroup").removeClass("has-error");
                $("#noDateError").remove();
            }
        }
        if (!$("#taskTime").val().length) {
            if (visual) {
                if (!$("#noTimeError").length) {
                    $("#timeGroup").addClass("has-error");
                    $("<span id='noTimeError' class='help-block'>Escolha uma hora</span>").insertAfter("#taskTime");
                }
            }
        } else {
            if ($("#noTimeError").length) {
                $("#timeGroup").removeClass("has-error");
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

function keyboardAppear() {
    $('input[class="form-control keyboardNeed"]').click(function () {
        $('#keyboard').show();
    });

    $("div[id='keyboard']").click(function () {
        $('#keyboard').hide();
    });
}

function main() {
    $(".ui-wrapper").append("<div id='keyboard' class='keyboard' style='display:none'><img src='./assets/imgs/keyboard.png'</div>");
    keyboardAppear();
    date = new Date();
    updateTimeUI();
    setInterval(function () {
        date.setSeconds(date.getSeconds() + 1);
        updateTimeUI();
    }, 1000);
    $("#logoutA").click(function () {
        location.replace("login.html");
    });
    $("#Calendar").fullCalendar({
        customButtons: {
            create: {
                text: 'Criar',
                click: function () {
                    localStorage.setItem('newEventDate', $("#Calendar").fullCalendar('getDate').format());
                    location.replace('./novoEvento.html');
                }
            }
        },
        header: {
            left: 'today create prev,next',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        editable: true,
        height: 430,
        nowIndicator: true,
        dayClick: function (date, e, view) {
            $("#Calendar").fullCalendar('changeView', 'agendaDay', date);
        },
        eventClick: function (event, e, view) {
            if (eventHolder === undefined || eventHolder.id !== event.id ||
                (eventHolder.id === event.id && !$(".eventClickNav").length)) {
                eventHolder = event;
                if ($(".eventClickNav").length) {
                    $(".eventClickNav").remove();
                }
                $(".ui-wrapper").append('<ul class="eventClickNav"><li><img src="assets/imgs/edit.svg" ' +
                    'style="height:24px;width:24px;cursor:pointer" id="editEvent"></li><li><img src="assets/imgs/add.svg" ' +
                    'style="height:24px;width:24px;cursor:pointer" id="addInvites"</li><li><img src="assets/imgs/delete.svg" ' +
                    'style="height:24px;width:24px;cursor:pointer;" id="deleteEvent"></li></ul>');
                $(".eventClickNav").offset({
                    top: $(e.currentTarget).offset().top - 120,
                    left: $(e.currentTarget).offset().left - 35
                });
                $("#addInvites").click(function () {
                    idnum = eventHolder.id;
                    $(".eventClickNav").remove();
                    $(".ui-wrapper").append('<div class="container icon_wrapper_index" style="z-index:10;"></div>');
                    $(".icon_wrapper_index").append('<h1>Lista de convidados</h1><table><thead><tr><th>NOME</th>' +
                        '<th>NÚMERO DE PESSOAS</th></tr></thead><tbody><tr id="addTr"><td><img id="addImage" style="height:24px;width:24px;cursor:pointer" ' +
                        'src="assets/imgs/add.svg"> <span id="addText" style="cursor:pointer">Adicionar Pessoas</span>' +
                        '</td></tr></tbody><tfoot><tr><td>TOTAL</td><td id="totalInvites">0</td></tr></tfoot></table>' +
                        '<button type="button" class="btn-primary btn-md" id="convidar" data-toggle="modal" data-target="#myModal" style="width:100px;">Convidar</button>' +
                        '<button type="button" class="btn-primary btn-md" id="exitInvite" style="width:100px;">Sair</button>');
                    var invites = localStorage.getItem('invites') === null ? {} : JSON.parse(localStorage.getItem('invites'));
                    if (invites.hasOwnProperty(idnum)) {
                        for (var i = 0; i < invites[idnum].length; i++) {
                            chosenContacts.push(invites[idnum][i]);
                        }
                    }
                    renderContacts();
                    $("#addImage").click(function () {
                        if (!$(".contacts-wrapper").length) {
                            renderAddContacts();
                        }
                    });
                    $("#addText").click(function () {
                        if (!$(".contacts-wrapper").length) {
                            renderAddContacts();
                        }
                    });
                    $("body").on("click", ".delContact", function () {
                        var delID = $(this).parent().prop('id');
                        chosenContacts.splice(chosenContacts.indexOf(delID), 1);
                        $("#" + delID).parent().remove();
                        refreshTotalInvites();
                    });
                    $("#Calendar").hide();
                    $("#exitInvite").click(function () {
                        $(".icon_wrapper_index").remove();
                        $("#Calendar").show();
                    });
                    $("#convidar").click(function () {
                        var invites = localStorage.getItem('invites') === null ? {} : JSON.parse(localStorage.getItem('invites'));
                        invites[idnum] = chosenContacts;
                        localStorage.setItem('invites', JSON.stringify(invites));
                        $(".icon_wrapper_index").remove();
                        $("#Calendar").show();
                    });
                });
                $("#deleteEvent").click(function () {
                    var events = JSON.parse(localStorage.getItem('events'));
                    delete events[event.id];
                    var invites = localStorage.getItem('invites') === null ? {} : JSON.parse(localStorage.getItem('invites'));
                    if (invites.hasOwnProperty(event.id)) {
                        delete invites[event.id];
                    }
                    localStorage.setItem('events', JSON.stringify(events));
                    localStorage.setItem("invites", JSON.stringify(invites));
                    $("#Calendar").fullCalendar('removeEvents', event.id);
                    $(".eventClickNav").remove();
                });
                $("#editEvent").click(function () {
                    if ($("#Calendar").fullCalendar('getView').title !== 'agendaDay') {
                        $("#Calendar").fullCalendar('changeView', 'agendaDay', eventHolder.start);
                        $(".eventClickNav").remove();
                    }
                    else {
                        $(".eventClickNav").remove();
                    }
                    editEvent();
                });
            } else {
                if ($(".eventClickNav").length) {
                    $(".eventClickNav").remove();
                }
            }
        },
        viewRender: function (view, element) {
            if ($(".eventClickNav").length) {
                $(".eventClickNav").remove();
            }
        }
    });
    $("#modalDelTarefa").click(function (){
        var taskID = Number(delTaskEvent.parent().parent().prop('id').split('-')[1]);
        var eventTasks = JSON.parse(localStorage.getItem('eventsTasks'));
        eventTasks[eventHolder.id].splice(taskID, 1);
        delTaskEvent.parent().parent().remove();
        renderedTasks.splice(taskID, 1);
        localStorage.setItem('eventsTasks', JSON.stringify(eventTasks));
        $('#myModal1').modal('hide');
    });
    if (localStorage.getItem('events') !== null) {
        var events = JSON.parse(localStorage.getItem('events'));
        for (var id in events) {
            $("#Calendar").fullCalendar('renderEvent', {
                title: events[id]['name'],
                start: events[id]['date'] + 'T' + events[id]['time'], allDay: false, editable: true,
                id: id
            }, true);
        }
    }
    if (localStorage.getItem('setCurrentDate') !== null) {
        var eventID = localStorage.getItem("setCurrentDate");
        eventHolder = $("#Calendar").fullCalendar('clientEvents', eventID)[0];
        localStorage.removeItem('setCurrentDate');
        editEvent();
    }
    $("#back").click(function () {
        history.back();
    });
    if (localStorage.getItem('convidados') === "True") {
        $('#myModal').modal('show');
        localStorage.setItem("convidados", "False");
    }
}

$(document).ready(function () {
    main();
});
