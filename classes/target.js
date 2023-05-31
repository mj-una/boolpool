class Target {
  
  constructor(n) {
    
    if (n <= 1) this.state = true;
    else this.state = false;

    this.collisioned = false;

    if (n == 0) {
      this.x = dm.size / 10;
      this.y = dm.size / 10;
    }

    else if (n == 1) {
      this.x = dm.size - dm.size / 10;
      this.y = dm.size / 10;
    }

    else if (n == 2) {
      this.x = dm.size - dm.size / 10;
      this.y = dm.size - dm.size / 10;
    }

    else if (n == 3) {
      this.x = dm.size / 10;
      this.y = dm.size - dm.size / 10;
    }

  }

  collision(a, b, c) {

    if (targets[a].state && dist(b, c, p1.pos_x, p1.pos_y) <=
    (dm.rBall + dm.rTarg)) {
      if (turn) {
        p1.scoreOf2++;
        p1.scoreOf4++;
      }
      targets[a].state = false;
      targets[a].collisioned = true;
    }
      
    else if (targets[a].state && dist(b, c, p0.pos_x, p0.pos_y) <=
    (dm.rBall + dm.rTarg)) {
      if (!turn) {
        p0.scoreOf2++;
        p0.scoreOf4++;
      }
      targets[a].state = false;
      targets[a].collisioned = true;
    }
  }

  update() {
    
    this.missing = [];
    this.options = [];
    this.first = false;
    
    for (this.i = 0; this.i < 4; this.i++) {
      areas[this.i].obstruction(this.i);
      if (targets[this.i].collisioned) {
        this.missing.push(this.i);
      }
    }
      
    if (this.missing.length == 1){
   
      for (this.j = 0; this.j < 2; this.j++) {
        if (areas[this.j].free) this.options.push(this.j);
      }
  
      if (this.options.length == 2) {
        if (randomTargets) {
          if (random(10) % 2 == 0) this.first = true;
          if (this.first) targets[this.options[0]].state = true;
          else targets[this.options[1]].state = true;
        }
        //else BOOL DECISION 1B3D 
      }

      else if (this.options.length == 1) {
        targets[this.options[0]].state = true;
      }

      else if (this.options.length == 0) {
        targets[this.missing[0]].state = true;
      }
    }

    else if (this.missing.length == 2){

      for (this.k = 0; this.k < 2; this.k++) {
        if (areas[this.k].free) this.options.push(this.k);
      }

      if (this.options.length == 2){
        for (this.m = 0; this.m < 4; this.m++) {
          if (!targets[this.m].collisioned) targets[this.m].state = true;
        }
      }

      else if (this.options.length == 1){
        if (randomTargets) {
          targets[this.options[0]].state = true;
          if (random(10) % 2 == 0) this.first = true;
          if (this.first) targets[this.collisioned[0]].state = true;
          else targets[this.collisioned[1]].state = true;
        }
        //else BOOL DECISION 1B3D
      }

      else if (this.options.length == 0){
        targets[this.collisioned[0]].state = true;
        targets[this.collisioned[1]].state = true;
      }
    }

    this.collisioned = false;
  }

  display(p, q) {
    if (this.state) {
      fill(0, 100);
      circle(p, q, dm.dTarg);
    }
  }
}