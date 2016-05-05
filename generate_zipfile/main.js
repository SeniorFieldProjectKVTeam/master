var thumbFloat = true;
var minWidth = 698;

//Document Ready
$(document).ready(function(e) {
	//Set initial menu position
	if($('#main').width() < minWidth){
		menuClose();
	}

	//Thumbnail float functionality
	if (thumbFloat) {	
		//Thumb magnify
		$('.thumbnail-navigator-item').bind({
			mouseenter: function() {
				$('#thumb_float').attr('src', $(this).attr('src'));
				$('#thumb_float').css('display', 'inline-block');
			},
			mouseleave: function() {
				$('#thumb_float').css('display', 'none');
			}
		});
		//Move thumb to mouse
		$(document).mousemove(function(e) {
			$('#thumb_float').css('top', e.pageY);
			$('#thumb_float').css('left', e.pageX + 15);
		});
	}
	
	
	
});

$( window ).resize(function() {
	if($('#main').width() < minWidth){
		menuClose();
		$('#search').hide();
	} else {
		menuOpen();
		$('#search').show();
	}
});


//Menu Button
$('.menu-icon').click(function(e) {
	if ($('#navigation').css('left') == '0px' || $('#navigation').css('left') == 0) {
		menuClose();
	} else {
		menuOpen();
	}
});


//Clear Submit Form
$('#qa-form').submit(function(e) {
	e.preventDefault(); // don't submit multiple times
	this.submit(); // use the native submit method of the form element
	
	setTimeout(function(){ // Delay for Chrome
	        $('#smFormQuestion').val(''); // blank the input
	    }, 100);
});

//Menu Button
$('#search_button').click(function(e) {
	$('#search').toggle();
});


//Navigation Buttons
$('.chapters-icon').click(function(e) {
	$('#thumbnail_wrapper').hide();
	$('#chapter_wrapper').show();
	$('.thumbnails-icon .active').removeClass('active');
	$('.chapters-icon').addClass('active');
});
$('.thumbnails-icon').click(function(e) {
	$('#chapter_wrapper').hide();
	$('#thumbnail_wrapper').show();
	$('.chapters-icon .active').removeClass('active');
	$('.thumbnails-icon').addClass('active');
});


function menuOpen() {
	if($('#main').width() >= minWidth){
		$('#navigation').css('left', '0');
		$('.logo-container').css('left', '0');
		$('#content').css('left', '20em');
		$('.controls-container').css('left', '20em');
	} else {
		$('#navigation').css('left', '0');
	}
	$('#navigation').removeClass('closed').addClass('open');
}
function menuClose() {
	$('#navigation').css('left', '-20em');
	$('.logo-container').css('left', '-20em');
	$('#content').css('left', '0px');
	$('.controls-container').css('left', '0px');
	$('#navigation').removeClass('open').addClass('closed');
}