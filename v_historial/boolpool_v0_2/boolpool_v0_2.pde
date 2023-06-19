/* * BOOL POOl v0.2 * * * * * * * * * * * * * * * * * * * * * * * * * * *   --> a
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
// BOOL POOl v0.2
// Martin Juilo
// TP 2 Informatica Aplicada 1, cat. Bedoian
// ATAM - Universidad Nacional de las Artes
// Buenos Aires, 2023




/*
  
  RESUMEN FISICA
  
  condiciones:
  la fuerza es la masa * velocidad. la masa no cambia nunca y es la misma en 
  ambas bolas, por lo que se la puede obviar. la velocidad, al estar dentro
  de un bucle que se repite constante, pasa a ser representada solo por el
  desplazamiento. por lo que se usan variaciones en medidas de posicion
  en el espacio como sinonimos de velocidad y de fuerza. ademas, las colisiones
  son totalmente simetricas y no hay perdidas energia, por lo que al impactar
  contra un borde solo cambia el angulo (pasa a ser el opuesto simetrico segun
  linea recta que pasa por su posicion y es paralela al eje de la coordenada 
  que se alcanzo el limite). 
  
  interacciones:
  en caso de colision entre 2 bolas se necesita determinar el anguloCol en que
  cada bola percibe el impacto respecto a su direccion original (anguloOri). La
  fuerza (que vemos como velocidad, es decir, que se presenta en el codigo como
  unidades de desplazamiento) se ve afectada por el anguloCol de tal manera que
  si anguloOri es 0, la fuerza se transmite por completo de una bola a la otra.
  y en medida que anguloOri aumente, la cantidad de fuerza que se transmita sera
  menor. 
  
  La
  fuerza debe permanecer constante por lo que la distanci
  
  en que se movia originalmente.
  
  anguloC = anguloI - seno()
  
  anguloC es inversamente proporcional a la fuerza retenida. es decir, en un
  impacto frontal ()determina la cantidad de fuerza que sera transmitida a la
  bola opuesta. la fuerza recibida
  
  

*/

                                /*   __. o .__   */
                             /*  Variables Globales  */
                                    

byte pantalla; // para mostrar: [0]Introduccion,
// [1]Juego , [2]Menu, [3]Instrucciones, [4]Creditos, [5]Pausa, [6]Victoria

int valor0, valor1, valorT; // colores 0 y 1 y transparencia

long ultMous; // guarda tiempo del ultimo movimiento del mouse --> mouseMoved()
byte contDesvan; // contador de desvanecimiento del mouse quieto --> hasta valorT

boolean turno, tiroPre, tiroPost, cancelar; // estado turno y estados tiro

PImage fondo0, fondo1; // 0 y 1 alterna color de fondo segun turno
PFont fuente; // default ("Arial Bold", para width=600 --> textSize=50)

int tamCurs, tamBola, tamManz; // diametro puntero, bola y manzana

int p0_x, p0_y, p1_x, p1_y; // posicion bola p0 y p1
float entrada_x, entrada_y; // captura inicio de movimiento --> mousePressed()

float pendienteM; // pendiente mouse entrada a actual
float angulo0; // direccion p0
float angulo1; // direccion p1

float distanciaM; // distancia mouse entrada a actual
float fuerza0; // determina velocidad p0
float fuerza1; // determina velocidad p1

float velMax; // limite superior de map que convierte distanciaM en velocidad

float inercia, roce; // para calcular desaceleracion de la velocidad

float roceA = 0.02;

int mSI_x, mSI_y, mSD_x, mSD_y, mII_x, mII_y, mID_x, mID_y; // posicion manzanas
int puntaje0, puntaje1; // cantidad de manzanas comidas
  
  
//-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
//+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
//-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-


