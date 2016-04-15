
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
param["theme"] = new Object();
var pa;
var fs = require('fs');

$( init ); // load this function when the page was load

function init() {
  comboBackground();
  $( "#left-side #left-top" ).accordion();
  $('#left-top li').draggable({
    cursor: 'move',
    helper: "clone"
  });
  $('#color-picker').hide();

  $( "#top-combo" ).droppable({
    accept: "#left-top li#na, li#lg",
    activeClass: "ui-state-hover",
    hoverClass: "ui-state-active",
    drop: function( event, ui ) {
      $(ui.helper).remove(); //destroy clone
      $(ui.draggable).hide(); //remove from list
      var id = ui.draggable.attr("id").substring(0,2);
      if (id == "na"){
        saveUI["na"] = ui.draggable;
        param["na"]["exist"] = true;
        $( "#tobechange" ).html("this is the navigation")
          .attr({
            class:"navigation",
            id:id
          });
        makeHover("#top-combo #",id);
        $('#top-combo').sortable({ // make it sortable
          stop: function(event,ui){
            ordertop = $("#top-combo").sortable("toArray");
          }
        });
      };
      if (id == "lg"){
        saveUI["lg"] = ui.draggable;
        param["lg"]["exist"] = true;
        $("#top-logo-change").html("<p>Logo</p>").attr({
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
    accept: "#left-top li#fn,li#ts,li#qu,li#qz,li#lg",
    activeClass: "ui-state-hover",
    hoverClass: "ui-state-active",
    drop: function( event, ui ) {
        $(ui.helper).remove(); //destroy clone
        $(ui.draggable).hide(); //remove from list
        bot.push(ui);

        if (bot.length == 1){
          var id1 = ui.draggable.attr("id").substring(0,2);
          $( this ).html(botmDiv("one",id1));
          makeHover("#botm-three #",id1);
          applyChange(id1);
          order = [id1];
        }

        if (bot.length == 2){
          var id1 = bot[0].draggable.attr("id").substring(0,2);
          var id2 = bot[1].draggable.attr("id").substring(0,2);
          $( this ).html(
            botmDiv("two",id1) + botmDiv("two",id2)
          );
          order = [id1,id2];
          makeHover("#botm-three #",id1);
          makeHover("#botm-three #",id2);
          applyChange(id1);
          applyChange(id2);
        }
        if (bot.length == 3){
          var id1 = bot[0].draggable.attr("id").substring(0,2);
          var id2 = bot[1].draggable.attr("id").substring(0,2);
          var id3 = ui.draggable.attr("id").substring(0,2);
          $( this ).html(
            botmDiv("three",id1)+botmDiv("three",id2)+botmDiv("three",id3)
          );
          order = [id1,id2,id3];
          $(this).droppable( "option", "disabled", true );
          makeHover("#botm-three #",id1);
          makeHover("#botm-three #",id2);
          makeHover("#botm-three #",id3);
          applyChange(id1);
          applyChange(id2);
          applyChange(id3);
        }
    }
  });
  // continue
  addTheme();
}

function addTheme(){
  var html = generateFont()+generateFontSize()+"<input type='text' class='color-picker' id='color-picker'/>";
  $("#theme").html(html);
  changeFont("theme");
  changeFontSize("theme");
  triggerColorPicker("theme");
}

function comboBackground(){
  document.getElementById("combo-player").style.background = "black url('./images/video.png') no-repeat center center";
}

function botmDiv(classname,id){
  return "<div class="+classname+" id="+id+"><p>"+id+"</p><div id='modification'></div></div>"
}

function cancelNavi(button_id){
  $("#top-combo #"+button_id).remove();
  $("#top-combo ").prepend("<div id = 'tobechange'></div>");
  $(saveUI["na"]).show();
  param["na"]["exist"] = false;
}

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

function cancelDrop(button_id) {
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
        $(botm).html(botmDiv("one",id1));
        makeHover("#botm-three #",id1);
        applyChange(id1);
      }
      if (bot.length == 2){
        var id1 = bot[0].draggable.attr("id").substring(0,2);
        var id2 = bot[1].draggable.attr("id").substring(0,2);
        $(botm).html(
          botmDiv("two",id1)+botmDiv("two",id2)
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
    func = "cancelLogo";
  }
  var cancelButton = "<button id="+id+" class='cancel' onclick='"+func+"(this.id)' style='background-color:black;width:30px;'>X</button></div>";
  var colorPicker = "<input type='text' class='color-picker' id='color-picker'/>";
  var fontSize = generateFontSize();
  var fontButton = generateFont();
  var selections;
  if (id == "lg"){
    selections = cancelButton;
  }else{
    selections = fontSize+fontButton+colorPicker+cancelButton;
  }
  $( pref+id ).hover(
    function() {
      $( this ).find("#modification").html(selections);
      triggerColorPicker(id);
      if (id != "lg"){
        changeFontSize(id);
        changeFont(id);
      }
    },
    function() {
      $(pref+id).find("#modification").empty();
      removeRedundant();
    }
  );
}

function generateFontSize(){
  var fontSize = "<select class='fontsize-select'>";
  fontSize+="<option value='10px'>10px</option>";
  fontSize+="<option value='20px'>20px</option>";
  fontSize+="<option value='30px'>30px</option>";
  fontSize+="</select>";
  return fontSize;
}
function generateFont(){
  var font = "<select id='font-select'>";
  font+="<option value='Arial,Arial,Helvetica,sans-serif'>Arial,Arial,Helvetica,sans-serif</option>";
  font+="<option value='Arial Black,Arial Black,Gadget,sans-serif'>Arial Black,Arial Black,Gadget,sans-serif</option>";
  font+="<option value='Comic Sans MS,Comic Sans MS,cursive'>Comic Sans MS,Comic Sans MS,cursive</option>";
  font+="<option value='Courier New,Courier New,Courier,monospace'>Courier New,Courier New,Courier,monospace</option>";
  font+="<option value='Georgia,Georgia,serif'>Georgia,Georgia,serif</option>";
  font+="<option value='Impact,Charcoal,sans-serif'>Impact,Charcoal,sans-serif</option>";
  font+="<option value='Lucida Console,Monaco,monospace'>Lucida Console,Monaco,monospace</option>";
  font+="<option value='Lucida Sans Unicode,Lucida Grande,sans-serif'>Lucida Sans Unicode,Lucida Grande,sans-serif</option>";
  font+="<option value='Palatino Linotype,Book Antiqua,Palatino,serif'>Palatino Linotype,Book Antiqua,Palatino,serif</option>";
  font+="<option value='Tahoma,Geneva,sans-serif'>Tahoma,Geneva,sans-serif</option>";
  font+="<option value='Times New Roman,Times,serif'>Times New Roman,Times,serif</option>";
  font+="<option value='Trebuchet MS,Helvetica,sans-serif'>Trebuchet MS,Helvetica,sans-serif</option>";
  font+="<option value='Verdana,Geneva,sans-serif'>Verdana,Geneva,sans-serif</option>";
  font+="<option value='Gill Sans,Geneva,sans-serif'>Gill Sans,Geneva,sans-serif</option>";
  font+="</select>";
  return font;
}

function changeFontSize(id){
  if (id != "theme"){
    $('#right-side #fontsize-select').chosen({ width: "100px" }).change(function(){
      param[id]["fontsize"] = $(this).val();
      $("#right-side div#"+id).css("font-size",param[id]["fontsize"]);
    });
  }else{
    $('#left-side #fontsize-select').chosen({ width: "100px" }).change(function(){
      param["theme"]["fontsize"] = $(this).val();
      $("#right-side").css("font-size",param["theme"]["fontsize"]);
    });
  }
}

function changeFont(id){
  if (id != "theme"){
    $('#right-side #font-select').chosen({ width: "100px" }).change(function(){
      param[id]["font"] = $(this).val();
      $("#right-side div#"+id).css("font-family",param[id]["font"]);
    });
  }else{
    $('#left-side #font-select').chosen({ width: "100px" }).change(function(){
      param["theme"]["font"] = $(this).val();
      $("#right-side").css("font-family",param["theme"]["font"]);
    });
  }
}

function updateColor(button_id,color){
  if (button_id != "theme"){
    param[button_id]["background-color"] = color;
    //alert(param[button_id]["background-color"]);
    $("#right-side div#"+button_id).css("background-color",color);
  }else{
    param[button_id]["background-color"] = color;
    $("#right-side").css("background-color",color);
  }
}// change the certain color of corresponding div


function applyChange(button_id){
  if (param[button_id]["background-color"]){
    $("#right-side div#"+button_id).css("background-color",param[button_id]["background-color"]);
  }
  if (param[button_id]["font"]){
    $("#right-side div#"+button_id).css("font-family",param[button_id]["font"]);
  }
  if (param[button_id]["fontsize"]){
    $("#right-side div#"+button_id).css("font-size",param[button_id]["fontsize"]);
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
  fs.writeFile("kv.json", JSON.stringify(pa), function(err){
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
  var picker;
  if (id == "theme"){
    picker = "#left-side #color-picker";
  }else{
    picker = "#right-side #color-picker";
  }
  $(picker).spectrum({
    color: initColorPicker(id),
    showInput: true,
    className: "full-spectrum",
    showInitial: true,
    showPalette: true,
    showSelectionPalette: true,
    maxSelectionSize: 10,
    preferredFormat: "hex",
    localStorageKey: "spectrum.demo",
    change: function(color) {
      var col = (color ? color.toHexString() : "");
      updateColor(id,col); // update the color to correspoding hash
    },
    show: function() {
      // alert("show");
    },
    hide: function() {
      // alert("hide");
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
    ] // preload some of the colors
  });
  if (id != "theme"){ // change the color of in the color picker after select
    $("#right-side .sp-preview .sp-preview-inner").css("background-color",param[id]["background-color"]);
  }else{
    $("#left-side .sp-preview .sp-preview-inner").css("background-color",param[id]["background-color"]);
  }
}

function initColorPicker(id){
  if (id != "theme"){
    if (param[id]["background-color"]){
      return param[id]["background-color"];
    }else{
      return "#ECC";
    }
  }else{
    if (param["theme"]["background-color"]){
      return param["theme"]["background-color"];
    }else{
      return "#ECC";
    }
  }
} // check if the background-color already decleared

function removeRedundant(){
  var i = 0;
  var colorArray = $(".sp-container");
  if (colorArray.length > 1){
    for (i = colorArray.length-2; i >= 1; i--) {
      colorArray[i].remove();
    }
  } // remove all the redundant div, especially cover by the hover
}
