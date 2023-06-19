function Player(let n) {
  
  if (n) this.pos = createVector(0, dim.origin1);
  else this.pos = createVector(0, dim.origin0);
  
  this.v = createVector(0, 0);
  this.ang = this.v.heading();
  
  this.scoreOf2 = 0;
  this.scoreOf4 = 0;
  
  this.update = function(let friction) {
    
    this.v.mult(friction);
    
    if (this.pos.x < 0) {
      this.pos.x = 0;
      this.v.x *= -1;
    }
    
    if (this.pos.x > dim.size) {
      this.pos.x = dim.size; 
      this.v.x *= -1;
    }
  
    if (this.pos.y < 0) {
      this.pos.y = 0;
      this.v.y *= -1;
    }
  
    if (this.pos.y > dim.size) {
      this.pos.y = dim.size;
      this.v.y *= -1;
    }
    
    
  }
}