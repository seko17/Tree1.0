let angle = .8;
// let movetree = 0.01; /// each pass offset by 1% of screen width
// let density = 0; /// make tree pass counter
// let extrabranch = 0; /// randomly make extra branch
// let lessbranch = 0; /// not implimented
// let trunkthick = 0.11; /// each branch diminished size 
// let limbmin = 10; /// small limbs makes dense tops
// let treemax = 3; /// how many passes per tree
let len = 100/(level + 1);
let thick = 20/(level+ 1);

let maxLevel = 7;        // number of levels of recursion. more than 10 will throw
                         // an error because the palette is not large enough

let split = 3;           // number of divisions at the end of each branch
                         
let level = 0;           // global variable to track what is being drawn

// color palettes can be used to set the color of different levels
let palette = ["#602020","#803030","#C06030","#F09060","#60C060","#60F060","#60B060","#60E060","#60C060","#60D060"];


function setup() {
  createCanvas(600, 400);
 
}

function draw() {
  background("#D0E0F0");
  
  fill("#40F040");
  noStroke();
  rect(0,300,width,height);
  
  translate(300,350);  // starts the trunk in the right location
  rotate(PI);          // points the tree to the sky!
  
  branch()
  noLoop();
 
}


function branch() {
  let angle = .8;              // the angle of the split for sub-branches
  let len = 100/(level+1);      // the length of the branch
  let thick = 20/(level+1);     // the thickness of the branch
  
  stroke(palette[level]);      
  strokeWeight(thick);
  
  push();             // PUSH to a new drawing state. 
  if(level!=0) rotate(-0.5*(split-1)*angle);   // see comment below
  
  line(0,0,0,len);                             // the only actual "drawing" code

  translate(0, len);                           // move to the end of the branch 
  
  if (level<maxLevel-1) {                      // quit when we reach base state
    
    level++;                                   // increase the level 
    for (let i = 0; i<split; i++) {            // draw more branches!  
      drawBranch();
      rotate(angle);  
    }
    level--;                                   // once all sub-branches are done
                                               // return to the lower level to finish
  }
  pop();            // POP back to the previous drawing state. 
}



function mousePressed() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}