// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 700;
canvas.height = 800;
canvas.id="second";

document.getElementById("canvas-wrap").appendChild(canvas);

/*Panneau de drag and drop pour débuter le jeu*/
var checkBeforeStart = function () {
    var player = document.getElementById("player").value;
   
    var droptest = document.getElementById("imgPlayer").src;
   
    console.log(player);
    if(player =="" || droptest.includes("dropzone.png")){
        alert("Veuillez entrer un pseudo et choisir un joueur");
    }else{
        launchGame();
    }
}


var minute = 0;
var seconds = 15;
var setTimer = null;

var runningTimer = function(){
        seconds--;
        if(seconds==-1){
            seconds=59;
            minute--;
        }
    if(minute ==0 && seconds==0 ){
        --monstersCaught;
        clearInterval(setTimer);
        if(monstersCaught>0){reset();}
    }
    else{   
        ctx.fillStyle = "rgb(250, 250, 250)";
        ctx.font = "24px Helvetica";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        console.log("Timer : " + minute + ":" + seconds, 150, 32);
    }
}

//New song
var ambiance = new Audio("../Jeu/ressources/sound/doom.mp3");

/*Panneau démarrage jeu */
var launchGame = function () {
    document.getElementById("cadreChoixPersonnage").style.display = "none";
	reset();
	myReq = w.requestAnimationFrame(main);
    
	
	var DropHero = document.getElementById("imgPlayer").name;
	// Hero image
	const url = "ressources/Personnages/";
	switch(DropHero){
            case("imgPlayer1"):
               heroImage.src=url + "hero01.png";
                break;
            case("imgPlayer2"):
                heroImage.src=url + "hero02.png";
                break;
            case("imgPlayer3"):
                heroImage.src=url + "hero03.png";
                break;
            case("imgPlayer4"):
                heroImage.src=url + "hero04.png";
                break;
			default:
				heroImage.src=url + "hero05.png";
    }
    
	//ambiance.play();
	
}
	
// Background image START
var bgReady = false;
var bgImageMain = new Image();
bgImageMain.onload = function () {
	bgReady = true;
};
bgImageMain.src = "ressources/TextureSolB.jpg";

// START HERO
var heroReady = false;
	var heroImage = new Image();
	heroImage.onload = function () {
		heroReady = true;
	};
	
	
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
	speed: 256, // movement in pixels per second
	width:42,
	height:66
};

function monster(w,h){
	this.speed=100;
	this.x=0;
	this.y=0;
	this.width=w;
	this.height=h;
	name=this.name;
}

monster.prototype.marche = function(x){
	this.x+=x;
}


var monster1 = new monster(111,66);
var monster2 = new monster(111,66);
var monster3 = new monster(111,66);
var monster4 = new monster(111,66);
var monster5 = new monster(111,66);
var monster6 = new monster(111,66);
var monster7 = new monster(111,66);
var monster8 = new monster(111,66);
var monster9 = new monster(111,66);
var monster10 = new monster(111,66);


var monsters = [monster1,monster2,monster3,monster4,monster5,monster6,monster7,monster8,monster9,monster10];



//A encore un role celui de la vie de notre hero
//transformer en compteur de vie.

//a modifier
var monstersCaught = 3;

// Handle keyboard controls
//var keysDown = {};

addEventListener("keyup",function (e){
                 
    onkeyup = true;
    
    let direction = e.keyCode;
    
    if(direction==38 && hero.y > -66){ // monter
        hero.y -=66; 
    }
    
    if(direction==40 && hero.y < 800){ // descendre
        hero.y +=66; 
    }
    
    if(direction==37 && hero.x > 41){ // Player holding left
        hero.x -=41; 
    }
    
    if(direction==39 && hero.x < 640){ // Player holding right
        hero.x +=41; 
    }
},false);

    //effet lors du relachement de la touche
    //a supprimer

addEventListener("keydown", function (e) {
	onkeydown = true;
    
}, false);


function monsterAction(){
	monster1.marche(1);
	monster2.marche(2);
	monster3.marche(2);
	monster4.marche(1);
	monster5.marche(3);
	monster6.marche(1);
	monster7.marche(1);
	monster8.marche(1);
	monster9.marche(1);
	monster10.marche(1);   
};

// Reset the game when the player catches a monster
var reset = function () {
    
    //reset du timer
    minute=0;
    seconds =15;
    
    console.log("Timer : " + minute + ":" + seconds, 150, 32);
    ctx.fillText("Timer : " + minute + ":" + seconds,32, 150);
    setTimer = setInterval(runningTimer,1000);
    
    
    //Position de depart du hero
	hero.x = 329;
    hero.y = 726;

	// Throw the monster somewhere on the screen randomly
	//monster.x = 32 + (Math.random() * (canvas.width - 125)); //125 = à l'avant du véhicule ou du monstre
	//monster.y = 32 + (Math.random() * (canvas.height - 125));// On definit la zone d'apparition pour qu'il ne sorte pas du jeu
	
	 monster1.x = 0;
    //monster.y = Math.random() *(5 - 800)+800;
    monster1.y = 66;
    
    monster2.x = 0;
    monster2.y = 132;
    
    monster3.x = 0;
    monster3.y = 198;
    
    monster4.x = 0;
    monster4.y = 264;
    
    monster5.x = 0;
    monster5.y = 330;
    
    monster6.x = 0;
    monster6.y = 396;
    
    monster7.x = 0;
    monster7.y = 462;
    
    monster8.x = 0;
    monster8.y = 528;
    
    monster9.x = 0;
    monster9.y = 594;
    
    monster10.x = 0;
    monster10.y = 660;
};



var gameOver = function(){
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.drawImage(bgImageMainEnd,0,0);
    ctx.drawImage(gaov,200,150);
    
    w.cancelAnimationFrame(myReq);
    return;
    
}

// Update game objects
//Controle pour que le joueur ne sorte pas du jeu

var update = function (modifier) {
	
	var touchDown = function(horribleMonster, hero){
		
		if(horribleMonster.x >= hero.x + hero.width || horribleMonster.x + horribleMonster.width <= hero.x || horribleMonster.y <= hero.y - hero.height  || horribleMonster.y - horribleMonster.height >= hero.y){
			return false;
		}
		return true;
	}
	
	if ((touchDown(monster1,hero))||(touchDown(monster2,hero))||(touchDown(monster3,hero))||(touchDown(monster4,hero))||(touchDown(monster5,hero))||(touchDown(monster6,hero))||(touchDown(monster7,hero))||(touchDown(monster8,hero))||(touchDown(monster9,hero))||(touchDown(monster10,hero))) {
		console.log("attention");
		--monstersCaught;
        clearInterval(setTimer);
        if(monstersCaught>0){reset();}
		
	}else{
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

    if(monstersCaught===0){
        gameOver();
        clearInterval(setTimer);
        return;
    }
    else{
	// Request to do this again ASAP
	myReq = w.requestAnimationFrame(main);
    }
};


var myReq;
// Cross-browser support for requestAnimationFrame
var w = window;
w.requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
w.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;


// Let's play this game!
var then = Date.now();
