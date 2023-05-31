class Evaluator {
  
  turn(t) {
    if (t) this.id = 1;
    else this.id = 0;
  }
  
  /*
  this.v1x = p1.vel_x;
  this.v1y = p1.vel_y;
  this.v0x = p0.vel_x;
  this.v0y = p0.vel_y;
  */

  ballCollision() {
    
    if (dist(p1.ap_x, p1.ap_y, p0.ap_x, p0.ap_y) <= dm.dBall) {
      
      // angulo colision
      this.angCol = atan2(p0.ap_y - p1.ap_y, p0.ap_x - p1.ap_x);
      this.cosAC = cos(this.angCol);
      this.sinAC = sin(this.angCol);
      
      // rotatar velocidades (entrada)
      this.v0xR = p0.vel_x * this.cosAC + p0.vel_y * this.sinAC;
      this.v0yR = p0.vel_y * this.cosAC - p0.vel_x * this.sinAC;
      this.v1xR = p1.vel_x * this.cosAC + p1.vel_y * this.sinAC;
      this.v1yR = p1.vel_y * this.cosAC - p1.vel_x * this.sinAC;
      
      // intercambio de velocidades en x
      this.v0xRaux = (this.v0xR + 2 * this.v1xR) / 2; // auxiliar para v0
      this.v1xR = (this.v1xR + 2 * this.v0xR) / 2; // calculo de v1 usando v0 original
      this.v0xR = this.v0xRaux; // actualizar v0
      
      // solucion error de sobreposicionamieto
      // *primero: establecer distancia entre p0 y p1 (con p0 como origen)
      //  rotando de acuerdo a angulo de colision
      this.dr0_x = 0;
      this.dr0_y = 0;
      this.dr1_x = (p0.pos_x - p1.pos_x) * this.cosAC + (p0.pos_y - p1.pos_y) * this.sinAC;
      this.dr1_y = (p0.pos_y - p1.pos_y) * this.cosAC - (p0.pos_x - p1.pos_x) * this.sinAC;        
      // *segundo: calcular velocidad total intercambiada
      this.sumaVel_x = abs(this.v0xR) + abs(this.v1xR);
      // *tercero: calcular error total de sobreposicionamiento
      this.exceso = 2 * dm.dBall - abs(this.dr1_x);
      // *cuarto: actualizar distancia x sumando velocidad corregida de acuerdo
      //  a division por (en proporcion de) inetercambio total y error total
      this.dr0_x += this.v0xR / this.sumaVel_x * this.exceso;
      this.dr1_x += this.v1xR / this.sumaVel_x * this.exceso;

      // revertir rotacion de entrada (resultados definitivos pre y post error)
      p0.vel_x = this.v0xR * this.cosAC - this.v0yR * this.sinAC;
      p0.vel_y = this.v0yR * this.cosAC + this.v0xR * this.sinAC;
      p1.vel_x = this.v1xR * this.cosAC - this.v1yR * this.sinAC;
      p1.vel_y = this.v1yR * this.cosAC + this.v1xR * this.sinAC;

    } 

    // movment
    p0.pos_x += p0.vel_x;
    p0.pos_y += p0.vel_y;
    p1.pos_x += p1.vel_x;
    p1.pos_y += p1.vel_y;

    p.p("evltr.ballCollision()");

  }

  velOver() {
    if (abs(p1.vel_x) <= dm.endVel) p1.vel_x = 0;
    if (abs(p1.vel_y) <= dm.endVel) p1.vel_y = 0;
    if (abs(p0.vel_x) <= dm.endVel) p0.vel_x = 0;
    if (abs(p0.vel_y) <= dm.endVel) p0.vel_y = 0;
    p.p("evltr.velOver()")
  }

  endTurn() {
    p.p("evltr.endTurn()-IN-");

    if (p1.vel_x == 0 && p1.vel_y == 0 &&
      p0.vel_x == 0 && p0.vel_y == 0) {

      if (prep.cancel) return false;
      else {
        p1.scoreOf2 = p0.scoreOf2 = 0;
        p.p("evltr.endTurn()-OUT-");
        return true;
      }
    }
  }
  
  maxScore() {
    p.p("evltr.maxScore");
    p.p("p1of2:", p1.scoreOf2, p1.scoreOf4, p0.scoreOf2, p0.scoreOf4);
    if (p1.scoreOf2 >= 2) return true;
    else if (p1.scoreOf4 >= 4) return true;
    else if (p0.scoreOf2 >= 2) return true;
    else if (p0.scoreOf4 >= 4) return true;
    else return false;
  }
  
  isBtn(id) {
    if (id == 0 && mouseX > 0 && mouseX < dm.size && mouseY > 0 &&
    mouseY < dm.size) return true;
    
    else if (id == 1    /* pos btn 1 */    ) return true;
    
    else return false;
  }
}