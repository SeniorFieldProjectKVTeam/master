var bot = [];
var order = [];
var ordertop = [];
var param = new Object();
param["qu"] = new Object();
param["fn"] = new Object();
param["ts"] = new Object();
param["qz"] = new Object();
param["lg"] = new Object();
param["na"] = new Object();
var pa;

$( init );

function init() {
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
        param["na"]["ui"] = ui.draggable;
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
        param["lg"]["ui"] = ui.draggable;
        param["lg"]["exist"] = true;
        $("#top-logo-change").html("<p>logo</p>").attr({
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
}

function botmDiv(classname,id){
  return "<div class="+classname+" id="+id+"><p>"+id+"</p><div id='modification'></div></div>"
}

function cancelNavi(button_id){
  $("#top-combo #"+button_id).remove();
  $("#top-combo ").prepend("<div id = 'tobechange'></div>");
  $(param["na"]["ui"]).show();
  param["na"]["exist"] = false;
}

function cancelLogo(button_id){
  var currentClass = $("#right-side #"+button_id).attr("class");
  if (currentClass == "top-logo"){
    $("#right-side #"+button_id).remove();
    $(param["lg"]["ui"]).show();
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
  var fontButton = "<div id='fontSelect' class='fontSelect'><div class='arrow-down'></div></div>"
  var fontSize = "<div id='fontSizeSelect'>Here should be Font Size</div>"
  var cancelButton = "<button id="+id+" class='cancel' onclick='"+func+"(this.id)'>X</button></div>";
  var colorPicker = "<input type='text' class='color-picker' id='color-picker'/>";
  var fontSize = generateFontSize();
  var selections;
  if (id == "lg"){
    selections = cancelButton;
  }else{
    selections = colorPicker+fontButton+cancelButton+fontSize;
  }
  $( pref+id ).hover(
    function() {
      $( this ).find("#modification").html(
        selections
      );
      triggerColorPicker(id);
      if (id != "lg"){
        selectFontStyle(id);
        changeFontSize(id);
      }
      //alert();
    },
    function() {
      $("#modification").empty();
      removeRedundant();
    }
  );
}

function generateFontSize(){
  var fontSize = "<select class='simple-select'>";
  fontSize+="<option value='10px'>10px</option>";
  fontSize+="<option value='20px'>20px</option>";
  fontSize+="<option value='30px'>30px</option>";
  return fontSize;
}

function changeFontSize(id){
  var size;
  $('.simple-select').chosen({ width: "100px" }).change(function(){
    param[id]["fontsize"] = $(this).val();
    $("#right-side div#"+id).css("font-size",param[id]["fontsize"]);
  });

}

function updateColor(button_id,color){
  param[button_id]["background-color"] = color;
  //alert(param[button_id]["background-color"]);
  $("#right-side div#"+button_id).css("background-color",color);
}

function changeFont(button_id){
  //param[button_id]["background-color"]
}

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
    "lg": param["lg"]
  }
  alert(pa);
}

function refresh(){
  location.reload();
}

function triggerColorPicker(id){
  $("#color-picker").spectrum({
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
      updateColor(id,col);
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
    ]
  });
  $(".sp-preview .sp-preview-inner").css("background-color",param[id]["background-color"]);
}

function initColorPicker(id){
  if (param[id]["background-color"]){
    return param[id]["background-color"]
  }else{
    return "#ECC";
  }
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
  }
}




//document.getElementById('cancel').onclick  = reply_click;
