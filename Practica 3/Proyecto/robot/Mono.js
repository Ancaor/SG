class Mono extends THREE.Object3D{

    constructor(){
        super();


        this.objeto = objeto;
        this.add(this.objeto);
    

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

     // this.ojoDer.update();

    }


    moveForward(sala, Coordenada_X, Coordenada_Z){
        if(this.position.z + 0.5 < sala.limite + Coordenada_Z|| ((sala.puertas[0]) && (this.position.x < sala.tama_puerta + Coordenada_X) && (this.position.x > -sala.tama_puerta + Coordenada_X) )){
            if(this.PasilloHorizontal){
                if( this.position.z + 0.5 < sala.tama_puerta + Coordenada_Z)
                    this.position.z +=0.5;
            }
            else{
                this.position.z +=0.5;
            }
            this.updatePasilloVertical(sala, Coordenada_X, Coordenada_Z);
        }
    }

    moveBackward(sala, Coordenada_X, Coordenada_Z){
        if(this.position.z - 0.5 > -sala.limite + Coordenada_Z || ((sala.puertas[2]) && (this.position.x < sala.tama_puerta + Coordenada_X) && (this.position.x > -sala.tama_puerta + Coordenada_X) ) ){
            if(this.PasilloHorizontal){
                if( this.position.z - 0.5 > -sala.tama_puerta + Coordenada_Z)
                    this.position.z -=0.5;
            }
            else{
                this.position.z -=0.5;
            }
            this.updatePasilloVertical(sala, Coordenada_X, Coordenada_Z);
        }

    }

    moveLeft(sala, Coordenada_X, Coordenada_Z){
        if(this.position.x + 0.5 < sala.limite+Coordenada_X || ((sala.puertas[3]) && (this.position.z < sala.tama_puerta + Coordenada_Z) && (this.position.z > -sala.tama_puerta + Coordenada_Z) )){
            if(this.PasilloVertical){
                if( this.position.x + 0.5 < sala.tama_puerta+Coordenada_X)
                    this.position.x +=0.5;
            }
            else{
                this.position.x +=0.5;
            }
            this.updatePasilloHorizontal(sala, Coordenada_X, Coordenada_Z);
        }
    }

    moveRight(sala, Coordenada_X, Coordenada_Z){
        if(this.position.x - 0.5 > -sala.limite + Coordenada_X|| ((sala.puertas[1]) && (this.position.z < sala.tama_puerta + Coordenada_Z) && (this.position.z > -sala.tama_puerta + Coordenada_Z) )){
            if(this.PasilloVertical){
                if( this.position.x - 0.5 > -sala.tama_puerta + Coordenada_X)
                    this.position.x -=0.5;
            }
            else{
                this.position.x -=0.5;
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
   

}