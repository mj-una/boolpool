/* * BOOL POOl v0.4 * * * * * * * * * * * * * * * * * * * * * * * * * * *   --> a
 *   ___________________________________________________________                n
 *    __/\\\\\\\\\\\\\________________________________/\\\\\\____               c
 *     _\/\\\/////////\\\_____________________________\////\\\____              h
 *      _\/\\\_______\/\\\________________________________\/\\\____             o
 *       _\/\\\\\\\\\\\\\\______/\\\\\________/\\\\\_______\/\\\____
 *        _\/\\\/////////\\\___/\\\///\\\____/\\\///\\\_____\/\\\____           p
 *         _\/\\\_______\/\\\__/\\\__\//\\\__/\\\__\//\\\____\/\\\____          a
 *          _\/\\\_______\/\\\_\//\\\__/\\\__\//\\\__/\\\_____\/\\\____         n
 *           _\/\\\\\\\\\\\\\/___\///\\\\\/____\///\\\\\/____/\\\\\\\\\_        t
 *            _\/////////////_______\/////________\/////_____\/////////__       a
 *             ___________________________________________________________      l
 *   ___________________________________________________________                l
 *    __/\\\\\\\\\\\\\________________________________/\\\\\\____               a
 *     _\/\\\/////////\\\_____________________________\////\\\____
 *      _\/\\\_______\/\\\________________________________\/\\\____             d
 *       _\/\\\\\\\\\\\\\/______/\\\\\________/\\\\\_______\/\\\____            e
 *        _\/\\\/////////______/\\\///\\\____/\\\///\\\_____\/\\\____           l
 *         _\/\\\______________/\\\__\//\\\__/\\\__\//\\\____\/\\\____
 *          _\/\\\_____________\//\\\__/\\\__\//\\\__/\\\_____\/\\\____         e
 *           _\/\\\______________\///\\\\\/____\///\\\\\/____/\\\\\\\\\_        d
 *            _\///_________________\/////________\/////_____\/////////__       i
 *             ___________________________________________________________      t
 *                                    2 5 O 2 5                                 o
 *    .    .    .    .    .   oo°l.oo  oo°l.oo  oo°l.oo  .    .    .    .    .  r
 
 
 *//////////////////////////////////////// , \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// BOOL POOl v0.4
// Martin Julio
// 11-12-23


/*

  PRESENTACION
  
  Inspirado por texto de Olia Lialina "Usuaria Turing Completa" (2012) 
  https://endefensadelsl.org/usuaria_turing_completa.pdf

  FISICA
  
  Para resolver las colisiones de las bolas en dos dimensiones utilicé un 
  algoritmo publicado por Keith Peters en "Foundation HTML5 Animation with
  JavaScript" (2011), explicado por Long Nguyen en este video de su canal
  de youtube: https://youtu.be/guWIF87CmBg

  Como se detalla ahí, el algoritmo permite simplificar las dos dimensiones
  mediante una rotacion en la que se establece como eje x a la linea que une
  los centros de las dos particulas en colision. Las velocidades en y se
  mantienen constantes ya que inciden perpendicularmente y no afectan ni es
  afectadaas por las otras fuerzas. Las velocidades en x se resuleven como una
  colision de una sola dimmension. En este caso las masas de las bolas es la
  misma y no cambia por lo que el calculo se reduce a intercambiar las
  velocidades de una particula a la otra. Luego se revierte la rotacion y se
  calculan las velocidades definitivas para x e y. 
      
 */


                              /*   __. o .__   */
                           /*  Variables Globales  */


let arialBold_d12; // width = 600 --> textSize = 50
let arial_d15; // width = 600 --> textSize = 40
let fondoMenu; // --> guardarFondo()

let pantalla; // [0]Juego, [1]Intro , [2]Menu, [3]Instrucciones, [4]Victoria

let inputPre = false; // boton interfaz

let contDesvan; // contador de desvanecimiento del mouse reposo --> hasta valorT
let ultMous; // guarda tiempo del ultimo movimiento del mouse --> mouseMoved()

let turno, primerTiro; // turnos:   true = p0   false = p1
let tiroPre, tiroPost, cancelar; // estado turno y estados tiro

let entrada_x, entrada_y; // captura inicio de movimiento --> mousePressed()
let distMira; // para dibujo

