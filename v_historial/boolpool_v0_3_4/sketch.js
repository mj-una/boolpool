/////////////////////////////////////////////////////////////////////////////////
// PoolBool v0.3.4
// intento de usar p5.vector pero las operaciones son muy limitadas
// y entorpece la legibilidad para quien no maneja cada uno de los metodos
// 28-5-23

let renderSize = 400;

let internalSize = renderSize;

let circlesRatio = 1.2;
let colorContrast = 80;

let invVelLim = 20; // top limit in map() = size / maxVel --> its inversely proportional
let nextVelFac = 0.962; // next v = actual v * (1 - [friction as a percentage]) --> factor
  
let dm, p1, p0, prep, colis, evltr, table, curs;

const targets = [];
const pages = [];
const btn = [];

let nav = 1;
let motion = 0;
let turn = true;
let nrTurn = 1;

// MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM

function renderSetup() {
  dm.extSize();
  // DOM
}

function setup() {
  
  dm = new Dimension(internalSize, circlesRatio, colorContrast, invVelLim);
  
  renderSetup();
  createCanvas(dm.size, dm.size);
  
  noCursor();
  
  p1 = new Player(true);
  p0 = new Player(false);
  colis = new Collision();
  evltr = new Evaluator();
  table = new Table();
  curs = new DotCursor();
  
  // 0 UL, 1 UR, 2 DR, 3 DL
  for (let i = 0; i < 4; i++) {
    targets[i] = new Target(i);  
  }
  
  // 0 intro, 1 game, 2 menu, 3 info2, 4 opc2, 5 tutor, 6 info1, 7 opc1*, 8 opc1, 9 vict
  for (let i = 0; i < 10; i++) { 
    pages[i] = new Page(i);
  }
  
  // 0 all, 1 central, 2 left, 3 right
  for (let i = 0; i < 4; i++) {
    btn[i] = new Buton(i);
  }
}

// MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM

function draw() {
  
  if (nav == 1) {
    if (motion == 1) prep.update();
    else if (motion == 2) {
      p1.update(nextVelFac);
      p0.update(nextVelFac);
      colis.player();
      colis.target(); 
      evltr.velOver();
    } 
    else if (motion == 3) {
      if (evltr.maxScore) nav = 9;
      else target.update();
      motion = 0;
      nrTurn++;
    }
    table.update();
    table.display();
    if (motion == 1) prep.display(turn);
    btn[2].display(nav);
    btn[3].display(nav);
  }
  else {
    pages[nav].display();
  }
  //////////
  test();
  curs.display();
}

// MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM

function mousePressed() {
  if (nav == 1) {
    if (motion == 0 && evltr.isBtn(0)) {
      prep = new Prepare();
      motion = 1;
    }
  }
    /*
    if (btn[2].is()) pages[nav].btn2p();
    else if (btn[3].is()) pages[nav].btn3p();
    else if (motion == 0 && btn[0].is()) {
      prep = new Prepare();
      motion = 1;
    }
    */
    /*
  else {
    if (evltr.isBtn(1)); // (nav?) si click sobre boton
    if (btn[2].is) btn[2].isP(nav);
    if (btn[3].is) btn[3].isP(nav);
  }*/
}

function mouseReleased() { 
  if (nav == 1) {
    if (motion == 1) {
      if (!prep.cancel) prep.defShot(turn);
      motion = 2;
    }
  }
    /*
    else if (btn[3].is()) nav = 6;
    else if (motion == 0 && btn[0].is()) {
      prep = new Prepare();
      motion = 1;
    }
  }
  else {
    if (btn[1].is && btn[1].wP) pages[nav].btn1();
    if (btn[2].is && btn[2].wP) pages[nav].btn2();
    if (btn[3].is && btn[3].wP) pages[nav].btn3();
  }*/
}

function mouseMoved() {
  //motion = 0; ////////////////// TEST
  curs.mov();
}

// MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
  
function test() {
  push();
  background(220);
  dm.pulp();
  for (let i = 0; i < 4; i++) {
    targets[i].display();  
  }
  p1.display();
  p0.display();
  if (motion == 1) prep.display(turn);
  
  fill(0);
  textSize(15);
  text("p1.v.x: " + p1.av.x + "   p1.v.y: " + p1.av.y, 30, 340);
  text("p0.v.x: " + p0.av.x + "   p0.v.y: " + p0.av.y, 30, 380);
  pop();
}


