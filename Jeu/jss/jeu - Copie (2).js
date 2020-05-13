/***************************************************************************
						Declaration des variables
***************************************************************************/

//jeu en cours

var gameInProgress = true;

const widthSize=700;
// Creer le canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = widthSize;
canvas.height = 726;
canvas.id="second";
var palmares = [];

document.getElementById("canvas-wrap").appendChild(canvas);


//données du jeu
monstersCaught =3;
winScore = 0;

//musique
var ambiance = new Audio("../Jeu/ressources/sound/doom.mp3");
var dead = new Audio("../Jeu/ressources/sound/argh.wav");

//heros
var hero = {
    x: 0,
	y: 0,
	speed: 256, // movement in pixels per second
	width:42,
	height:66,
	heroReady : false,
	heroImage : new Image()
};
hero.heroImage.onload = function(){
	hero.heroReady = true;
	//window.requestAnimationFrame(gameLoop);
}

//joueur
var player = "";


//geolocalisation du joueur
	var geoUser = "";
	getLocation();
	
	geoUser = localStorage.getItem("geoUserMemo");
	geoUser = geoUser.substring(1, geoUser.length); //Delete first character
	geoUser = geoUser.slice(0, -1); //Delete last character


/***************************************************************************
					initialisation des monstres
***************************************************************************/

//Ensemble des lignes de monstres

var theHorde = {
	linesOfMonsters : [], //tableau de lineOfMonsters
	
	addLine : function(l){
		this.linesOfMonsters.push(l);
	}
};

//ligne de monstres
var lineOfMonsters = function(y, speed){
	this.y = y; //position verticale de la ligne
	this.active = true; //définit si les monstres sont actifs sur cette ligne
	this.monsters = [];
	this.speed=speed;
	
	this.addMonster = function(m){
		this.monsters.push(m);
	}
	
	this.walk = function(){
		for (const m of this.monsters){
			m.walk(this.speed);
		}
	}
};

//monstre
var monster = function(x, y, catalogImage){
	this.x=x;
	this.y=y;
	
	this.monsterImage = catalogImage.image;
	this.width=catalogImage.width;
	this.height=catalogImage.height;
      
    this.walk = function(speed){
		this.x+=speed;
	}
	
	
};

/***************************************************************************
					initialisation des murs
***************************************************************************/

//Ensemble des lignes de monstres

var theWalls = {
	linesOfWalls : [], //tableau de lineOfMonsters
	
	addLine : function(l){
		this.linesOfWalls.push(l);
	}
};

//ligne de murs
var linesOfWalls = function(y, speed){
	this.y = y; //position verticale de la ligne
	this.active = true; //définit si les monstres sont actifs sur cette ligne
	this.walls = [];
	this.speed=speed;
	
	this.addWalls = function(m){
		this.walls.push(m);
	}
};

//mur
var wall = function(x, y, catalogImage){
	this.x=x;
	this.y=y;
	
	this.wallImage = catalogImage.image;
	this.width=catalogImage.width;
	this.height=catalogImage.height;
};

/***************************************************************************
					initialisation des timer
***************************************************************************/

//timer initial (a modifier si besoin)
var initialMinute = 1;
var initialSeconds = 0;

//timer pendant le jeu
var minute = 0;
var seconds = 0;
setTimer = null;

//timer de score
var scoreMinute = 0;
var scoreSeconds = 0;

//lancement du Timer
var runningTimer = function(){
	seconds--;
	if(seconds==-1){
		seconds=59;
		minute--;
	}
}

//arret du Timer + score
var stopTimer = function(){
	
	var finalMinute = this.minute;
    var finalseconds = this.seconds;
    
	clearInterval(setTimer);
    
    if(initialSeconds===0){
        scoreMinute += initialMinute-1-finalMinute;
        scoreSeconds += 60-finalseconds;
	}else{
        scoreMinute+=initialMinute-finalMinute;
        scoreSeconds+=initialSeconds-finalseconds;
    }
	
	if(scoreSeconds>=60){
		scoreSeconds -=60;
		scoreMinute+=1;
	}
}

/***************************************************************************
				initialisation des points principaux
***************************************************************************/
//position d'arrivee;
var finishX=0;
var finishY=0;

