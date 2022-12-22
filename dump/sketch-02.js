const canvasSketch = require('canvas-sketch');
const utils = require('./utils.js')

const settings = {
  dimensions: [ 2048, 2048 ]
};


const sketch = () => {
  return ({ context, width, height }) => {
      // background
      context.fillStyle = 'white';
      context.fillRect(0, 0, width, height);

      const x = 0;
      const y = 0;
      const w = 0.2 * width;
      const h = 0.1 * height;
      
      // translation and then rotation (more intuitive)
      context.translate(width/2, height/2)
      context.rotate(utils.deg_to_rad(45))
      context.save();

      // // rotation and then translation of context origin
      // context.rotate(0.5)
      // context.translate(width/2, height/2)
      
      // and then drawing
      context.beginPath();
      context.arc(x,y,8, 0, 2*Math.PI)
      context.fillStyle = 'black';
      context.fill()
      
      context.beginPath();
      context.rect(x-w/2,y-h/2,w,h);
      context.lineWidth = 5;
      context.setLineDash([5,10,15])
      context.stroke();
      context.restore();
      
      context.beginPath();
      context.lineWidth = 3;
      context.moveTo(-w/2,0); // doesn't actually translate context origin
      context.lineTo(w/2,0);
      context.stroke();
      context.moveTo(0,-h/2);
      context.lineTo(0,h/2);
      context.stroke();
      
  };
};

canvasSketch(sketch, settings);
