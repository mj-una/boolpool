class Evaluator {
  
  turn(t) {
    if (t) this.id = 1;
    else this.id = 0;
  }

  ballCollision() {
    
    if (dist(p1.ap_x, p1.ap_y, p0.ap_x, p0.ap_y) <= dm.dBall) {
      
      // angle collision
      let angCol = atan2(p0.ap_y - p1.ap_y, p0.ap_x - p1.ap_x);
      let cosAC = cos(angCol);
      let sinAC = sin(angCol);
      
      // rotation of velocities (initial)
      let v0xR = p0.vel_x * cosAC + p0.vel_y * sinAC;
      let v0yR = p0.vel_y * cosAC - p0.vel_x * sinAC;
      let v1xR = p1.vel_x * cosAC + p1.vel_y * sinAC;
      let v1yR = p1.vel_y * cosAC - p1.vel_x * sinAC;
      
      // interchange of velocities in x
      let v0xRaux = (v0xR + 2 * v1xR) / 2; // auxiliar for v0
      v1xR = (v1xR + 2 * v0xR) / 2;
      v0xR = v0xRaux;
      
      /*
      // overlapping error
      //(*)first: distance between p0 and p1 (with p0 as origin)
      //   rotating according to angle of collision
      let dr0_x = 0;
      let dr0_y = 0;
      let dr1_x = (p0.pos_x - p1.pos_x) * cosAC + (p0.pos_y - p1.pos_y) * sinAC;
      let dr1_y = (p0.pos_y - p1.pos_y) * cosAC - (p0.pos_x - p1.pos_x) * sinAC;        
      //(*)second: total velocity interchanged
      let totalVel_x = abs(v0xR) + abs(v1xR);
      //(*)third: overlap error
      let excess = 2 * dm.dBall - abs(dr1_x);
      //(*)fourth: update distance in x adding velocity fixed according to
      //   division by (in proportion of) total of interchange and error
      dr0_x += v0xR / totalVel_x * excess;
      dr1_x += v1xR / totalVel_x * excess;
      */

      // revert initial rotation (definitives results pre and post error)
      p0.vel_x = v0xR * cosAC - v0yR * sinAC;
      p0.vel_y = v0yR * cosAC + v0xR * sinAC;
      p1.vel_x = v1xR * cosAC - v1yR * sinAC;
      p1.vel_y = v1yR * cosAC + v1xR * sinAC;
    } 

    // movment <-- final update of balls position
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