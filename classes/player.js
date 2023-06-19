class Player {
  
  constructor(n) {
    if (n) {
      this.pos_x = dm.s2;
      this.pos_y = dm.origin1;
    }
    else {
      this.pos_x = dm.s2, dm.origin0;
      this.pos_y = dm.origin0;
    }

    this.ang = 0;
    this.vel_x = 0;
    this.vel_y = 0;

    this.scoreOf2 = 0;
    this.scoreOf4 = 0;
  
  }
  
  update(friction) {
    
    this.vel_x *= friction;
    this.vel_y *= friction;

    this.ap_x = this.pos_x + this.vel_x;
    this.ap_y = this.pos_y + this.vel_y;
    
    if (this.ap_x <= dm.rBall) {
      this.ap_x = dm.rBall;
      this.vel_x *= -1;
    }
    
    if (this.ap_x >= dm.size - dm.rBall) {
      this.ap_x = dm.size - dm.rBall; 
      this.vel_x *= -1;
    }
  
    if (this.ap_y < dm.rBall) {
      this.ap_y = dm.rBall;
      this.vel_y *= -1;
    }
  
    if (this.ap_y >= dm.size - dm.rBall) {
      this.ap_y = dm.size - dm.rBall;
      this.vel_y *= -1;
    }
  }
  

  display() {
    noStroke();
    fill(turn ? dm.dark : dm.light);
    circle(this.pos_x, this.pos_y, dm.dBall)
  }
}