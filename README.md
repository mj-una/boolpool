## IA1 TP2 - Juego para conversar

## IG - Examen final

<br>

BoolPool v0.4

Martin Julio

2023

<br>

<div align="center">
<a href="https://mj-una.github.io/ia1-tp2-BoolPool/" target="_blank" rel="noopener"><b>Click aquí para jugar<br>↳↳↳ BoolPool ↲↲↲</b></a>
</div>

<br>

***

<br>

### <span id="narracion">Narración</span>

<br>

Este juego es una excusa. Hice un examen sobre un trabajo que me gustó mucho y aproveché para <i>metér</i> otro poco de creatividad en el asunto. Necesito darle espacio a mi imaginación, asi que diré en palabras lo que no alcanzo a hacer en código. Me gustan las palabras cuando invitan a imaginar cosas. El juego está incompleto, pero se puede jugar igual. Aprovecho esta excusa para hablar de lo que voy a agregarle, mezclando ciencia ficción, código, fantasías, tareas pendientes, promesas dudables y reciclajes de último minuto. Para que vayamos aprendiendo a jugarlo, por si algún día queremos aburrirnos en compañía y no tenemos otra excusa mejor que ésta.

El juego se llama <i>Bul-Pul</i>. Es muy simple, se aprende rápido, se juega por instinto, sin pensarlo mucho. Es de estrategia, porque no hay azar, pero no sirve memorizarlo. Es para aprender a prueba y <i>errór</i>, para sorprender con una jugada inesperada, para prestar atención al diálogo, para cambiar de planes, para inventar sobre la marcha.

<br>

#### <span id="descripcion">Descripción</span>

<br>

Hay dos personas, P0 y P1. En dos de las cuatro esquinas hay un objetivo que parpadea. Cada vez que una persona toca un objetivo durante su turno, suma un punto. Cada vez que una persona toca un objetivo (sea su turno o no), el objetivo desaparece. Al final del turno se colocan nuevamente los objetivos. En algunos casos será la propia persona quién decida dónde colocar el objetivo, en otros casos se colocará automáticamente siguiendo el reglamento: (primero.) es requisito que las esquinas no estén obstruídas por una persona; (segundo.) se priorizan las esquinas que no hayan tenido un objetivo previamente; (tercero.) si finalmente queda más de una opción, entonces la persona decide. Modos de victoria: gana quién haga cuatro puntos en total, o quién haga dos puntos consecutivos en un mismo turno. Cada victoria es una ronda. Se puede jugar al mejor de cierta cantidad de rondas.

Abre paréntesis. Aquí apareció la primera fantasía: no hice lo de elegir la esquina en la que colocar el objetivo. O sea lo hice pero no me resultó, entonces hice un random que no funciona muy bien. Hoy se me ocurren mil formas correctas de resolverlo, asi que la próxima versión ya tendrá esa funcionalidad incorporada. Cierra paréntesis.

Las dos opciones de victoria hacen que el juego sea dinámico. Un movimiento ambicioso puede volverse una derrota segura. Pero no arriesgar y dejar a la otra persona ganar un punto en cada turno significa que también perderás pronto (en cuatro turnos máximo). Hay que buscar un equilibrio entre ataque y defensa, no se puede estar quieto.

Los objetivos desaparecen como las manzanitas del “<i>Snéik</i>”. Las personas se desplazan y colisionan como bolas de pool. Cada tiro se prepara de manera similar a los juegos de pool para celulares; de la siguiente forma:

(1.) Al presionar sobre la pantalla se guarda el punto en que se inicia el movimiento, y se activa una vista que representa los componentes del vector del tiro, estos son: magnitud, representada por el diámetro del círculo móvil, y dirección, representada por el segmento que une punto de inicio y posición actual. Además se establece un círculo fijo que marca el límite de la magnitud máxima posible.

(2.) Al arrastrarse el click mantenido cambiará el diámetro del círculo móvil (según la distancia respecto al punto de origen) y cambiará el segmento (según la posición del desplazamiento). Si el movimiento excede la magnitud máxima, entonces el círculo móvil se <i>equipára</i> al círculo fijo. Si el movimiento es menor a la magnitud mínima, entonces el círculo móvil y el segmento se vuelven grisáceos.

(3.) El tiro se ejecuta al liberar el click mantenido, solo si se lo hace con una magnitud mayor a la mínima (para evitar clicks accidentales o para arrepentirse). La persona se moverá de forma proporcional a la magnitud y la dirección del vector trazado.

<br>

#### <span id="mensajes">Mensajes “1B-3D”</span>

<br>

