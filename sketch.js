
// 1) Create a forest with variation (with branch and image(pg) )

// 2) Add "humans" through pictures
  // IMAGE
  //   2.1) https://p5js.org/reference/#/p5/image
  //   2.2) https://p5js.org/reference/#/p5/loadImage
  //   2.3) https://p5js.org/reference/#/p5/preload
  //?  2.4) https://p5js.org/reference/#/p5/tint

// 3) Add a structure for displaying trees (and humans?)
// JSON
//   3.1) https://p5js.org/reference/#/p5/loadJSON
//   3.2) Create your own JSON in glitch and use it to hold position information

let angle = .8;
let split = 3;          // number of divisions at the end of each branch
let level = 0;           // global variable to track what is being drawn
let len = 100/(level + 1);
let thick = 20/(level+ 1);
let maxLevel = 7;        
// color palettes can be used to set the color of different levels
let palette = ["#602020","#803030","#C06030","#F09060","#60C060","#60F060","#60B060","#60E060","#60C060","#60D060"];
let pg;
let time = 0;
let particles = [];
let people = [];
var spot = {
  x: 100,
  y: 50,
}

function preload(){
  person = loadImage("assets/person.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pg = createGraphics(width, height);
  for(let i = 0;i<width/10;i++){
    particles.push(new Particle());
  }
  
}

function draw() {
  background("#D0E0F0");

  fill("#40F040");
  noStroke();
  rect(0,300,width,height);
  
  image(pg, 0,0 );

  if (millis() >= time + 1000){
    drawTree();
    time = millis();
  }

  for(let i = 0;i<particles.length;i++) {
    particles[i].draw();
    particles[i].moveParticle();
  }
  rotate(PI);
  for(let i = 0; i<4;i++){
    showPeople();
  }
 
 
}

class Particle {
  constructor(){
    this.x = random(0,width);
    this.y = random(0,height);
    this.r = random(1,8);
    this.xSpeed = random(-2,2);
    this.ySpeed = random(-1,1.5);
  }

// creation of a particle.
  draw() {
    noStroke();
    fill('rgba(200,169,169,0.5)');
    circle(this.x,this.y,this.r);
  }

// setting the particle in motion.
  moveParticle() {
    if(this.x < 0 || this.x > width)
      this.xSpeed*=-1;
    if(this.y < 0 || this.y > height)
      this.ySpeed*=-1;
    this.x+=this.xSpeed;
    this.y+=this.ySpeed;
  }

}
function showPeople(){
  spot.x = random (0, width);
  spot.y = random (0, 100);
  pg.image(person,500,500)
}


function drawTree() {
  for (var x = 5; x < 400; x = x+100){
		for (var y = 5; y < 600; y = y+50){
      pg.push();
      pg.translate(x,y);  // starts the trunk in the right location
      pg.rotate(Math.PI);          // points the tree to the sky!
      branch()
    pg.pop();
		}	
	}	
  
}

function branch() {  
  let angle = .8;              // the angle of the split for sub-branches
  let len = 100/(level+1);      // the length of the branch
  let thick = 20/(level+1);     // the thickness of the branch
  
  pg.stroke(palette[level]);      
  pg.strokeWeight(thick);
  
  pg.push();           
  
  if(level!=0) pg.rotate(-0.5*(split-1)*angle); 
  
  pg.line(0,0,0,len);                             // the only actual "drawing" code

  console.log(random(0,8));
  pg.translate(random(0,8), len);                           // move to the end of the branch 
  
  if (level<maxLevel-1) {                      // quit when we reach base state
    
    level++;                                   // increase the level 
    for (let i = 0; i<split; i++) {            // draw more branches!  
      branch();
      pg.rotate(angle);  
    }
    level--;                                   
                                               
  }
  pg.pop();          
}



function mousePressed() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}