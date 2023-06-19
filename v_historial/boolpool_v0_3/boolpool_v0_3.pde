/* * BOOL POOl v0.3 * * * * * * * * * * * * * * * * * * * * * * * * * * *   --> a
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
 
 
 *//////////////////////////////////////// , \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// BOOL POOl v0.3
// Martin Juilo
// TP 2 Informatica Aplicada 1, cat. Bedoian
// ATAM - Universidad Nacional de las Artes
// Buenos Aires, 2023



/*

  PRESENTACION
  
  Este juego consiste en lanzar una bola de pool para cumplir con un objetivo.
  Es para 2 personas. Ambas intentarán lanzar un tiro de tal forma que capturen
  al paso las dos manzanas de la pantalla. Si una bola empuja a otra y la otra
  captura la manzana, no se cuenta como punto válido. Al finalizar cada
  movimiento se finaliza el turno y, en caso de corresponder, se reponen
  las manzanas en sus nuevas posiciones (aleatorias). 

  Se requiere habilidad y precisión para ejecutar un tiro apropiado, pero por
  sobretodo es un juego de estrategia. Un mal moviento puede transfromarse muy
  rápidamente en una derrota segura. 

  La idea original es mia (al menos que yo sepa). Me gustaria seguir trabajando
  en el codigo. Mejorar la estructura y pasarlo a p5js para compartirlo en
  internet.
  
  Tengo en mente hacer un sistema de turnos que permita jugar online
  sin la necesidad de conectarse desde el mismo juego, sino que se use algun
  canal externo tipo chat o llamada. Al finalizar cada turno se indica una
  coordenada de 4 digitos para que la otra persona simule el lanzamiento y
  se pueda seguir jugando sobre un avance en comun. De esta forma la jugabilidad
  no dependerá de un servidor ni de una plataforma en especifico, y se puede
  adaptar a todo tipo de situaciones. *Inspirado en las ideas de Olia Lialina
  en "Usuaria Turing Completa" (2012) 
  https://endefensadelsl.org/usuaria_turing_completa.pdf
  
  
  CODIGO
  
  Adjunto un video para explicar el codigo:
  https://youtu.be/E1Uv_yGFTmo
  
  Ademas, dejo el link al que (algun dia) subire el proyecto terminado en p5js:
  https://mj-una.github.io/BoolPool/
  
  FISICA
  
  Para resolver las colisiones de las bolas en dos dimensiones utilice un 
  algoritmo publicado por Keith Peters en "Foundation HTML5 Animation with
  JavaScript" (2011), explicado por Long Nguyen en este video de su canal
  de youtube: https://youtu.be/guWIF87CmBg

  Como se detalla ahí, el algoritmo permite simplificar las dos dimensiones
  mediante una rotacion en la que se establece como eje x a la linea que une
  los centros de las dos particulas en colision. La velocidad en y se mantiene
  constante ya que incide perpendicularmente y no afecta ni es afectada por las
  otras fuerzas. Las velocidades en x se resuleven como una colision de una sola
  dimmension. En este caso las masas de las bolas es la misma y no cambia por lo
  que el calculo se reduce a intercambiar las velocidades de una particula a la
  otra. Luego se revierte la rotacion y se calculan las velocidades definitivas
  para x e y. 
  
  Las colisiones con borddes se resuelven invirtiendo simetricamente los angulos
  segun el eje en que se alcanzo el limite.
  
  El roce es un porcentaje que se resta de forma distribuida entre las
  velocidades de acuerdo a la proporcion de sus magnitudes. 

  ERRORES
  
  La version 0.3 cuenta con dos errores importantes:
   - Falta un mecanismo para evitar que las manzanas que se estan reponiendo
   aparezcan en una posicion ocupada por una bola. Necesito trabajar cob arrays
   u objetos para solucionarlo correctamente.
   - Las colisiones de mucha velocidad que se dan en un determinado angulo
   de impacto entre las bolas provocan un error en la nueva posicion asignada
   tras colisionar. Esto se debe a que, al momento de ser detectada la colision,
   la distancia es superior al margen corregible que se aplica a las
   velocidades. Tengo que revisar las ecuaciones.

*/




                              /*   __. o .__   */
                           /*  Variables Globales  */


PFont arialBold_d12; // width = 600 --> textSize = 50
PFont arial_d15; // width = 600 --> textSize = 40
PImage fondoMenu; // --> guardarFondo()

byte pantalla; // [0]Juego, [1]Intro , [2]Menu, [3]Instrucciones, [4]Victoria

boolean inputPre = false; // boton interfaz

int contDesvan; // contador de desvanecimiento del mouse reposo --> hasta valorT
long ultMous; // guarda tiempo del ultimo movimiento del mouse --> mouseMoved()

