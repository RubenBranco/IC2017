"use strict";

var date;

function updateTimeUI() {
    $("#dateDay").text(date.getDate() + ' /');
    $("#dateMonth").text(date.getMonth() + 1 + ' /');
    $("#dateYear").text(date.getFullYear());
    $("#dateTime").text(date.toLocaleTimeString());
}

function main() {
    date = new Date();
    updateTimeUI();
    $("#back").click(function () {
        history.back();
    });
    setInterval(function () {
        date.setSeconds(date.getSeconds() + 1);
        updateTimeUI();
    }, 1000);
    $(".profile-pic").click(function () {
        var id = $(this).prop("id");
        if (localStorage.getItem("cenario") !== id) {
            localStorage.clear();
        }
        if (id === 'joao') {
            var events = {"1": {"name": "Jantar de Amigos", "date": "2017-12-01", "time": "19:00"}};
            localStorage.setItem("events", JSON.stringify(events));
            localStorage.setItem("nextID", "2");
            localStorage.setItem("cenario", "joao");
        }
        else if (id === 'maria') {
            localStorage.setItem("cenario", "maria");
        }
        else if (id === "casal") {
            var contacts = {
                "1": {"name": "Amigos Casamento(Grupo)", "size": 60},
                "2": {"name": "Ana", "size": 1},
                "3": {
                    "name": "António",
                    "size": 1
                },
                "4": {"name": "Bernardo", "size": 1},
                "5": {"name": "Bonifácio", "size": 1},
                "6": {"name": "Bóris", "size": 1},
                "7": {"name": "Carolina", "size": 1},
                "8": {"name": "Claudia", "size": 1},
                "9": {"name": "Familia(Grupo", "size": 40},
                "10": {"name": "Ruben", "size": 1},
                "11": {"name": "João", "size": 1}
            };
            localStorage.setItem("contacts", JSON.stringify(contacts));
            localStorage.setItem("cenario", "casal");
        } else {
            localStorage.setItem("cenario", "outro");
        }
    });
}

$(document).ready(function () {
    main()
});