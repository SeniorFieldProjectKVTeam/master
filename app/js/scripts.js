
// create all the variables that we need
// all the data are stored in param
var bot = [];
var order = [];
var ordertop = [];
var saveUI = new Object();
var param = new Object();
param["qu"] = new Object();
param["fn"] = new Object();
param["ts"] = new Object();
param["qz"] = new Object();
param["lg"] = new Object();
param["na"] = new Object();

var pa;

var fs = require('fs');

$( init ); // load this function when the page was load

function init() {
  $( "#left-side #left-top" ).accordion(); // make the effect of accordion

  $('#left-top li').draggable({
    cursor: 'move',
    helper: "clone"
  }); // make the left-top draggable and change cusor when move

  $( "#top-combo" ).droppable({
    accept: "#left-top li#na, li#lg", // specify certain elements can be drag into the bottom
    activeClass: "ui-state-hover",
    hoverClass: "ui-state-active",
    drop: function( event, ui ) {
      $(ui.helper).remove(); // destroy clone
      $(ui.draggable).hide(); // remove from list
      var id = ui.draggable.attr("id").substring(0,2); // get the id of drag element
      if (id == "na"){
        saveUI["na"] = ui.draggable;
        param["na"]["exist"] = true;
        $( "#tobechange" ).html("this is the navigation")
          .attr({
            class:"navigation",
            id:id
          }); // change the navigation div
        makeHover("#top-combo #",id); // apply hover
        $('#top-combo').sortable({ // make it sortable
          stop: function(event,ui){
            ordertop = $("#top-combo").sortable("toArray");
          }
        });
      };
      if (id == "lg"){
        saveUI["lg"] = ui.draggable;
        param["lg"]["exist"] = true;
        $("#top-logo-change").html("This should be the logo").attr({
          class:"top-logo",
          id:id
        });
        //alert(id);
        applyChange(id);
        $("#botm-three").css("height","27%");
        makeHover("#right-side #",id);
      }
    }
  });

  $('#botm-three').sortable({
    stop: function(event,ui){
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
    accept: "#left-top li#fn,li#ts,li#qu,li#qz,li#lg",
    activeClass: "ui-state-hover",
    hoverClass: "ui-state-active",
    drop: function( event, ui ) {
        $(ui.helper).remove(); // destroy clone
        $(ui.draggable).hide(); // remove from list
        bot.push(ui);

        if (bot.length == 1){
          var id1 = ui.draggable.attr("id").substring(0,2);
          $( this ).html("<div class='one' id="+id1+">"+id1+"</div>");
          makeHover("#botm-three #",id1);
          applyChange(id1);
          order = [id1];
        } // resize the bottom if there is only one box

        if (bot.length == 2){
          var id1 = bot[0].draggable.attr("id").substring(0,2);
          var id2 = bot[1].draggable.attr("id").substring(0,2);
          $( this ).html(
            "<div class='two' id="+id1+">"+id1+"</div>"+
            "<div class='two' id="+id2+">"+id2+"</div>"
          );
          order = [id1,id2];
          makeHover("#botm-three #",id1);
          makeHover("#botm-three #",id2);
          applyChange(id1);
          applyChange(id2);
        } // resize the bottom if there are two boxes

        if (bot.length == 3){
          var id1 = bot[0].draggable.attr("id").substring(0,2);
          var id2 = bot[1].draggable.attr("id").substring(0,2);
          var id3 = ui.draggable.attr("id").substring(0,2);
          $( this ).html(
            "<div class='three' id="+id1+">"+id1+"</div>"+
            "<div class='three' id="+id2+">"+id2+"</div>"+
            "<div class='three' id="+id3+">"+id3+"</div>"
          );
          order = [id1,id2,id3];
          $(this).droppable( "option", "disabled", true );
          makeHover("#botm-three #",id1);
          makeHover("#botm-three #",id2);
          makeHover("#botm-three #",id3);
          applyChange(id1);
          applyChange(id2);
          applyChange(id3);
        } // resize the bottom if there are three boxes
    }
  });
  // continue
}


function cancelNavi(button_id){
  $("#top-combo #"+button_id).remove();
  $("#top-combo ").prepend("<div id = 'tobechange'></div>");
  $(saveUI["na"]).show();
  param["na"]["exist"] = false;
} // drop the navigation box

function cancelLogo(button_id){
  var currentClass = $("#right-side #"+button_id).attr("class");
  if (currentClass == "top-logo"){
    $("#right-side #"+button_id).remove();
    $(saveUI["lg"]).show();
    param["lg"]["exist"] = false;
    $("#right-side").prepend("<div id = 'top-logo-change'></div>");
    $("#botm-three").css("height","32%");
  } else {
    cancelDrop(button_id);
  }
}

function cancelDrop(button_id) { // drop the box at the bottom and resize the rest
  for (i = 0; i < bot.length; i++) {
    var id = bot[i].draggable.attr("id").substring(0,2);
    if (button_id == id){
      $(bot[i].draggable).show();
      bot.splice(i, 1);
      var botm = document.getElementById("botm-three")
      if (bot.length == 0){
        $("#botm-three #"+id).remove();
      }
      if (bot.length == 1){
        var id1 = bot[0].draggable.attr("id").substring(0,2);
        $(botm).html("<div class='one' id="+id1+">"+id1+"</div>");
        makeHover("#botm-three #",id1);
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
        makeHover("#botm-three #",id1);
        makeHover("#botm-three #",id2);
        applyChange(id1);
        applyChange(id2);
      }
    }
  }
}

function makeHover(pref,id){
  var func = "cancelDrop";
  if (id == "na"){
    func = "cancelNavi";
  }
  if (id == "lg"){
    func = "cancelLogo"; // call diffrent funtion according to the div
  }
  var fontButton = "<div id='fontSelect' class='fontSelect'><div class='arrow-down'></div></div>"
  var fontSize = "<div id='fontSizeSelect'>Here should be Font Size</div>"
  var cancelButton = "<button id="+id+" class='cancel' onclick='"+func+"(this.id)'>X</button></div>";
  var colorPicker = "<input type='text' class='color-picker' id='color-picker'/>";
  var selections = colorPicker+fontButton+fontSize+cancelButton; // generate new html
  $( pref+id ).hover(
    function() {
      $( this ).append(
        "<div id='modification-selections'>"+selections+"</div>"
      );
      //alert();
      triggerColorPicker(id);
      selectFontStyle(id);
      removeRedundant(); // apply the pluggin and remove all the redundant stuff
    },
    function() {
      $("#modification-selections").remove(); // delete all the divs appears when hover
    }
  );
}

function updateColor(button_id,color){
  param[button_id]["background-color"] = color;
  //alert(param[button_id]["background-color"]);
  $("#right-side div#"+button_id).css("background-color",color);
} // change the certain color of corresponding div

function applyChange(button_id){
  if (param[button_id]["background-color"]){
    $("#right-side div#"+button_id).css("background-color",param[button_id]["background-color"]);
  }
  if (param[button_id]["font"]){
    $("#right-side div#"+button_id).css("font-family",param[button_id]["font"]);
  }
} // apply all the changes the user made

function publish(){
  pa = {
    "order": order,
    "ordertop": ordertop,
    "qu": param["qu"],
    "fn": param["fn"],
    "ts" : param["ts"],
    "qz": param["qz"],
    "na": param["na"],
    "lg": param["lg"]
  }
  // write it to file
  //fs.writeFile(filename, data, [encoding], callback)
  alert("outside");
  fs.writeFile("kv.json", JSON.stringify(pa), function(err){
    alert("inside");
    if(err){
      alert(err);
    }else{
      alert("The file was saved!");
    }
  });
}

function refresh(){
  location.reload();
}

function triggerColorPicker(id){
  $("#color-picker").spectrum({
    color: "#ECC",
    showInput: false,
    showInitial: true,
    showPalette: true,
    showSelectionPalette: true,
    maxSelectionSize: 10,
    preferredFormat: "hex",
    cancelText:"",
    change: function(color) {
      var col = (color ? color.toHexString() : "");
      updateColor(id,col);
    },
    hide: function() {
      $(".sp-container").remove();
    },
    palette: [
        ["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)",
        "rgb(204, 204, 204)", "rgb(217, 217, 217)","rgb(255, 255, 255)"],
        ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)",
        "rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)", "rgb(255, 0, 255)"],
        ["rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)",
        "rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)",
        "rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)",
        "rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", "rgb(180, 167, 214)", "rgb(213, 166, 189)",
        "rgb(204, 65, 37)", "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", "rgb(147, 196, 125)",
        "rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)",
        "rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)",
        "rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)",
        "rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)",
        "rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", "rgb(32, 18, 77)", "rgb(76, 17, 48)"]
    ]
  });
  $(".sp-preview .sp-preview-inner").css("background-color",param[id]["background-color"]);
  // remove all the redundant thing
}

