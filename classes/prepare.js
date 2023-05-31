class Prepare {
  
  constructor() {
    
    this.access_x = mouseX;
    this.access_y = mouseY;
  }
  
  update() {
    
    push();
    translate(this.access_x, this.access_y);
    this.anglM = atan2(mouseY - this.access_y, mouseX - this.access_x);
    pop();

    this.distM = dist(mouseX, mouseY, this.access_x, this.access_y);

    if (this.distM <= dm.rBall) this.cancel = true;
    else this.cancel = false;

    if (this.distM >= dm.capturMax) this.distM = dm.capturMax;
    
    console.log("prepare:update");
  }
   
  defShot(turn) {
    this.relative = this.distM - dm.rBall;
    this.power = map(this.relative, 0, 
    dm.capturMax - dm.rBall, dm.velMin, dm.velMax);

    //ref.out = map(this.power, 1, velMax, 0, 99);

    // map(this.distM, dm.dBall * 2 / 5, dm.capturMax,
    // 0, dm.velMax);
    
    if (turn) {
      p1.ang = this.anglM;
      p1.vel_x = -cos(p1.ang) * this.power;
      p1.vel_y = -sin(p1.ang) * this.power;
    }
    else {
      p0.ang = this.anglM;
      p0.vel_x = -cos(p0.ang) * this.power;
      p0.vel_y = -sin(p0.ang) * this.power;
    }
    console.log("prepare:defShot");
  }
  
  display(turn) {
    
    noFill();
    stroke(turn ? dm.dark : dm.light, this.cancel ? dm.tran : 255);
    
    strokeWeight(dm.s100);
    line(this.access_x, this.access_y, mouseX, mouseY);
       
    strokeWeight(dm.s120);
    circle(this.access_x, this.access_y, 2 * this.distM);
    
    // test
      
    fill(200, 200, 10, 200);
    noStroke();
    circle(mouseX, mouseY, 25);
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