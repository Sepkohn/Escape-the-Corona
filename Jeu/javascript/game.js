// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1500;
canvas.height = 850;

canvas.id="test";

//document.body.append(canvas);
document.getElementById('canvas').appendChild(this.canvas);
canvas.style.position="absolute";


// Background image
var bgReady = false;
var bgImageMain = new Image();
var bgImageBordL = new Image();
var bgImageBordR = new Image();
var bgImageBordUp = new Image();
var bgImageBordDown = new Image();

bgImageMain.onload = function () {
	bgReady = true;
};

bgImageMain.src = "ressources/images/TextureSolB.jpg";


// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "ressources/images/hero.png";



// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};

//monsterImage.src = "ressources/AmbuSmall.png";
monsterImage.src = "ressources/PoliceUp.png";



// Game objects


var hero = {
	speed: 30, // movement in pixels per second
	//speed: 83,
    
    x: 0,
	y: 0
};



var monster = {
	x: 0,
	y: 0
    //speed: 100;
    
};

/*
monster.monsterAction = function(){
    var now = Date.now(),
            dt = (now - lastTime) / 1000.0;
    
    monster.x += dt * monster.speed;
    
}
*/



//A encore un role
var monstersCaught = 0;


// Handle keyboard controls
var keysDown = {};


/*
addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);
*/

/*
addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);
*/



addEventListener("keyup",function (e){
                 
    onkeyup = true;
    
    let direction = e.keyCode;
    
    if(direction==38 && hero.y > 16){
        hero.y -=32,5; 
    }
    
    if(direction==40 && hero.y < 800){
        hero.y +=32,5; 
    }
    
    if(direction==37 && hero.x > 500){
        hero.x -=32,5; 
    }
    
    if(direction==39 && hero.x < 1150){
        hero.x +=32,5; 
    }
                 
                 },false);


addEventListener("keydown", function (e) {
	onkeydown = true;
    
    //hero.y +=100;
    
}, false);


/*
addEventListener("presseTouche" function (e)){
    KeyboardEvent[e.KEYPRESS] = true;
}, false);

addEventListener("presseLachee" function (e)){
    delete KeyboardEvent[e.KEYPRESS];
}, false);
*/


// Reset the game when the player catches a monster
var reset = function () {
	hero.x = 850;
    hero.y = 750;

	// Throw the monster somewhere on the screen randomly
	//monster.x = 32 + (Math.random() * (canvas.width - 125)); //125 = à l'avant du véhicule ou du monstre
	//monster.y = 32 + (Math.random() * (canvas.height - 125));// On definit la zone d'apparition pour qu'il ne sorte pas du jeu
    
    monster.x = 500;
    monster.y = Math.random() *(5 - 800)+800;
};




// Update game objects

var update = function (modifier) {
    
    
	if (38 in keysDown && hero.y > 0) { // Player holding up
		//hero.y -= hero.speed * modifier;
        hero.y -= 100 * modifier;
	}
	if (40 in keysDown && hero.y < 800) { // Player holding down
		//hero.y += hero.speed * modifier;
        hero.y += 100 * modifier;
	}
	if (37 in keysDown && hero.x > 500) { // Player holding left
		//hero.x -= hero.speed * modifier;
        hero.x -= 100 * modifier;
	}
	if (39 in keysDown && hero.x < 1200) { // Player holding right
		//hero.x += hero.speed * modifier;
        hero.x += 100 * modifier;
	}
    
    
    
    
    
	// Are they touching? //32
	if (
		hero.x <= (monster.x + 110)//Avant du monstre
        && monster.x <= (hero.x + 32)//Arrière gauche du monstre
		&& hero.y <= (monster.y + 40)//Dessous
		&& monster.y <= (hero.y + 25)//Dessus
	) {
		++monstersCaught;
		reset();
	}
};

// Draw everything
var render = function () {
	if (bgReady) {
        
        //Bordure Nord
		 //premier chiffre largeur, deuxieme hauteur
       
        
        
        //Tuiles haut
        ctx.drawImage(bgImageMain,500,5);
        
        
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Contact: " + monstersCaught, 32, 32);
};

    // The main game loop
    var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;


// Let's play this game!
var then = Date.now();
reset();
main();