let p0_x, p0_y, p1_x, p1_y; // posicion bola p0 y p1
let v0_x, v0_y, v1_x, v1_y; // velocidad bola p0 y p1

let angulo0; // direccion p0
let angulo1; // direccion p1

let mSI, mSD, mII, mID; // estado manzanas
let m1a, m2a; // indice manzanas activas

let puntaje0A, puntaje1A; // cantidad de manzanas comidas en un solo tiro
let puntaje0B, puntaje1B; // cantidad de manzanas comidas en total

let victoria0, victoria1; // estado victoria

let voz, fin;
let inicial = true;
let cambio = true;


                           /*_ _ _ _ ""><"" _ _ _ _*/
                              /*_ Constantes _ */
                              

// variable provisoria width
const med = 800; // --> actualizar segun width

// posiciones manzanas
const mSI_x = med / 10;
const mSI_y = med / 10;
const mSD_x = med - med / 10;
const mSD_y = med / 10;
const mII_x = med / 10;
const mII_y = med - med / 10;
const mID_x = med - med / 10;
const mID_y = med - med/ 10;

const RC5 =  2.236; // raiz de 5

// diametros
const tamCiFo = med / RC5 * 1.2; // --> width / RC5 * 1.2
const tamBola = tamCiFo / RC5;
const tamManz = tamBola / RC5;
const tamCurs = tamManz / RC5;

const valor0 = 80; // color oscuro
const valor1 = 170; // color claro
const valorT = 129; // transparencia

// velocidad
const velMax = med / 20; // --> width / 20
const roce = 3.8; // --> porcentaje de velocidad que se resta cada frame
//                             [entre 3.0% y 5.0%]


                             /* _ _._.oOOo._._ _*/
//-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
//+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
//-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

function preload() {

  arialBold_d12 = loadFont("fonts/arialbd.ttf");
  arial_d15 = loadFont("fonts/arial.ttf");

  voz = loadSound("audio/audio.mp3");
  voz.pause();
  
  fin = loadSound("audio/loop.mp3");
  fin.pause();
}


function setup() {

  createCanvas(800, 800);
  windowResized();

  textFont(arialBold_d12, round(width / 12));

  noCursor();
  textAlign(CENTER);
  
  contDesvan = 0;

  turno = true; // true = p0   false = p1
  primerTiro = true;
  tiroPre = false;
  tiroPost = false;
  cancelar = false;

  // inicializar posicion p0 y p1
  p0_x = width / 2;
  p0_y = height * 3 / 4;
  p1_x = width / 2;
  p1_y = height / 2;

  v0_x = 0;
  v0_y = 0;
  v1_x = 0;
  v1_y = 0;

  // manzanas activas
  mSI = true;
  mSD = true;
  mII = false;
  mID = false;
  
  m1a = 1;
  m2a = 2;

  puntaje0A = puntaje1A = 0;
  puntaje0B = puntaje1B = 0;
  victoria0 = victoria1 = false;

  pantalla = 2; // menu
}

                           
                              /**************************/
//-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
//+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
//-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-


