function monster(w,h,i){
	this.speed=100;
	this.x=0;
	this.y=0;
	this.width=w;
	this.height=h;
	name=this.name;
      
    this.monsterImage = i;
     
}


monster.prototype.marche = function(x){
	this.x+=x;
}


var monster1 = new monster(111,66,"ressources/combi3D.png");
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
}