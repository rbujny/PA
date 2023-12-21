
let width = 1920 / 2;
let height = 1080 / 2 - 100;
function setup() {
  createCanvas(width, height);
  background(0);
  stroke(153);
  strokeWeight(10);
  strokeCap(SQUARE);
}

let mid = width / 2;
let d = new Drone(mid, height - 100, 0);
let desH = height;
let isStopped = false;
let t = 0;
function draw() {
  if(isStopped)
    return;
  let wind_mag = 200;
  let windx = noise(0.005 * frameCount) - 0.5;
  let windy = noise(0.01 * frameCount + 10000) - 0.5;
  
  
  d.update(height - desH);
  background(220);
  d.display();
  
  stroke(0, 0, 0);
  strokeWeight(1);
  let x1 = new Vec(wind_mag / 2, wind_mag / 2);
  let x2 = new Vec(windx * wind_mag / 2 + wind_mag / 2, windy * wind_mag / 2 + wind_mag / 2)
  line(x1.x, x1.y, x2.x, x2.y );
  
  let offset = 4;
  push() //start new drawing state
    var angle = atan2(x1.y - x2.y, x1.x - x2.x); //gets the angle of the line
    translate(x2.x, x2.y); //translates to the destination vertex
    rotate(angle-HALF_PI); //rotates the arrow point
    triangle(-offset*0.5, offset, offset*0.5, offset, 0, -offset/2); //draws the arrow point as a triangle
  pop();
  fill('black')
  text("KIERUNEK WIATRU", wind_mag / 4, wind_mag / 2 + 40);

  
  stroke(255, 0, 0);
  line(0, desH, width, desH);
  if(keyIsDown(UP_ARROW)){
        desH += -2;
  }
  if(keyIsDown(DOWN_ARROW)){
        desH += 2;
  }
  if(mouseIsPressed){
      if(mouseY > 0 && mouseY < height){
              desH = mouseY;

      }

  }
  let wind_force = 3;
  d.vel.y += windy * wind_force / d.m;
  t += 1;
  let last_idx = d.pid.out.length - 1;
  let dp = Math.round(d.pid.p[last_idx] * 100) / 100;
  let di = Math.round(d.pid.i[last_idx] * 100) / 100;
  let dd = Math.round(d.pid.d[last_idx] * 100) / 100;
  let targeth = Math.round((height - d.pos.y) * 100) / 100;
  let currenth = Math.round((height - desH) * 100) / 100;
  updateChart(pid_chart, t, [d.pid.getOutput()]);
  updateChart(air_drag_chart, t, [Math.abs(d.air_drag_force)]);
  updateChart(wind_force_chart, t, [windy * wind_force])
  updateChart(height_chart, t, [targeth, currenth]);
  
}
function keyPressed(){
  if (key == ' '){ //this means space bar, since it is a space inside of the single quotes 
    isStopped = !isStopped;
  }  
}

function rotateVec(x, y, rot){
  return new Vec(
    cos(rot) * x - sin(rot) * y,
    sin(rot) * x + sin(rot) * y
  )
}
function Vec(x, y){
  this.x = x;
  this.y = y;
}
