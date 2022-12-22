const RECORD = false

/////////// webm capture ///////////
const n_seconds = 10;
const frame_rate = 30
let capturer = new CCapture({
  framerate: frame_rate,
  format: "webm", // webm being the video format most browsers support
  name: document.title, // filename to save
  quality: 100, // 0 (lowest) - 100 (highest)
  verbose: true //if true, will provide additional info in console
})
// var capturer = new CCapture({
//   framerate: frame_rate,
//   format: "gif", // webm being the video format most browsers support
//   workersPath: "./js/",
//   name: document.title, // filename to save
//   quality: 20, // 0 (lowest) - 100 (highest)
//   verbose: true //if true, will provide additional info in console
// })
let p5Canvas;
/////////////////////////////////////

function setup() {
  p5Canvas = createCanvas(1920,1080);
}

function draw(){
  background(0);

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

// function mouseClicked() {
//   saveFrame()
// }

// function saveFrame(){
//   noLoop();
//   save(`${proj}_${frameCount}.png`)
// }
