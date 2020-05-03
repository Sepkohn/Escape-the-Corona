

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