Ahora aparece otra fantasía, esta vez un poco más compleja, pero aún dentro de lo realizable. Las magnitudes se representan como porcentajes (en números enteros del 1 al 100) y las direcciones como grados (en números enteros del 1 al 360). Los números del 1 al 100 se pueden abarcar completamente con dos dígitos. Los números del 1 al 360 se pueden abarcar completamente en la combinatoria de dos letras. Con un alfabeto de 19 letras (especialmente seleccionadas para evitar confusiones fonéticas como “ve larga” y “ve corta”) habrían 361 formas posibles de relacionar dos letras, lo que se puede usar para representar ordenadamente los 360 grados necesarios. Así cada tiro se puede comunicar mediante dos pares ordenados de dígito y letra. Por ejemplo: “1B-3D”. Donde la magnitud sería 13% (por el 1 y el 3) y la dirección sería 23 grados, debido a la suma de 19 y 4. Abre paréntesis. Este resultado es porque B en primera posición significa que se abarcaron los 19 casos posibles con A en primera posición, y luego se suman los 4 casos posibles recorriendo la segunda posición desde la A que equivale a 1 hasta la D que equivale a 4. Cierra paréntesis. Además, para las situaciones en que una persona tuvo que decidir sobre colocar un objetivo en una nueva posición, sería solamente entre dos opciones: <i>naturál</i> o forzado. Esta información se puede representar mediante el orden en que se dispone cada par. Por ejemplo para casos naturales sería: “1B-3D”. Y para casos forzados sería: “B1-D3”; (invirtiendo la letra por el número).

<i>Naturál</i> y forzado son solamente dos opciones porque todo los casos en que se puede decidir una relocalización son reducibles a: (caso 1.) solo desaparece un objetivo y las dos esquinas vacías están sin obstruír, por lo que habrán dos posiciones posibles para elegir; o (caso 2.) desaparecen los dos objetivos pero una de las personas está sobre una de las esquinas vacías, por lo que el primer objetivo ocupará la otra esquina vacía y para el segundo habrá que elegir entre una de las dos esquinas que se encontraban ocupadas previamente. En ambos casos existe una posición predicha para ser ocupada. Se toma esa posición predicha como referencia para determinar si la relocalización se hace en la esquina siguiente en sentido horario, llamada <i>naturál</i>, o en la subsiguiente, llamada forzada (que se salta a la posición <i>naturál</i>). En cualquier otro caso no se llegará a hacer una elección, porque con las dos primeras reglas bastará para asignar automáticamente las posiciones. Las reglas eran éstas: (primero.) es requisito que las esquinas no estén obstruídas por una persona; (segundo.) se priorizan las esquinas que no hayan estado ocupadas previamente; (tercero.) si finalmente queda más de una opción, entonces la persona decide. Por ejemplo, si se diera el caso en que desaparecieran los dos objetivos, y las dos esquinas vacías se encuentran obstruídas, entonces los objetivos volverán a aparecer en las mismas esquinas que se encontraban. De forma similar se pueden deducir todos los demás casos. Aclaración: Los nombres <i>naturál</i> y forzado y la lógica de cómo se traduce la información no son para que las personas lo tengan en cuenta, sino para entender el funcionamiento interno del código fuente.

Con todo esto en mente, se tiene que cada mensaje transmite información precisa sobre magnitud en porcentaje, sobre dirección en grados y, si sucede, sobre relocalización forzada del objetivo. Se pueden hacer hasta algo menos de 72.200 tiros distintos diferentes por cada jugada; y, con un mensaje fácil de oír y decir, se puede codificar y decodificar toda la información necesaria para que una persona le comunique a otra específicamente qué tiro hizo.

Lo que describí lo puedo hacer, y lo incluiré en la próxima versión. Por ahora lo resolveré con condicionales y bucles, pero me gustaría aprender sobre expresiones regulares para que sea un código más eficiente.

<br>

#### <span id="finalidad">Finalidad</span>

<br>

Toda esta explicación es para llegar a lo siguiente: el juego se ejecuta por separado en los navegadores de cada persona. Las reglas, los parámetros y todos los cálculos que se hagan serán exactamente los mismos, pero se obtienen desde procesos paralelos. Las personas interactúan mediante cualquier otra plataforma (por una llamada, por un <i>láiv</i>, por un chat, por comentarios en una publicación, etc). De esta forma se indican mutuamente el estado en que se encuentra su programa. Es decir, una persona hace un tiro y le informa las coordenadas (tipo “1B-3D”) a la otra para que simule el tiro en su propio juego y <i>pre-pare</i> una respuesta. Se genera un intercambio similar al juego de mesa “Batalla Naval” en que hay que informar la posición de cada disparo con un número y una letra. Se hace necesario dialogar. Y no se puede hacer trampa porque se desfasarían las simulaciones y se llegaría a resultados diferentes.

