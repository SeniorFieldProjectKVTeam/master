
// start to implement hover

var bot = [];
var order = [];
var ordertop = [];
var param = new Object();
param["qu"] = new Object();
param["fn"] = new Object();
param["ts"] = new Object();
param["qz"] = new Object();
param["sp"] = new Object();
param["navi"] = new Object();


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
      $( "#tobechange" ).html( "<button class='color' onclick='changeColor(this.id)'>color</button>"+"<button class='cancel' onclick='cancelDrop(this.id)'>X</button>").attr("class","navigation");
      $('#top-combo').sortable({
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
          $( this ).html("<div class='one' id="+id1+">"+id1+"<button id="+id1+" class='color' onclick='changeColor(this.id)'>color</button>"+"<button id="+id1+" class='cancel' onclick='cancelDrop(this.id)'>X</button>"+"</div>");
          applyChange(id1);
        }
        if (bot.length == 2){
          var id1 = bot[0].draggable.attr("id").substring(0,2);
          var id2 = bot[1].draggable.attr("id").substring(0,2);
          $( this ).html(
            "<div class='two' id="+id1+">"+id1+"<button id="+id1+" class='color' onclick='changeColor(this.id)'>color</button>"+"<button id="+id1+" class='cancel' onclick='cancelDrop(this.id)'>X</button>"+"</div>"+
            "<div class='two' id="+id2+">"+id2+"<button id="+id2+" class='color' onclick='changeColor(this.id)'>color</button>"+"<button id="+id2+" class='cancel' onclick='cancelDrop(this.id)'>X</button>"+"</div>"
          );
          applyChange(id1);
          applyChange(id2);
        }
        if (bot.length == 3){
          var id1 = bot[0].draggable.attr("id").substring(0,2);
          var id2 = bot[1].draggable.attr("id").substring(0,2);
          var id3 = ui.draggable.attr("id").substring(0,2);
          $( this ).html(
            "<div class='three' id="+id1+">"+id1+"<button id="+id1+" class='color' onclick='changeColor(this.id)'>color</button>"+"<button id="+id1+" class='cancel' onclick='cancelDrop(this.id)'>X</button>"+"</div>"+
            "<div class='three' id="+id2+">"+id2+"<button id="+id2+" class='color' onclick='changeColor(this.id)'>color</button>"+"<button id="+id2+" class='cancel' onclick='cancelDrop(this.id)'>X</button>"+"</div>"+
            "<div class='three' id="+id3+">"+id3+"<button id="+id3+" class='color' onclick='changeColor(this.id)'>color</button>"+"<button id="+id3+" class='cancel' onclick='cancelDrop(this.id)'>X</button>"+"</div>"
          );
          $(this).droppable( "option", "disabled", true );
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
        $(botm).html("<div class='one' id="+id1+">"+id1+"<button id="+id1+" class='color' onclick='changeColor(this.id)'>color</button>"+"<button id="+id1+" class='cancel' onclick='cancelDrop(this.id)'>X</button>"+"</div>");
        applyChange(id1);
      }
      if (bot.length == 2){
        var id1 = bot[0].draggable.attr("id").substring(0,2);
        var id2 = bot[1].draggable.attr("id").substring(0,2);
        $(botm).html(
          "<div class='two' id="+id1+">"+id1+"<button id="+id1+" class='color' onclick='changeColor(this.id)'>color</button>"+"<button id="+id1+" class='cancel' onclick='cancelDrop(this.id)'>X</button>"+"</div>"+
          "<div class='two' id="+id2+">"+id2+"<button id="+id2+" class='color' onclick='changeColor(this.id)'>color</button>"+"<button id="+id2+" class='cancel' onclick='cancelDrop(this.id)'>X</button>"+"</div>"
        );
        $(botm).droppable("option", "disabled", false);
        applyChange(id1);
        applyChange(id2);
      }
    }
  }
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
  var order = $("#botm-three").sortable("toArray");
  param["order"] = order;
  alert(order);
}

function refresh(){
  location.reload();
}



//document.getElementById('cancel').onclick  = reply_click;