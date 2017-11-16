"use strict";

var date;


function updateTimeUI(){
    $("#dateDay").text(date.getDay() + "  /");
    $("#dateMonth").text(date.getMonth() + "  /");
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
}

$(document).ready(function(){main()});