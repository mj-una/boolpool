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
    this.rArea = this.dArea / 2;
    this.dBall = this.dArea / this.RC5;
    this.rBall = this.dBall / 2;
    this.dTarg = this.dBall / this.RC5;
    this.rTarg = this.dTarg / 2;
    this.dCurs = this.dTarg / this.RC5;
    this.rCurs = this.dCurs / 2;

    this.tBord = this.size / 10;
        
    this.capturMax = this.size / 3;
    
    this.velMax = this.size / limit;
    this.velMin = this.velMax / 9;
    
    this.endVel = this.size / 10000;
    // const mil a 61m: fino y lento + vs - brusco y rapido
    
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
}