class Evaluator {
  
  constructor() {
    
  }
  
  velOver() {
    
    if (abs(p1.vel.x) <= dm.endVel) p1.vel.x = 0;
    if (abs(p1.vel.y) <= dm.endVel) p1.vel.y = 0;
    if (abs(p0.vel.x) <= dm.endVel) p0.vel.x = 0;
    if (abs(p0.vel.y) <= dm.endVel) p0.vel.y = 0;
      
    if (motion == 2 && p1.vel.mag() == 0 && p0.vel.mag() == 0) {
      
      if (!prep.cancel) {
        turn = !turn;
        p1.scoreOf2 = p0.scoreOf2 = 0;
        console.log("evltr.velOver(): cambio turno");
      }
      motion = 0;
    }
      /*
        tiroPost = false;
        if (victoria0 || victoria1) pantalla = 4;
        else {
          delay(400);
          turno = !turno;
          puntaje0A = puntaje1A = 0;
          
          // activar manzanas actualizadas
          if (m1a == 1 || m2a == 1) mSI = true;
          else mSI = false;
          if (m1a == 2 || m2a == 2) mSD = true;
          else mSD = false;
          if (m1a == 3 || m2a == 3) mII = true;
          else mII = false;
          if (m1a == 4 || m2a == 4) mID = true;
          else mID = false;
        
          // REVISAR SUPERPOSION MANZ ______________ blq2 parte 9
          
          // superior izq
          if (mSI && (dist(mSI_x, mSI_y, p0_x, p0_y) < (tamBola + tamManz) / 2
          || dist(mSI_x, mSI_y, p1_x, p1_y) < (tamBola + tamManz) / 2)) {
            if (dobM == 0) {
              if (saltada == 2) mSD = true;
              if (saltada == 3) mII = true;
              if (saltada == 4) mID = true;
            }
            else {
              if (sigM == 2 || dobM == 2) mSD = true;
              else mSD = false;
              if (sigM == 3 || dobM == 3) mII = true;
              else mII = false;
              if (sigM == 4 || dobM == 4) mID = true;
              else mID = false;
            }
            mSI = false;
          }
          */
  }
  
  maxScore() {
    
  }
  
  isBtn(id) {
    if (id == 0 && mouseX > 0 && mouseX < dm.size && mouseY > 0 &&
    mouseY < dm.size) return true;
    
    else if (id == 1    /* pos btn 1 */    ) return true;
    
    else return false;
    }
  
}