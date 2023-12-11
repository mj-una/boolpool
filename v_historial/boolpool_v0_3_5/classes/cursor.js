class DotCursor {
  
  constructor() {
    
  }
  
  mov() {
    
  }
  
  display() {
    if (turn) fill(84, 91, 119, this.cancel ? dm.tran : 255);
    else fill(55, 66, 89, this.cancel ? dm.tran : 255);
    circle(mouseX, mouseY, dm.dCurs);
  }
  
}