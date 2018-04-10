class Meteorito extends THREE.Object3D{
    constructor (parameters) {
        super();
        this.velocidad = Math.random() * (parameters.v+10 - parameters.v) + parameters.v; //unidades / s
        this.tiempoAnterior = Date.now();
        this.tiempoActual = null;

        this.tiempoTranscurrido = 0;

        this.radioColisionGruesa = 5;
        this.posColisionGruesa = new THREE.Vector3(0,4.5,0);

        this.radioColisionFina = 2.6;
        this.posColisionFina = new Array(new THREE.Vector3(0,6.9,0),new THREE.Vector3(0,4.3,0),new THREE.Vector3(0,1.5,0));

        this.tipo = null;               // 0 quita vida, 1 da vida, 2 da puntos.


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



        
////////////////////////////////////////////////////////////// Lanzador visible

        if(this.tipo == 0)
            this.material = new THREE.MeshPhongMaterial ({color: 0xf90000,transparent: false, opacity: 0.7});
        else if(this.tipo == 1)
            this.material = new THREE.MeshPhongMaterial ({color: 0x00ff00,transparent: false, opacity: 0.7});
        else
            this.material = new THREE.MeshPhongMaterial ({color: 0x0080ff,transparent: false, opacity: 0.7});

        var geometria = new THREE.SphereGeometry (1,32,32);    // geometria esfera
        //geometria.applyMatrix (new THREE.Matrix4().makeTranslation(0,1,0));

        this.meteorito = new THREE.Mesh (
            geometria, this.material);
        //this.visor.geometry.applyMatrix (new THREE.Matrix4().makeTranslation(0,1,10));
        this.meteorito.scale.set(this.radio,this.radio,this.radio);
        this.meteorito.position.z = this.posicionz; 
        this.meteorito.position.y = this.posiciony;
        this.meteorito.position.x = this.posicionx;
        this.meteorito.castShadow = true;

        this.add(this.meteorito);

/////////////////////////////////////////////////////////////////////

    }

    reset(){
        this.meteorito.position.z = 50;
    }


    reanudar(){
        this.tiempoActual = Date.now();
        this.tiempoAnterior = (this.tiempoActual - (this.tiempoTranscurrido*1000));
    }

    getEstado(){
        return this.estado;
    }

    getTipo(){
        return this.tipo;
    }

    setEstado(estado){
        this.estado = estado;
    }

    update(posRobot,posGruesa,posFina){ 

        switch(this.estado){
            case 0:    ;break;
            case 1: this.tiempoActual = Date.now();break;
            case 2: ;break;
            case 3: this.reanudar(); break;
        }

        this.tiempoTranscurrido = (this.tiempoActual-this.tiempoAnterior)/1000;
        
        this.meteorito.position.z -= this.velocidad * this.tiempoTranscurrido; // /1000 para ponerlo en ms.
        
        this.tiempoAnterior =this.tiempoActual;

        // detectar colisiones y hacer algo

        var diferencia_radios = this.radio + this.radioColisionGruesa;
        //console.log(this.meteorito.position);
        var posGruesaReal = posRobot;
        posGruesaReal.y = posGruesa;
        var distanciaReal = this.meteorito.position.distanceTo(posGruesaReal);
       

        //if(this.meteorito.position.z < 20){
        //    console.log(distanciaReal);
       // }

        //console.log(this.meteorito.position);
        if(distanciaReal <= diferencia_radios){  // colision gruesa
           // console.log("grande");
            for(var i=0; i < posFina.length; i++){   // colisiones finas
                var posFinaReal = posRobot;
                posFinaReal.y = posFina[i]; 
                var distanciaReal = this.meteorito.position.distanceTo(posFinaReal);
                diferencia_radios = this.radio + this.radioColisionFina;
                if(distanciaReal <= diferencia_radios){
                  //  console.log(i);
                                        //this.reset();      // lo que debe hacer es esto
                   return 1;
                }
            }
           // console.log(this.posColisionFina.length)
        }else{
            
            if(this.meteorito.position.z < -10){
             //   console.log(this.meteorito.position.z)
                return 2;
            }
            
        }
            
           // 
        

    }

}

Meteorito.BUENO = 0;
Meteorito.MALO = 1;