function draw() {

  //                    -----------( OPACIDAD MOUSE )------------

  if ((millis() - ultMous < 300) || tiroPre) contDesvan = 0;
  else {
    if (contDesvan < valorT) contDesvan ++;
    else contDesvan = valorT;
  }
  
  ///////////////////////  
  ///////////////////////
  // SWITCH PRINCIPAL  //
  if (pantalla == 0) { // ----------------------------------- [0]
    //                  -------------< <  JUEGO  > >-------------
    //                  -----------------------------------------

    //                  --------------- bloque 1 ----------------
    //                  ---------(((( PREPARAR TIRO ))))---------

    if (tiroPre) { // --> mousePressed();
      
      // VARIABLES LOCALES
      
      let distMouse;
      let anguloMouse;

      // CALCULO ANGULO
      
      push();
      translate(entrada_x, entrada_y);
      anguloMouse = atan2(mouseY - entrada_y, mouseX - entrada_x);
      pop();

      // CALCULO FUERZA
      
      distMouse = dist(mouseX, mouseY, entrada_x, entrada_y);

      if (distMouse <= tamBola / 2) cancelar = true;
      else cancelar = false;

      if (distMouse >= width / 3) distMouse = width / 3;
      
      distMira = distMouse;
      
      distMouse = map(distMouse, tamBola * 2 / 5, width / 3, 0, velMax);
      
      // ASIGACION VALORES
      
      if (turno) {
        angulo0 = anguloMouse;
        v0_x = -cos(angulo0) * distMouse;
        v0_y = -sin(angulo0) * distMouse;
      }
      else {
        angulo1 = anguloMouse;
        v1_x = -cos(angulo1) * distMouse;
        v1_y = -sin(angulo1) * distMouse;
      }
    
    } //--cierra if tiroPre

    //                  --------------- bloque 2 ----------------
    //                  ---------(((( REALIZAR TIRO ))))---------

    if (tiroPost) { // --> mouseReleased();
    
      // ROCE ______________________________________ blq2 parte 1 

      v0_x *= (100 - roce) / 100.0;
      v0_y *= (100 - roce) / 100.0;
      v1_x *= (100 - roce) / 100.0;
      v1_y *= (100 - roce) / 100.0;
      
      // AUXILIAR DE POSICION
      
      let aup0_x = p0_x + v0_x;
      let aup0_y = p0_y + v0_y;    
      let aup1_x = p1_x + v1_x;
      let aup1_y = p1_y + v1_y;
      
      let radio = tamBola / 2;

      // COLISION BORDES ___________________________ blq2 parte 2
      
      if (aup0_x <= radio || aup0_x >= width - radio) {
        if (aup0_x <= radio) aup0_x = radio;
        else aup0_x = width - radio;
        angulo0 = atan2(-v0_y, v0_x);
        v0_x = -v0_x;
      }
      
      if (aup0_y <= radio || aup0_y >= height - radio) {
        if (aup0_y <= radio) aup0_y = radio;
        else aup0_y = height - radio;
        angulo0 = atan2(v0_y, -v0_x);
        v0_y = -v0_y;
      }
      
      if (aup1_x <= radio || aup1_x >= width - radio) {
        if (aup1_x <= radio) aup1_x = radio;
        else aup1_x = width - radio;
        angulo1 = atan2(-v1_y, v1_x);
        v1_x = -v1_x;
      }
      
      if (aup1_y <= radio || aup1_y >= height - radio) {
        if (aup1_y <= radio) aup1_y = radio;
        else aup1_y = height - radio;
        angulo1 = atan2(v1_y, -v1_x);
        v1_y = -v1_y;
      }
      
      // COLISION BOLAS ____________________________ blq2 parte 3
      
      if (dist(aup0_x, aup0_y, aup1_x, aup1_y) <= tamBola) {
        
        // angulo colision
        let angCol = atan2(aup0_y - aup1_y, aup0_x - aup1_x);
        let cosAC = cos(angCol);
        let sinAC = sin(angCol);
        
        // rotatar velocidades (entrada)
        let v0_xR = v0_x * cosAC + v0_y * sinAC;
        let v0_yR = v0_y * cosAC - v0_x * sinAC;
        let v1_xR = v1_x * cosAC + v1_y * sinAC;
        let v1_yR = v1_y * cosAC - v1_x * sinAC;
        
        // intercambio de velocidades en x
        const v0_xRc = (v0_xR + 2 * v1_xR) / 2; // --> [*]AUXILIAR para v0
        v1_xR = (v1_xR + 2 * v0_xR) / 2; // calculo de v1 usando v0 original
        v0_xR = v0_xRc; // actualizar v0
        
 /*     // solucion error de sobreposicionamieto
        // *primero: establecer distancia entre p0 y p1 (con p0 como origen)
        //  rotando de acuerdo a angulo de colision
        let dr0_x = 0, dr0_y = 0;
        let dr1_x = (aup0_x - aup1_x) * cosAC + (aup0_y - aup1_y) * sinAC;
        let dr1_y = (aup0_y - aup1_y) * cosAC - (aup0_x - aup1_x) * sinAC;        
        // *segundo: calcular velocidad total intercambiada
        let sumaVel_x = abs(v0_xR) + abs(v1_xR);
        // *tercero: calcular error total de sobreposicionamiento
        let exceso = 2 * tamBola - abs(dr1_x);
        // *cuarto: actualizar distancia x sumando velocidad corregida de acuerdo
        //  a division por (en proporcion de) inetercambio total y error total
        dr0_x += v0_xR / sumaVel_x * exceso;
        dr1_x += v1_xR / sumaVel_x * exceso;
        // *quinto y final: revertir rotacion en distancias corregidas
        //  y sumarlas a las posiciones resultantes de la colision (pre error)
        aup0_x += dr0_x * cosAC - dr0_y * sinAC;
        aup0_y += dr0_y * cosAC + dr0_x * sinAC;
        aup1_x += dr1_x * cosAC - dr1_y * sinAC;
        aup1_y += dr1_y * cosAC + dr1_x * sinAC;      */
        
        // revertir rotacion de entrada (resultados definitivos pre y post error)
        v0_x = v0_xR * cosAC - v0_yR * sinAC;
        v0_y = v0_yR * cosAC + v0_xR * sinAC;
        v1_x = v1_xR * cosAC - v1_yR * sinAC;
        v1_y = v1_yR * cosAC + v1_xR * sinAC;
        
      } //--cierra if colision bolas
        
      // MOVIMIENTO ________________________________ blq2 parte 4
      
      p0_x += v0_x;
      p0_y += v0_y;
      p1_x += v1_x;
      p1_y += v1_y;
      
      // COLISION MANZANAS _________________________ blq2 parte 5

      let sigM = 0;
      let dobM = 0;
      
      // superior izq
      if (mSI && dist(mSI_x, mSI_y, p0_x, p0_y) < (tamBola + tamManz) / 2) {
        if (turno) {
          puntaje0A++;
          puntaje0B++;
        }
        mSI = false;
        if (sigM != 0) dobM = 1;
        sigM = 1;
      }
      if (mSI && dist(mSI_x, mSI_y, p1_x, p1_y) < (tamBola + tamManz) / 2) {
        if (!turno) {
          puntaje1A++;
          puntaje1B++;
        }
        mSI = false;
        if (sigM != 0) dobM = 1;
        sigM = 1;
      }
      
      // superior der
      if (mSD && dist(mSD_x, mSD_y, p0_x, p0_y) < (tamBola + tamManz) / 2) {
        if (turno) {
          puntaje0A++;
          puntaje0B++;
        }
        mSD = false;
        if (sigM != 0) dobM = 2;
        sigM = 2;
      }
      if (mSD && dist(mSD_x, mSD_y, p1_x, p1_y) < (tamBola + tamManz) / 2) {
        if (!turno) {
          puntaje1A++;
          puntaje1B++;
        }
        mSD = false;
        if (sigM != 0) dobM = 2;
        sigM = 2;
      }
      
      // inferior izq
      if (mII && dist(mII_x, mII_y, p0_x, p0_y) < (tamBola + tamManz) / 2) {
        if (turno) {
          puntaje0A++;
          puntaje0B++;
        }
        mII = false;
        if (sigM != 0) dobM = 3;
        sigM = 3;
      }
      if (mII && dist(mII_x, mII_y, p1_x, p1_y) < (tamBola + tamManz) / 2) {
        if (!turno) {
          puntaje1A++;
          puntaje1B++;
        }
        mII = false;
        if (sigM != 0) dobM = 3;
        sigM = 3;
      }
      
      // inferior der
      if (mID && dist(mID_x, mID_y, p0_x, p0_y) < (tamBola + tamManz) / 2) {
        if (turno) {
          puntaje0A++;
          puntaje0B++;
        }
        mID = false;
        if (sigM != 0) dobM = 4;
        sigM = 4;
      }
      if (mID && dist(mID_x, mID_y, p1_x, p1_y) < (tamBola + tamManz) / 2) {
        if (!turno) {
          puntaje1A++;
          puntaje1B++;
        }
        mID = false;
        if (sigM != 0) dobM = 4;
        sigM = 4;
      }  
      
      // NUEVA MANZANA _____________________________ blq2 parte 6
      
      // revisa si hay alguna activa
      if (mSI) m1a = 1;
      else if (mSD) m1a = 2;
      else if (mII) m1a = 3;
      else if (mID) m1a = 4;
      
      if (mSI && m1a != 1) m2a = 1;
      else if (mSD && m1a != 2) m2a = 2;
      else if (mII && m1a != 3) m2a = 3;
      else if (mID && m1a != 4) m2a = 4;
      
      // cambio doble manzana sin victoria
      if (dobM != 0 && !victoria0 && !victoria1) {
        
        for (let aufD = 1; aufD <= 4; aufD++) {
            if (aufD != dobM && aufD != sigM) m1a = aufD;
            if (aufD != m1a && aufD != dobM && aufD != sigM) m2a = aufD;
        }
      }
      
      // cambio una sola manzana
      let saltar;
      let saltada = 0;
      
      if (random (10) % 2 == 0) saltar = true;
      else saltar = false;
      
      if (sigM != 0 && !victoria0 && !victoria1) {
        for (let aufS = 1; aufS <= 4; aufS++) {
          if (aufS != m1a && aufS != sigM) {
            if (!saltar) m2a = aufS;
            else {
              saltada = aufS;
              saltar = false;
            }
          }
        }
        
        if ( saltada == 0) saltada = 4;
      }
      
      // VICTORIA __________________________________ blq2 parte 7
      
      if (puntaje0A >= 2 || puntaje0B >= 4) victoria0 = true;
      else if (puntaje1A >= 2 || puntaje1B >= 4) victoria1 = true;
      
      // FINALIZAR TIRO ____________________________ blq2 parte 8
      
      if (abs(v0_x) <= 0.08) v0_x = 0;
      if (abs(v0_y) <= 0.08) v0_y = 0;
      if (abs(v1_x) <= 0.08) v1_x = 0;
      if (abs(v1_y) <= 0.08) v1_y = 0;
      
      if (v0_x == 0 && v0_y == 0 && v1_x == 0 && v1_y == 0) {
        tiroPost = false;
        if (victoria0 || victoria1) pantalla = 4;
        else {
          // delay(400);
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
          
          // superior der
          if (mSD && (dist(mSD_x, mSD_y, p0_x, p0_y) < (tamBola + tamManz) / 2 
          || dist(mSD_x, mSD_y, p1_x, p1_y) < (tamBola + tamManz) / 2)) {
            if (dobM == 0) {
              if (saltada == 1) mSI = true;
              if (saltada == 3) mII = true;
              if (saltada == 4) mID = true;
            }
            else {
              if (sigM == 1 || dobM == 1) mSI = true;
              else mSI = false;
              if (sigM == 3 || dobM == 3) mII = true;
              else mII = false;
              if (sigM == 4 || dobM == 4) mID = true;
              else mID = false;
            }
            mSD = false;
          }
          
          // inferior izq
          if (mII && (dist(mII_x, mII_y, p0_x, p0_y) < (tamBola + tamManz) / 2 
          || dist(mII_x, mII_y, p1_x, p1_y) < (tamBola + tamManz) / 2)) {
            if (dobM == 0) {
              if (saltada == 1) mSI = true;
              if (saltada == 2) mSD = true;
              if (saltada == 4) mID = true;
            }
            else {
              if (sigM == 1 || dobM == 1) mSI = true;
              else mSI = false;
              if (sigM == 2 || dobM == 2) mSD = true;
              else mSD = false;
              if (sigM == 4 || dobM == 4) mID = true;
              else mID = false;
            }
            mII = false;
          }
          
          // inferior der
          if (mID && (dist(mID_x, mID_y, p0_x, p0_y) < (tamBola + tamManz) / 2
          || dist(mID_x, mID_y, p1_x, p1_y) < (tamBola + tamManz) / 2)) {
            if (dobM == 0) {
              if (saltada == 1) mSI = true;
              if (saltada == 2) mSD = true;
              if (saltada == 3) mII = true;
            }
            else {
              if (sigM == 1 || dobM == 1) mSI = true;
              else mSI = false;
              if (sigM == 2 || dobM == 2) mSD = true;
              else mSD = false;
              if (sigM == 3 || dobM == 3) mII = true;
              else mII = false;
            }
            mID = false;
          }
        } //--cierra else (no victoria)
        
      } //--cierra if fin tiro (vels == 0)
      
    } //--cierra if tiroPost
    
  
    //                  --------------- bloque 3 ----------------
    //                  ------------(((( DIBUJO ))))-------------
    
    // fondo
    noFill();
    strokeWeight(width / 100);
    
    if (turno) {
      stroke(valor0);
      background(valor1);
    
      circle(0, 0, tamCiFo);
      circle(0, height, tamCiFo);
      circle(width, 0, tamCiFo);
      circle(width, height, tamCiFo);
    }
    else {
      stroke(valor1);
      background(valor0);
    
      circle(0, 0, tamCiFo);
      circle(0, height, tamCiFo);
      circle(width, 0, tamCiFo);
      circle(width, height, tamCiFo);   
    }
    
    // turno
    textFont(arial_d15, round(width / 15));
    textSize(width / 20);
    noStroke();
    if (turno) {
      fill(valor0, valorT);
      if (puntaje0B >= 1) {
        text("puntos P0: " + puntaje0B, width / 2, height - height / 20);
      }
      else {
        text("turno P0", width / 2, height - height / 20);
      }
    }
    else {
      fill(valor1, valorT);
      if (puntaje1B >= 1) {
        text("puntos P1: " + puntaje1B, width / 2, height - height / 20);
      }
      else {
        text("turno P1", width / 2, height - height / 20);
      }
    }
    text("Bool Pool v0.4", width / 2, height / 12);
    
    // manzanas
    noStroke();
    if (turno) fill(valor0, 255 - valorT + valorT*(sin(frameCount /25.0) + 1) /2);
    else fill(valor1, 255 - valorT + valorT*(sin(frameCount / 25.0) + 1) /2);
    
    if (mSI) circle(mSI_x, mSI_y, tamManz);
    if (mSD) circle(mSD_x, mSD_y, tamManz);
    if (mII) circle(mII_x, mII_y, tamManz);
    if (mID) circle(mID_x, mID_y, tamManz);
    
    // mira
    if (tiroPre) {
      stroke(turno ? valor0 : valor1, cancelar ? valorT : 255);
      strokeWeight(width / 100);
      line(mouseX, mouseY, entrada_x, entrada_y);
      
      noFill();
      stroke(turno ? valor0 : valor1, cancelar ? valorT : 255);
      strokeWeight(width / 120);
      circle(entrada_x, entrada_y, distMira * 2);
    }
    
    // bolas
    strokeWeight(width / 100);
    if (turno) {
      fill(valor0, 255 - valorT + valorT * (-sin(frameCount / 25.0) + 1) / 2);
      noStroke();
      if (tiroPre || tiroPost) fill(valor0);
    }
    else {
      stroke(valor1);
      noFill();
    }
    circle(p0_x, p0_y, tamBola); // p0
    
    if (!turno) {
      fill(valor1, 255 - valorT + valorT * (-sin(frameCount / 25.0) + 1) / 2);
      noStroke();
      if (tiroPre || tiroPost) fill(valor1);
    }
    else {
      stroke(valor0);
      noFill();
    }
    circle(p1_x, p1_y, tamBola); // p1
    
    // nombres
    textFont(arialBold_d12, round(width / 12));
    noStroke();
    if (turno) {
      fill(valor1);
      text("P0", p0_x, p0_y + width * 2 / 75);
      if (primerTiro) {
        fill(valor0);
        text("P1", p1_x, p1_y + width * 2 / 75);
      }
    }
    else {
      fill(valor0);
      text("P1", p1_x, p1_y + width * 2 / 75);
    }
    
    // INICIO AUDIO
    
    if (inicial) {
      voz.play();
      inicial = false;
    }

  } // cierra pantalla 0
  
  else if (pantalla == 2) { // ------------------------------ [2]
    //                  ---------------< < MENU > >--------------
    //                  -----------------------------------------
    
    // fondo
    push();
    background(valor1);
    
    strokeWeight(width / 120);
    stroke(valor0);
    fill(valor0);
    circle(width / 2.575, width / 4.444, width * 13 / 60);
    circle(width / 2.575, width / 2.105, width * 13 / 60); 
    circle(width / 1.579, width / 4.444, width * 13 / 60);
    circle(width / 1.579, width / 2.105, width * 13 / 60); 
    
    noStroke();
    textFont(arialBold_d12, round(width / 12));
    textSize(width * 9 / 30);
    textAlign(LEFT);
    text("B", width * 4 / 60, height * 20 / 60);
    text("P", width * 4.5 / 60, height * 35 / 60);
    textAlign(RIGHT);
    text("L", width * 56 / 60, height * 20 / 60);
    text("L", width * 56 / 60, height * 35 / 60);
    
    // circulos moviles
    fill(valor1, valorT + valorT * (-sin(frameCount / 25.0) + 1) / 2);
    noStroke();
    
    let tx, ty;
    tx = map(mouseX, 0, width, -width / 34, width / 34);
    ty = map(mouseY, 0, height, -width / 34, width / 34);
    
    circle(width / 2.575 + tx, width / 4.444 + ty, width * 8.5 / 60);
    circle(width / 2.575 + tx, width / 2.105 + ty, width * 8.5 / 60); 
    circle(width / 1.579 + tx, width / 4.444 + ty, width * 8.5 / 60);
    circle(width / 1.579 + tx, width / 2.105 + ty, width * 8.5 / 60); 
    
    // boton
    stroke(valor0);
    strokeWeight(width / 120);
    if (inputPre || (mouseX >= width / 3 && mouseX <= width * 2 / 3 &&
    mouseY >= height * 3 / 4 && mouseY <= height * 3 / 4 + height / 9)) {
      fill(valor0, valorT);
    }
    else fill(valor0, valorT - valorT * (sin(frameCount / 25.0) + 1) / 2);
    rect(width / 3, height * 3 / 4, width / 3, height / 9);
    
    fill(valor0);
    noStroke();
    textFont(arialBold_d12, round(width / 12));
    textAlign(CENTER);
    text("jugar", width / 2, height * 33 / 40);
    
    // firma
    fill(valor0, valorT);
    textFont(arial_d15, round(width / 15));
    textSize(width / 24);
    text("Bool Pool v0.4 (11-12-23)", width / 2, height * 7.75 / 12);
    text("por Martin Julio", width / 2, height * 8.45 / 12);
    pop();
  }
  
  else if (pantalla == 3) { // ------------------------------ [3]
    //                  ----------< < INSTRUCCIONES > >----------
    //                  -----------------------------------------
    
    background(valor1);
    
    noStroke();
    textFont(arial_d15, round(width / 15));
    fill(valor0);
    textSize(width / 13.0);
    text("Hay dos formas de ganar", width / 2, height * 2 / 12);
    textSize(width / 16);
    text("Capturar 4 manzanas en total,", width / 2, height * 2.9 / 12);
    textSize(width / 16.6);
    text("o capturar las 2 manzanas de", width / 2, height * 3.8 / 12);
    text("la pantalla en un mismo tiro.", width / 2, height * 4.65 / 12);
    textSize(width / 14.8);
    text("Pero ¡ cuidado ! No regales", width / 2, height * 5.7 / 12);
    textSize(width / 16.9);
    text("oportunidades a tu oponente!!!", width / 2, height * 6.5 / 12);
    fill(valor0, valorT);
    textFont(arial_d15, round(width / 15));
    textSize(width / 24);
    text("Solo son válidas las manzanas capturadas", width/2, height * 7.75/12);
    text("durante el propio turno", width / 2, height * 8.45 / 12);
    
    stroke(valor0);
    strokeWeight(width / 120);
    if (inputPre || (mouseX >= width / 3 && mouseX <= width * 2 / 3 &&
    mouseY >= height * 3 / 4 && mouseY <= height * 3 / 4 + height / 9)) {
      fill(valor0, valorT);
    }
    else fill(valor0, valorT - valorT * (sin(frameCount / 25.0) + 1) / 2);
    rect(width / 3, height * 3 / 4, width / 3, height / 9);

    fill(valor0);
    noStroke();
    textFont(arialBold_d12, round(width / 12));
    text("~ ok ~", width / 2, height * 33.2 / 40);
  }
  
  else if (pantalla == 4) { // ------------------------------ [4]
    //                  -------------< < VICTORIA > >------------
    //                  -----------------------------------------
    
    if (victoria0) {
      background(valor1);
      stroke(valor0);
      fill(valor0);
      push();
      noStroke();
      textFont(arial_d15, round(width / 15));
      text("¡ Player 0 ha ganado !", width / 2, height / 2);
      pop();
    }
    else {
      background(valor0);
      stroke(valor1);
      fill(valor1);
      push();
      noStroke();
      textFont(arial_d15, round(width / 15));
      text("¡ Player 1 ha ganado !", width / 2, height / 2);
      pop();
    }
    
    strokeWeight(width / 120);
    if (inputPre || (mouseX >= width / 3 && mouseX <= width * 2 / 3 &&
    mouseY >= height * 3 / 4 && mouseY <= height * 3 / 4 + height / 9)) {
      fill(victoria0 ? valor0 : valor1, valorT);
    }
    else noFill();
    rect(width / 3, height * 3 / 4, width / 3, height / 9);
    fill(victoria0 ? valor0 : valor1);
    noStroke();
    text("menu", width / 2, height * 33 / 40); 
  }

  // DIBUJO CURSOR
  
  push();
  fill(turno ? valor0 : valor1, 255 - contDesvan);
  noStroke();
  circle(mouseX * 1.0, mouseY * 1.0, tiroPre ? tamCurs * RC5 / 2 : tamCurs);
  pop();

  // CAMBIO AUDIO

  if (cambio && voz.currentTime() >= voz.duration()) {
    voz.pause();
    fin.loop();
    cambio = false;
  }
}