void setup() {
  
  size(600, 600);
  
  fuente = createFont("Arial Bold", round(width / 12));
  textFont(fuente);
  
  fondo0 = loadImage("fondo0.png");
  fondo1 = loadImage("fondo1.png");
  
  noCursor(); // ocultar icono mouse
  
  valor0 = 80; // color claro
  valor1 = 170; // color oscuro
  valorT = 129; // transparencia
  
  contDesvan = 0; // contador de desvanecimiento del mouse

  turno = true; // true = player 0 y false = player 1
  tiroPre = false; // se activa en mousePressed()
  tiroPost = false; // se activa en mouseRealesed()
  cancelar = false; // se activa segun dist(entrada, mouse)
  
  // inicializar posicion p0 y p1
  p0_x = width / 2;
  p0_y = height / 2 + width / 10;
  p1_x = width / 2;
  p1_y = height / 2 - width / 10;
  
  // inicializar manzanas superior der e izq
  mSI_x = width / 10;
  mSI_y = width / 10;
  mSD_x = width - width / 10;
  mSD_y = width / 10;
  
  // inicializar diametro cursor, bola, manzana
  tamCurs = width / 35; // default: 600 / 35 = 17
  tamBola = width / 4; // default: 600 / 6 = 100 
  tamManz = width / 14; // default: 600 / 14 = 43
  
  // velMax = width / VELOCIDAD_MAXIMA * 2; // modo --> calibracion()
  velMax = width / 100; // desplazamiento ideal en cada frame (sin roce)
  // al aplicarse el maximo valor de distanciaM. es proporcional a canvas.
  // es limite superior de map() que transforma distanciaM. se usa ademas
  // para calcular factor de inercia sobre influencia que tiene roce
  
  pantalla = 0; // arranca con presentacion
  
}


//-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
//+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
//-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-