//positions y disponibles
const h = 66;
var position = [h,h*2,h*3,h*4,h*5,h*6,h*7,h*8,h*9,h*10];
/*
for(let i=0;i<10;i--){
	position[i]=h*i
}*/
/***************************************************************************
				initialisation du catalogue d'image
***************************************************************************/

var image = function(source, width, height){
	this.source = source;
	this.height = height;
	this.width = width;	
	
	this.image = null;
	this.isReady = false;
}

//images disponibles
var catalog = [];
catalog[0] =new image("ressources/images/combi3D.png",111,66);
catalog[1] =new image("ressources/images/combi2D.png",72,66);
catalog[2] =new image("ressources/images/combi1D.png",35,66);
catalog[3] =new image("ressources/images/feb3D.png",84,66);
catalog[4] =new image("ressources/images/feb2D.png",54,66);
catalog[5] =new image("ressources/images/feb1D.png",25,66);
catalog[6] =new image("ressources/images/fe3D.png",51,66);
catalog[7] =new image("ressources/images/ho4D.png",73,66);
catalog[8] =new image("ressources/images/ho3D.png",53,66);
catalog[9] =new image("ressources/images/ho2D.png",34,66);
catalog[10] =new image("ressources/images/ho1D.png",15,66);
catalog[11] =new image("ressources/images/vie3D.png",91,66);
catalog[12] =new image("ressources/images/vie2D.png",58,66);
catalog[13] =new image("ressources/images/vie1D.png",26,66);
catalog[14] =new image("ressources/images/pou3D.png",190,66);
catalog[15] =new image("ressources/images/pou2D.png",124,66);
catalog[16] =new image("ressources/images/pou1D.png",59,66);

for(let c of catalog){
	c.image = new Image();
	c.image.src = c.source;
	
	c.image.onload = function(){
		c.isReady = true;
	};
}

/***************************************************************************
				initialisation du catalogue d'image Murs
***************************************************************************/


//images disponibles
var catalogWalls = [new image("ressources/images/150.png",150,66)];
for(let c of catalogWalls){
	c.image = new Image();
	c.image.src = c.source;
	
	c.image.onload = function(){
		c.isReady = true;
	};
}

/***************

test
*************/

// const SCALE = 1;
// const WIDTH = 42;
// const HEIGHT = 66;
// const SCALED_WIDTH = SCALE * WIDTH;
// const SCALED_HEIGHT = SCALE * HEIGHT;
// const CYCLE_LOOP = [0, 1, 0, 2];
// const FACING_DOWN = 0;
// const FACING_UP = 1;
// const FACING_LEFT = 2;
// const FACING_RIGHT = 3;
// const FRAME_LIMIT = 12;
// const MOVEMENT_SPEED = 1;

// let canvas = document.querySelector('canvas');
// let ctx = canvas.getContext('2d');
// let keyPresses = {};
// let currentDirection = FACING_DOWN;
// let currentLoopIndex = 0;
// let frameCount = 0;
// let positionX = 0;
// let positionY = 0;
// let img = new Image();

// window.addEventListener('keydown', keyDownListener);
// function keyDownListener(event) {
    // keyPresses[event.key] = true;
// }

// window.addEventListener('keyup', keyUpListener);
// function keyUpListener(event) {
    // keyPresses[event.key] = false;
// }

// function loadImage() {
  // img.src = 'https://opengameart.org/sites/default/files/Green-Cap-Character-16x18.png';
 
  // hero.heroImage.onload = function() {
    // window.requestAnimationFrame(gameLoop);
  // };
// }

// function drawFrame(frameX, frameY, canvasX, canvasY) {
  // ctx.drawImage(hero.heroImage,
                // frameX * WIDTH, frameY * HEIGHT, WIDTH, HEIGHT,
                // canvasX, canvasY, SCALED_WIDTH, SCALED_HEIGHT);
// }



