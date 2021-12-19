let img; // Declare variable 'img'.
let faces =[]
// colour of background and canvas
let backgroundColour = 200

//emitter
let emitter;
let texture;
let ring;


function setup() {
  createCanvas(windowWidth, windowHeight);
  img = loadImage('assets/mug.gif'); // Load the image
  texture = loadImage('assets/texture.png');
  ring = loadImage('assets/ring.gif'); // Load the image
  imageMode(CENTER);
  faces.push(new Face(width/2, height/2))
  emitter = new Emitter(width/2, height/2);
  noCursor();

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(backgroundColour)
  // clear();

  // blendMode(ADD);
  faces.forEach(face => {
    face.draw()
  })
  // Displays the image at point (0, height/2) at half size
  image(img, width/2, height/1.5, img.width / 6, img.height / 6);  

  let force = createVector(0, -0.1);
  emitter.applyForce(force);

  let dir = map(mouseX, 0, width, -0.5, 0.5);
  let wind = createVector(dir, 0);
  emitter.applyForce(wind);

  emitter.emit(1);
  emitter.show();
  emitter.update();

  image(ring, mouseX, mouseY, ring.width / 12,ring.height / 12);  

}

function Face(x,y){
  this.x = x;
  this.y = y;
  this.blinkPause = random(200,300)
  this.rightEye = new Eye(this.x + 55, y + height/6.2 ,this.blinkPause)//change ici blg
  this.leftEye = new Eye(this.x- 55, y + height/6.2,this.blinkPause)
  this.draw = function(){
    this.rightEye.draw()
    this.rightEye.blink()
    this.leftEye.draw()
    this.leftEye.blink()
    
  }
}


function Eye(x,y,binkPause){
  this.x = x;
  this.y = y;
  this.d = 30 // diameter of circle
  this.topLidY = this.y
  this.dy = 1
  this.distance = 0,
  this.angle = 0
  this.blinkPause = 0 // duration till next bink
  this.topLidYOrigin = this.y // original position before animation
  this.bottomLidY = this.y - this.d
  this.blink = function() {
    
    // decrement blink pause duration
    if(this.blinkPause > 0){
      this.blinkPause -= 1
      // return function to exit function early
      return
    }
    
      
    if(this.topLidY >= this.topLidYOrigin + this.d /2 ){
      this.blinkPause = binkPause
      this.dy = -this.dy
    }else if(this.topLidY < this.topLidYOrigin){
      this.dy = -this.dy
    }
    
    // animate eyelids
    this.topLidY += this.dy
    this.bottomLidY -= this.dy;
  },
  this.draw = function(){
    // eye ball
    noStroke()
    fill(backgroundColour)
    circle(this.x,this.y, this.d)
    
    // pupil
    push();
    fill(50)
    // distance from mouse to eyeball center
    this.distance = constrain(int(dist(this.x,this.y,mouseX,mouseY)), 0, height)
    // map distance value from mouse position over eyeball radius
    this.eyePos = map(this.d /5 , 0,500,0,this.distance )
    this.angle = atan2(mouseY - this.y, mouseX - this.x);
    translate(this.x, this.y);
    rotate(this.angle);
    // circle( distance from eye center, offset from angle, circe diameter)
    circle(this.eyePos, 0, random(this.d/2,this.d/2+3));
    pop();
  
    // eye lids
    fill(backgroundColour)
    // stroke("red") // for debugging
    rect(this.x - this.d/2, this.topLidY,  this.d, this.d)
    rect(this.x - this.d/2, this.bottomLidY,  this.d, this.d)
   
    // eyeliner
    // noFill()
    // strokeWeight(1)
    // stroke("black")
    // circle(this.x,this.y, this.d)
  }
}