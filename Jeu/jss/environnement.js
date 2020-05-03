	
// Background image START
var bgReady = false;
var bgImageMain = new Image();
bgImageMain.onload = function () {
	bgReady = true;
};
bgImageMain.src = "ressources/TextureSolB.jpg";

	
// Background image GAME OVER
var bgReadyEnd = false;
var bgImageMainEnd = new Image();
bgImageMainEnd.onload = function () {
	bgReadyEnd = true;
};
bgImageMainEnd.src = "ressources/TextureSolBEnd.jpg";


// Background image GAME OVER 2
var gaovReady = false;
var gaov = new Image();
gaov.onload = function () {
	gaovReady = true;
};
gaov.src = "ressources/gaov.png";
