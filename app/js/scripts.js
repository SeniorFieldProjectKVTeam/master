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
// THINGS I ADDED
var fs = require('fs');

$( init );

function init() {
  $( "#left-side #left-top" ).accordion();
  $('#left-top li').draggable({
    cursor: 'move',
    helper: "clone"
  });
  $('#color-picker').hide();
  $( "#combo-player" ).droppable({
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
          $( this ).html("<div class='one' id="+id1+">"+id1+"</div>");
          makeHover("#botm-three #",id1);
          applyChange(id1);
          order = [id1];
        }

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
    func = "cancelLogo";
  }
  $( pref+id ).hover(
    function() {
      $( this ).append(
        // "<button href=''#popupMenu' data-rel='popup' data-transition='slideup' id='hover-modification' class='hover-modification btn btn-danger'>Modify</button>" +
        // "<div data-role='popup' id='popupMenu'>" +
        //   "<ul data-role='listview' data-inset='true'>" +
        //     "<li data-role='list-divider'>Choose an action</li>"+
        //     "<li><input type='text' class='color-picker' id='color-picker'/></li>"+
        //     "<li><button id="+id+" class='font' onclick='changeFont(this.id)'>font</button></li>"+
        //     "<li><button id="+id+" class='cancel' onclick='"+func+"(this.id)'>X</button></li>" +
        //     "</ul></div>"
        "<div class='hover-modification'><input type='text' class='color-picker' id='color-picker'/>"+"<button id="+id+" class='font' onclick='changeFont(this.id)'>font</button>"+"<button id="+id+" class='cancel' onclick='"+func+"(this.id)'>X</button></div>"
      );
      // $(pref+id+" .hover-modification").css({
      //   "align-items": "center",
      //   "justify-content": "center",
      // });
<<<<<<< HEAD
      alert(here);
=======
>>>>>>> caf7097aa849255075fbfbcb06d6c10bf0804d57
      $("#color-picker").spectrum({
        color: "#ECC",
        showInput: false,
        className: "full-spectrum",
        showInitial: true,
        showPalette: true,
        showSelectionPalette: true,
        maxSelectionSize: 10,
        preferredFormat: "hex",
        localStorageKey: "spectrum.demo",
        move: function(color) {
<<<<<<< HEAD
          alert(color);
=======
>>>>>>> caf7097aa849255075fbfbcb06d6c10bf0804d57
          updateColor(id,(color ? color.toHexString() : ""));
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
      // if ($("#color-picker .sp-replacer")){
      //   alert("found");
      // }
    },
    function() {
      $( this ).find( "button" ).remove();
      $( this ).find( "input" ).remove();
      $( this ).find(".sp-replacer").remove();
    }
  );
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
}

<<<<<<< HEAD
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
=======
function publish(){	
	//grab the desired output
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
  fs.writeFile("./kv.json", JSON.stringify(pa), function(err){
	  if(err){
		  return console.log(err);
	  }
	  console.log("The file was saved!");
  });
  
  
>>>>>>> caf7097aa849255075fbfbcb06d6c10bf0804d57

  alert(pa);
  // store in local storage or session or cookies
  //localStorage.setItem('passParams', JSON.stringify(pa));
  //var obj = JSON.parse(localStorage.getItem('passParams'));
  //alert(obj["order"]);

  // try to ouput as download
  // var obj = {a: 123, b: "4 5 6"};
  // var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));
  // $('<a href="data:' + data + '" download="data.json">download JSON</a>').appendTo('#download');
}

function refresh(){
  location.reload();
}



//document.getElementById('cancel').onclick  = reply_click;
