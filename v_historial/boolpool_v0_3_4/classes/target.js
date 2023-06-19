class Target {
  
  constructor(n) {
    
    this.id = n;
    
    if (n <= 1) this.state = true;
    else this.state = false;
    
  }
  
  display() {
    if (this.state) {
      
      fill(0, 100);
      
      if (this.id == 0) circle(dm.tBord, dm.tBord, dm.dTarg);
      else if (this.id == 1) circle(dm.size - dm.tBord, dm.tBord, dm.dTarg);
      else if (this.id == 2) circle(dm.size - dm.tBord, dm.size - dm.tBord, dm.dTarg);
      else if (this.id == 3) circle(dm.tBord, dm.size - dm.tBord, dm.dTarg);
    
    }
  }
}