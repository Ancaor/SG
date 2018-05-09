class Mono extends THREE.Object3D{

    constructor(){
        super();


        this.objeto = objeto.clone();
        this.add(this.objeto);

        this.vidaInicial = 3;

        this.velocidad = 0.5;
        this.vida = this.vidaInicial;
    

        ///
        this.subir_cara = false;
        this.posicion_base = 3;
        //

        this.orientacion = 0 //0:z+ , 1:x+ , 2:z- , 3 :x-



        this.ojoDer = new Launcher();
        //this.ojoDer.position.y = 5;

       //this.ojoDer.position.z = 1.2;
       //this.ojoDer.position.x = 0.6;
       this.ojoDer.position.y = -0.7;

        this.add(this.ojoDer)

        this.position.y = this.posicion_base;
        
        this.PasilloHorizontal = false;
        this.PasilloVertical = false;

        this.radioEsferaEnglobante = 0.7;
       // this.esferaGeometria = new THREE.SphereGeometry (this.radioEsferaEnglobante,32,32);
      //  this.esferaEnglobante = new THREE.Mesh(this.esferaGeometria,new THREE.MeshPhongMaterial ({color: 0x00604f, specular: 0xfbf804, shininess: 70}))
        //this.add(this.esferaEnglobante);

        //Propiedades de las lágrimas
        this.cadencia = 0.3;
        this.velocidadLagrima = 30;
        this.radioLagrima = 0.35;
        this.colorLagrima = 0xffffffff;
        this.damage = 20;


        
    }

    update(){
      //  console.log(this.mono);

      if(this.subir_cara){
        this.position.y +=0.005;
        if(this.position.y >= (this.posicion_base+0.5))
            this.subir_cara = false;

      }else{
        this.position.y -=0.005;
        if(this.position.y <= (this.posicion_base-0.5))
            this.subir_cara = true;
      }

    //  console.log(this.position);

     // this.ojoDer.update();

    }

    moveForward(sala, Coordenada_X, Coordenada_Z){

        if(this.position.z + this.velocidad < sala.limite + Coordenada_Z|| ((sala.puertas[0]) && (this.position.x < sala.tama_puerta + Coordenada_X) && (this.position.x > -sala.tama_puerta + Coordenada_X) )){
            if(this.PasilloHorizontal){
                if( this.position.z + this.velocidad < sala.tama_puerta + Coordenada_Z)
                    this.position.z +=this.velocidad;
            }
            else{
                this.position.z +=this.velocidad;
            }
            this.updatePasilloVertical(sala, Coordenada_X, Coordenada_Z);
        }
    }

    moveBackward(sala, Coordenada_X, Coordenada_Z){
        if(this.position.z - this.velocidad > -sala.limite + Coordenada_Z || ((sala.puertas[2]) && (this.position.x < sala.tama_puerta + Coordenada_X) && (this.position.x > -sala.tama_puerta + Coordenada_X) ) ){
            if(this.PasilloHorizontal){
                if( this.position.z - this.velocidad > -sala.tama_puerta + Coordenada_Z)
                    this.position.z -=this.velocidad;
            }
            else{
                this.position.z -=this.velocidad;
            }
            this.updatePasilloVertical(sala, Coordenada_X, Coordenada_Z);
        }

    }

    moveLeft(sala, Coordenada_X, Coordenada_Z){
        if(this.position.x + this.velocidad < sala.limite+Coordenada_X || ((sala.puertas[3]) && (this.position.z < sala.tama_puerta + Coordenada_Z) && (this.position.z > -sala.tama_puerta + Coordenada_Z) )){
            if(this.PasilloVertical){
                if( this.position.x + this.velocidad < sala.tama_puerta+Coordenada_X)
                    this.position.x +=this.velocidad;
            }
            else{
                this.position.x +=this.velocidad;
            }
            this.updatePasilloHorizontal(sala, Coordenada_X, Coordenada_Z);
        }
    }

    moveRight(sala, Coordenada_X, Coordenada_Z){
        if(this.position.x - this.velocidad > -sala.limite + Coordenada_X|| ((sala.puertas[1]) && (this.position.z < sala.tama_puerta + Coordenada_Z) && (this.position.z > -sala.tama_puerta + Coordenada_Z) )){
            if(this.PasilloVertical){
                if( this.position.x - this.velocidad > -sala.tama_puerta + Coordenada_X)
                    this.position.x -=this.velocidad;
            }
            else{
                this.position.x -=this.velocidad;
            }
            this.updatePasilloHorizontal(sala, Coordenada_X, Coordenada_Z);
        }
        
    }

    updatePasilloVertical(sala, Coordenada_X, Coordenada_Z){
        if((sala.puertas[2] || sala.puertas[0]) && (this.position.x < sala.tama_puerta + Coordenada_X) && (this.position.x > -sala.tama_puerta + Coordenada_X) && (this.position.z <= -sala.limite + Coordenada_Z || this.position.z >= sala.limite + Coordenada_Z) )
            this.PasilloVertical = true;
        else
            this.PasilloVertical = false;
    }

    updatePasilloHorizontal(sala, Coordenada_X, Coordenada_Z){
        if((sala.puertas[1] || sala.puertas[3]) && (this.position.z < sala.tama_puerta + Coordenada_Z) && (this.position.z > -sala.tama_puerta + Coordenada_Z) && (this.position.x <= -sala.limite + Coordenada_X || this.position.x >= sala.limite + Coordenada_X) )
            this.PasilloHorizontal = true;
        else
            this.PasilloHorizontal = false;
    }



    ajustarOrientacion(o){

        switch(o){
            case 0: this.rotation.y = 0 ;break;
            case 1: this.rotation.y = (Math.PI/2) ;break;
            case 2: this.rotation.y = Math.PI ;break;
            case 3: this.rotation.y = -(Math.PI/2) ;break;
        }
        this.orientacion = o;

    }

    restart(){
        this.position.x = 0;
        this.position.z = 0;
        this.vida = this.vidaInicial;

        this.cadencia = 0.3;
        this.velocidadLagrima = 30;
        this.radioLagrima = 0.35;
        this.colorLagrima = 0xffffffff;
        this.damage = 20;
    }
   
    setPosicion(x,z){
        this.position.x = x;
        this.position.z = z;
    }

}