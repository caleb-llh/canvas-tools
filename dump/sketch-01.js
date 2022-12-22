const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 2048, 2048 ]
  // dimensions: 'A4',
  // pixelsPerInch: 250,
  // orientation: 'portrait'

};

const sketch = () => {
  return ({ context, width, height }) => {

    const rect_width = 0.5*width;
    const rect_height = 0.5*height;
    const x_start = 0.5*(width-rect_width);
    const y_start = 0.5*(width-rect_height);
    const border_width = 5
    const border_line_width = 3
    const rows = 5;
    const cols = 5;
    const rad = 50;
    const rad_border_width = 10;

    // background
    context.fillStyle = '#000000'
    context.fillRect(
        x=x_start,
        y=y_start,
        w=rect_width,
        h=rect_height
        );
    // background border
    context.beginPath();
    context.lineWidth = border_line_width;
    context.strokeStyle = "#000000"
    context.rect(
        x=x_start-border_width,
        y=y_start-border_width,
        w=rect_width+2*border_width,
        h=rect_height+2*border_width
        );
    context.stroke();
    
    
    const circle = (x,y,r) => {
        context.beginPath();
        context.lineWidth = 2;
        context.strokeStyle = "#ffffff"
        context.arc(x,y,r,0,2*Math.PI);
        context.stroke();
    }
    

    let gap_x = rect_width/rows;
    let gap_y = rect_height/cols;
    for (let i=0; i<rows; i++){
        for (let j=0; j<cols; j++){
            circle(
              x=2*rad+x_start+i*gap_x,
              y=2*rad+y_start+j*gap_y,
              r=rad
              )
            if (Math.random()>0.5) continue;
            circle(
              x=2*rad+x_start+i*gap_x,
              y=2*rad+y_start+j*gap_y,
              r=rad+rad_border_width
              )
        }
    }

    l = ['as','s','sff','wer,','saf']
    l.forEach(element => {
        console.log(element)
    });
  };
};

canvasSketch(sketch, settings);
