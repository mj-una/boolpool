class Area {

   constructor(n) {

      this.free = true;

      if (n == 0) {
         this.x = 0;
         this.y = 0;
      }

      else if (n == 1) {
         this.x = dm.size;
         this.y = 0;
      }

      else if (n == 2) {
         this.x = dm.size;
         this.y = dm.size;
      }

      else if (n == 3) {
         this.x = 0;
         this.y = dm.size;
      }
   
   }

   obstruction(a) {
      
      if (dist(areas[a].x, areas[a].y, p1.pos_x, p1.pos_y) <
         (dm.rBall + dm.rArea)) {
         areas[a].free = false;}
      else if (dist(areas[a].x, areas[a].y, p0.pos_x, p0.pos_y) <
         (dm.rBall + dm.rArea)) {
         areas[a].free = false;}
      else areas[a].free = true;
   }
}