Ahora abro paso a la fantasía especulativa. El objetivo final no será ganar, sino simplemente tener una excusa para mantener una conversación durante mucho rato. La estrategia es volátil por dos motivos: (1.) hay muchísimas posibilidades por cada tiro que se realiza, y (2.) se podría implementar una funcionalidad previa al inicio de cada ronda en que se modifiquen levemente los valores de distintos parámetros, lo que afectará la posición final de cada movimiento (por ejemplo modificar el roce o la velocidad máxima). Así se vuelve imposible de calcular con exactitud una estrategia definitiva. Así se evita que se transforme en un desafío de pensamiento. Así cada juego es un descubrimiento progresivo, unas rondas para ir probando, unas rondas por entretención, unas rondas más en serio y por último unas rondas finales en que se te vaya la vida por ganar. No solo es una excusa que puede ser liviana y que consume pocas palabras, sino que además marca un ritmo, marca etapas de concentración, marca una conversación que fluye y se vuelve tensa, que mantiene un punto de atención compartida, un lugar de encuentro.

<br>

#### <span id="aplicacion">Aplicación</span>

<br>

Me gusta el formato incompleto, me gusta que funcione sin un servidor. Se podría subir en <i>Guit-jab Peiches</i>. Me imagino lo simple que sería que cada persona clone el repositorio y levante su propia página. O más fácil, se podría distribuir como un html que contenga todo el script y estilos incrustados, que se pueda enviar como un solo archivo adjunto, un ejecutable listo para abrir en el navegador. Me gusta que no funcione como una app o un videojuego normal. Me gusta que sea necesario conversar de algún modo, que las personas le den la funcionalidad que le falta, que construyan la parte que a mí no me interesa crear. Así, incompleto, sin terminar, el objetivo final es mucho más amplio de lo que cualquier código permitiría por sí solo.

Paso a la última ficción (por mí seguiría, pero está quedando muy largo). La conversación es una motivación general, está claro eso. Pero también podría aparecer la competencia. La dificultad del cálculo hace que la estrategia sea un problema especialmente interesante para algoritmos de aprendizaje automático. Podría ser un juego para máquinas. Que el juego sea el reglamento común. Luego cada máquina hace lo que quiera en su proceso interno y arroja un resultado. Se establece un plazo máximo de tiempo para responder y cada movimiento se valida para asegurarse que esté dentro de lo reglamentario (esto podría hacerlo un servicio externo, una tercera máquina o una comunidad organizada). Los resultados se podrían copiar fácilmente, se podría estudiar cada decisión, porque es un juego entendible, corto y de poca complejidad <i>visuál</i>. Serían razonamientos profundos y a la vez accesibles desde la jugabilidad. Una estrategia útil para cierto caso de parámetros puede ser inútil para otro caso según cálculos extremadamente densos, y aún así, la representación <i>visuál</i> siempre se podría replicar y entender en base a la propia experiencia: el por qué un tiro era mejor que otro, o por qué una máquina tiende a actuar de una determinada forma frente a determinados límites. Por ejemplo, podrían existir distintas categorías de competencias, según tipos de algoritmos o intereses: juegos acelerados para modelos de aprendizaje rápido, juegos pesados en que se aumente la resolución interna o la precisión de un decimal, juegos con mayor variabilidad que incentiven a la creatividad, juegos artificialmente difíciles para algoritmos profundos, juegos optimizados para consumir la menor cantidad energía posible, etc, etc, etc.

<br>

#### <span id="cierre">Cierre</span>

<br>

Si funcionara, si realmente abriera una posibilidad de contacto directo entre el cálculo complejo y la experiencia corporal, ¿qué posición ocuparían las máquinas? ¿qué significaría el trabajo? Siento una mezcla de ilusión y pánico, porque nada de lo que dije es ciencia ficción; porque es el presente; porque es un futuro que ya existe. Ya somos máquinas, ya trabajamos de la forma descrita; y nada es distinto, nada está mejorando. No hay afuera, el mundo es un zapallo.

<br>

Nada es distinto, nada está mejorando. No hay afuera, el mundo es un zapallo.

<br>

<br>

***

<br>

### <span id="traduccion">Traducción</span>

<br>

Palabras modificadas para el lector de pantalla:

<ul>
 
<li>metér  →  meter

<li>errór  →  error

<li>Bul-Pul  →  BoolPool

<li>Snéik  →  Snake

<li>equipára  →  equipara

<li>naturál  →  natural

<li>láiv  →  live

<li>pre-pare  →  prepare

<li>Guit-jab  →  Github

<li>Peiches  →  Pages

<li>visuál  →  visual

</ul>

<br>

### <span id="fuentes">Fuentes</span>

<br>

La resignificación del software fragmentado es influencia directa del texto "Usuaria Turing Completa" (2012) de Olia Lialina. Disponible en: <a href="https://endefensadelsl.org/usuaria_turing_completa.pdf" target="_blank" rel="noopener">https://endefensadelsl.org/usuaria_turing_completa.pdf</a>

Para las colisiones entre las personas usé un algoritmo publicado en "Foundation HTML5 Animation with JavaScript" (2011) por Keith Peters, explicado por Long Nguyen en este video: <a href="https://youtu.be/guWIF87CmBg?si=iG-x1BCl9WxKKIxk" target="_blank" rel="noopener">https://youtu.be/guWIF87CmBg?si=iG-x1BCl9WxKKIxk</a>

<br>

<br>

