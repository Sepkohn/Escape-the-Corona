// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 700;
canvas.height = 800;
canvas.id="second";



//document.body.appendChild(canvas-wrap);

document.getElementById("canvas-wrap").appendChild(canvas);

//document.body.appendChild(canvas);
/*
function clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
*/

/*Panneau de drag and drop pour débuter le jeu*/
var checkBeforeStart = function () {
    var player = document.getElementById("player").value;
    console.log(player);
    if(player ==""){
        alert("Veuillez entrer un pseudo")
    }else{
        launchGame();
    }
}

/*Panneau démarrage jeu */
var launchGame = function () {
    document.getElementById("cadreChoixPersonnage").style.display = "none";
}


// Background image
var bgReady = false;
var bgImageMain = new Image();
bgImageMain.onload = function () {
	bgReady = true;
};
bgImageMain.src = "ressources/TextureSolB.jpg";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "ressources/hero.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};


// Monster image
var monsterReady2 = false;
var monsterImage2 = new Image();
monsterImage2.onload = function () {
	monsterReady2 = true;
};

monsterImage.src = "ressources/AmbuSmall.png";
monsterImage2.src = "ressources/combi3D.png";

// Game objects
//Valeur des persos à modifier.

var hero = {
	speed: 256, // movement in pixels per second
    
    x: 0,
	y: 0
};

var monster = {
	x: 0,
	y: 0,
    speed: 100
    
};

var monster2 = {
	x: 0,
	y: 0,
    speed: 100
    
};


//A encore un role celui de la vie de notre hero
//transformer en compteur de vie.

var monstersCaught = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keyup",function (e){
                 
    onkeyup = true;
    
    let direction = e.keyCode;
    
    if(direction==38 && hero.y > 0){
        hero.y -=32; 
    }
    
    if(direction==40 && hero.y < 800){
        hero.y +=32; 
    }
    
    if(direction==37 && hero.x > 0){
        hero.x -=32; 
    }
    
    if(direction==39 && hero.x < 700){
        hero.x +=32; 
    }
},false);

    //effet lors du relachement de la touche
    //a supprimer

addEventListener("keydown", function (e) {
	onkeydown = true;
    
    //hero.y +=100;
    
}, false);


function monsterAction(){

    
    monster.x += 4; //Vitesse du png
    
    monster2.x += 1;
      
    
};

// Reset the game when the player catches a monster
var reset = function () {
    
    
    //Position de depart du hero
	hero.x = 200;
    hero.y = 200;

	// Throw the monster somewhere on the screen randomly
	//monster.x = 32 + (Math.random() * (canvas.width - 125)); //125 = à l'avant du véhicule ou du monstre
	//monster.y = 32 + (Math.random() * (canvas.height - 125));// On definit la zone d'apparition pour qu'il ne sorte pas du jeu
    
    monster.x = 0;
    monster.y = Math.random() *(5 - 800)+800;
    
    
    monster2.x = 0;
    monster2.y = Math.random() *(5 - 800)+800;
    
    
    monsterAction();
};

// Update game objects
//Controle pour que le joueur ne sorte pas du jeu

var update = function (modifier) {
    
    
	if (38 in keysDown && hero.y > 0) { // Player holding up
		//hero.y -= hero.speed * modifier;
        hero.y -= 32 * modifier;
	}
	if (40 in keysDown && hero.y < 800) { // Player holding down
		//hero.y += hero.speed * modifier;
        hero.y += 32 * modifier;
	}
	if (37 in keysDown && hero.x > 0) { // Player holding left
		//hero.x -= hero.speed * modifier;
        hero.x -= 32 * modifier;
	}
	if (39 in keysDown && hero.x < 700) { // Player holding right
		//hero.x += hero.speed * modifier;
        hero.x += 32 * modifier;
	}
 
	// Are they touching? //32
    // A definir pour chaque monstre !! 
    // Faire des classes de monstres par taille. 
    
	if (
		hero.x <= (monster.x + 110)//Avant du monstre
        && monster.x <= (hero.x + 32)//Arrière gauche du monstre
		&& hero.y <= (monster.y + 40)//Dessous
		&& monster.y <= (hero.y + 25)//Dessus
	) {
		++monstersCaught;
		reset();
	}
    
    else{
        
        
        monsterAction();
        
    }
    
};

// Draw everything
var render = function () {
	if (bgReady) {
    //Image de fond
        ctx.drawImage(bgImageMain,0,0);        
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}
    
    if (monsterReady2) {
		ctx.drawImage(monsterImage2, monster2.x, monster2.y);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	/*ctx.fillText("Contact: " + monstersCaught, 32, 32);*/
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