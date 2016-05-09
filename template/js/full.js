//Fullscreen Options
var inFullScreen = false;                                  //Fullscreen toggle
var elmFull = document.getElementById('player_innerwrap');      //Element to fullscreen
var btnFull = document.getElementById('fullscreen'); //Fullscreen Button

//Allow for Fullscreen
if (document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled) {
	btnFull.style.display = 'inline-block';
	btnFull.addEventListener('click', function() {
		if (inFullScreen === false) {
			makeFullScreen();
		} else {
			closeFullScreen();
		}
	});
} else {
	btnFull.style.display = 'none';
}

function makeFullScreen() {
	if (elmFull.requestFullscreen) {
	  elmFull.requestFullscreen();
	}
	else if (elmFull.msRequestFullscreen) {
	  elmFull.msRequestFullscreen();
	}
	else if (elmFull.mozRequestFullScreen) {
	  elmFull.mozRequestFullScreen();
	}
	else if (elmFull.webkitRequestFullscreen) {
	  elmFull.webkitRequestFullscreen();
	}
	
	inFullScreen = true;
	return;
}

function closeFullScreen() {
	if (document.exitFullscreen) {
	  document.exitFullscreen();
	}
	else if (document.msExitFullscreen) {
	  document.msExitFullscreen();
	}
	else if (document.mozCancelFullScreen) {
	  document.mozCancelFullScreen();
	}
	else if (document.webkitCancelFullScreen) {
	  document.webkitCancelFullScreen();
	}
	
	inFullScreen = false;
	return;
}

//Add event listener for changing fullscreen
elmFull.addEventListener("fullscreenchange",function(){
    if (!document.fullscreen) {
    	btnFull.innerHTML = txtNormal;
    	btnFull.style.backgroundPosition = 'left top';
    }
}, false);
elmFull.addEventListener("mozfullscreenchange",function(){
	if (!document.mozFullScreen) {
		btnFull.innerHTML = txtNormal;
		btnFull.style.backgroundPosition = 'left top';
	}
}, false);
elmFull.addEventListener("webkitfullscreenchange",function(){
	if (!document.webkitIsFullScreen) {
		btnFull.innerHTML = txtNormal;
		btnFull.style.backgroundPosition = 'left top';
	}
}, false);