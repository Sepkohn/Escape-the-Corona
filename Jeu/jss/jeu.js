// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 700;
canvas.height = 800;
canvas.id="second";

document.getElementById("canvas-wrap").appendChild(canvas);

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
let player = "";

/*Panneau de drag and drop pour débuter le jeu*/
var checkBeforeStart = function () {
    player = document.getElementById("player").value;
   
    var droptest = document.getElementById("imgPlayer").src;
   
    console.log(player);
    if(player =="" || droptest.includes("dropzone.png")){
        alert("Veuillez entrer un pseudo et choisir un joueur");
    }else{
        launchGame();
    }
}

var initialMinute = 2;
var initialSeconds = 0;
var setTimer = null;
var scoreMinute = 0;
var scoreSeconds = 0;
var winScore = 0;

var runningTimer = function(){
        seconds--;
        if(seconds==-1){
            seconds=59;
            minute--;
        }
    if(minute ==0 && seconds==0 ){
        --monstersCaught;
        clearInterval(setTimer);
        if(monstersCaught>0){
            reset();
        }
    }
    
}

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
	console.log("Time left : " + finalMinute+":"+finalseconds)
    console.log("score : " + scoreMinute + ":" + scoreSeconds);   
}

//New song
var ambiance = new Audio("../Jeu/ressources/sound/doom.mp3");


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


// Reset the game when the player catches a monster
var reset = function () {
    
    //reset du timer
    minute=initialMinute;
    seconds =initialSeconds;
    setTimer = setInterval(runningTimer, 1000);
      
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

var win = function(){
	gameOver();
	document.getElementById("third").innerHTML = construcFinalString();
	return;
}

var construcFinalString = function(){
	var stringResult = " Score : " + player + " - ";
	if(scoreMinute<10)
		stringResult+="0";
	stringResult+= scoreMinute + ":";
	if(scoreSeconds<10)
		stringResult+="0";
	stringResult+=scoreSeconds;
	
	return stringResult
};

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
    if (hero.y<=32 &&hero.x <=32){
        stopTimer();
		winScore++;
		if(winScore===3){
			win();
		}
		else{reset();}
        
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
    if(seconds<10){
        ctx.fillText("Time : 0" + minute +":0" + seconds, 550, 32);
    }
    else {ctx.fillText("Time : 0" + minute +":" + seconds, 550, 32);}
    
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
		if(winScore===3){
			win();
			clearInterval();
			return;
			}
		else{
		// Request to do this again ASAP
		myReq = w.requestAnimationFrame(main);
		}
	}
};


var myReq;
// Cross-browser support for requestAnimationFrame
var w = window;
w.requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
w.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;


// Let's play this game!
var then = Date.now();