void draw() {
  
  //                    -----------( OPACIDAD MOUSE )------------
  
  // revisa si mouse se mueve o tiroPre esta activo
  // --> en caso positivo: fija desvanecimiento en 0 (no hay transparencia)
  // --> en caso negativo: activa contador de desvanecimiento (hasta valorT)
  // 300 = permanencia visual, millis() = marca de tiempo actual,
  // ultMouse = ultima marca de tiempo de mouseMoved()
  if ((millis() - ultMous < 300) || tiroPre)contDesvan = 0;
  else if (contDesvan < valorT) contDesvan ++;
  // (se evalua parejamente en todas las pantallas / bloques del juego)
  // (se dibuja por encima de todo, en el ultimo lugar del draw)
  
  // SWITCH PRINCIPAL
  // muestra pantalla que corresponda 
  if(pantalla == 0){ // pantalla 1 :  ---------------------------
    //                  -----------------------------------------
    //                  -------------< <  INTRO  > >-------------
    //                  -----------------------------------------
    //                  ----------------------------------------- 
    
    // presentacion ###################
    //#################################
    //#################################
    
    pantalla = 1;
  }
  
  else if(pantalla == 1){ // pantalla 1 :  ----------------------
    //                  -----------------------------------------
    //                  -----------------------------------------
    //                  -------------< <  JUEGO  > >-------------
    //                  -----------------------------------------
    //                  -----------------------------------------
    //                  -----------------------------------------    
    
    //                  --------------- bloque 1 ----------------
    //                  ---------(((( PREPARAR TIRO ))))---------
    
    if (tiroPre) { 
      // tiroPre se activa al presionar mouse -> mousePressed()
      // en la funcion tambien se definen entrada_x y entrada_y
      
      // ANGULO
      
      pushMatrix(); // efecto translate es temporal
      translate(entrada_x, entrada_y); // desplaza origen a entrada
      pendienteM = atan2(mouseY - entrada_y, mouseX - entrada_x);
      // pendienteM es el angulo de la posicion del mouse actual
      // respecto al origen de las coordenadas (entrada_x,y).
      // es decir, el angulo del movimiento que se hace
      // cuando se desplaza el mouse presionado
      popMatrix();
      
      // FUERZA
      
      distanciaM = dist(mouseX, mouseY, entrada_x, entrada_y);
      // mientras mas se aleje mouse actual de mouse entrada
      // mas fuerza tendra le asigna al tiro
      
      // para permitir arrepentimiento o evitar clickeos por error
      if (distanciaM <= tamBola / 2) cancelar = true;
      else cancelar = false;
      // ver uso de "cancelar" en mouseRealesed()
      
      if (distanciaM >= width / 3) distanciaM = width / 3;
      // valor maximo de distancia posible es proporcional al ancho del canvas
      
      // ASIGAR VALORES
      
      if (turno) {
        angulo0 = pendienteM;
        fuerza0 = map(distanciaM, 0.0, width / 3.0, 0.0, velMax);
      }
      else {
        angulo1 = pendienteM;
        fuerza1 = map(distanciaM, 0.0, width / 3.0, 0.0, velMax);
      }
      
    } //--cierra if tiroPre
    
    //                  --------------- bloque 2 ----------------
    //                  ---------(((( REALIZAR TIRO ))))---------
    
    if (tiroPost) {
    // tiroPost se inicia al soltar el mouse -> ver mouseRealessed()
    // (solo si el movimiento es mayor al tamaño de la bola) y finaliza
    // una vez que el desplazamiento (por cada frame) se acerca a 0
     
     
      // blq.2 parte.1 ____________MOVIMIENTO BASICO_____________

      float a, b, c, d;  // variables auxiliares de desplazamiento

      // asigna valor preliminar "a" para coordenada x de p0
      // asigna valor preliminar "b" para coordenada y de p0
      // asigna valor preliminar "c" para coordenada x de p1
      // asigna valor preliminar "d" para coordenada y de p1
      
      a = -cos(angulo0) * fuerza0;
      b = -sin(angulo0) * fuerza0;   
      c = -cos(angulo1) * fuerza1;
      d = -sin(angulo1) * fuerza1;
      
      // seno y coseno devuelven valores entre -1 y 1
      // que actuan como un porcentaje de influencia
      // que tendra "desplazamiento" en coordenadas x e y.
      // se multiplican por -1 porque la bola se desplaza
      // en el sentido opuesto del movimiento del mouse    

    
      // blq.2 parte.2 ____________COLISIONES BORDES_____________
      
      // se calcula posicion + v.auxiliar
      // si resultado toca bordes se calcula nuevo angulo
      // simetrico segun eje en que la coordenada alcanzo el limite
      
      // coordenada x de p0
      if (p0_x + round(a) < tamBola/2 || p0_x + round(a) > width - tamBola/2) {
        angulo0 = atan2(-b, a); // actualiza angulo
        a = -cos(angulo0) * fuerza0; // actualiza variable auxiliar
      }
      
      // coordenada y de p0
      if (p0_y + round(b) < tamBola/2 || p0_y + round(b) > height - tamBola/2) {
        angulo0 = atan2(b, -a); // actualiza angulo
        b = -sin(angulo0) * fuerza0; // actualiza variable auxiliar
      }
      
      // coordenada x de p1
      if (p1_x + round(c) < tamBola/2 || p1_x + round(c) > width - tamBola/2) {
        angulo1 = atan2(-d, c); // actualiza angulo
        c = -cos(angulo1) * fuerza1; // actualiza variable auxiliar
      }
      
      // coordenada y de p1
      if (p1_y + round(d) < tamBola/2 || p1_y + round(d) > height - tamBola/2) {
        angulo1 = atan2(d, -c); // actualiza angulo
        d = -sin(angulo1) * fuerza1; // actualiza variable auxiliar
      }
      
      
      // blq.2 parte.3 _____________COLISION BOLAS_______________
      
      // se simula posicion + v.auxiliar actualizada
      // si distancia entre bola p1 y bola p2 es igual a diametro de bola
      // se calcula nuevo angulo tomando bola impactada como punto de incidencia
      // y posicion propia como punto de origen (referencia. 
      // la fuerza se reparte entre ambas bolas segun el angulo en que perciban
      // el impacto. en caso que la bola impactada tambien se este moviendo
      // su fuerza se suma a la operacion en factor al angulo de incidencia:
      // fuerza final = fuerza original * ( angulo inicial - angulo final)
      
      /*
      translate(entrada_x, entrada_y); // desplaza origen a entrada
      pendienteM = atan2(mouseY - entrada_y, mouseX - entrada_x);      
      *//*
      
      if (dist(a, b, c, d) <= tamBola) {        
        
        // ANGULO
        
        float angulo0_c, angulo1_c;
        
        pushMatrix();
        translate(round(a), round(b)); // desplaza origen a posicion p0 
        angulo0_c = atan2(round(d) - round(b), round(c) - round(a));
        // calcula angulo de la otra bola respecto a posicion propia
        // es decir hacia dónde esta p1 tomando a p0 como referencia de origen
        popMatrix();
        
        angulo0 += (angulo0_c - angulo0) * fuerza0 / fuerza1; 
        
        pushMatrix();
        translate(round(c), round(d)); // desplaza origen a posicion p1 
        angulo1_c = atan2(round(b) - round(d), round(a) - round(c));
        // hacia dónde esta p0 tomando a p1 como referencia de origen
        popMatrix();
        
        angulo1 += (angulo1_c - angulo1) * fuerza1 / fuerza0; 
        */
        // FUERZA
        
        //fuerza0 = tan(angulo0); 
        //fuerza1 = tan(angulo1);
        
      
      
      
      // blq.2 parte.4 _________CALCULO DESACELERACION___________
      
      // la inercia provoca que a velocidad alta el roce influya menos
      //inercia = map(,);

      // el roce provoca que fuerza del movimiento disminuya gradualmente
      fuerza0 -= roce;

      if (fuerza0 < 0.001) {
        fuerza0 = a = b = 0.0;
        turno = false;
        tiroPost = false;
       }
    
      if (p1_x + round(c) < tamBola/2 || p1_x + round(c) > width - tamBola/2) {
        angulo1 = atan2(-d, c);
        c = -cos(angulo1) * fuerza1;
      }
      if (p1_y + round(d) < tamBola/2 || p1_y + round(d) > height - tamBola/2){
        angulo1 = atan2(d, -c);
        d = -sin(angulo1) * fuerza1; // actualiza variable
      }
      /*
      ROCE -= 0.01;   
      fuerza1 *= ROCE;
      
      
      if (fuerza1 < 0.001) {
        fuerza1 = 0.0;
        ROCE = 0;
        delay(100);
        turno = true;
        tiroPost = false;
      }
      */
      
      //                --------------- bloque 3 ----------------
      //                ---------(((( DOBLE COLISION ))))--------
      
      /*
      if (dist(a, b, c, d) <= tamBola) {
        a++;
      } */
    
      //                --------------- bloque 4 ----------------
      //                ---------(((( ASIGNA VALORES ))))--------
    
      /* // test
      if (turno) println("t: 0   r: " + ROCE + "   f0: " + fuerza0);
      else println("t: 1   r: " + ROCE + "   f1: " + fuerza1);
      */
    
      p0_x += round(a);
      p0_y += round(b);
      p1_x += round(c);
      p1_y += round(d);
      
      if (fuerza0 > roceA) fuerza0 -= roceA;
      else fuerza0 = 0;
      if (fuerza1 > roceA) fuerza1 -= roceA;
      else fuerza1 = 0;
      
    } //--cierra if tiroPost
    }
    //                  --------------- bloque 5 ----------------
    //                  ------------(((( DIBUJAR ))))------------
      
  push();
  if (turno) { //turno p0
    
    image(fondo0, 0, 0);
            
    fill(valor0);
    stroke(valor0);
    strokeWeight(width / 100);
    ellipse(p0_x, p0_y, tamBola, tamBola);    // dibujar player 0
    textAlign(CENTER);
    fill(valor1);
    text("P0", p0_x, p0_y + width * 2 / 75);

    fill(valor1);
    stroke(valor0);
    strokeWeight(width / 100);
    ellipse(p1_x, p1_y, tamBola, tamBola); // dibujar player 1
  }
  else { //turno p1
    
    image(fondo1, 0, 0);
    
    fill(valor0);
    stroke(valor1);
    strokeWeight(width / 100);
    ellipse(p0_x, p0_y, tamBola, tamBola); // dibujar player 0

    fill(valor1);
    stroke(valor1);
    strokeWeight(width / 100);
    ellipse(p1_x, p1_y, tamBola, tamBola); // dibujar player 1
    textAlign(CENTER);
    fill(valor0);
    text("P1", p1_x, p1_y + width * 2 / 75);
    
  }
  pop();
    
  // DIBUJO MANZANAS
  
  push();
  noStroke();
  fill(valor0 + (valor1 - valor0) * (sin(frameCount / 15.0) + 1) / 2);
  circle(mSI_x, mSI_y, tamManz);
  circle(mSD_x, mSD_y, tamManz);
  pop();      
   
  // DIBUJO MIRA
  
  if (tiroPre) {
    push();
    stroke(turno ? valor0 : valor1, cancelar ? valorT : 255);
    strokeWeight(width / 150);
    line(mouseX, mouseY, entrada_x, entrada_y);
    noFill();
    stroke(turno ? valor0 : valor1, cancelar ? valorT : 255);
    strokeWeight(width / 150);
    ellipse(entrada_x, entrada_y, distanciaM * 2, distanciaM * 2);
    pop();
  }
  
  // cierra pantalla 0
  
  
  // DIBUJO CURSOR
  
  push();
  fill(turno ? valor0 : valor1, 255 - contDesvan);
  noStroke();
  circle(mouseX * 1.0, mouseY * 1.0, tiroPre ? tamCurs*1.2 : tamCurs * 1.0);
  pop();
  
}


