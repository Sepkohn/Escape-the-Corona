// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 700;
canvas.height = 800;
canvas.id="second";



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

//New song
var ambiance = new Audio("../Jeu/ressources/sound/doom.mp3");

/*Panneau démarrage jeu */
var launchGame = function () {
    document.getElementById("cadreChoixPersonnage").style.display = "none";
	
	ambiance.play();
	
}
	
// Background image
var bgReady = false;
var bgImageMain = new Image();
bgImageMain.onload = function () {
	bgReady = true;
};
bgImageMain.src = "ressources/TextureSolB.jpg";


// Background image
var bgReadyEnd = false;
var bgImageMainEnd = new Image();
bgImageMainEnd.onload = function () {
	bgReadyEnd = true;
};
bgImageMainEnd.src = "ressources/TextureSolBEnd.jpg";


// Hero image
var gaovReady = false;
var gaov = new Image();
gaov.onload = function () {
	gaovReady = true;
};
gaov.src = "ressources/gaov.png";


// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "ressources/hero.png";

// Monster image
var monsterReady1 = false;
var monsterImage1 = new Image();
monsterImage1.onload = function () {
	monsterReady1 = true;
};


// Monster image
var monsterReady2 = false;
var monsterImage2 = new Image();
monsterImage2.onload = function () {
	monsterReady2 = true;
};

// Monster image
var monsterReady3 = false;
var monsterImage3 = new Image();
monsterImage3.onload = function () {
	monsterReady3 = true;
};

// Monster image
var monsterReady4 = false;
var monsterImage4 = new Image();
monsterImage4.onload = function () {
	monsterReady4 = true;
};

// Monster image
var monsterReady5 = false;
var monsterImage5 = new Image();
monsterImage5.onload = function () {
	monsterReady5 = true;
};

// Monster image
var monsterReady6 = false;
var monsterImage6 = new Image();
monsterImage6.onload = function () {
	monsterReady6 = true;
};

// Monster image
var monsterReady7 = false;
var monsterImage7 = new Image();
monsterImage7.onload = function () {
	monsterReady7 = true;
};

// Monster image
var monsterReady8 = false;
var monsterImage8 = new Image();
monsterImage8.onload = function () {
	monsterReady8 = true;
};

// Monster image
var monsterReady9 = false;
var monsterImage9 = new Image();
monsterImage9.onload = function () {
	monsterReady9 = true;
};

// Monster image
var monsterReady10 = false;
var monsterImage10 = new Image();
monsterImage10.onload = function () {
	monsterReady10 = true;
};

//monsterImage.src = "ressources/AmbuSmall.png";
monsterImage1.src = "ressources/combi3D.png";
monsterImage2.src = "ressources/combi3D.png";

monsterImage3.src = "ressources/combi3D.png";
monsterImage4.src = "ressources/combi3D.png";
monsterImage5.src = "ressources/combi3D.png";
monsterImage6.src = "ressources/combi3D.png";
monsterImage7.src = "ressources/combi3D.png";
monsterImage8.src = "ressources/combi3D.png";
monsterImage9.src = "ressources/combi3D.png";
monsterImage10.src = "ressources/combi3D.png";

// Game objects
//Valeur des persos à modifier.

var hero = {
    x: 0,
	y: 0,
	speed: 256 // movement in pixels per second
};

function monster(){
	this.speed=100;
	this.x=0;
	this.y=0;
	name=this.name;
}

monster.prototype.marche = function(){
	this.x+=1;
}

var monster1 = new monster();
var monster2 = new monster();
var monster3 = new monster();
var monster4 = new monster();
var monster5 = new monster();
var monster6 = new monster();
var monster7 = new monster();
var monster8 = new monster();
var monster9 = new monster();
var monster10 = new monster();


var monsters = [monster1,monster2,monster3,monster4,monster5,monster6,monster7,monster8,monster9,monster10];

/*

var monster2 = {
	x: 0,
	y: 0,
    speed: 100
  
};*/

//A encore un role celui de la vie de notre hero
//transformer en compteur de vie.

var monstersCaught = 3;

// Handle keyboard controls
var keysDown = {};

