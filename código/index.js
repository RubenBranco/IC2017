"use strict";

const order = ['Quarto', 'Escritorio', 'WC', 'Sala', 'Cozinha'];

function main(){
    for (var i = 0; i < order.length; i++) {
        if (i === 0) {
            $(".container").append('<img src="./assets/imgs/' + order[i] + '.jpg" id="' + order[i] + '" height="300px" width="300px">');
        }
        else if (i % 2 !== 0) {
            $(".container").append('<img src="./assets/imgs/' + order[i] + '.jpg" id="' + order[i] + '" height="300px" width="300px">');
            $("#" + order[i]).offset({left: $("#" + order[i - 1]).offset().left + $("#" + order[i - 1]).width(), top:$("#" + order[i - 1]).offset().top});
        }
        else {
            $(".container").append('<img src="./assets/imgs/' + order[i] + '.jpg" id="' + order[i] + '" height="300px" width="300px">');
            $("#" + order[i]).offset({left:$("#" + order[i - 2]).offset().left, top:$("#" + order[i - 2]).offset().top + $("#" + order[i - 2]).height()});
        }
        $("#" + order[i]).hover(function(){$(this).css({'border': '3px solid red'})}, function(){$(this).css({'border':'none'})});
    }
}

$(document).ready(function(){main()});