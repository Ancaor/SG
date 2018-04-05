class Bola extends Mesh{
    constructor(){
        super();
        this.velocidad = 5; //unidades / s
        this.tiempoAnterior = Date.now();

    }
    //resetea meteorito llevandolo para lanzarlo de nuevo desde otra posición
    reset(){
        //cambia lo que sea
    }

    update(){
        var tiempoActual = Date.now();
        this.position.z += this.velocidad * (tiempoActual-this.tiempoAnterior)/1000; // /1000 para ponerlo en ms.
        this.tiempoAnterior = tiempoActual;

        // detectar colisiones y hacer algo
        

    }
}




// Hay una clase superior a esta , por ejemplo , class Lanzador que tendria los objetos Bola y en su update cada x tiempo decidiria lanzar
// una nueva bola, eligiendo su posicion inicial y destino y de que tipo es.



//codigos del cursor

//flecha izquierda = 37
//flecha parriba = 38
//flecha derecha = 39
//flecha oabajo = 40


//giros del robot

robot.rotation.y += 0.1;
                 -= 0.1;

//avanzar robot
incremento(x)=disatncia * sin(robot.rotation.y)
incremento(z)=distancia * cos(robot.rotation.y)
//o
nodo.position.x += incremento(x)  
nodo.position.z -= incremento(z)
