## IA1 TP2 - Juego para conversar

## IG1 - Examen final

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

### Narración

<br>

Este juego es una excusa. Hice un examen que me gustó mucho y lo aproveché para meterle otro poco de creatividad. Necesito darle espacio a mi imaginación, asi que diré en palabras lo que no alcanzo a hacer en código. Me gustan las palabras cuando son para invitar a imaginar cosas. El juego está incompleto, pero se puede jugar igual. Aprovecho esta excusa  para hablar de lo que me gustaría hacer, mezclando ciencia ficción, código, fantasía, tareas pendientes, promesas dudables y reciclajes de último minuto. Para que vayamos aprendiendo a jugarlo por si algún día queremos aburrirnos en compañía y no tenemos otra excusa mejor que ésta.

El juego se llama BoolPool. Es muy simple, se aprende rápido, se juega por instinto, sin pensarlo mucho. Es de estrategia, porque no hay azar, pero no sirve memorizarlo. Es para aprender a prueba y error, para sorprender con una jugada inesperada, para prestar atención al diálogo, para cambiar de planes, para inventar sobre la marcha.

Hay dos personas, P0 y P1. En dos de las cuatro esquinas hay un objetivo que parpadea. Cada vez que una persona toca un objetivo durante su turno, suma un punto. Cada vez que una persona toca un objetivo (sea su turno o no), el objetivo desaparece. Al final del turno se colocan nuevamente los objetivos. En algunos casos será la propia persona quién decida dónde colocar el objetivo, en otros casos se colocará automáticamente siguiendo el reglamento: es requisito que las esquinas no estén ocupadas y se prioriza que no hayan tenido un objetivo antes del turno. Gana quién haga cuatro puntos en total, o quién haga dos puntos consecutivos en un mismo turno. Cada victoria es una ronda. Se puede jugar al mejor de cierta cantidad de rondas.
 
Abre paréntesis. Aquí apareció la primera fantasía: no hice lo de elegir la esquina en la que colocar el objetivo. O sea lo hice pero no me resultó, entonces hice un random que no funciona muy bien. Hoy se me ocurren mil formas de resolverlo, asi que para la próxima versión ya tendré ese detalle resuelto. Cierra paréntesis.

Las dos opciones de victoria hacen que el juego sea dinámico. Un movimiento ambicioso se puede volver en una derrota segura. Pero no arriesgar y dejar a la otra persona ganar un punto en cada turno significa que también perderás pronto (en 4 turnos máximo). Hay que buscar un equilibrio entre ataque y defensa, no se puede estar quieto. 

Los objetivos desaparecen como las manzanitas del snéik. Las personas se desplazan y colisionan como bolas de pool. Cada tiro se prepara de manera similar a los juegos de pool para celulares, de esta forma:

<ol>
<li>Al presionar sobre la pantalla se guarda el punto en que se inicia el movimiento, y se activa una vista que representa los componentes del vector del tiro, estos son: magnitud, representada por diámetro del círculo móvil, y dirección, representada por el segmento que une punto de inicio y posición actual. Además aparece un círculo fijo que marca el límite de la magnitud máxima posible. 

<li>Al arrastrarse el click mantenido cambiará el diámetro del círculo móvil (según la distancia respecto al punto de origen) y el segmento (según posición del desplazamiento). Si el movimiento excede la magnitud máxima, entonces el círculo móvil se equipara al círculo fijo. Si el movimiento es menor a la magnitud mínima el círculo móvil y el segmento se vuelven grisáceos.

<li>El tiro se ejecuta al liberar el touch o click mantenido, solo si se lo hace con una magnitud mayor a la mínima (para evitar clicks accidentales o para arrepentirse). La persona se moverá de forma correspondiente a la velocidad y dirección del vector trazado. 
</ol>

Ahora aparece otra fantasía, esta vez un poco más compleja, pero aún dentro de lo realizable. Las magnitudes se representan como porcentajes (en números enteros del 1 al 100) y las direcciones como grados (en números enteros del 1 al 360). Los números del 1 al 100 se pueden abarcar completamente con dos dígitos. Los números del 1 al 360 se pueden abarcar completamente en la combinatoria de dos letras. Con un alfabeto de 19 letras (especialmente seleccionadas para evitar confusiones fonéticas como “ve larga” y “ve corta”) habrían 361 formas posibles de relacionar dos letras, lo que se puede usar para representar ordenadamente los 360 grados necesarios. Así cada tiro se puede comunicar con dos pares ordenados de dígito y letra. Por ejemplo: “1B - 3D”. Donde la magnitud sería 13% (por el 1 y el 3) y la dirección sería 23 grados, debido a la suma de 19 y 4. Abre paréntesis. Este resultado es porque B significa que se abarcaron los 19 casos posibles con A en primera posición, más los 4 casos posibles con B en primera posición, recorriendo la segunda posición desde la A que equivale a 1 hasta la D que equivale a 4. Cierra paréntesis. Además, si se da el caso de que la persona tuvo que decidir sobre colocar un objetivo en una nueva posición, serían solamente entre dos opciones: naturál o forzada. Esta información se puede representar mediante el orden en que se dispone cada par. Por ejemplo para casos naturales sería: “1B - 3D”. Y para casos forzados sería: “B1, D3”. 