boolean turno, primerTiro; // turnos:   true = p0   false = p1
boolean tiroPre, tiroPost, cancelar; // estado turno y estados tiro

float entrada_x, entrada_y; // captura inicio de movimiento --> mousePressed()
float distMira; // para dibujo

float p0_x, p0_y, p1_x, p1_y; // posicion bola p0 y p1
float v0_x, v0_y, v1_x, v1_y; // velocidad bola p0 y p1

float angulo0; // direccion p0
float angulo1; // direccion p1

boolean mSI, mSD, mII, mID; // estado manzanas
byte m1a, m2a; // indice manzanas activas

int puntaje0A, puntaje1A; // cantidad de manzanas comidas en un solo tiro
int puntaje0B, puntaje1B; // cantidad de manzanas comidas en total

boolean victoria0, victoria1; // estado victoria



                           /*_ _ _ _ ""><"" _ _ _ _*/
                              /*_ Constantes _ */
                              

final int valor0 = 80; // color oscuro
final int valor1 = 170; // color claro
final int valorT = 129; // transparencia

// variable provisoria width
final int med = 600; // --> actualizar segun width

// posiciones manzanas
final float mSI_x = med / 10;
final float mSI_y = med / 10;
final float mSD_x = med - med / 10;
final float mSD_y = med / 10;
final float mII_x = med / 10;
final float mII_y = med - med / 10;
final float mID_x = med - med / 10;
final float mID_y = med - med/ 10;

final float RC5 =  2.236; // raiz de 5

// diametros
final float tamCiFo = med / RC5 * 1.2; // --> width / RC5 * 1.2
final float tamBola = tamCiFo / RC5;
final float tamManz = tamBola / RC5;
final float tamCurs = tamManz / RC5;

// velocidad
final float velMax = med / 20; // --> width / 20
final float roce = 3.8; // --> porcentaje de velocidad que se resta cada frame
//                             [entre 3.0% y 5.0%]


                             /* _ _._.oOOo._._ _*/
//-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
//+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
//-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-


