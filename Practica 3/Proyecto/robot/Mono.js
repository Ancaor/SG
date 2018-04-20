class Mono extends THREE.Object3D{

    constructor(){
        super();


        this.objeto = objeto;
        this.add(this.objeto);
    

        ///
        this.subir_cara = false;
        this.posicion_base = 5;
        //

        this.orientacion = 0 //0:z+ , 1:x+ , 2:z- , 3 :x-



        this.ojoDer = new Launcher();
        this.ojoDer.position.y = 5;

        this.ojoDer.position.z = 1.2;
        this.ojoDer.position.x = 0.6;
        this.ojoDer.position.y = 0.4;

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


    moveForward(sala){
        if(this.position.z + 0.5 < sala.limite || ((sala.puertaSup) && (this.position.x < sala.tama_puerta) && (this.position.x > -sala.tama_puerta) )){
            if(this.PasilloHorizontal){
                if( this.position.z + 0.5 < sala.tama_puerta)
                    this.position.z +=0.5;
            }
            else{
                this.position.z +=0.5;
            }
            this.updatePasilloVertical(sala);
        }
    }

    moveBackward(sala){
        if(this.position.z - 0.5 > -sala.limite || ((sala.puertaInf) && (this.position.x < sala.tama_puerta) && (this.position.x > -sala.tama_puerta) ) ){
            if(this.PasilloHorizontal){
                if( this.position.z - 0.5 > -sala.tama_puerta)
                    this.position.z -=0.5;
            }
            else{
                this.position.z -=0.5;
            }
            this.updatePasilloVertical(sala);
        }

    }

    moveLeft(sala){
        if(this.position.x + 0.5 < sala.limite || ((sala.puertaIzq) && (this.position.z < sala.tama_puerta) && (this.position.z > -sala.tama_puerta) )){
            if(this.PasilloVertical){
                if( this.position.x + 0.5 < sala.tama_puerta)
                    this.position.x +=0.5;
            }
            else{
                this.position.x +=0.5;
            }
            this.updatePasilloHorizontal(sala);
        }
    }

    moveRight(sala){
        if(this.position.x - 0.5 > -sala.limite || ((sala.puertaDer) && (this.position.z < sala.tama_puerta) && (this.position.z > -sala.tama_puerta) )){
            if(this.PasilloVertical){
                if( this.position.x - 0.5 > -sala.tama_puerta)
                    this.position.x -=0.5;
            }
            else{
                this.position.x -=0.5;
            }
            this.updatePasilloHorizontal(sala);
        }
        
    }

    updatePasilloVertical(sala){
        if((sala.puertaInf || sala.puertaSup) && (this.position.x < sala.tama_puerta) && (this.position.x > -sala.tama_puerta) && (this.position.z <= -sala.limite || this.position.z >= sala.limite) )
            this.PasilloVertical = true;
        else
            this.PasilloVertical = false;
    }

    updatePasilloHorizontal(sala){
        if((sala.puertaIzq || sala.puertaDer) && (this.position.z < sala.tama_puerta) && (this.position.z > -sala.tama_puerta) && (this.position.x <= -sala.limite || this.position.x >= sala.limite) )
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