//-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
//+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
//-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-



void mousePressed() {
  if (pantalla == 1) {
    if (!tiroPost) { // tiroPost bloquea captura hasta resolver movimientos
      if (mouseX>=0 && mouseX<=width && mouseY>=0 && mouseY<=height) { 
        // si el mouse es cliqueado sobre la pantalla
        // guarda posicion de entrada en coordenadas x, y
        entrada_x = mouseX;
        entrada_y = mouseY;
        tiroPre = true; // preparar tiro
      }
    }
  }
  //else if (pantalla == 1){
    
  //}
  //else if (pantalla == 2){
       
  //}
  //else if (pantalla == 3){
    
  //}
}



//-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
//+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
//-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-



void mouseReleased() {
  if(pantalla == 1){
    // se termina la preparacion del tiro 
    tiroPre = false;
    // lo siguiente solo se ejecuta si la distancia
    // del mouse presionado ha sido mayor al tamaño de la bola.
    // asi, en caso de arrepentimiento o de un click por error,
    // se suelta el mouse sin que se haga el tiro
    if (!cancelar) {
      tiroPost = true;
      delay(100);
    }
  }
//  else if (pantalla == 1){
    
//  }
//  else if (pantalla == 2){
    
//  }
//  else if (pantalla == 3){
    
//  }
}