void setup() {

  size(600, 600);

  arialBold_d12 = createFont("Arial Bold", round(width / 12));
  arial_d15 = createFont("Arial", round(width / 15));
  textFont(arialBold_d12);

  fondoMenu = loadImage("fondoMenu.png");

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


void draw() {

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
      
      float distMouse;
      float anguloMouse;

      // CALCULO ANGULO
      
      pushMatrix();
      translate(entrada_x, entrada_y);
      anguloMouse = atan2(mouseY - entrada_y, mouseX - entrada_x);
      popMatrix();

      // CALCULO FUERZA
      
      distMouse = dist(mouseX, mouseY, entrada_x, entrada_y);

      if (distMouse <= tamBola / 2) cancelar = true;
      else cancelar = false;

      if (distMouse >= width / 3) distMouse = width / 3;
      
      distMira = distMouse;
      
      distMouse = map(distMouse, 0, width / 3, 0, velMax);
      
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

      // COLISION BORDES ___________________________ blq2 parte 2
      
      if (p0_x + v0_x <= tamBola/2 || p0_x + v0_x >= width - tamBola/2) {
        angulo0 = atan2(-v0_y, v0_x);
        v0_x = -v0_x;
      }
      
      if (p0_y + v0_y < tamBola/2 || p0_y + v0_y > height - tamBola/2) {
        angulo0 = atan2(v0_y, -v0_x);
        v0_y = -v0_y;
      }
      
      if (p1_x + v1_x < tamBola/2 || p1_x + v1_x > width - tamBola/2) {
        angulo1 = atan2(-v1_y, v1_x);
        v1_x = -v1_x;
      }
      
      if (p1_y + v1_y < tamBola/2 || p1_y + v1_y > height - tamBola/2) {
        angulo1 = atan2(v1_y, -v1_x);
        v1_y = -v1_y;
      }
      
      // MOVIMIENTO ________________________________ blq2 parte 3
      
      p0_x += v0_x;
      p0_y += v0_y;
      p1_x += v1_x;
      p1_y += v1_y;
      
      // COLISION BOLAS ____________________________ blq2 parte 4
      
      if (dist(p0_x, p0_y, p1_x, p1_y) <= tamBola) {
        
        // angulo colision
        float angCol = atan2(p0_y - p1_y, p0_x - p1_x);
        float cosAC = cos(angCol);
        float sinAC = sin(angCol);

        // rotacion en vel x intercambiando valores entre p0 y p1
        float v0_xCol = v1_x * cosAC + v1_y * sinAC;
        float v1_xCol = v0_x * cosAC + v0_y * sinAC;
        
        // rotacion en vel y (sin intercambio)
        float v0_yCol = v0_x * cosAC - v0_y * sinAC;
        float v1_yCol = v1_x * cosAC - v1_y * sinAC;
     
        // retorno rotacion
        v0_x = v0_xCol * cosAC - v0_yCol * sinAC;
        v0_y = v0_yCol * cosAC + v0_xCol * sinAC;
        v1_x = v1_xCol * cosAC - v1_yCol * sinAC;
        v1_y = v1_yCol * cosAC + v1_xCol * sinAC;
        
        // revision Error (***)
        if (dist(p0_x + v0_x, p0_y + v0_y, p1_x + v1_x, p1_y + v1_y) < tamBola) {
          print("err: " + (tamBola -
          dist(p0_x + v0_x, p0_y + v0_y, p1_x + v1_x, p1_y + v1_y)));
          print("    0X: " + v0_x + "  0Y: " + v0_y + "    ");
          println("1X: " + v1_x + "  1Y: " + v1_y);
          //noLoop();
          /*
          float dsp_v0 = tamBola-dist(p0_x+v0_x, p0_y+v0_y, p1_x+v1_x, p1_y+v1_y);
          v0_x -= dsp_v0 * cosAC;
          v0_y -= dsp_v0 * sinAC;
          */
        }
        
      } //--cierra if colision bolas
      
      // COLISION MANZANAS _________________________ blq2 parte 5

      byte sigM = 0;
      byte dobM = 0;
      
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
      
      // VICTORIA __________________________________ blq2 parte 6
      
      if (puntaje0A >= 2 || puntaje0B >= 4) victoria0 = true;
      else if (puntaje1A >= 2 || puntaje1B >= 4) victoria1 = true;
      
      // NUEVA MANZANA _____________________________ blq2 parte 7
      
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
        
        byte aux_dobM = 0;
        byte aux_sigM = 0;
        
        for (byte aufD = 1; aufD <= 4; aufD++) {
            if (aufD != dobM && aufD != sigM) aux_dobM = aufD;
            if (aufD != aux_dobM && aufD != dobM && aufD != sigM) aux_sigM = aufD;
        }
        
        m1a = aux_dobM;
        m2a = aux_sigM;
      }
      
      // cambio una sola manzana
      boolean saltar;
      if (random (10) % 2 == 0) saltar = true;
      else saltar = false;
      
      if (sigM != 0 && !victoria0 && !victoria1) {
        for (byte aufS = 1; aufS <= 4; aufS++) {
          if (aufS != m1a && aufS != sigM) {
            if (!saltar) m2a = aufS;
            else saltar = false;
          }
        }
      }
      
      // FINALIZAR TIRO ____________________________ blq2 parte 8
      
      if (abs(v0_x) <= 0.08) v0_x = 0;
      if (abs(v0_y) <= 0.08) v0_y = 0;
      if (abs(v1_x) <= 0.08) v1_x = 0;
      if (abs(v1_y) <= 0.08) v1_y = 0;
      
      if (v0_x == 0 && v0_y == 0 && v1_x == 0 && v1_y == 0) {
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
        }
      }
      
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
    textFont(arial_d15);
    textSize(width / 20);
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
    text("Bool Pool v0.3", width / 2, height / 12);
    
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
    textFont(arialBold_d12);
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
    
  } // cierra pantalla 0
  
  else if (pantalla == 2) { // ------------------------------ [2]
    //                  ---------------< < MENU > >--------------
    //                  -----------------------------------------
    
    image(fondoMenu, 0, 0);
    
    fill(valor1, valorT + valorT * (-sin(frameCount / 25.0) + 1) / 2);
    noStroke();
    
    float tx, ty;
    tx = map(mouseX, 0, width, -width / 34, width / 34);
    ty = map(mouseY, 0, height, -width / 34, width / 34);
    
    circle(width / 2.575 + tx, width / 4.444 + ty, width * 8.5 / 60);
    circle(width / 2.575 + tx, width / 2.105 + ty, width * 8.5 / 60); 
    circle(width / 1.579 + tx, width / 4.444 + ty, width * 8.5 / 60);
    circle(width / 1.579 + tx, width / 2.105 + ty, width * 8.5 / 60); 

    stroke(valor0);
    strokeWeight(width / 120);
    if (mouseX >= width / 3 && mouseX <= width * 2 / 3 &&
    mouseY >= height * 3 / 4 && mouseY <= height * 3 / 4 + height / 9) {
      fill(valor0, valorT);
    }
    else fill(valor0, valorT - valorT * (sin(frameCount / 25.0) + 1) / 2);
    rect(width / 3, height * 3 / 4, width / 3, height / 9);
    
    textFont(arialBold_d12);
    fill(valor0);
    text("jugar", width / 2, height * 33 / 40);
    fill(valor0, valorT);
    textFont(arial_d15);
    textSize(width / 24);
    text("Bool Pool v0.3 (19-5-23)", width / 2, height * 7.75 / 12);
    text("por Martin Julio", width / 2, height * 8.45 / 12);
  }
  
  else if (pantalla == 3) { // ------------------------------ [3]
    //                  ----------< < INSTRUCCIONES > >----------
    //                  -----------------------------------------
    
    background(valor1);
    
    textFont(arial_d15);
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
    textFont(arial_d15);
    textSize(width / 24);
    text("Solo son válidas las manzanas capturadas", width/2, height * 7.75/12);
    text("durante el propio turno", width / 2, height * 8.45 / 12);
    
    stroke(valor0);
    strokeWeight(width / 120);
    if (mouseX >= width / 3 && mouseX <= width * 2 / 3 &&
    mouseY >= height * 3 / 4 && mouseY <= height * 3 / 4 + height / 9) {
      fill(valor0, valorT);
    }
    else fill(valor0, valorT - valorT * (sin(frameCount / 25.0) + 1) / 2);
    rect(width / 3, height * 3 / 4, width / 3, height / 9);
    fill(valor0);
    textFont(arialBold_d12);
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
      textFont(arial_d15);
      text("¡ Player 0 ha ganado !", width / 2, height / 2);
      pop();
    }
    else {
      background(valor0);
      stroke(valor1);
      fill(valor1);
      push();
      textFont(arial_d15);
      text("¡ Player 1 ha ganado !", width / 2, height / 2);
      pop();
    }
    
    strokeWeight(width / 120);
    if (mouseX >= width / 3 && mouseX <= width * 2 / 3 &&
    mouseY >= height * 3 / 4 && mouseY <= height * 3 / 4 + height / 9) {
      fill(victoria0 ? valor0 : valor1, valorT);
    }
    else noFill();
    rect(width / 3, height * 3 / 4, width / 3, height / 9);
    fill(victoria0 ? valor0 : valor1);
    text("menu", width / 2, height * 33 / 40); 
  }

  // DIBUJO CURSOR
  
  push();
  fill(turno ? valor0 : valor1, 255 - contDesvan);
  noStroke();
  circle(mouseX * 1.0, mouseY * 1.0, tiroPre ? tamCurs * RC5 / 2 : tamCurs);
  pop();
  
  //guardarFondo();
}



