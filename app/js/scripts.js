
var bot = [];
var order = [];
var ordertop = [];
var param = new Object();
param["qu"] = new Object();
param["fn"] = new Object();
param["ts"] = new Object();
param["qz"] = new Object();
param["sp"] = new Object();
param["na"] = new Object();

var pa;

$( init );

function init() {
  $('[data-toggle="popover"]').popover();
  $( "#left-side" ).accordion();
  $('#left-side li').draggable({
    cursor: 'move',
    helper: "clone"
  });
  $( "#combo-player" ).droppable({
    accept: "#left-side li#navi",
    activeClass: "ui-state-hover",
    hoverClass: "ui-state-active",
    drop: function( event, ui ) {
      $(ui.helper).remove(); //destroy clone
      $(ui.draggable).remove(); //remove from list
      var id = ui.draggable.attr("id").substring(0,2);
      $( "#tobechange" ).html("this is the navigation")
        .attr({
          class:"navigation",
          id:id
        });

      $( "#top-combo #na" ).hover(
        function() {
          $( this ).append(
            $("<button class='color' onclick='changeColor(this.id)'>color</button>"+"<button class='cancel' onclick='cancelDrop(this.id)'>X</button>")
          );
        },
        function() {
          $( this ).find( "button" ).remove();
        }
      );

      $('#top-combo').sortable({ // make it sortable
        stop: function(event,ui){
          ordertop = $("#top-combo").sortable("toArray");
        }
      });
    }
  });



  $('#botm-three').sortable({
    stop: function(event,ui){ /* do whatever here */
      order = $("#botm-three").sortable("toArray");
      var temp = [];
      for (i = 0; i < order.length; i++) {
        for (j = 0; j < bot.length; j++) {
          var id = bot[j].draggable.attr("id").substring(0,2);
          if (id == order[i]){
            temp.push(bot[j]);
          }
        }
      }
      bot = temp; // update the order according to the sort order in bot
    }
  });
  $( "#botm-three" ).droppable({
    accept: "#left-side li#fn,li#ts,li#qu,li#qz,li#sp",
    activeClass: "ui-state-hover",
    hoverClass: "ui-state-active",
    drop: function( event, ui ) {
        $(ui.helper).remove(); //destroy clone
        $(ui.draggable).hide(); //remove from list
        bot.push(ui);

        if (bot.length == 1){
          var id1 = ui.draggable.attr("id").substring(0,2);
          $( this ).html("<div class='one' id="+id1+">"+id1+"</div>");
          hoverBotm(id1);
          applyChange(id1);
        }

        if (bot.length == 2){
          var id1 = bot[0].draggable.attr("id").substring(0,2);
          var id2 = bot[1].draggable.attr("id").substring(0,2);
          $( this ).html(
            "<div class='two' id="+id1+">"+id1+"</div>"+
            "<div class='two' id="+id2+">"+id2+"</div>"
          );
          hoverBotm(id1);
          hoverBotm(id2);
          applyChange(id1);
          applyChange(id2);
        }
        if (bot.length == 3){
          var id1 = bot[0].draggable.attr("id").substring(0,2);
          var id2 = bot[1].draggable.attr("id").substring(0,2);
          var id3 = ui.draggable.attr("id").substring(0,2);
          $( this ).html(
            "<div class='three' id="+id1+">"+id1+"</div>"+
            "<div class='three' id="+id2+">"+id2+"</div>"+
            "<div class='three' id="+id3+">"+id3+"</div>"
          );
          $(this).droppable( "option", "disabled", true );
          hoverBotm(id1);
          hoverBotm(id2);
          hoverBotm(id3);
          applyChange(id1);
          applyChange(id2);
          applyChange(id3);
        }
    }
  });
}

function cancelDrop(button_id) {
  for (i = 0; i < bot.length; i++) {
    var id = bot[i].draggable.attr("id").substring(0,2);
    if (button_id == id){
      $(bot[i].draggable).show();
      bot.splice(i, 1);
      var botm = document.getElementById("botm-three")
      if (bot.length == 0){
        $("#botm-three ."+id).remove();
      }
      if (bot.length == 1){
        var id1 = bot[0].draggable.attr("id").substring(0,2);
        $(botm).html("<div class='one' id="+id1+">"+id1+"</div>");
        hoverBotm(id1);
        applyChange(id1);
      }
      if (bot.length == 2){
        var id1 = bot[0].draggable.attr("id").substring(0,2);
        var id2 = bot[1].draggable.attr("id").substring(0,2);
        $(botm).html(
          "<div class='two' id="+id1+">"+id1+"</div>"+
          "<div class='two' id="+id2+">"+id2+"</div>"
        );
        $(botm).droppable("option", "disabled", false);
        hoverBotm(id1);
        hoverBotm(id2);
        applyChange(id1);
        applyChange(id2);
      }
    }
  }
}

function hoverBotm(id){
  $( "#botm-three #"+id ).hover(
    function() {
      $( this ).append(
        $("<button id="+id+" class='color' onclick='changeColor(this.id)'>color</button>"+"<button id="+id+" class='cancel' onclick='cancelDrop(this.id)'>X</button>")
      );
    },
    function() {
      $( this ).find( "button" ).remove();
    }
  );
}

function changeNavi(){
  param[button_id]["background-color"] = "blue";
  $("#top-combo div."+button_id).css("background-color","blue");
}

function changeColor(button_id){
  param[button_id]["background-color"] = "blue";
  $("#botm-three div#"+button_id).css("background-color","blue");
}

function applyChange(button_id){
  if (param[button_id]["background-color"]){
    $("#botm-three div#"+button_id).css("background-color",param[button_id]["background-color"]);
  }
}

function publish(){
  pa = {
    "order": order,
    "ordertop": ordertop,
    "qu": param["qu"],
    "fn": param["fn"],
    "ts" : param["ts"],
    "qz": param["qz"],
    "na": param["na"],
    "sp": param["sp"]
  }
  var url = 'data:text/json;charset=utf8,' + encodeURIComponent(pa);
  window.open(url, '_blank');
  window.focus();
  alert(pa);
}

function refresh(){
  location.reload();
}


<<<<<<< HEAD

=======
>>>>>>> 70a6f11cc9a98b135959ddc8d09fe1e5f465ff08
//document.getElementById('cancel').onclick  = reply_click;
