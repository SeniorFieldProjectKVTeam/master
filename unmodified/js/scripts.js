
// create all the variables that we need
// all the data are stored in param
var bot = [];
var orderBotm = [];
var orderCombo =[];
var orderTopThree = [];
var param = new Object();
var themeString;
param["qu"] = new Object();
param["fn"] = new Object();
param["ts"] = new Object();
param["qz"] = new Object();
param["lg"] = new Object();
param["na"] = new Object();
param["tt"] = new Object();
param["zm"] = new Object();
param["theme"] = new Object();
param["combo-player"] = new Object();
var pa;
// var fs = require('fs');
var ids = ["qu","fn","ts","qz","lg","na","tt","zm"];

$( init ); // load this function when the page was load

function init() {
  loadTheme();
  loadWhole();
  comboBackground();
  $( "#left-side #left-top" ).accordion();
  $('#left-top li').draggable({
    cursor: 'move',
    helper: "clone"
  });
  $('#color-picker').hide();

  $( "#top-combo,#top-three").droppable({
    accept: "#left-top li#na, li#lg, li#tt, li#zm",
    activeClass: "ui-state-hover",
    hoverClass: "ui-state-active",
    drop: function( event, ui ) {
      $(ui.helper).remove(); //destroy clone
      var id = ui.draggable.attr("id").substring(0,2);
      $("#left-side #"+id).hide();
      if (id == "na"){
        param["na"]["exist"] = true;
        orderCombo = ["na","combo-player"];
        $( "#tobechange" ).html("<h3>Navigation</h3><ul><li>Introduction</li><li>Chapter 1</li><li>Chapter 2</li><li>Chapter 3</li><li>Conclusion</li></ul><div id='modification'></div>")
          .attr({
            class:"navigation",
            id:id
          });
        makeHover("#top-combo #",id);
        $('#top-combo').sortable({ // make it sortable
          stop: function(event,ui){
            orderCombo = $("#top-combo").sortable("toArray");
          }
        });
      } else {
        orderTopThree.push(id);
        checkTopHeight();
        if (orderTopThree.length == 1){
          var id1 = id;
          $("#top-three").html(divHtml("one",id1));
          applyChange(id1);
          makeHover("#top-three #",id1);
        };
        if (orderTopThree.length == 2){
          var id1 = orderTopThree[0];
          var id2 = id;
          $("#top-three").html(divHtml("two",id1)+divHtml("two",id2));
          applyChange(id1);
          applyChange(id2);
          makeHover("#top-three #",id1);
          makeHover("#top-three #",id2);
        };
        if (orderTopThree.length == 3){
          var id1 = orderTopThree[0];
          var id2 = orderTopThree[1];
          var id3 = id;
          $("#top-three").html(divHtml("three",id1)+divHtml("three",id2)+divHtml("three",id3));
          applyChange(id1);
          applyChange(id2);
          applyChange(id3);
          makeHover("#top-three #",id1);
          makeHover("#top-three #",id2);
          makeHover("#top-three #",id3);
        };
      };
    }
  });

  $('#botm-three').sortable({
    stop: function(event,ui){ /* do whatever here */
      orderBotm = $("#botm-three").sortable("toArray");
    }
  });

  $('#top-three').sortable({
    stop: function(event,ui){ /* do whatever here */
      orderTopThree = $("#top-three").sortable("toArray");
    }
  });

  $( "#botm-three" ).droppable({
    accept: "#left-top li#fn,li#ts,li#qu,li#qz,li#lg",
    activeClass: "ui-state-hover",
    hoverClass: "ui-state-active",
    drop: function( event, ui ) {
        $(ui.helper).remove(); //destroy clone
        var id = ui.draggable.attr("id").substring(0,2);
        $("#left-side #" +id).hide();
        orderBotm.push(id);
        if (orderBotm.length == 1){
          var id1 = id;
          $( this ).html(divHtml("one",id1));
          makeHover("#botm-three #",id1);
          applyChange(id1);
        }

        if (orderBotm.length == 2){
          var id1 = orderBotm[0];
          var id2 = id;
          $( this ).html(
            divHtml("two",id1) + divHtml("two",id2)
          );
          makeHover("#botm-three #",id1);
          makeHover("#botm-three #",id2);
          applyChange(id1);
          applyChange(id2);
        }

        if (orderBotm.length == 3){
          var id1 = orderBotm[0];
          var id2 = orderBotm[1];
          var id3 = id;
          $( this ).html(
            divHtml("three",id1)+divHtml("three",id2)+divHtml("three",id3)
          );
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

function checkTopHeight(){
  var checkHeight = $("#top-three").css("height");
  if (checkHeight == "0px"){
    $("#top-three").attr({
      style:"height:10%;width:100%;"
    });
    $("#botm-three").css("height","22%");
  }
}

// function logoBackground(id){
//   if (id == "lg"){
//     var parentID = $("#right-side #"+id).parent().attr("id");
//     if (parentID == "top-three" || parentID == "botm-three"){
//       $("#right-side #"+id).css("background","grey url('./images/logo.png') no-repeat center");
//       //$("#right-side #"+id).css("background","z-index: -1");
//       $("#right-side #"+id).css({
//         "background":"z-index: -1",
//         "width": "100%",
//         "height": "auto"
//       });
//       // document.getElementById("lg").style.background = "grey url('./images/logo.png') no-repeat 100%";
//       // $("#right-side #"+id).css("background","z-index: -1");
//     }
//   }
// }

function comboBackground(){
  document.getElementById("combo-player").style.background = "black url('./images/video.png') no-repeat center center";
  $("#combo-player").css("background","z-index: -1")
  $("#combo-player").html("<div id='modification'></div></div>").css({
    "color":"white",
    "font-size":"20px",
    "font-family":"Arial,Arial,Helvetica,sans-serif",
    "text-align": "left"
  });
  makeHover("#top-combo #","combo-player");
}

function divHtml(classname,id){
	var tempstring = ""
	if(id == "fn"){
		return "<div class="+classname+" id="+id+"><div id='modification'></div><h3>Footnotes</h3><div></div><p>Example footnotes here. Add links or contact information.</p></div>"
	} else if(id == "ts"){
		return "<div class="+classname+" id="+id+"><div id='modification'></div><h3>Transcript</h3><div></div><p>Here are some example notes for the presentation. Transcriptions can be very important part of your KnowledgeVision presentation.</p></div>"
	} else if(id == "qu"){
		return "<div class="+classname+" id="+id+"><div id='modification'></div><h3>Questions</h3><div></div><p>Any questions that you want people to consider as they are watching your video? Add them here.</p></div>"
	} else if(id == "qz"){
		return "<div class="+classname+" id="+id+"><div id='modification'></div><h3>Quizzes</h3></div>"
	} else if (id == "lg"){
		//document.getElementById("#botm-three #"+id).style.background = "grey url('./images/o') no-repeat 100%";
		return "<div class="+classname+" id="+id+"><div id='modification'></div><p>Logo</p></div>"
	} else if (id == "tt"){
    return "<div class="+classname+" id="+id+"><div id='modification'></div><p>Title</p></div>"
  } else if (id == "zm"){
    return "<div class="+classname+" id="+id+"><div id='modification'></div><p>Zoom</p></div>"
  }
	//return "<div class="+classname+" id="+id+"><p>"+id+"</p><div id='modification'></div></div>"
}

function cancelNavi(button_id){
  $("#top-combo #"+button_id).remove();
  $("#top-combo ").prepend("<div id = 'tobechange'></div>");
  $("#left-side #na").show();
  param["na"]["exist"] = false;
}

function cancelTop(button_id){  // special case LOGO !!!!!!!!!!!!!!!
  for (var i=0; i<3;i++){
    var id = orderTopThree[i];
    if (button_id == id){
      $("#left-side #"+id).show();
      orderTopThree.splice(i, 1);
      console.log(orderTopThree);
      if (orderTopThree.length==0){
        $("#right-side #"+button_id).remove();
        $("#top-three").css("height","0%");
        $("#botm-three").css("height","32%");
      }
      if (orderTopThree.length==1){
        var id1 = orderTopThree[0];
        $("#right-side #"+button_id).remove();
        $("#right-side #"+id1).attr({class:"one"});
      }
      if (orderTopThree.length==2){
        var id1 = orderTopThree[0];
        var id2 = orderTopThree[1];
        console.log(id1);
        console.log(id2);
        $("#right-side #"+button_id).remove();
        $("#right-side #"+id1).attr({class:"two"});
        $("#right-side #"+id2).attr({class:"two"});
      }
    }
  }

}

function cancelBotm(button_id) {
  for (i = 0; i < 3; i++) {
    var id = orderBotm[i];
    if (button_id == id){
      $("#left-side #"+id).show();
      orderBotm.splice(i, 1);
      if (orderBotm.length == 0){
        $("#right-side #"+button_id).remove();
      }
      if (orderBotm.length == 1){
        var id1 = orderBotm[0];
        $("#right-side #"+button_id).remove();
        $("#right-side #"+id1).attr({class:"one"});
      }
      if (orderBotm.length == 2){
        var id1 = orderBotm[0];
        var id2 = orderBotm[1];
        $("#right-side #"+button_id).remove();
        $("#right-side #"+id1).attr({class:"two"});
        $("#right-side #"+id2).attr({class:"two"});
        $("#botm-three").droppable("option", "disabled", false);
      }
    }
  }
}

function cancelHelper(id){
  var func = "cancelBotm";
  if (id == "na"){
    func = "cancelNavi";
  }
  if (id == "tt" || id == "zm"){
    func = "cancelTop";
  }
  if (id == "lg"){
    var parentID = $("#right-side #"+id).parent().attr("id");
    if (parentID == "top-three"){
      func = "cancelTop";
    } else {
      func = "cancelBotm";
    }
  }
  return func;
}

function makeHover(pref,id){
  var func = cancelHelper(id);
  var cancelButton = "<button id="+id+" class='cancel' onclick='"+func+"(this.id)' style='background-color:#9a9a9a;width:30px;'>X</button></div>";
  var colorPicker = "<input type='text' class='color-picker' id='color-picker'/>";
  var fontSize = generateFontSize();
  var fontButton = generateFont();
  var selections;
  $( pref+id ).hover(
    function() {
      if (id == "lg" || id == "zm"){
        selections = colorPicker+cancelButton;
        // var parent_id = $(this).parent().attr("id");
        // if (parent_id == "botm-three"){
        //   selections = colorPicker+cancelButton;
        // }else{
        //   selections = cancelButton;
        // }
      }else{
        if (id=="combo-player"){
          selections = "<input type='radio' name='cp-option' value='combo'>combo<br>";
          selections += "<input type='radio' name='cp-option' value='fixed'>fixed<br>";
          selections += "<input type='radio' name='cp-option' value='video'>video";
        }else{
          selections = fontSize+fontButton+colorPicker+cancelButton;
        }
      }

      $( this ).find("#modification").html(selections);
      if (id != "combo-player"){
        triggerColorPicker(id);
        if (id != "lg"){
          changeFontSize(id);
          changeFont(id);
        }
      }else{
        saveOption();
      }
    },
    function() {
      $(pref+id).find("#modification").empty();
      removeRedundant();
    }
  );
}

function saveOption(){
  var ch = document.getElementsByName('cp-option');
  for (var i = ch.length; i--;) {
      ch[i].onchange = function() {
        param["combo-player"]=this.value;
        //alert(param["combo-player"]);
      }
  }
}

function generateFontSize(){
  var fontSize = "<select id='fontsize-select'>";
  fontSize+="<option value='10px'>10px</option>";
  fontSize+="<option value='20px'>20px</option>";
  fontSize+="<option value='30px'>30px</option>";
  fontSize+="</select>";
  return fontSize;
}
function generateFont(){
  var font = "<select id='font-select'>";
  font+="<option value='Arial,Arial,Helvetica,sans-serif'>Arial</option>";
  font+="<option value='Arial Black,Arial Black,Gadget,sans-serif'>Arial Black</option>";
  font+="<option value='Comic Sans MS,Comic Sans MS,cursive'>Comic Sans MS</option>";
  font+="<option value='Courier New,Courier New,Courier,monospace'>Courier New</option>";
  font+="<option value='Georgia,Georgia,serif'>Georgia</option>";
  font+="<option value='Impact,Charcoal,sans-serif'>Impact</option>";
  font+="<option value='Lucida Console,Monaco,monospace'>Lucida Console</option>";
  font+="<option value='Lucida Sans Unicode,Lucida Grande,sans-serif'>Lucida Sans Unicode</option>";
  font+="<option value='Palatino Linotype,Book Antiqua,Palatino,serif'>Palatino Linotype</option>";
  font+="<option value='Tahoma,Geneva,sans-serif'>Tahoma</option>";
  font+="<option value='Times New Roman,Times,serif'>Times New Roman</option>";
  font+="<option value='Trebuchet MS,Helvetica,sans-serif'>Trebuchet MS</option>";
  font+="<option value='Verdana,Geneva,sans-serif'>Verdana</option>";
  font+="<option value='Gill Sans,Geneva,sans-serif'>Gill Sans</option>";
  font+="</select>";
  return font;
}

function changeFontSize(id){
  if (id != "theme"){
    $('#right-side #fontsize-select').chosen({ width: "100px" }).change(function(){
      param[id]["fontsize"] = $(this).val();
      //alert(id + ": "+param[id]["fontsize"]);
      $("#right-side div#"+id).css("font-size",param[id]["fontsize"]);
    });
  }else{
    $('#left-side #fontsize-select').chosen({ width: "100px" }).change(function(){
      param["theme"]["fontsize"] = $(this).val();
      $("#right-side").css("font-size",param["theme"]["fontsize"]);
      applyThemeFontSize(param["theme"]["fontsize"]);
    });
  }
}

function changeFont(id){
  if (id != "theme"){
    $('#right-side #font-select').chosen({ width: "100px" }).change(function(){
      param[id]["font"] = $(this).val();
      //alert(id + ": "+param[id]["font"]);
      $("#right-side div#"+id).css("font-family",param[id]["font"]);
    });
  }else{
    $('#left-side #font-select').chosen({ width: "100px" }).change(function(){
      param["theme"]["font"] = $(this).val();
      $("#right-side").css("font-family",param["theme"]["font"]);
      applyThemeFont(param["theme"]["font"]);
    });
  }
}

function updateColor(button_id,color){
  if (button_id != "theme"){
    param[button_id]["background-color"] = color;
    //alert(param[button_id]["background-color"]);
    $("#right-side div#"+button_id).css("background-color",color);
  }else{
    param["theme"]["background-color"] = color;
    $("#right-side").css("background-color",color);
    applyThemeColor(color);
  }
}// change the certain color of corresponding div


function applyChange(button_id){
  if (param[button_id]["background-color"]){
    $("#right-side #"+button_id).css("background-color",param[button_id]["background-color"]);
  }
  if ( param[button_id]["font"] ){
    $("#right-side #"+button_id).css("font-family",param[button_id]["font"]);
  }
  if (param[button_id]["fontsize"]){
    $("#right-side #"+button_id).css("font-size",param[button_id]["fontsize"]);
  }
} // apply all the changes the user made

function publish(){
  pa = {
    "orderBotm": orderBotm,
    "orderCombo": orderCombo,
    "orderTopThree": orderTopThree,
    "qu": param["qu"],
    "fn": param["fn"],
    "ts": param["ts"],
    "qz": param["qz"],
    "na": param["na"],
    "lg": param["lg"],
    "tt": param["tt"],
    "zm": param["zm"],
    "theme":param["theme"],
    "combo-player":param["combo-player"]
  }

  var json = JSON.stringify(pa);
  var blob = new Blob([json], {type: "application/json"});
  var url  = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.download    = "presentation.json";
  a.href        = url;
  a.textContent = "Click to Download";
  a.id = "download-presentation";
  $("#download-pre").replaceWith(a);
  document.getElementById("download-presentation").addEventListener("click", function(){
    $("#download-presentation").replaceWith("<a id='download-pre'></a>");
  });
}

function saveTheme(){
  p = {
    "theme":param["theme"]
  };
  if (param["theme"]["font"] || param["theme"]["fontsize"] || param["theme"]["background-color"]){
    var json = JSON.stringify(p);
    var blob = new Blob([json], {type: "application/json"});
    var url  = URL.createObjectURL(blob);

    var a = document.createElement('a');
    a.download    = "theme.json";
    a.href        = url;
    a.textContent = "Click to Download";
    a.id = "download-theme";
    $("#download").replaceWith(a);

    document.getElementById("download-theme").addEventListener("click", function(){
      $("#download-theme").replaceWith("<a id='download'></a>");
    });
  } else {
    alert("You have NOT set the theme yet");
  }
}

function loadTheme(){
  document.getElementById('load-theme').addEventListener('change', handleLoadTheme, false);
}

function handleLoadTheme(evt) {
  var file = evt.target.files[0]; // FileList object
  var read = new FileReader();
  read.readAsBinaryString(file);
  read.onloadend = function(){
    themeString = read.result;
    console.log(themeString);
    var theme = JSON.parse(themeString);
    if (theme["theme"]["font"] || theme["theme"]["fontsize"] || theme["theme"]["background-color"]){
      param["theme"] = theme["theme"];
      for (var i=0; i <= ids.length-1; i++){
        if (theme["theme"]["font"]){
          param[ids[i]]["font"] = theme["theme"]["font"];
        }
        if (theme["theme"]["fontsize"]){
          param[ids[i]]["fontsize"] = theme["theme"]["fontsize"];
        }
        if (theme["theme"]["background-color"]){
          param[ids[i]]["background-color"] = theme["theme"]["background-color"];
        }
      }
    }
  }
}
function loadWhole(){
  document.getElementById('load-whole').addEventListener('change', handleLoadWhole, false);
}

function handleLoadWhole(evt) {
  var file = evt.target.files[0]; // FileList object
  var read = new FileReader();
  read.readAsBinaryString(file);
  read.onloadend = function(){
    wholeString = read.result;
    console.log(wholeString);
    var whole = JSON.parse(wholeString);
    if (whole["theme"]["font"] || whole["theme"]["fontsize"] || whole["theme"]["background-color"]){
      param["theme"] = whole["theme"];
    }

    for (var i=0; i<=ids.length; i++){
      if (whole[ids[i]]){
        param[ids[i]] = whole[ids[i]];
      }
      if (ids[i] == "na"){
        cancelNavi(ids[i]);
      } else if (ids[i] == "tt" || ids[i] == "zm"){
        cancelTop(ids[i]);
      } else if (ids[i] == "lg"){
        var parentID = $("#right-side #"+ids[i]).parent().attr("id");
        if (parentID == "top-three"){
          cancelTop(ids[i]);
        } else {
          cancelBotm(ids[i]);
        }
      } else{
        cancelBotm(ids[i]);
      }
    }

    if (whole["orderBotm"]){
      orderBotm = whole["orderBotm"];
      for (var i=0;i<orderBotm.length;i++){
        $("#left-side #"+orderBotm[i]).hide();
      }
      if(orderBotm.length == 1){
        var id1 = orderBotm[0];
        $("#botm-three").html(divHtml("one",id1));
        makeHover("#botm-three #",id1);
        applyChange(id1);
      } else if (orderBotm.length == 2){
        var id1 = orderBotm[0];
        var id2 = orderBotm[1];
        $("#botm-three").html(divHtml("two",id1)+divHtml("two",id2));
        makeHover("#botm-three #",id1);
        makeHover("#botm-three #",id2);
        applyChange(id1);
        applyChange(id2);
      } else if (orderBotm.length == 3){
        var id1 = orderBotm[0];
        var id2 = orderBotm[1];
        var id3 = orderBotm[2];
        $("#botm-three").html(divHtml("three",id1)+divHtml("three",id2)+divHtml("three",id3));
        makeHover("#botm-three #",id1);
        makeHover("#botm-three #",id2);
        makeHover("#botm-three #",id3);
        applyChange(id1);
        applyChange(id2);
        applyChange(id3);
      }
    }

    if (whole["orderCombo"].length == 2){
      $("#left-side #na").hide();
      param["na"]["exist"] = true;
      orderCombo = ["na","combo-player"];
      $( "#tobechange" ).html("<h3>Navigation</h3><ul><li>Introduction</li><li>Chapter 1</li><li>Chapter 2</li><li>Chapter 3</li><li>Conclusion</li></ul><div id='modification'></div>")
      .attr({
        class:"navigation",
        id:"na"
      });
      makeHover("#top-combo #","na");
      applyChange("na");
      $('#top-combo').sortable({ // make it sortable
        stop: function(event,ui){
          orderCombo = $("#top-combo").sortable("toArray");
        }
      });
    }

    if (whole["combo-player"]){
      param["combo-player"] = whole["combo-player"];
    }

    if (whole["orderTopThree"]){
      orderTopThree = whole["orderTopThree"];
      checkTopHeight();
      for (var i=0;i<orderTopThree.length;i++){
        $("#left-side #" + orderTopThree[i]).hide();
      }
      if (orderTopThree.length == 1){
        var id1 = orderTopThree[0];
        $("#top-three").html(divHtml("one",id1));
        applyChange(id1);
        makeHover("#top-three #",id1);
      } else if (orderTopThree.length == 2){
        var id1 = orderTopThree[0];
        var id2 = orderTopThree[1];
        $("#top-three").html(divHtml("two",id1)+divHtml("two",id2));
        applyChange(id1);
        applyChange(id2);
        makeHover("#top-three #",id1);
        makeHover("#top-three #",id2);
      } else if (orderTopThree.length == 3){
        var id1 = orderTopThree[0];
        var id2 = orderTopThree[1];
        var id3 = orderTopThree[2];
        $("#top-three").html(divHtml("three",id1)+divHtml("three",id2)+divHtml("three",id3));
        applyChange(id1);
        applyChange(id2);
        applyChange(id3);
        makeHover("#top-three #",id1);
        makeHover("#top-three #",id2);
        makeHover("#top-three #",id3);
      }
    }
  }
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

function applyThemeColor(color){
  for (var i=0; i <= ids.length-1; i++){
    param[ids[i]]["background-color"] = color;
    $("#right-side div#"+ids[i]).css("background-color",color);
  }
}

function applyThemeFont(font){
  for (var i=0; i <= ids.length-1; i++){
    param[ids[i]]["font"] = font;
    $("#right-side div#"+ids[i]).css("font-family",font);
  }
}

function applyThemeFontSize(size){
  for (var i=0; i <= ids.length-1; i++){
    param[ids[i]]["fontsize"] = size;
    $("#right-side div#"+ids[i]).css("font-size",size);
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