//-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
//+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
//-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

void mousePressed() {
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

void mouseReleased() {
  if (pantalla == 0) {
    if (tiroPre) {
      tiroPre = false;
      if (!cancelar) {
        tiroPost = true;
        if (primerTiro) primerTiro = false;
        delay(100);
      }
    }
  }
  
  else if (pantalla == 2 || pantalla == 3 || pantalla == 4){
    if (mouseX >= width / 3 && mouseX <= width * 2 / 3 &&
    mouseY >= height * 3 / 4 && mouseY <= height * 3 / 4 + height / 9) {
      inputPre = false;
      if (pantalla == 2) pantalla = 3;
      else if (pantalla == 3) {
        pantalla = 0;
      }
      else if (pantalla == 4) {
        if (victoria0 || victoria1) setup();
        pantalla = 2;
      }
    }
  }
}



//-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
//+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
//-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

void mouseMoved() {
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

void keyPressed() { // accesos por teclado

  if (key == 't' || key == 'T') turno = !turno;
  if (key == 'k' || key == 'K') noLoop(); 
  if (key == 'l' || key == 'L') loop(); 
}
  
//        -------------------------------------------------------
/*                          EXPORTAR IMG FONDO

void guardarFondo() {
  background(valor1);
  strokeWeight(width / 120);
  stroke(valor0);
  
  fill(valor0);
  circle(width / 2.575, width / 4.444, width * 13 / 60);
  circle(width / 2.575, width / 2.105, width * 13 / 60); 
  circle(width / 1.579, width / 4.444, width * 13 / 60);
  circle(width / 1.579, width / 2.105, width * 13 / 60); 
  
  noFill();
  
  //rect(width / 3, height * 3 / 4, width / 3, height / 9);
  //fill(valor0);
  //text("jugar", width / 2, height * 33 / 40); 
  
  textSize(width * 9 / 30);
  textAlign(LEFT);
  text("B", 40, height * 20 / 60);
  text("P", 45, height * 35 / 60);
  
  textAlign(RIGHT);
  text("L", 560, height * 20 / 60);
  text("L", 560, height * 35 / 60);
  
  noLoop();
  save("fondoMenu.png");
}
//*/
