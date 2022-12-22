var cols,rows;
var w
var h
var terrain_z;
let flight_x = 0;
var z

const RECORD = true;

const scl = 10;
const noise_mul = 300;
const flight_x_dec = 0.015;
const dz = 0.5;
const min_stroke_weight = 0.2;
const max_stroke_weight = 0.5;
const min_intensity = 100;
const max_intensity = 500;

/////////// webm capture ///////////
const n_seconds = 7;
const frame_rate = 24
let capturer = new CCapture({
  framerate: frame_rate,
  format: "webm", // webm being the video format most browsers support
  name: document.title, // filename to save
  quality: 10, // 0 (lowest) - 100 (highest)
  verbose: true //if true, will provide additional info in console
})
let p5Canvas;
/////////////////////////////////////

function setup() {
  p5Canvas = createCanvas(1280,720,WEBGL);
  w = width;
  h = height;

  z = 0
  
  cols = 4*int(w/scl);
  rows = 4*int(h/scl);
  terrain_z = new Array(cols).fill(0).map(() => new Array(4).fill(rows));
}

function draw(){
  background(0);
  transform();

  update_terrain(); 
  show_terrain();

  /////////// webm capture ///////////
  if(RECORD){
    if (frameCount==1) capturer.start();
    capturer.capture(p5Canvas.canvas)
    if (frameCount == n_seconds*frame_rate){
      noLoop();
      capturer.stop();
      capturer.save();
    }
  }
  /////////////////////////////////////
  

}

function transform(){
  z -= dz
  rotateX(5*PI/20);
  rotateZ(z/100)
  translate(-width,-2*height, 100+3*z);
}

function update_terrain(){
  // flight_x -= flight_x_dec;
  let y_off=0;
  for(let y=0;y<rows;y++){
      let x_off=flight_x;
      for(let x=0;x<cols;x++){
        terrain_z[x][y] = noise_mul*noise(x_off,y_off);
        x_off += 0.05;
      }
    y_off += 0.05;
  }
}

function show_terrain(){
  for(let y=0;y<rows-1;y++){
    // fade in from background to foreground
    c = map(y,0,rows,min_intensity,max_intensity,true)
    w = map(y,0,rows,min_stroke_weight,max_stroke_weight,true)
    stroke(c);
    strokeWeight(w)
    noFill();
    
    beginShape(TRIANGLE_STRIP);
    for(let x=0;x<cols;x++){
      vertex(x*scl,y*scl, terrain_z[x][y]);
      vertex((x)*scl,(y+1)*scl, terrain_z[x][y+1]);        
    }
    endShape();
  }
}

// function mouseClicked() {
//   saveFrame()
// }

// function saveFrame(){
//   noLoop();
//   save(`${proj}_${frameCount}.png`)
// }