// BOOL POOl v0.1
// Martin Julio
// 23-5-10
// TP 1 - Informatica Aplicada 1
// Catedra Bedoian, 2023

int pantalla; //menu, instrucciones, creditos,  pausa, victoria
int velZoom = 60; //duracion de transicion zoom

boolean zoom = false; //false = acercamiento y 1 = alejamiento
boolean alejamiento = false;
boolean fondo = true; //imprimir fondo
boolean turno = true; //true = player 0 y false = player 1
boolean capturaMouse = true; //estado mouse activo
boolean tiro0 = false; //preparar tiro
boolean tiro1 = false; //fijar tiro
boolean impactoBolas = false; //ejecutar calculo de impacto
boolean impactoManzanita = false; //ejecutar proceso manzana

PImage fondo0, fondo1; //color mesa fondo
PFont fuente;

int puntaje0; //manzanas player 0
int puntaje1;//manzanas player 1

int p0_x, p0_y, p1_x, p1_y; //posicion bolas p0 y p1
float entrada_x, entrada_y; //captura inicio de movimiento
int m_x, m_y; //posicion mira

float pendienteM; //pendiente mouse entrada a actual
float angulo0; //direccion calculo p0 (invisible)
float angulo1; //direccion calculo p1 (invisible)
//int angulo0_vis; //direccion final p0 (visible)
//int angulo1_vis; //direccion final p1 (visible)

int distanciaM; //distancia mouse entrada a actual
int fuerza0; //velocidad inicial
int fuerza1; //velocidad transferida

float roce = 0.8; //factor de desaceleracion

//_______________________________________________

void setup() {
  size(600, 600);

  fondo0 = loadImage("fondo0.png");
  fondo1 = loadImage("fondo1.png");
  
  fuente = createFont("Arial Bold", 34);
  textFont(fuente);
  
  p0_x = 300;
  p0_y = 335;
  p1_x = 300;
  p1_y = 265;

  image(fondo0, 0, 0);
  pantalla = 0;
}

//_______________________________________________

void draw() {
   
  if(pantalla == 0){            //________JUEGO________
  
    if (tiro0) { //PREPARAR TIRO

      //calcular pendiente
      if (entrada_x - mouseX != 0) { // evitar division por 0
        pendienteM = (entrada_y - mouseY) / (entrada_x - mouseX);
        // es positiva en (+x, +y) o (-x, -y)
        // es negativa en (+x, -y) o (-x, +y)
        // es 0 en horizontal (y = 0)
      }
      else {
        pendienteM = Float.MAX_VALUE; 
        // es infinita en vertical (x = 0)
      }
      
      // asignar angulo
      if (turno) {
        angulo0 = degrees(atan(pendienteM));
        // si: pendiente = tan(a)
        // y: atan(tan(a)) = a
        // entonces: a = atan(pendiente) [valor en rad]
        // degrees() para pasar radianes a grados
      }
      else {
        angulo1 = degrees(atan(pendienteM));
      }
      
      
      //calcular distancia
      distanciaM = round(dist(entrada_x, mouseX, entrada_y, mouseY));
      if (distanciaM >= width / 3) distanciaM = width / 3; //
      
      fuerza0 = round(map(distanciaM, 0, width / 3, 0, 100));
      
      //||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
      //||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
      //||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
      ///*
      //push();
      //stroke(250, 50, 20);
      //strokeWeight(4);
      //line(mouseX, mouseY, entrada_x, entrada_y);
      //pop();
      //*/
    }
    
    if (tiro1) { //HACER TIRO
      //capturaMouse = false;
      
    }
  
  
    if (turno){ //TURNO PLAYER 0
      
      image(fondo0, 0, 0);
              
      push();
      fill(0);
      stroke(0);
      strokeWeight(5);
      ellipse(p0_x, p0_y, 60, 60);    // dibujar player 0
      textAlign(CENTER);
      fill(200);
      text("P0", p0_x, p0_y + 12);
      pop();
      
      push();
      fill(200);
      stroke(0);
      strokeWeight(5);
      ellipse(p1_x, p1_y, 60, 60); // dibujar player 1
      pop();
    }
      
    else { //TURNO PLAYER 1
      
      image(fondo1, 0, 0);
      
      push();
      fill(0);
      stroke(200);
      strokeWeight(5);
      ellipse(p0_x, p0_y, 60, 60); // dibujar player 0
      pop();
      
      push();
      fill(200);
      stroke(200);
      strokeWeight(5);
      ellipse(p1_x, p1_y, 60, 60); // dibujar player 1
      textAlign(CENTER);
      fill(0);
      text("P1", p1_x, p1_y + 12);
      pop();
    }
    
    
    
  }
  else if (pantalla == 1){            //________PAUSA________
    text(pantalla, 300, 300);
    
  }
  else if (pantalla == 2){            //________MENU________
    text(pantalla, 300, 300);
    
  }
  else if (pantalla == 3){            //________INSTRUCCIONES________
    text(pantalla, 300, 300);
    
  }
  else if (pantalla == 4){            //________CREDITOS________
    text(pantalla, 300, 300);
    
  }
  else if (pantalla == 5){            //________VICTORIA________
    text(pantalla, 300, 300);
    
  }
  
  //||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
  //||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
  //||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
  ///*
  if (tiro0) {
    push();
    stroke(250, 50, 20);
    strokeWeight(4);
    line(mouseX, mouseY, entrada_x, entrada_y);
    pop();
  }
  push();
  fill(80, 200, 0);
  text("pantalla " + pantalla, 20, 40);
  textSize(20);
  text("pend_m: " + pendienteM, 20, 70);
  text("ang0: " + angulo0, 20, 100);
  text("dist_m: " + distanciaM, 20, 130);
  text("fue0: " + fuerza0, 20, 160);
  pop();
  //*/
  
}

//_______________________________________________

void keyPressed() {
  if (turno) turno = false;
  else turno = true;
}

void mousePressed() {
  if (capturaMouse) {
    if (pantalla == 0) {
      if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
        entrada_x = mouseX;
        entrada_y = mouseY;
        tiro0 = true;
      }
    }
    
    //if else (pantalla == 1) {}
    
  }  
  //pantalla++;
  //if(pantalla == 0){
    
  //}
  //else if (pantalla == 1){
    
  //}
  //else if (pantalla == 2){
    
  //}
  //else if (pantalla == 3){
    
  //}
}

//_______________________________________________

void mouseReleased() {
  tiro0 = false;
  tiro1 = true;
  pendienteM = 0;
  distanciaM = 0;
//  if(pantalla == 0){
    
//  }
//  else if (pantalla == 1){
    
//  }
//  else if (pantalla == 2){
    
//  }
//  else if (pantalla == 3){
    
//  }
}

  //save("salida_t0.png");
  //if (frameCount == 24) exit();
  //saveFrame("output/image####.png");
