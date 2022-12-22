const canvasSketch = require('canvas-sketch');
const utils = require('./utils.js')
const math = require('canvas-sketch-util/math');

const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const clock_radius = height/4;

    context.translate(width/2, height/2);
    context.arc(0, 0, 10, 0, 2*Math.PI);
    context.fillStyle = 'black';
    context.fill();
    
    for(let i=0; i<12; i++){
      let w = utils.lerp(Math.random(), 5,40);
      let h = 300;
      context.rotate(2*Math.PI/12)
      context.beginPath();
      context.rect(-w/2,clock_radius,w,h);
      context.fillStyle = 'black';
      context.fill();
    }
  };
};

canvasSketch(sketch, settings);