//-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
//+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
//-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-



void mouseMoved() {
  ultMous = millis(); // guarda tiempo de ultimo movimiento del mouse
  contDesvan = 0; // desactiva transparencia
}









//          -          -         -                  -            
//          --         --  -    --     -  - -      --     -  -   
//         ---  -   - -------  ---- -  -------     ---   --- -  -
//        ----- -- ------------------ ---------- ----------------
//        -------------------------------------------------------
//        -----------°*°*°- HERRAMIENTAS EXTRAS -°*°*°-----------
//        ----------------------°*°O_o_O°*°----------------------
//        -------------------------------------------------------



void keyPressed() { // accesos por teclado
  
  if (key == 't' || key == 'T') turno = !turno; // cambiar turno
  //if (key == 'r' || key == 'R') monitorRM(); // monitorear ram
  //if (key == 'e' || key == 'E') exportarFondo(); // guardar fondo

}

//        -------------------------------------------------------
/*                           MONITOREAR RAM

int contMonitor = 0;
int tMonitor; // timepo

void monitorRM() {
  
  long mm = Runtime.getRuntime().maxMemory(); // maxima
  long ma = Runtime.getRuntime().totalMemory(); // asignada
  long md = Runtime.getRuntime().freeMemory(); // disponible 
  
  println("CM " + contMonitor + "       mill: " + tMonitor);
  println("maxi: " + mm);
  println("asig: " + ma);
  println("     disp: " + md);
  println(" ");
  
  contMonitor++;
  
} */
  
  
//        -------------------------------------------------------
/*                          EXPORTAR IMG FONDO

void exportarFondo() {
    
  noFill();
  strokeWeight(width / 100);
  
  stroke(valor0);
  background(valor1);
  
  circle(0, 0, width * 2 / 3);
  circle(0, height, width * 2 / 3);
  circle(width, 0, width * 2 / 3);
  circle(width, height, width * 2 / 3);
  
  save("fondo0.png");

  stroke(valor1);
  background(valor0);
  
  circle(0, 0, width * 2 / 3);
  circle(0, height, width * 2 / 3);
  circle(width, 0, width * 2 / 3);
  circle(width, height, width * 2 / 3);
  
  save("fondo1.png");
  
  noLoop();
  
} */


