/***************************************************************************
						Declaration des variables
***************************************************************************/

//jeu en cours

var gameInProgress = true;

const widthSize=714;
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
					initialisation des niveaux
***************************************************************************/
var actualLevel;;
var maxWidth;

var levels = [];

var image = function(source, width, height){
	this.source = source;
	this.height = height;
	this.width = width;	
	
	this.image = null;
	this.isReady = false;
}

var loadCatalog = function(thisLevel){
	var maxWidth = 0;
	for(let c of thisLevel.catalog){
		c.image = new Image();
		c.image.src = c.source;

		c.image.onload = function(){
			c.isReady = true;
		};
		
	}
	
	thisLevel.bgImageMain.onload = function () {
		thisLevel.bgReady = true;
	};
	
}

var level = function(){
	
	this.catalog = [];
	
	this.bgReady = false;
	this.bgImageMain;	
	this.linWalls;
	
}


/***************************************************************************
					initialisation du niveau 1
***************************************************************************/
var level1 = new level();

	level1.catalog[0] = new image("ressources/images/feb1D.png",25,66);
	level1.catalog[1] = new image("ressources/images/feb2D.png",54,66);
	level1.catalog[2] = new image("ressources/images/feb3D.png",84,66);
	level1.catalog[3] = new image("ressources/images/fe1D.png",12,66);
	level1.catalog[4] = new image("ressources/images/fe2D.png",32,66);
	level1.catalog[5] = new image("ressources/images/fe3D.png",51,66);
	level1.catalog[6] = new image("ressources/images/fe4D.png",70,66);
	level1.catalog[7] = new image("ressources/images/ho1D.png",15,66);
	level1.catalog[8] = new image("ressources/images/ho2D.png",34,66);
	level1.catalog[9] = new image("ressources/images/ho3D.png",53,66);
	level1.catalog[10] = new image("ressources/images/ho4D.png",73,66);


	level1.bgImageMain = new Image();
	level1.bgImageMain.src = "ressources/images/SolNiv1.jpg";
	
	level1.linWalls = [false, true, false, true,false, false, false, true,true,false];


loadCatalog(level1);

	

levels[0] = level1;


/***************************************************************************
					initialisation du niveau 2
***************************************************************************/
var level2 = new level();

	level2.catalog[0] =new image("ressources/images/AmbuSmall.png",120,50);
	level2.catalog[1] =new image("ressources/images/hd1.png",30,46);
	level2.catalog[2] =new image("ressources/images/hd3.png",92,46);
	level2.catalog[3] =new image("ressources/images/ambu1D.png",104,66);
	level2.catalog[4] =new image("ressources/images/ambu2D.png",217,66);
	level2.catalog[5] =new image("ressources/images/av1D.png",38,56);
	level2.catalog[6] =new image("ressources/images/av2D.png",83,56);
	level2.catalog[7] =new image("ressources/images/av3D.png",126,56);

	level2.bgImageMain = new Image();
	level2.bgImageMain.src = "ressources/images/SolNiv2.jpg";
	
	level2.linWalls = [false, false, false, true, false, false, false, false, true, false];


loadCatalog(level2);



levels[1] = level2;


/***************************************************************************
					initialisation du niveau 3
***************************************************************************/
var level3 = new level();


	level3.catalog[0] =new image("ressources/images/vie1D.png",26,66);
	level3.catalog[1] =new image("ressources/images/vie2D.png",58,66);
	level3.catalog[2] =new image("ressources/images/vie3D.png",91,66);
	level3.catalog[3] =new image("ressources/images/combi3D.png",111,66);
	level3.catalog[4] =new image("ressources/images/combi2D.png",72,66);
	level3.catalog[5] =new image("ressources/images/combi1D.png",35,66);
	level3.catalog[6] =new image("ressources/images/pou1D.png",59,66);
	level3.catalog[7] =new image("ressources/images/pou2D.png",124,66);
	level3.catalog[8] =new image("ressources/images/pou3D.png",190,66);

	level3.bgImageMain = new Image();
	level3.bgImageMain.src = "ressources/images/SolNiv3.jpg";
	
	level3.linWalls = [false, false, false, false, false, false, false, false, false, false];


loadCatalog(level3);

	

levels[2] = level3;




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
var position = [0,h,h*2,h*3,h*4,h*5,h*6,h*7,h*8,h*9,h*10];
/*
for(let i=0;i<10;i--){
	position[i]=h*i
}*/
/***************************************************************************
				initialisation du catalogue d'image
***************************************************************************/

