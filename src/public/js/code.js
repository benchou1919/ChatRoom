      /**
      * Capture text only from myself. (Currently)
      */

var socket = io('http://localhost:3000');


socket.on('news', function (data) {
  console.log(data);
  socket.emit('my other event', {my: 'data'});
});

socket.on('fromServer', function (data) {
  var parts = data.split(": ");
  $("#showArea").append("<span class='name'>" + parts[0] + ": </span>");
  for (var i = 0; i < parts.length - 1; i ++) {
    $("#showArea").append(parts[i + 1]);
    if(i != parts.length - 2) {
      $("#showArea").append(": ");
    }
  }
  $("#showArea").append("<br>");
   
  $("#showArea").animate({scrollTop: $("#showArea")[0].scrollHeight});
});

var updateTextArea = function() {
if($("#inputArea").val() == "") {
  console.log("Nothing sent");
  } else {

    socket.emit('messages', name + ": " + $("#inputArea").val());
    $.post("../database", {name: name, note: $("#inputArea").val()});
    
    /*
    $("#showArea").append(name + "&nbsp; &nbsp; &nbsp;" + $("#inputArea").val() + "<br>");
    $("#showArea").animate({scrollTop: $("#showArea")[0].scrollHeight});
    */

    $("#inputArea").val("");

    
  }
};

$(document).ready( function () {
  $("#showArea").hide();
  $("#inputArea").hide();
});

$(document).ready( function() {
  $( "#button" ).click(updateTextArea);
});
$(document).ready( function() {
  $("#inputArea").keypress( function(e) {
  if(e.which == 13) {
    console.log("enter pressed");
    updateTextArea();
    // Still need to send something to the server
  }
});
});



/**
 * After entered the name, initialize.
 */
$(document).ready( function() {
  $( "#nameArea" ).keypress( function(e) {
    if(e.which == 13) {
      console.log("name entered");
      name = $("#nameArea").val();
      var parts = name.split(": ");
      if (parts.length > 1) {
        alert("Please don't enter ': '   !");
        return;
      }
      $("#nameArea").hide();
      $("span").hide();
      $("#showArea").show();
      $("#inputArea").show();

      $.getJSON("../database", function(json) {
        for (var i = 0; i < json.length; i ++) {
          $("#showArea").append("<span class='name'>" + json[i].name + ": </span>" + json[i].note + "<br>");
        }

      });
    }
  })
});

