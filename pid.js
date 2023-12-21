function PIDController(Dp, Di, Dd, lmin, lmax) {
    this.Dp = Dp;
    this.Di = Di;
    this.Dd = Dd;
    
    this.err = [0]
    this.meas = [0]
    this.p = [0]
    this.i = [0]
    this.d = [0]
    this.out = [0]
    
    this.tau = 0.2;
    this.T = 1;
  
    this.limMin = lmin;
    this.limMax = lmax;
    this.getOutput = function() {
      return this.out[this.out.length- 1];
    }
    this.update = function(target, Meas) {
      let last_idx = this.out.length - 1;
      let Err = target - Meas;
      let cp = this.Dp * Err;
      this.p.push(cp);
      let ci = this.Di*this.T/2 * (Err + this.err[last_idx]) + 
          this.i[last_idx];
      
      
      let limMaxt;
      let limMint;
      if(this.limMax > cp) {
        limMaxt = this.limMax - cp;
      }else {
        limMaxt = 0;
      }
      if(this.limMin < cp){
        limMint = this.limMin - cp;
      }else {
        limMint = 0;
      }
      if(ci > limMaxt){
        ci = limMaxt;
      }
      if(ci < limMint){
        ci = limMint;
      }
  
      this.i.push(ci);
      
      
      let cd = this.Dd*2 * (this.meas[last_idx] - Meas) + 
          (2*this.tau-this.T) / (2*this.tau+this.T) * this.d[last_idx];
   
      this.d.push(cd);
      
      let output = cp + ci + cd
      if(output > this.limMax){
        output = this.limMax;
      }
      if(output < this.limMin){
        output = this.limMin;
      }
  
      this.meas.push(Meas);
      this.err.push(Err);
      this.out.push(output);
    }
    
    
  }