const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 256, 256 ],
  animate: true,
  duration: 3,
  fps: 30
};

const sketch = () => {
  return ({ context, width, height, playhead }) => {
    context.fillStyle = 'pink';
    context.fillRect(0, 0, width, height);

    // Get a seamless 0..1 value for our loop
    const t = Math.sin(playhead * Math.PI);

    // Animate the thickness with 'playhead' prop
    const thickness = Math.max(5, Math.pow(t, 0.55) * width * 0.5);

    // Rotate with PI to create a seamless animation
    const rotation = playhead * Math.PI;

    // Draw a rotating white rectangle around the center
    const cx = width / 2;
    const cy = height / 2;
    const length = height * 0.5;
    context.fillStyle = 'white';
    context.save();
    context.translate(cx, cy);
    context.rotate(rotation);
    context.fillRect(-thickness / 2, -length / 2, thickness, length);
    context.restore();
  };
};

canvasSketch(sketch, settings);