//-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
//+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
//-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

function mousePressed() {
  if (pantalla == 0) {
    if (!tiroPost) {
      if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
        entrada_x = mouseX;
        entrada_y = mouseY;
        tiroPre = true;
      }
    }
  }
  
  else if (pantalla == 2 || pantalla == 3 || pantalla == 4){
    if (mouseX >= width / 3 && mouseX <= width * 2 / 3 &&
    mouseY >= height * 3 / 4 && mouseY <= height * 3 / 4 + height / 9) {
      inputPre = true;
    }
  }
}



//-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
//+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
//-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

function mouseReleased() {
  if (pantalla == 0) {
    if (tiroPre) {
      tiroPre = false;
      if (!cancelar) {
        tiroPost = true;
        if (primerTiro) primerTiro = false;
        // delay(100);
      }
    }
  }
  
  else if (pantalla == 2 || pantalla == 3 || pantalla == 4) {
    if (inputPre && mouseX >= width / 3 && mouseX <= width * 2 / 3 &&
    mouseY >= height * 3 / 4 && mouseY <= height * 3 / 4 + height / 9) {
      if (pantalla == 2) pantalla = 3;
      else if (pantalla == 3) {
        pantalla = 0;
      }
      else if (pantalla == 4) {
        setup();
        pantalla = 2;
      }
    }
    inputPre = false;
  }
}



