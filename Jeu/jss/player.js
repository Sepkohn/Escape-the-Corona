// the Player class
Player = function(startX, startY, speed) {
    //this.speed = speed;
    this.speed = 50;
    this.startX = startX;
    this.startY = startY;
    this.x = startX;
    this.y = startY;
    this.lives = 3;
    this.sprite = 'ressources/hero.png';
};

Player.prototype.reset = function() {
    this.x = this.startX;
    this.y = this.startY;
};

Player.prototype.update = function(){
    if (this.y === 0)
        game.win();
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};




Player.prototype.handleInput = function(direction) {

    switch(direction) {
        case "up":
            if (this.y > 0)
                this.y -= this.speed;
            break;
        case "down":
            if (this.y < game.boardBottom)
                this.y += this.speed;
            break;
        case "right":
            if (this.x < game.boardSide)
                this.x += this.speed;
            break;
        case "left":
            if (this.x > 0)
              this.x -= this.speed;
            break;
    }
};
