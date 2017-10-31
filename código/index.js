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
        $("#" + order[i]).hover(function(){
            $(this).css({'border': '3px solid red', 'animation':'border-pulse 3s infinite', 'cursor':'pointer'});
            $("body").append('<p style="font-size:40px; z-index:10; animation:text-pulsate 3s infinite;" id="' + $(this).prop('id') + '-text">' + $(this).prop('id') + '</p>');
            $("#" + $(this).prop('id') + '-text').offset({left:$(this).offset().left + $(this).width() * 0.30, top:$(this).offset().top + $(this).height() * 0.30})
        }, function(){
            $(this).css({'border':'none', 'animation':'none'});
            $("#" + $(this).prop('id') + '-text').remove();
        });
    }
}

$(document).ready(function(){main()});