// function gameLoop() {
  // ctx.clearRect(0, 0, canvas.width, canvas.height);

  // let hasMoved = false;

  // if (keyPresses.w) {
    // moveCharacter(0, -MOVEMENT_SPEED, FACING_UP);
    // hasMoved = true;
  // } else if (keyPresses.s) {
    // moveCharacter(0, MOVEMENT_SPEED, FACING_DOWN);
    // hasMoved = true;
  // }

  // if (keyPresses.a) {
    // moveCharacter(-MOVEMENT_SPEED, 0, FACING_LEFT);
    // hasMoved = true;
  // } else if (keyPresses.d) {
    // moveCharacter(MOVEMENT_SPEED, 0, FACING_RIGHT);
    // hasMoved = true;
  // }

  // if (hasMoved) {
    // frameCount++;
    // if (frameCount >= FRAME_LIMIT) {
      // frameCount = 0;
      // currentLoopIndex++;
      // if (currentLoopIndex >= CYCLE_LOOP.length) {
        // currentLoopIndex = 0;
      // }
    // }
  // }

  // if (!hasMoved) {
    // currentLoopIndex = 0;
  // }

  // drawFrame(CYCLE_LOOP[currentLoopIndex], currentDirection, positionX, positionY);
  // window.requestAnimationFrame(gameLoop);
// }

// function moveCharacter(deltaX, deltaY, direction) {
  // if (positionX + deltaX > 0 && positionX + SCALED_WIDTH + deltaX < canvas.width) {
    // positionX += deltaX;
  // }
  // if (positionY + deltaY > 0 && positionY + SCALED_HEIGHT + deltaY < canvas.height) {
    // positionY += deltaY;
  // }
  // currentDirection = direction;
// }

/***************************************************************************
				initialisation du catalogue d'image
***************************************************************************/
addEventListener("keyup",function (e){
                 
   onkeyup = true;
    
    let direction = e.keyCode;
   
    if(direction==38 && hero.y > 0){ // monter
			 console.log(hero.y);
		hero.y -=66;
		if(!checkStopWall()){
			hero.y +=66;
		}
    }
    
    if(direction==40 && hero.y < 626){  // descendre
		hero.y +=66;
		if(!checkStopWall()){
			 hero.y -=66; 
		}
    }
    
    if(direction==37 && hero.x > 0){ // Player holding left
         
		hero.x -=42;
		if(!checkStopWall()){
			 hero.x +=42; 
		}
    }
    
    if(direction==39 && hero.x < 640){ // Player holding right
        
		hero.x +=42; 
		if(!checkStopWall()){
			 hero.x -=42; 
		}
    }
	
	
	// /****************************************
		// Evennement bloquant walls
	
	// *****************************************/
	
	
	
	
},false);

    

addEventListener("keydown", function (e) {
	onkeydown = true;
    
}, false);


/***************************************************************************
					initialisation des backgrounds
***************************************************************************/

// Background image START
var bgReady = false;
var bgImageMain = new Image();
bgImageMain.onload = function () {
	bgReady = true;
};
bgImageMain.src = "ressources/images/TextureSolB2.jpg";

	
// Background image GAME OVER
var bgReadyEnd = false;
var bgImageMainEnd = new Image();
bgImageMainEnd.onload = function () {
	bgReadyEnd = true;
};
bgImageMainEnd.src = "ressources/images/TextureSolBEnd.jpg";


// Background image GAME OVER 2
var gaovReady = false;
var gaov = new Image();
gaov.onload = function () {
	gaovReady = true;
};
gaov.src = "ressources/images/gaov.png";


/***************************************************************************
						validation du lancement
***************************************************************************/

var checkBeforeStart = function () {
    player = document.getElementById("player").value;
   
    var droptest = document.getElementById("imgPlayer").src;
   
    console.log(player);
    if(player =="" || droptest.includes("ressources/Personnages/dropzone.png")){
        alert("Veuillez entrer un pseudo et choisir un joueur");
    }else{
        launchGame();
    }
}

var launchGame = function () {
    document.getElementById("cadreChoixPersonnage").style.display = "none";
	document.getElementById("headerGame").style.display = "none";
	
	init();
	
	var DropHero = document.getElementById("imgPlayer").name;
	// Hero image
	const url = "ressources/Personnages/";
	switch(DropHero){
            case("imgPlayer1"):
               	hero.heroImage.src=url + "personnage1.png";
                break;
            case("imgPlayer2"):
                hero.heroImage.src=url + "hero02.png";
                break;
            case("imgPlayer3"):
                hero.heroImage.src=url + "hero03.png";
                break;
            case("imgPlayer4"):
                hero.heroImage.src=url + "hero04.png";
                break;
			
    }
    //ambiance.play();
	
	//creation du palmares si besoin
	if (localStorage.getItem("palmares") === null) {
        localStorage.setItem("palmares", JSON.stringify(palmares));
    }
}

