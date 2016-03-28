

$( init );
function init() {
  var bot = [];
  $('[data-toggle="popover"]').popover();
  $( "#left-side" ).accordion();
  $('#left-side li').draggable({
    cursor: 'move',
    helper: "clone"
  });
  $( "#navigation" ).droppable({
    accept: "#left-side li.navi",
    activeClass: "ui-state-hover",
    hoverClass: "ui-state-active",
    drop: function( event, ui ) {
      $(ui.helper).remove(); //destroy clone
      $(ui.draggable).remove(); //remove from list
      $( this )
        .find( "p" )
        .html( "Navigation Dropped!<button>Modify</button>" );
    }
  });
  $('#top-combo').sortable();
  $('#botm-three').sortable();
  $( "#botm-three" ).droppable({
    accept: "#left-side li.fn, #left-side li.ts, #left-side li.qu",
    activeClass: "ui-state-hover",
    hoverClass: "ui-state-active",
    drop: function( event, ui ) {
        $(ui.helper).remove(); //destroy clone
        $(ui.draggable).remove(); //remove from list
        bot.push(ui);

        if (bot.length == 1){
          var id = ui.draggable.attr("class").substring(0,2);
          $( this ).find( "div" ).html(id+"<button>Modify</button>");
          $('#botm-three div').css({
            "background-color":"green",
            "width":"100%",
            "display": "inline-block",
            "height":"100%"
          });
        }
        if (bot.length == 2){
          var id = ui.draggable.attr("class").substring(0,2);
          var html = "<div>"+id+"<button>Modify</button>"+"</div>";
          $(this).append(html);
          $('#botm-three div').css({
            "background-color":"green",
            "width":"49%",
            "display": "inline-block",
            "height":"100%"});
        }
        if (bot.length == 3){
          var id = ui.draggable.attr("class").substring(0,2);
          var html = "<div id="+id+">"+id+"<button>Modify</button>"+"</div>";
          $(this).prepend(html);
          $('#botm-three div').css({
            "background-color":"green",
            "width":"33%",
            "display": "inline-block",
            "height":"100%"});
        }
    }
  });
  function publish() {
    var body = $('body').html();
  }

}
