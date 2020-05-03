
// START HERO
var heroReady = false;
	var heroImage = new Image();
	heroImage.onload = function () {
		heroReady = true;
	};
	


// Game objects
//Valeur des persos à modifier.

var hero = {
    x: 0,
	y: 0,
	speed: 256, // movement in pixels per second
	width:42,
	height:66
};