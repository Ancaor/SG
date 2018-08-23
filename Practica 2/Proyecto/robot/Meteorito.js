class Meteorito extends THREE.Object3D{
    constructor (parameters) {
        super();

        this.velocidad = Math.random() * (parameters.v+10 - parameters.v) + parameters.v; //unidades / s
        this.tiempoAnterior = Date.now();
        this.tiempoActual = null;

        this.tiempoTranscurrido = 0;
        this.orientacion = parameters.o;

        this.radioColisionGruesa = 5;

        this.radioColisionFina = 2.6;

        this.tipo = null;               // 0 quita vida, 1 da vida, 2 da puntos.


        // Eleccion del tipo de meteorito en la creación
        var num_aleatorio = Math.floor(Math.random() * (11 - 1)) + 1;        
        if(num_aleatorio < 7){
            this.tipo = 0;
        }
        else if(num_aleatorio == 7 || num_aleatorio == 8 || num_aleatorio == 9){
            this.tipo = 2;
        }
        else{
            this.tipo = 1;
        }

        this.posicionz = parameters.z;
        this.posiciony = parameters.y;
        this.posicionx = parameters.x;


        this.radio=1;


        this.estado = 0; // 0 no empezado, 1 funcionando,2 pausado , 3 reanudada



        
////////////////////////////////////////////////////////////// Mesh del meteorito

        if(this.tipo == 0)
            this.material = new THREE.MeshPhongMaterial ({color: 0xf90000,transparent: false, opacity: 0.7});
        else if(this.tipo == 1)
            this.material = new THREE.MeshPhongMaterial ({color: 0x00ff00,transparent: false, opacity: 0.7});
        else
            this.material = new THREE.MeshPhongMaterial ({color: 0x0080ff,transparent: false, opacity: 0.7});

        var geometria = new THREE.SphereGeometry (1,32,32);    // geometria esfera

        this.meteorito = new THREE.Mesh (
            geometria, this.material);
        
        this.meteorito.scale.set(this.radio,this.radio,this.radio);
        this.meteorito.position.z = this.posicionz; 
        this.meteorito.position.y = this.posiciony;
        this.meteorito.position.x = this.posicionx;
        this.meteorito.castShadow = true;

        this.add(this.meteorito);

/////////////////////////////////////////////////////////////////////

    }

    /*Ajusta tiempos para la correcta reanudación del meteorito
    */
    reanudar(){
        this.tiempoActual = Date.now();
        this.tiempoAnterior = (this.tiempoActual - (this.tiempoTranscurrido*1000));
    }

    /*Devuelve el estado del meteorito
    */
    getEstado(){
        return this.estado;
    }

    /*Devuelve el tipo del meteorito
    */
    getTipo(){
        return this.tipo;
    }

    /*Ajusta el estado del meteorito
    */
    setEstado(estado){
        this.estado = estado;
    }

    /*
        Actualiza el estado del meteorito y detecta colisiones.

        argumentos:
            posRobot: vector con la posición del robot
            posGruesa: componente Y del centro de la esfera de colisiones Gruesa.
            posFina: vector con las componentes Y de las 3 esferas de colisión fina.
        return:
            -1 si colisiona con el robot.
            -2 si sale del mapa.
    */
    update(posRobot,posGruesa,posFina){ 

        switch(this.estado){
            case 0:    ;break;
            case 1: this.tiempoActual = Date.now();break;
            case 2: ;break;
            case 3: this.reanudar(); break;
        }

        this.tiempoTranscurrido = (this.tiempoActual-this.tiempoAnterior)/1000;
        
        switch(this.orientacion){
            case 'n': this.meteorito.position.z += this.velocidad * this.tiempoTranscurrido; break;
            case 's': this.meteorito.position.z -= this.velocidad * this.tiempoTranscurrido; break;
            case 'e': this.meteorito.position.x += this.velocidad * this.tiempoTranscurrido; break;
            case 'o': this.meteorito.position.x -= this.velocidad * this.tiempoTranscurrido; break;
        }
        
        this.tiempoAnterior =this.tiempoActual;


        // detectar colisiones
        var diferencia_radios = this.radio + this.radioColisionGruesa;
        var posGruesaReal = posRobot;
        posGruesaReal.y = posGruesa;
        var distanciaReal = this.meteorito.position.distanceTo(posGruesaReal);
       

        if(distanciaReal <= diferencia_radios){  // colision gruesa
            for(var i=0; i < posFina.length; i++){   // colisiones finas
                var posFinaReal = posRobot;
                posFinaReal.y = posFina[i]; 
                var distanciaReal = this.meteorito.position.distanceTo(posFinaReal);
                diferencia_radios = this.radio + this.radioColisionFina;
                if(distanciaReal <= diferencia_radios){
                   return 1;
                }
            }
        }else{
            
            switch(this.orientacion){
                case 'n': if(this.meteorito.position.z > 150) return 2; break;
                case 's': if(this.meteorito.position.z < -150) return 2;  break;
                case 'e': if(this.meteorito.position.x > 150) return 2; break;
                case 'o': if(this.meteorito.position.x < -150) return 2; break;
            }
        }
        

    }

}