//-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
//+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
//-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

function mouseMoved() {
  ultMous = millis(); // guarda tiempo de ultimo movimiento del mouse
  contDesvan = 0; // desactiva transparencia
}



//-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
//-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
//+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
//-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-++-+-
//+-+-+-+-+-+-+-++-+-+-+-
//-+-+-+-+-+-+-
//+-+-+-+-+
//-+-+-+-                         25O25
//+-+-+-
//-+-+-
//+-+-+    
//-+-+-    -          -         -                  -            +
//+-+--    --         --  -    --     -  - -      --     -  -   +
//-+-+--  ----  -   - -------  ---- -  -------     ---  --- -  -+
//+-+---- ----- -- ------------------ ---------- ---------------+
//-+----- ------------------------------------------------------+
//+------ -----------°*°*°- HERRAMIENTAS EXTRAS -°*°*°----------+
//-+----- ----------------------°*°O_o_O°*°---------------------+
//+------ ------------------------------------------------------+


function keyPressed() { // accesos por teclado

  if (key == '0') puntaje0B++;
  if (key == '1') puntaje1B++;
  if (key == '2') pantalla = 2;
  if (key == '3') pantalla = 3;
  if (key == '4') pantalla = 4;
  if (key == 't' || key == 'T') turno = !turno;
  if (key == 'k' || key == 'K') noLoop(); 
  if (key == 'l' || key == 'L') loop(); 
}



function windowResized() {

  let pag = document.getElementsByTagName("body")[0];
  let cnv = document.getElementById("defaultCanvas0");
  let mrg = 5;

  pag.style.backgroundColor = "hidden";
  pag.style.overflow = "hidden";
  pag.style.display = "flex";
  pag.style.justifyContent = "center";
  pag.style.paddingTop = mrg * 0.5 + "vh";
  pag.style.height = "100vh";

  if (windowWidth * height > windowHeight * width) {
    cnv.style.height = (100 - mrg * 2) + "vh";
    cnv.style.width = ((100 - mrg * 2) / height) * width + "vh";
  }
  else {
    cnv.style.width = (100 - mrg * 2) + "vw";
    cnv.style.height = ((100 - mrg * 2) / width) * height + "vw";
  }
}




/////////////////////////////////////////////////////////////////
//
//               v0.4 version examen atrasado IG1
//                       hasta que blipip
//
//                           o o   o o
//                          o o o o o o
//                           o o   o o
//                        o o   o o   o o
//                       o o o o o o o o o 
//                        o o   o o   o o
//                           o o   o o
//                          o o o o o o
//                           o o   o o