/***************************************************************************
						Initialisation du jeu
***************************************************************************/

var myRandom = function(newLineOfMonsters, myCatlog){
	var position = false;
	var x;
	while(!position){
		position = true;
		x = (Math.random()*500) + 112;
		for(let monster of newLineOfMonsters.monsters){
			if(x< monster.x+monster.width && x + myCatlog.width > monster.x){
				position=false;
			}
		}
	}
	return x;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

var init = function(){
	 //reset du timer
    minute=initialMinute;
    seconds =initialSeconds;
    setTimer = setInterval(runningTimer, 1000);
      
    //Position de depart du hero
	hero.x = (widthSize/2)-(42/2);
    hero.y = 660;
	
	//position d'arrivée
	arriveeX = 350;
	arriveeY = 0;


	theHorde.linesOfMonsters.splice(0, theHorde.linesOfMonsters.length);
	
	theWalls.linesOfWalls.splice(0, theWalls.linesOfWalls.length);

	var linWalls = [false, true, false, true,false, false, false, true,true,false];
	
	var myRandomWalls = function(){
		var x = getRandomInt(700);
		
		while(!((x%42)==0)){
			console.log(x);
			x = getRandomInt(700);
		}
		return x;
	}
	
	
   for(var i=0;i<9;i++){

		if(linWalls[i]===false){	
			let newLineOfMonsters = new lineOfMonsters(position[i], 1);
			
			//let myCatlog = catalog[Math.random()*(catalog.length)];
			let myCatlog = catalog[getRandomInt(8)];
		
			let newMonster = new monster(myRandomWalls(), newLineOfMonsters.y, myCatlog);
			newLineOfMonsters.addMonster(newMonster);
			
			let newMonster2 = new monster(myRandomWalls(), newLineOfMonsters.y, myCatlog);
			newLineOfMonsters.addMonster(newMonster2);
			
			theHorde.addLine(newLineOfMonsters);
			
		}else{
			let newLineOfWalls = new linesOfWalls(position[i], 1);
			
			//let myCatlog = catalog[Math.random()*(catalog.length)];
			let myCatlog = catalogWalls[0];
			
			let newWall = new wall(Math.floor(Math.random()*600), newLineOfWalls.y, myCatlog);
			newLineOfWalls.addWalls(newWall);
			
			let newWall2 = new wall(Math.floor(Math.random()*600), newLineOfWalls.y, myCatlog);
			newLineOfWalls.addWalls(newWall2);
			
			
			theWalls.addLine(newLineOfWalls);
		}
		
    } 
	
	
	myReq = requestAnimationFrame(main);
    
}


/***************************************************************************
						Fonction principale
***************************************************************************/


var main = function(){
	
	if(resolve()){
		
		render();
		
		if(gameInProgress){
		myReq = requestAnimationFrame(main);
		}
		
	}
	else{
		myReq = w.cancelAnimationFrame(main);
		
		if(!gameInProgress){
			gameOver();
		}
		return;
		
	}
	
}

/***************************************************************************
							Resolution
***************************************************************************/

resolve = function(){
	
	this.resolveCondition = true;
	
	checkColision();
	
	//tests si gagné ou perdu
	if(monstersCaught===0){
        endGame(1);
        return false;
    }
	if(winScore===3){
		winScore++;
		endGame(0);
		return false;
		}
	
	
	
	
	//avance les monstres
	
	for (var i = 0; i<theHorde.linesOfMonsters.length; i++){
		var actualLineOfMonsters = theHorde.linesOfMonsters[i];
		actualLineOfMonsters.walk();
		
	} 
	
	checkTimer();
	checkFinishLine();
	
	return resolveCondition;
}

var checkTimer = function(){
	if(minute ==0 && seconds==0 ){
		resolveCondition = false;
        --monstersCaught;
        clearInterval(setTimer);
		init();
		return;
    }
}


//collision avec les murs
var checkStopWall = function(){
	for(let lineW of theWalls.linesOfWalls){
		for(let wall of lineW.walls){
			if(touchWall(wall, hero)){	
				return false;
			}
		}
	}
	return true;
}

//collision avec les monstres
var checkColision = function(){
	
	for(let line of theHorde.linesOfMonsters){
		for(let monster of line.monsters){
			if(touchDown(monster, hero)){
				resolveCondition = false;
				dead.play();
				monstersCaught--;
				clearInterval(setTimer);
				init();
				return;
			}
		}
	}

for(let lineNew of theHorde.linesOfMonsters){
        for(let i = 0; i< lineNew.monsters.length; i++){
			if(lineNew.monsters[i].x>650){
				lineNew.monsters.splice(i,1);
				
				let newMonster = new monster(0, lineNew.y, catalog[getRandomInt(8)]);
				lineNew.addMonster(newMonster);
			}
            
        }
    }
}



var touchDown = function(horribleMonster, hero){
		
		if(horribleMonster.x >= hero.x + hero.width || horribleMonster.x + horribleMonster.width <= hero.x || horribleMonster.y <= hero.y - hero.height  || horribleMonster.y - horribleMonster.height >= hero.y){
			return false;
		}
		return true;
	}

var touchWall = function(bigWall, hero){	
	if(bigWall.x >= hero.x + hero.width || bigWall.x + bigWall.width <= hero.x || bigWall.y <= hero.y - hero.height  || bigWall.y - bigWall.height >= hero.y){
		return false;
	}
	return true;
}

var checkFinishLine = function(){
		
    if (passFinishLine(hero)){
        stopTimer();
		winScore++;
		resolveCondition = false;
		init();
		return;
    }
    
}

var passFinishLine = function(hero){
		
		if(arriveeX >= hero.x + hero.width || arriveeX + hero.width <= hero.x || arriveeY <= hero.y - hero.height  || arriveeY - hero.height >= hero.y){
			return false;
		}
		return true;
	};


var gameOver = function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.drawImage(bgImageMainEnd,0,0);
    ctx.drawImage(gaov,200,150);
	
    return; 
}

