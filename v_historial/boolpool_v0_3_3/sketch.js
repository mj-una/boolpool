let sizeOut;

let sizeIn = sizeOut;
let ratio = 1.2;
let contrast = 80;

let maxVel = 20; // limit in map() = size / maxVel --> maxVel is inversely proportional
let nextVel = 0.962; // nextVel = actualVel * (1 - frictionAsPercentage)

let dim, p1, p0, curs;

let targets = [];
let pages = [];

let nav = 0;
let turn, motion;

function contextSetup() {
  // html get element by id style
}

function setup() {
  
  //dim = new Dimension(contrast, ratio, sizeIn);
  dim = new Dimension();
  contextSetup(dim.size);
  
  createCanvas(dim.size, dim.size);
 
  p1 = new Player(true);
  p0 = new Player(false);
  curs = new Mouse();
  
  for (let i = 0; i < 4; i++) {
    targets[i] = new Target(i);  
  }
  
  // 0 intro, 1 game, 2 menu, 3 info2, 4 opc2, 5 tutor, 6 info1, 7 opc1a, 8 opc1b, 9 vict
  for (let i = 0; i < 10; i++) { 
    pages[i] = new Page(i);
  }
  
  turn = true;
  motion = 0;
}

function draw() {
  if (nav == 1) {
    if (motion == 1) {
      if (turnCheck) pre.update(maxVel);
      else pre.update(maxVel); // input1B3D ***
    } 
    else if (motion == 2) {
      p1.update(nextVel);
      p0.update(nextVel);
      if (isCollisionPlayer()) collisionPlayer();
      if (isCollsionTarget()) collisionTarget(); 
      if (isVelMin()) motion = 3;
    } 
    else if (motion == 3) {
      if (p0.victory || p0.victory) nav = 9;
      else target.update();
      // output1B3D ***
      motion = 0;
    }
    table.update();
    table.display();
    p0.display();
    p1.display();
    if (motion == 1) pre.display();
    mouse.display();
  }
  else {
    pages[nav].display();
  }
}

function mousePressed() {
  if (nav == 1) {
    if (motion == 0 && isCanvas()) motion = 1;
    else if (isBtnL) nav = 5;
    else if (isBtnR) nav = 6;
  }
  else {
    if (isBtnC) pages[nav].btnC();
    if (isBtnL) pages[nav].btnL();
    if (isBtnR) pages[nav].btnR();
  }
}

function mouseReleased() {
  motion = 2;
}

function isCollisionPlayer() {
  if (dist(p1.pos, p0.pos) < dim.ballDiameter) return true;
  else return false;
}

function collisionPlayer() {
  
  
}

function isCollsionTarget() {
  if (p1.isTrgt() || p0.isTrgt()) return true;
  else return 0;
}

function collisionTarget() {
  let col1, col0;
  col1 = p1.trgt();
  col0 = p0.trgt();
}
  
function isVelMin() {
  if (p1.vel == 0 && p0.vel == 0) return true;
  else return false;
}

function isCanvas() {
  if (mouseX > 0 && mouseX < dim.size && mouseY > 0 && mouseY < dim.size) return true;
  else return false; 
}
  
function isBtnC() {
  if (mouseX > 0 && mouseX < dim.size && mouseY > 0 && mouseY < dim.size) return true;
  else return false;
}
  
function isBtnL() {
  if (mouseX > 0 && mouseX < dim.size && mouseY > 0 && mouseY < dim.size) return true;
  else return false;
}
  
function isBtnR() {
  if (mouseX > 0 && mouseX < dim.size && mouseY > 0 && mouseY < dim.size) return true;
  else return false;
}

  


