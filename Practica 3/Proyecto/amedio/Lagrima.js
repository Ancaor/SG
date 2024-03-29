class Lagrima extends THREE.Object3D{
    constructor (parameters) {
        super();
        this.velocidad = parameters.v; //unidades / s
        this.tiempoAnterior = Date.now();
        this.tiempoActual = null;

        this.tiempoTranscurrido = 0;
        this.orientacion = parameters.o;

        this.posicionz = parameters.z;
        this.posiciony = parameters.y;
        this.posicionx = parameters.x;

        this.radio = parameters.r;

        this.tipo = parameters.t;

        this.xReal = parameters.xReal;
        this.zReal = parameters.zReal;



        

        this.material = new THREE.MeshPhongMaterial ({color: parameters.c,transparent: false, opacity: 0.7});
        
        var geometria = new THREE.SphereGeometry (1,32,32);    // geometria esfera

        this.lagrima = new THREE.Mesh (
            geometria, this.material);
        
        this.lagrima.scale.set(this.radio,this.radio,this.radio);
        this.position.set(this.posicionx,this.posiciony,this.posicionz)


        this.lagrima.castShadow = true;

        this.lagrima.layers.set(1);
        this.add(this.lagrima);

/////////////////////////////////////////////////////////////////////


    }

    update(sala, Coordenada_X, Coordenada_Z,objetivo){
        this.tiempoActual = Date.now();

        this.tiempoTranscurrido = (this.tiempoActual-this.tiempoAnterior)/1000;
        
        switch(this.orientacion){

            case 0:
            if((this.position.z + (this.velocidad * this.tiempoTranscurrido) < sala.limite + Coordenada_Z) && (this.position.x < sala.limite + Coordenada_X)&& (this.position.x > -sala.limite + Coordenada_X))
             this.position.z += this.velocidad * this.tiempoTranscurrido;
             else return -1;            //Ha colisionado con la pared
             
              break;
            case 2:
            if((this.position.z - (this.velocidad * this.tiempoTranscurrido) > -sala.limite + Coordenada_Z) && (this.position.x < sala.limite + Coordenada_X)&& (this.position.x > -sala.limite + Coordenada_X))
             this.position.z -= this.velocidad * this.tiempoTranscurrido;
             else return -1;            //Ha colisionado con la pared 
             break;

            case 1:
            if((this.position.x + (this.velocidad * this.tiempoTranscurrido) < sala.limite + Coordenada_X) && (this.position.z < sala.limite + Coordenada_Z)&& (this.position.z > -sala.limite + Coordenada_Z))
             this.position.x += this.velocidad * this.tiempoTranscurrido; 
             else return -1;            //Ha colisionado con la pared
             break;

            case 3:
            if((this.position.x - (this.velocidad * this.tiempoTranscurrido) > -sala.limite + Coordenada_X)&& (this.position.z < sala.limite + Coordenada_Z)&& (this.position.z > -sala.limite + Coordenada_Z))
             this.position.x -= this.velocidad * this.tiempoTranscurrido; 
             else return -1;            //Ha colisionado con la pared
             break;

            case 4:
            if((this.position.z + (this.velocidad * this.tiempoTranscurrido) < sala.limite + Coordenada_Z) && (this.position.x < sala.limite + Coordenada_X)&& (this.position.x > -sala.limite + Coordenada_X)){
             this.position.z += this.velocidad * this.tiempoTranscurrido * Math.sin(45);
             this.position.x -= this.velocidad * this.tiempoTranscurrido * Math.sin(45);
            }
             else return -1;            //Ha colisionado con la pared
             
              break;

             case 5:
             if((this.position.x - (this.velocidad * this.tiempoTranscurrido) > -sala.limite + Coordenada_X)&& (this.position.z < sala.limite + Coordenada_Z)&& (this.position.z > -sala.limite + Coordenada_Z)){
                this.position.x -= this.velocidad * this.tiempoTranscurrido * Math.sin(45);
                this.position.z -= this.velocidad * this.tiempoTranscurrido * Math.sin(45);
             }
             else return -1;            //Ha colisionado con la pared
             break;

             case 6:
            if((this.position.z - (this.velocidad * this.tiempoTranscurrido) > -sala.limite + Coordenada_Z) && (this.position.x < sala.limite + Coordenada_X)&& (this.position.x > -sala.limite + Coordenada_X)){
             this.position.z -= this.velocidad * this.tiempoTranscurrido * Math.sin(45);
             this.position.x += this.velocidad * this.tiempoTranscurrido * Math.sin(45);
            }
             else return -1;            //Ha colisionado con la pared 
             break;

             case 7:
             if((this.position.x + (this.velocidad * this.tiempoTranscurrido) < sala.limite + Coordenada_X) && (this.position.z < sala.limite + Coordenada_Z)&& (this.position.z > -sala.limite + Coordenada_Z)){
             this.position.x += this.velocidad * this.tiempoTranscurrido * Math.sin(45);
             this.position.z += this.velocidad * this.tiempoTranscurrido * Math.sin(45); 
            }
             else return -1;            //Ha colisionado con la pared
             break;
        
        }

        if(this.tipo == 0){
           // console.log(this.position);

           var posAux = new THREE.Vector3(objetivo.position.x,this.position.y,objetivo.position.z);
           var posRealLagrima = new THREE.Vector3(this.position.x + this.xReal,this.position.y,this.position.z + this.zReal);

            var diferencia_radios = this.radio + objetivo.radioEsferaEnglobante;
            var distanciaReal = posAux.distanceTo(posRealLagrima);

            if(distanciaReal <= diferencia_radios){ 
                return 1;       //Ha colisionado con el mono
            }
        }else if(this.tipo == 1){

            var longitud = objetivo.children.length;

            for(var i=0;i < longitud; i++){

                    var posAux = new THREE.Vector3(objetivo.children[i].mesh.position.x + objetivo.children[i].salaActual.infoSala.Coordenada_X,this.position.y,objetivo.children[i].mesh.position.z + objetivo.children[i].salaActual.infoSala.Coordenada_Z);
                    var posRealLagrima = new THREE.Vector3(this.position.x ,this.position.y,this.position.z + this.zReal);
                    var diferencia_radios = this.radio + objetivo.children[i].radioEsferaEnglobante;
                    var distanciaReal = posAux.distanceTo(posRealLagrima);

                    if(distanciaReal <= diferencia_radios){ 
                        return i;       //Ha colisionado con el enemigo con indice i
                    }

            }


        }

        
        
        
        this.tiempoAnterior =this.tiempoActual;
        return -2;      //No ha colisionado
    }
    
}