function selectFontStyle(id){
  $('#fontSelect').fontSelector({
    'hide_fallbacks' : true,
    'initial' : checkFont(id),
    'selected' : function(style) {
      param[id]["font"]= style;
      $("#right-side div#"+id).css("font-family",param[id]["font"]);
      //alert(param[id]["font"] + "id: "+id);
    },
    'opened' : function(style) {
      //alert('opened');
    },
    'closed' : function(style) {
      $(".fontSelectUl").remove();
      //alert('closed');
    },
    'fonts' : [
      'Arial,Arial,Helvetica,sans-serif',
      'Arial Black,Arial Black,Gadget,sans-serif',
      'Comic Sans MS,Comic Sans MS,cursive',
      'Courier New,Courier New,Courier,monospace',
      'Georgia,Georgia,serif',
      'Impact,Charcoal,sans-serif',
      'Lucida Console,Monaco,monospace',
      'Lucida Sans Unicode,Lucida Grande,sans-serif',
      'Palatino Linotype,Book Antiqua,Palatino,serif',
      'Tahoma,Geneva,sans-serif',
      'Times New Roman,Times,serif',
      'Trebuchet MS,Helvetica,sans-serif',
      'Verdana,Geneva,sans-serif',
      'Gill Sans,Geneva,sans-serif'
    ]
  });
}

function checkFont(id){
  if (param[id]["font"]){
    return param[id]["font"];
  }else{
    return "";
  }
}

function removeRedundant(){
  var i = 0;
  var colorArray = $(".sp-container");
  var fontArray= $(".fontSelectUl");
  if (colorArray.length > 1){
    for (i = 0; i < colorArray.length-1; i++) {
      colorArray[i].remove();
    }
  }
  if (fontArray.length > 1){
    for (i = 0; i < fontArray.length-1; i++) {
      fontArray[i].remove();
    }
  } // clear all the redundant thing
}




//document.getElementById('cancel').onclick  = reply_click;
