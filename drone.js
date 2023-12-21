function remap(v, vmin, vmax, tomin, tomax){
    return (v - vmin) / (vmax-vmin) * (tomax - tomin) + tomin;
  }
  function Drone(xpos, ypos, rot) {
    this.pos = new Vec(xpos, ypos);
    this.rot = rot;
    this.vel = new Vec(0, 0);
    this.rvel = 0;
    this.grav = 1;
    this.drag_coef = 0.01;
    this.m = 1;
    
    this.r = 15;
    
    
    this.l_rpm = 0;
    this.r_rpm = 0;
    
    this.thrust_coef = 1/3000;
    
    this.min_rpm = 0;
    this.max_rpm = 30000;
    this.min_voltage = 0;
    this.max_voltage = 2;
    
    this.air_drag_force = 0;
    
    
    this.pid = new PIDController(0.01, 0.0005, 0.05, this.min_voltage, this.max_voltage)
  
  
    this.setRPM = function(desired) {
      this.l_rpm = desired;
      this.r_rpm = desired;
  
    }
    this.getThurstDir = function() {
      return new Vec(sin(this.rot), -cos(this.rot));
    }
    this.getThrustForce = function() {
      return (this.l_rpm + this.r_rpm) * this.thrust_coef;
    }
    
    this.simulate = function() {
      let acc = this.getThrustForce() / this.m;
      let dir = this.getThurstDir();
      this.vel.x += acc * dir.x;
      this.vel.y += acc * dir.y + this.grav / this.m;
      let velsign = this.vel.y / abs(this.vel.y);
      this.air_drag_force = velsign * this.vel.y * this.vel.y * this.drag_coef
      this.vel.y -= this.air_drag_force;
  
      this.pos.x += this.vel.x;
      this.pos.y += this.vel.y;
      this.rvel = (this.r_rpm - this.l_rpm)*this.r;
      this.rot += this.rvel;
      if(this.pos.y > height){
        this.pos.y = height;
        this.vel.y = 0;
      }
      if(this.pos.x > width){
        this.pos.x = width;
        this.vel.x = 0;
      }else if(this.pos.x < 0){
        this.pos.x = 0;
        this.vel.x = 0;
      }
    }
    
    this.update = function(desiredHeight) {
      this.pid.update(desiredHeight, height- this.pos.y);
      let voltageOut = this.pid.getOutput();
      let rpms = remap(voltageOut, this.min_voltage, this.max_voltage, this.min_rpm, this.max_rpm)
      this.setRPM(rpms);
      this.simulate();
  
    }
    this.display = function() {
      fill(220);
      stroke(110);
  
      strokeWeight(10);
  
      ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
      
      strokeCap(SQUARE);
  
      let dir = rotateVec(1, 0, this.rot);
      dir.x = dir.x * 50;
      dir.y = dir.y * 50;
  
      line(this.pos.x, this.pos.y, 
           this.pos.x + dir.x, this.pos.y + dir.y);
      line(this.pos.x, this.pos.y, 
           this.pos.x + -dir.x, this.pos.y + -dir.y);
    }
  }