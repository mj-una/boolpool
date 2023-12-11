class Player {
  
  constructor(n) {
    if (n) this.pos = createVector(dm.s2, dm.origin1);
    else this.pos = createVector(dm.s2, dm.origin0);
    
    this.vel = createVector(0, 0);
      
    this.ap = createVector(0, 0);
    this.av = createVector(0, 0);
    
    this.scoreOf2 = 0;
    this.scoreOf4 = 0;
  }
  
  update(friction) {
    
    this.ap = this.pos;
    this.av = this.vel;
    
    this.av.mult(friction);
    
    if (this.ap.x - dm.rBall < 0) {
      this.ap.x = dm.rBall;
      this.av.x *= -1;
    }
    
    if (this.ap.x + dm.rBall > dm.size) {
      this.ap.x = dm.size - dm.rBall; 
      this.av.x *= -1;
    }
  
    if (this.ap.y - dm.rBall < 0) {
      this.ap.y = dm.rBall;
      this.av.y *= -1;
    }
  
    if (this.ap.y + dm.rBall > dm.size) {
      this.ap.y = dm.size - dm.rBall;
      this.av.y *= -1;
    }
    
    
    this.ap.add(this.av); 
    
    this.pos = this.ap;
    this.vel = this.av;
  }
  
  display() {
    fill(0, 100);
    circle(this.pos.x, this.pos.y, dm.dBall)
  }
}