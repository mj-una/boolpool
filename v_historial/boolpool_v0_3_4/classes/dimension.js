class Dimension {
  
  constructor(size, ratio, value, limit) {
    this.size = size;
    
    this.dark = value;
    this.light = 255 - value;
    this.tran = 128;
    
    this.origin1 = this.size * 3 / 4;
    this.origin0 = this.size / 2;
    
    this.RC5 =  2.236;

    this.dArea = this.size / this.RC5 * ratio;
    this.dBall = this.dArea / this.RC5;
    this.rBall = this.dBall / 2;
    this.dTarg = this.dBall / this.RC5;
    this.dCurs = this.dTarg / this.RC5;
    
    this.tBord = this.size / 10;
    
    
//  this.acc.y - map(this.now.y, -dm.capturMin, dm.capturMax, dm.velMin, dm.velMax)

//  console.log(this.initVel.x + " = " + dm.velMax + "  <->  " + this.now.x + " = " + dm.capturMax);
    
    
    this.capturMin = 0; //this.rBall;
    this.capturMax = this.size / 3;
    
    this.velMin = this.dBall * 2 / 5;
    this.velMax = this.size / limit;
    
    this.endVel = this.size / 10000; // const mil a 61m: fino y lento + vs - brusco y rapido
    
    
    
    
    this.s2 = this.size / 2;
    this.s100 = this.size / 100;
    this.s120 = this.size / 120;
    
  }
  
  extSize() {
    
  }
  
  vary(tempo, valA, valB, trend) {
    if (trend) this.tr *= -1;
    this.tw = valA + sin(tempo) * (valA - valB) * this.tr;
    return this.tw;
  }
  
  pulp() {
    fill(30, 200, 200);
    rect(0, 0, this.dArea, this.dBall);
  }
  
}