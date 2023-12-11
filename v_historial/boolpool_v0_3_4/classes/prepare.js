class Prepare {
  
  constructor() {
    
    this.acc = createVector(mouseX, mouseY);
  }
  
  update() {
    
    this.now = createVector(this.acc.x - mouseX, this.acc.y - mouseY);
    this.now.mult(-1);
    
    if (this.now.mag() <= dm.rBall) this.cancel = true; 
    else this.cancel = false;
    
    this.now.limit(dm.capturMax);  
  }
   
  defShot(turn) {
    push();
    
    if (turn) translate(p1.pos.x, p1.pos.y);
    else translate(p0.pos.x, p0.pos.y);
    
    this.initVel = createVector(
      -map(this.now.x, 0, dm.capturMax, 0, dm.velMax),
      -map(this.now.y, 0, dm.capturMax, 0, dm.velMax)
    );
    
    pop();
    
    console.log(" prep.defShot(): " + this.initVel.x + " = " + dm.velMax + "  <->  " + this.now.x + " = " + dm.capturMax);
  
    
    
    
    if (turn) p1.vel = this.initVel;
    else p0.vel = this.initVel;
  }
  
  display(turn) {
    
    noFill();
    stroke(turn ? dm.dark : dm.light, this.cancel ? dm.tran : 255);
    
    strokeWeight(dm.s100);
    line(this.acc.x, this.acc.y, mouseX, mouseY);
       
    strokeWeight(dm.s120);
    circle(this.acc.x, this.acc.y, 2 * this.now.mag());
    
    // test
    
    stroke(0);
    strokeWeight(dm.s100);
    line(dm.s2, dm.s2, dm.s2 - this.now.x, dm.s2 - this.now.y);
    
    fill(200, 200, 10, 200);
    noStroke();
    circle(mouseX, mouseY, 30);
    circle(this.acc.x, this.acc.y, 20);
    
  }
}

/*


    
    push();
    translate(this.acc.x, this.acc.y);
    this.anglM = atan2(mouseY - this.acc.y, mouseX - this.acc.x);
    pop();
    
    this.distM = dist(mouseX, mouseY, this.acc.x, this.acc.y);

    if (this.distM <= dm.rBall) this.cancel = true;
    else this.cancel = false;

    if (this.distM >= dm.capturMax) this.distM = dm.capturMax;
      
    this.vel = map(this.distM, dm.capturMin, dm.capturMax, 0, dm.maxVel);

*/