//        -------------------------------------------------------
/*                          CALIBRAR PARAMETROS

void calibracion(); {
    
  byte VELOCIDAD_MAXIMA = 50; // intensidad del impacto en fuerza maxima [CONFIG]
  // valores =
  //           10 casi nulo
  //           30 bajo
  //           50 normal (default)
  //           70 alto 
  //           90 extremo      
  ////////////////////////             
      
  
  // calculo roce:   Vel.Final = Vel.Inicial - ( ROCE * facR / divR ) * f.Inercia
  int divRoce = 100; // exactitud de la escala
  int facRoce = 40; // [factor de posicion en la escala] * 4.0 = default
  roce = ROCE * facRoce / divRoce;
  
  byte  ROCE = 50; // intensidad de la resistencia al desplazamiento [CONFIG]
  // valores =
  //           10 casi nulo
  //           30 bajo
  //           50 normal (default)
  //           70 alto 
  //           90 extremo
  ////////////////////////
             
                           
  // calculo inercia: Inercia = 1 / ( Vel.Inicial * facI / divI )
  int divIner = 0; // exactitud de la escala
  int facIner = 1; // [factor de posicion en la escala] * 4.0 = default
  inercia = divIner * facIner;
  
  byte INERCIA = 50; // disminucion del roce en altas velocidades [CONFIG]
  // valores =
  //           10 casi nulo
  //           30 bajo
  //           50 normal (default)
  //           70 alto 
  //           90 extremo       
  ////////////////////////

} */


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 *
 *                                ______                     
 *        _________        .---"""      """---.              
 *       :______.-':      :  .--------------.  :             
 *       | ______  |      | :                : |             
 *       |:______B:|      | |  Little Error: | |             
 *       |:______B:|      | |                | |             
 *       |:______B:|      | |  Power not     | |             
 *       |         |      | |  found.        | |             
 *       |:_____:  |      | |                | |             
 *       |    ==   |      | :                : |             
 *       |       O |      :  '--------------'  :             
 *       |       o |      :'---...______...---'              
 *       |       o |-._.-i___/'             \._              
 *       |'-.____o_|   '-.   '-...______...-'  `-._          
 *       :_________:      `.____________________   `-.___.-. 
 *                        .'.eeeeeeeeeeeeeeeeee.'.      :___:
 *                      .'.eeeeeeeeeeeeeeeeeeeeee.'.         
 *                     :____________________________:       
 *             
 */
