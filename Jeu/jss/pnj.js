function couloir(i, spanzone, s, nb) {
    this.i = i;
    this.i = i;
    this.i = i;
    this.i = i;
    this.monsters = Array;
    for () {
        
    }
}

function monster(w,h,i, s){
	this.speed=s;
	this.x=0;
	this.y=0;
	this.width=w;
	this.height=h;
	name=this.name;
      
    this.monsterImage = i;
     
}


monster.prototype.marche = function(){
	this.x+=this.speed;
}


var monster1 = new monster(111,66,"ressources/combi3D.png", 10);
var monster2 = new monster(111,66,"ressources/combi2.png");
var monster3 = new monster(111,66,"ressources/combi3D.png");
var monster4 = new monster(111,66,"ressources/combi2.png");
var monster5 = new monster(111,66,"ressources/combi3D.png");
var monster6 = new monster(111,66,"ressources/combi2.png");
var monster7 = new monster(111,66,"ressources/combi3D.png");
var monster8 = new monster(111,66,"ressources/combi3D.png");
var monster9 = new monster(111,66,"ressources/combi3D.png");
var monster10 = new monster(111,66,"ressources/combi3D.png");


var monsters = [monster1,monster2,monster3,monster4,monster5,monster6,monster7,monster8,monster9,monster10];

function monsterAction(){
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
}