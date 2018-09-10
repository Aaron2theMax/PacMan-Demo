function PacMan(){
  this.color = 'yellow';
  //this.x = canvas.width / 2;
  //this.y = canvas.height / 2;
  this.x = this.y = 125;
  this.speed = canvas.width/136.4;
  this.r = canvas.width / 13.2;;
  this.direction = d.uc.right;
  this.lastDirection = this.direction;
  this.mouth_size = 1;
  this.mouth_size_dx = 0.15;
  this.eyeX = d.uc.up;
  this.eyeY = d.uc.up;
  this.vertical_only = false;

  this.update = function(){
    this.r = canvas.width / 13.2;
    this.speed = canvas.width/136.4;
    this.draw();
  }

  this.reposition = function(x, y){
    this.x = x;
    this.y = y;
    console.log("PacMan - x: " + this.x + ", y: " + this.y);
  }

  this.draw = function(){  
    // Draw body
    c.beginPath();
    c.lineTo(this.x, this.y);
    c.arc(
      this.x,
      this.y,
      this.r,
      Math.PI * this.direction + (0.85 * this.mouth_size),
      Math.PI * this.direction - (0.85 * this.mouth_size),
      false
    );
    c.lineTo(this.x, this.y);
    this.strokeAndFill('black', 'yellow');
    c.closePath();

    // EYE
    c.beginPath();
    c.arc(
      this.x + (this.r * .5) * Math.cos(Math.PI * this.eyeX),
      this.y + (this.r * .5) * Math.sin(Math.PI * this.eyeY),
      this.r / 8,
      0,
      Math.PI * 2,
      false
    );
    this.strokeAndFill('black', 'black');
    c.closePath();
  }

  this.strokeAndFill = function(strokeStyle, fillStyle){
    c.lineWidth = 5;
    c.strokeStyle = strokeStyle;
    c.fillStyle = fillStyle;
    c.stroke();
    c.fill();
  }
  this.updateMouth = function(direction){
    this.direction = direction;
    this.mouth_size += this.mouth_size_dx;

    if (this.mouth_size > 1 || this.mouth_size < 0)
      this.mouth_size_dx = -this.mouth_size_dx;
    if (this.mouth_size > 1)
      this.mouth_size = 1;
    if (this.mouth_size <= 0)
      this.mouth_size = this.mouth_size_dx;
  }

  this.moveUp = function(){
    // MOVEMENT
    this.y += -this.speed;
  }
  this.animateUp = function(){
    // MOUTH
    this.updateMouth(d.uc.up);

    // EYE
    if(this.lastDirection == d.uc.left && !this.vertical_only){
      this.eyeX = d.uc.right;
      this.vertical_only = true;
    }else if(this.lastDirection == d.uc.right && !this.vertical_only){
      this.eyeX = d.uc.left;
      this.vertical_only = true;
    }
    this.eyeY = d.uc.left;
  }

  this.moveDown = function(){
    // Update movement
    this.y += this.speed;
  }
  this.animateDown = function(){
    // Update mouth
    this.updateMouth(d.uc.down);
    
    // Update eye 
    if(this.lastDirection == d.uc.left && !this.vertical_only){
      this.eyeX = d.uc.left;
      this.vertical_only = true;
    }else if(this.lastDirection == d.uc.right && !this.vertical_only){
      this.eyeX = d.uc.right;
      this.vertical_only = true;
    }
    this.eyeY = d.uc.left;
  }

  this.moveLeft = function(){
    this.x += -this.speed;
  }
  this.animateLeft = function(){
    this.lastDirection = d.uc.left;
    this.eyeX = this.eyeY = d.uc.up;
    this.updateMouth(d.uc.left);

    this.vertical_only = false;
  }
  this.moveRight = function(){
    this.x += this.speed;
  }
  this.animateRight = function(){
    this.lastDirection = d.uc.right;
    this.eyeX = this.eyeY = d.uc.up;
    this.updateMouth(d.uc.right);

    this.vertical_only = false;
  }
}