//images disponibles => défini selon le noiveau

var catalog;


/***************************************************************************
				initialisation du catalogue d'image Murs
***************************************************************************/


//images disponibles
var catalogWalls = []
catalogWalls[0]= new image("ressources/images/42.png",42,66);
catalogWalls[1]= new image("ressources/images/84.png",84,66);
catalogWalls[2]= new image("ressources/images/126.png",126,66);
catalogWalls[3]= new image("ressources/images/baR01.png",126,66);
catalogWalls[4]= new image("ressources/images/baJ01.png",126,65);
catalogWalls[5]= new image("ressources/images/polF.png",84,59);
catalogWalls[6]= new image("ressources/images/polC.png",126,47);


for(let c of catalogWalls){
	c.image = new Image();
	c.image.src = c.source;
	
	c.image.onload = function(){
		c.isReady = true;
	};
}

var status;
/***************************************************************************
				initialisation du catalogue d'image
***************************************************************************/
addEventListener("keyup",function (e){
                 
   // onkeyup = true;
    
    let direction = e.keyCode;
   
    if(direction==38 && hero.y > 0){ // monter
		hero.y -=66;
		if(!checkStopWall()){
			hero.y +=66;
		}
		status="haut";
    }
    
    if(direction==40 && hero.y < 626){  // descendre
		hero.y +=66;
		if(!checkStopWall()){
			 hero.y -=66; 
		}
		status="bas";
    }
    
    if(direction==37 && hero.x > 0){ // Player holding left
		hero.x -=42;
		if(!checkStopWall()){
			 hero.x +=42; 
		}
		status="gauche";
    }
    
    if(direction==39 && hero.x < 633){ // Player holding right
        
		hero.x +=42; 
		if(!checkStopWall()){
			 hero.x -=42; 
		}
		status="droite";
    }
	
	
	/****************************************
		Evennement bloquant walls
	
	*****************************************/
	
	
	
	
},false);

    //effet lors du relachement de la touche
    //a supprimer

addEventListener("keydown", function (e) {
	onkeydown = true;
    
}, false);


/***************************************************************************
					initialisation des backgrounds
***************************************************************************/

var bgImageMain;

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
	//creation du palmares si besoin
	if (localStorage.getItem("palmares") === null) {
        localStorage.setItem("palmares", JSON.stringify(palmares));
    }
	
	displayRanking();
	
    player = document.getElementById("player").value;
   
    var droptest = document.getElementById("imgPlayer").src;
   
    console.log(player);
    if(player =="" || droptest.includes("ressources/Personnages/dropzone.png")){
        alert("Veuillez entrer un pseudo et choisir un joueur");
    }else{
        launchGame();
		document.getElementById("startBtn").style.visibility ="hidden";
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
               	hero.heroImage.src=url + "sprite1.png";
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
	
	
}

/***************************************************************************
						Initialisation du jeu
***************************************************************************/