addEventListener("keyup",function (e){
                 
    onkeyup = true;
    
    let direction = e.keyCode;
    
    if(direction==38 && hero.y > 25){ // Player holding up
        hero.y -=70; 
    }
    
    if(direction==40 && hero.y < 750){ // Player holding down
        hero.y +=70; 
    }
    
    if(direction==37 && hero.x > 0){ // Player holding left
        hero.x -=32; 
    }
    
    if(direction==39 && hero.x < 670){ // Player holding right
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

   /* 
    monster1.x += 1; //Vitesse du png
    console.log("test");
    monster2.x += 1;*/
	monster1.marche();
	monster2.marche();
	monster3.marche();
	monster4.marche();
	monster5.marche();
	monster6.marche();
	monster7.marche();
	monster8.marche();
	monster9.marche();
	monster10.marche();
	/* CETTE BOUCLE NE FONCTIONNE PAS POURQUOI  (Quentin)
	for(let i;i<monsters.length;i++){
		monsters[i].marche();
		console.log("test");
	}
	*/
    
};

// Reset the game when the player catches a monster
var reset = function () {
    
    //Position de depart du hero
	hero.x = 350;
    hero.y = 765;

	// Throw the monster somewhere on the screen randomly
	//monster.x = 32 + (Math.random() * (canvas.width - 125)); //125 = à l'avant du véhicule ou du monstre
	//monster.y = 32 + (Math.random() * (canvas.height - 125));// On definit la zone d'apparition pour qu'il ne sorte pas du jeu
    
    monster1.x = 0;
    //monster.y = Math.random() *(5 - 800)+800;
    monster1.y = 31;
    
    monster2.x = 0;
    monster2.y = 101;
    
   monster3.x = 0;
    monster3.y = 171;
    
    monster4.x = 0;
    monster4.y = 241;
    
    monster5.x = 0;
    monster5.y = 311;
    
    monster6.x = 0;
    monster6.y = 381;
    
    monster7.x = 0;
    monster7.y = 451;
    
    monster8.x = 0;
    monster8.y = 521;
    
    monster9.x = 0;
    monster9.y = 591;
    
    monster10.x = 0;
    monster10.y = 661;
    
    monsterAction();
};



var gameOver = function(){
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.drawImage(bgImageMainEnd,0,0);
    ctx.drawImage(gaov,200,150);
    
    ctx.fillText("Game Over");
    
    
}




// Update game objects
//Controle pour que le joueur ne sorte pas du jeu

var update = function (modifier) {
    
 
	// Are they touching? //32
    // A definir pour chaque monstre !! 
    // Faire des classes de monstres par taille. 
    
	if (
		hero.x <= (monster1.x + 110)//Avant du monstre
        && monster1.x <= (hero.x + 32)//Arrière gauche du monstre
		&& hero.y <= (monster1.y + 40)//Dessous
		&& monster1.y <= (hero.y + 25)//Dessus
	) {
		--monstersCaught;
        
        if(monstersCaught<1){
            
            gameOver();
            
        }
        else{
            reset();
        }
		
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

	if (monsterReady1) {
		ctx.drawImage(monsterImage1, monster1.x, monster1.y);
	}
    
    if (monsterReady2) {
		ctx.drawImage(monsterImage2, monster2.x, monster2.y);
	}
    
    if (monsterReady3) {
		ctx.drawImage(monsterImage3, monster3.x, monster3.y);
	}
    
    if (monsterReady4) {
		ctx.drawImage(monsterImage4, monster4.x, monster4.y);
	}
    
    if (monsterReady5) {
		ctx.drawImage(monsterImage5, monster5.x, monster5.y);
	}
    
    if (monsterReady6) {
		ctx.drawImage(monsterImage6, monster6.x, monster6.y);
	}
    
    if (monsterReady7) {
		ctx.drawImage(monsterImage7, monster7.x, monster7.y);
	}
    
    if (monsterReady8) {
		ctx.drawImage(monsterImage8, monster8.x, monster8.y);
	}
    
    if (monsterReady9) {
		ctx.drawImage(monsterImage9, monster9.x, monster9.y);
	}
    
    if (monsterReady10) {
		ctx.drawImage(monsterImage10, monster10.x, monster10.y);
	}
    

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Vie(s): " + monstersCaught, 32, 32);
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