Son dos opciones porque solamente se puede decidir una relocalización en estos casos: 1. solo desaparece un objetivo y las otras dos esquinas están disponibles, por lo que hay dos posiciones posibles para elegir; o 2. desaparecen dos objetivos pero una de las otras esquinas está ocupada por una persona por lo que un objetivo ocupará la esquina disponible y para el otro se debe elegir entre una de las esquinas en que se encontraban los objetivos previamente. En ambos casos existe una posición que ya está determinada y será tomada como referencia para determinar si la relocalización se hace en la esquina siguiente en sentido horario, llamada naturál, o en la subsiguiente, saltando la posición naturál, llamada forzada. Para todos los demás casos se asignarán las relocalizaciones sin posibilidad de elección, siguiendo automáticamente las reglas de que: es requisito que no estén ocupadas las esquinas por personas y se intenta que no se repitan esquinas utilizadas previamente. La lógica y los nombres naturál y forzado no son para que los manejen las personas, sino para entender el funcionamiento interno del código fuente.

Con todo esto en mente, se tiene que cada mensaje contiene la información precisa sobre magnitud, dirección y, si es necesario, relocalización forzada del objetivo. Se pueden hacer hasta algo menos de 72.200 tiros distintos en cada jugada, y con un mensaje fácil de oír y decir se puede codificar y decodificar toda la información necesaria para comunicar cada caso posible.

Lo que describí lo puedo hacer asi que lo incluiré en la próxima versión. Por ahora lo resolveré con condicionales y bucles, pero me gustaría aprender sobre expresiones regulares para que sea un código más eficiente.

...Toda esta explicación era para obtener lo siguiente: el juego se ejecutará por separado en los navegadores de cada persona. Las reglas, los parámetros y todos los cálculos que se hagan serán exactamente los mismos, pero se obtienen en paralelo. Las personas interactúan mediante cualquier otra plataforma (por una llamada, por un laiv, por un chat, por comentarios en una publicación, etc). De esta forma se indican mutuamente el estado en que se encuentra su programa. Es decir, una persona hace un tiro y le informa al otro las coordenadas (tipo “1B - 3D”) para que simule el tiro en su propio juego y pre-pare su próxima jugada en respuesta al nuevo estado de la situación. Se genera un intercambio similar al juego de mesa “Batalla Naval” en que hay que informar la posición de cada disparo con un número y una letra. Se hace necesario dialogar. Y no se puede hacer trampa porque se desfasaría la simulación del otra persona y en algún momento se llegará a resultados diferentes.

Ahora paso a la fantasía especulativa. El objetivo final no será ganar, sino simplemente tener una excusa para mantener una conversación durante mucho rato. La estrategia es volátil por dos motivos: 1. hay muchísimas posibilidades por cada tiro que se realiza y 2. se podría implementar una funcionalidad previa al inicio de cada ronda en que se modifiquen levemente los valores de distintos parámetros, lo que afectará la posición final de cada movimiento (por ejemplo modificar el roce, o la velocidad de la magnitud máxima, o la resolución interna, etc). Así se vuelve imposible de calcular una estrategia en tiempo real. Así se evita que se transforme en un juego de pensamiento. Así cada juego es una conversación que fluye, unas rondas para ir probando, unas rondas por entretención, unas rondas más en serio y por último unas rondas finales en que se te vaya la vida por ganar. No solo es una excusa que puede ser liviana y que consume pocas palabras, sino que además marca un ritmo, marca etapas de concentración, marca una conversación que fluye y se vuelve tensa, que mantiene un punto de atención compartido, un encuentro.

Me gusta el formato incompleto, me gusta que funcione sin un servidor. Se podría subir en yit-jab peiches. Me imagino lo simple que sería que cada persona clone el repositorio y levante su propia página. O más fácil, se podría distribuir como un html que contenga todo el script y estilos incrustados, que se pueda enviar como archivo adjunto, un ejecutable listo para abrir en el navegador. Me gusta que no funcione como una app o un videojuego normal. Me gusta que sea necesario conversar de algún modo, que las personas le den la funcionalidad que le falta, que construyan la parte que a mí no me interesa crear. Así, incompleto, sin terminar, el objetivo final es mucho más amplio de lo que cualquier código permitiría por sí solo.

Sigo con la última ficción (por mí no pararía, pero se está haciendo muy largo). La conversación será la primera motivación, está claro eso. Pero también podría aparecer la competencia. La dificultad del cálculo hace de la estrategia un espacio especialmente interesante para algoritmos de aprendizaje automático. Podría ser un juego para máquinas. Que el juego sea el reglamento común. Luego cada máquina hace lo que quiera en su proceso interno y arroja un resultado. Se establece un plazo máximo de tiempo para responder y cada movimiento se valida para asegurarse que esté dentro de lo reglamentario (esto podría hacerlo un servicio externo, una tercera máquina o una comunidad organizada). Los resultados se podrían copiar fácilmente, se podría estudiar cada decisión, porque es un juego entendible, corto y de poca complejidad visuál. Serían razonamientos profundos y accesibles desde la jugabilidad. Una estrategia útil para cierto caso de parámetros puede ser inútil para otro caso según cálculos extremadamente densos, y aún así, la representación visuál siempre se podrá replicar y entender en base a la propia experiencia: el por qué un tiro era mejor que otro, o por qué una máquina tiende a actuar de determinada forma según determinados límites. Por ejemplo, podrían existir distintas categorías de competencias, de algoritmos o de intereses: para juegos más rápidos o más lentos, más intensos o más livianos (aumentando la precisión de un decimal o la resolución interna), con mayor o menor variabilidad, que se incentive la creatividad, o la potencia, o el bajo consumo, etc, etc…

Si funcionara, si realmente abriera una posibilidad de intercambio entre el cálculo profundo y la experiencia corporal, ¿qué posición ocuparían las máquinas? ¿qué significaría el trabajo? Me da una mezcla entre ilusión y pánico, porque en parte es la ciencia ficción del presente y porque en parte es un futuro que ya existe. Ya somos máquinas, ya trabajamos en algo parecido; y nada es mejor, nada está cambiando. No hay afuera, el mundo es un zapallo.
