var cx, cy, from, to, colours
var sets = []

const nParticles = 80
const maxSets = 8
const spawnRadThreshold = 50



/////////// webm capture ///////////
let loc = window.location.pathname;
let proj = loc.substring(1, loc.lastIndexOf('_'));
const n_seconds = 10;
const frame_rate = 30
var capturer = new CCapture({
  framerate: frame_rate,
  format: "webm", // webm being the video format most browsers support
  name: proj, // filename to save
  quality: 100, // 0 (lowest) - 100 (highest)
  verbose: true //if true, will provide additional info in console
})
let p5Canvas;
/////////////////////////////////////

function setup() {
  /////////// webm capture ///////////
  p5Canvas = createCanvas(windowWidth,windowHeight);
  /////////////////////////////////////
  background(0)
  
  cx = width/2
  cy = height/2

  colours = [
    color(255,255,255,10),
    color(36,37,81,10),
    color(64,98,68,10),
    color(218,183,31,10),
    color(216,131,43,10),
    color(201,77,77,10),
    color(116, 97, 152,10),
    color(0,0,0,150)
  ]  

  sets.push(initParticleSet())
}


// HELPER METHODS

function draw() {
  /////////// webm capture ///////////
  if (frameCount==1) capturer.start();
  capturer.capture(p5Canvas.canvas)
  if (frameCount == n_seconds*frame_rate){
    noLoop();
    capturer.stop();
    capturer.save();
  }
  /////////////////////////////////////
  
  for(let particleSet of sets){
    noFill();
    beginShape();
    for(let i=0;i<particleSet.length-1;i++){
      particleSet[i].updatePosition()
      particleSet[i].draw()
    }
    endShape(CLOSE);
  }
  if(sets[sets.length-1][0].radMul >= spawnRadThreshold){
    sets.push(initParticleSet())
  }
  if(sets.length >maxSets){
    sets.shift()
  }
}

function initParticleSet(){
  particleSet = []
  let fromIndex = Math.floor(Math.random()*colours.length)
  let toIndex = Math.floor(Math.random()*colours.length)
  console.log(fromIndex, toIndex)
  
  let colorfrom = colours[fromIndex]
  let colorto = colours[toIndex]
  let radMul = 10*Math.random()
  for(let i=1;i<=nParticles;i++){
    particle = new Particle(i,radMul, colorfrom, colorto)
    particleSet.push(particle)
  }
  return particleSet
}

function Particle(n, radMul, colorfrom, colorto){
  this.n = n
  this.a = n*TWO_PI/nParticles
  this.radMul=radMul
  this.radMulOff=0.2
  this.t=0
  this.toff = 0.002
  this.colorfrom=colorfrom
  this.colorto=colorto
  // console.log(this.colorfrom,this.colorto)
  
  this.updatePosition =()=> {
    let rad = this.radMul*noise(this.t,this.a+this.t)
    this.x = cx + (rad * cos(this.a))
    this.y = cy + (rad * sin(this.a))
    this.t+=this.toff
    this.radMul+=this.radMulOff
  }
  
  this.draw =()=> {
    strokeWeight(1)
    colorMode(RGB);
    // let acolor
    // if(this.n/nParticles<0.5){
    //   acolor = lerpColor(this.colorfrom,this.colorto,2*this.n/nParticles)
    //   // acolor = lerpColor(this.colorfrom,this.colorto,2*this.n/nParticles)
    // }
    // else{
    //   acolor = lerpColor(this.colorfrom,this.colorto,2*(1-this.n)/nParticles)
    //   // acolor = lerpColor(this.colorfrom,this.colorto,2*(1-this.n)/nParticles)
    // }
    // console.log(acolor)
    stroke(this.colorfrom)
    curveVertex(this.x,this.y)
  }
}


function touchStarted () {
  var fs = fullscreen();
  fullscreen(!fs);
}

/* full screening will change the size of the canvas */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function mousePressed() {
  let fs = fullscreen();
    fullscreen(!fs);
}
document.ontouchmove = function(event) {
    event.preventDefault();
};

// function mouseClicked() {
//   saveFrame()
// }

// function saveFrame(){
//   noLoop();
//   save(`${proj}_${frameCount}.png`)
// }
