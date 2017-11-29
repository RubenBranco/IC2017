"use strict";

function keyboardAppear(){
  $('input[class="form-control keyboardNeed"]').click(function(){
    $('#keyboard').show();
  });

  $("div[id='keyboard']").click(function(){
    $('#keyboard').hide();
  });
}

function main(){
  $(".ui-wrapper").append("<div id='keyboard' style='display:none'><img src='./assets/imgs/keyboard.png'</div>");
  keyboardAppear();
}

$(document).ready(function(){main()});