var win = function(){
	gameOver();
	updateScore(player, scoreMinute, scoreSeconds);
	return;
}

var endGame = function(i){
	if(i===0){
		win();
	}
	displayRanking();
	clearInterval(setTimer);
	gameInProgress = false;
	return;
}

/***************************************************************************
							Rendu
***************************************************************************/
var catalogIsReallyReady = function(){
	let ready = false;
	for(let i=0;i<=catalog.length;i++){
		if(catalog[i].isReady){
			ready=true;
		}
	}
	return ready;
}

var render= function(){
	
	if (bgReady) {
    //Image de fond
        ctx.drawImage(bgImageMain,0,0);        
	}

	
	 if (hero.heroReady) {
		ctx.drawImage(hero.heroImage, hero.x, hero.y);
		// window.requestAnimationFrame(gameLoop);
	 }

    if(catalogIsReallyReady){
		for (let i = 0; i<theHorde.linesOfMonsters.length; i++){
			var actualLineOfMonsters = theHorde.linesOfMonsters[i];
			
			for (let j = 0; j<actualLineOfMonsters.monsters.length; j++){
				let actualMonster = actualLineOfMonsters.monsters[j];
				
				ctx.drawImage(actualMonster.monsterImage, actualMonster.x, actualLineOfMonsters.y);
				
			}      
		}  
	}
	
	if(catalogWalls[0].isReady){
		for (let i = 0; i<theWalls.linesOfWalls.length; i++){
			var actualLineOfWalls = theWalls.linesOfWalls[i];
			
			for (let j = 0; j<actualLineOfWalls.walls.length; j++){
				let actualWall = actualLineOfWalls.walls[j];
				ctx.drawImage(actualWall.wallImage, actualWall.x, actualLineOfWalls.y);
				
			}      
		}  
	}
	
	
	
	
	
    

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Vie(s): " + monstersCaught, 32, 10);
    if(seconds<10){
        ctx.fillText("Time : 0" + minute +":0" + seconds, 550, 10);
    }
    else {ctx.fillText("Time : 0" + minute +":" + seconds, 550, 10);}
    
}



/***************************************************************************
					Declaration multi-browser
***************************************************************************/
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