var myRandom = function(newLineOfMonsters, myCatlog){
	var position = false;
	var x;
	while(!position){
		position = true;
		x = (Math.random()*(500+maxWidth)) - maxWidth ;
		for(let monster of newLineOfMonsters.monsters){
			if(x< monster.x+maxWidth && x + maxWidth> monster.x){
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
	
	//reset des monstres
	for(var line of theHorde.linesOfMonsters){
		line.monsters.splice(0,line.monsters.length);
	}
	
	theHorde.linesOfMonsters.splice(0, theHorde.linesOfMonsters.length);

	//reset des murs
	for(var line of theWalls.linesOfWalls){
		line.walls.splice(0,line.walls.length);
	}
	
	theWalls.linesOfWalls.splice(0, theWalls.linesOfWalls.length);
	
	if(winScore!=3){
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		actualLevel = levels[winScore];
		
		maxWidth = 0;
		
		for(var c of actualLevel.catalog){
			if(c.image.width>maxWidth){
				maxWidth=c.image.width;
			}
		}

		catalog = actualLevel.catalog;

		bgImageMain = actualLevel.bgImageMain;


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

		var linWalls = actualLevel.linWalls;

		var myRandomWalls = function(){
			var x = getRandomInt(700);

			while(!((x%42)==0)){
				x = getRandomInt(700);
			}
			return x;
		}


	   for(var i=0;i<10;i++){
		   // var linWalls = [true, true, false, true false...]
		   //if lineWalls = false do ...

			if(linWalls[i]===false){	
				let newLineOfMonsters = new lineOfMonsters(position[i], 1);

				//let myCatlog = catalog[Math.random()*(catalog.length)];
				let myCatlog = catalog[getRandomInt(catalog.length)];

				let newMonster = new monster(myRandom(newLineOfMonsters, myCatlog), newLineOfMonsters.y, myCatlog);
				newLineOfMonsters.addMonster(newMonster);

				let newMonster2 = new monster(myRandom(newLineOfMonsters, myCatlog), newLineOfMonsters.y, myCatlog);
				newLineOfMonsters.addMonster(newMonster2);
				
				theHorde.addLine(newLineOfMonsters);

			}else{
				let newLineOfWalls = new linesOfWalls(position[i], 1);

				//let myCatlog = catalog[Math.random()*(catalog.length)];
				let myCatlog = catalogWalls[getRandomInt(4)];

				let newWall = new wall(myRandomWalls(), newLineOfWalls.y, myCatlog);
				console.log(newWall.x);
				newLineOfWalls.addWalls(newWall);

				let newWall2 = new wall(myRandomWalls(), newLineOfWalls.y, myCatlog);
				newLineOfWalls.addWalls(newWall2);


				theWalls.addLine(newLineOfWalls);
			}

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
				dead.play();
				resolveCondition = false;
				monstersCaught--;
				stopTimer;
				init();
				return;
			}
		}
	}

for(let lineNew of theHorde.linesOfMonsters){
        for(let i = 0; i< lineNew.monsters.length; i++){
			if(lineNew.monsters[i].x>714){
				lineNew.monsters.splice(i,1);
				//faire une condition qui reprend la position du dernier monstre de la ligne en cours, si delta + grand que x position, créer nouveau monstre
				console.log("max width : " + maxWidth);
				let newMonster = new monster(0-maxWidth, lineNew.y, catalog[getRandomInt(catalog.length)]);
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
	document.getElementById("headerGame").style.display = "block";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.drawImage(bgImageMainEnd,0,0,714,726);
    ctx.drawImage(gaov,200,150);
	
	var button = document.getElementById("restartBtn");
	button.style.visibility = "visible"
	//button.value = "Restart";
	
    return; 
}

var restart = function(){
	window.location.reload()
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
	let ready = true;
	for(let i=0;i<=catalog.length;i++){
		if(!catalog[i].isReady){
			ready=false;
		}
	}
	return ready;
}

var catalogWallsIsReallyReady = function(){
	let ready = true;
	for(let i=0;i<=catalogWalls.length;i++){
		if(!catalogWalls[i].isReady){
			ready=false;
		}
	}
	return ready;
}

var render= function(){
	
	if (levels[winScore].bgReady) {
    //Image de fond

		ctx.drawImage(levels[winScore].bgImageMain,0,0);    
	
	}

	if (hero.heroReady) {
		    
	switch(status){
		
		case "haut":
		ctx.drawImage(hero.heroImage,0,66,42,66,hero.x, hero.y,42,66);
					break;
		case "bas":
		ctx.drawImage(hero.heroImage,0,0,42,66,hero.x, hero.y,42,66);
					break;
		case "gauche":
		ctx.drawImage(hero.heroImage,0,132,30,66,hero.x, hero.y,42,66);     
					break;
		case "droite":
		ctx.drawImage(hero.heroImage,0,198,30,66,hero.x, hero.y,41,66);      
					break;				
        default:
		ctx.drawImage(hero.heroImage,0,66,42,66,hero.x, hero.y,42,66);
		}
		
		//ctx.drawImage(hero.heroImage, hero.x, hero.y, hero.width, hero.height);
	}

    if(catalogIsReallyReady){
		for (let i = 0; i<theHorde.linesOfMonsters.length; i++){
			var actualLineOfMonsters = theHorde.linesOfMonsters[i];
			
			for (let j = 0; j<actualLineOfMonsters.monsters.length; j++){
				let actualMonster = actualLineOfMonsters.monsters[j];
				
				ctx.drawImage(actualMonster.monsterImage, actualMonster.x, actualLineOfMonsters.y,actualMonster.width,actualMonster.height);
				
			}      
		}  
	}
	
	if(catalogWallsIsReallyReady){
		for (let i = 0; i<theWalls.linesOfWalls.length; i++){
			var actualLineOfWalls = theWalls.linesOfWalls[i];
			
			for (let j = 0; j<actualLineOfWalls.walls.length; j++){
				let actualWall = actualLineOfWalls.walls[j];
				ctx.drawImage(actualWall.wallImage, actualWall.x, actualLineOfWalls.y,actualWall.width,actualWall.height);
				
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
