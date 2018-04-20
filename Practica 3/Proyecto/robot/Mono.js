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


    moveForward(limite){
        if(this.position.z + 0.5 < limite)
        this.position.z += 0.5;
    }

    moveBackward(limite){
        if(this.position.z - 0.5 > -limite || (this.position.x < 2.5 && this.position.x > -2.5))
        this.position.z -= 0.5;
    }

    moveLeft(limite){
        if(this.position.x + 0.5 < limite)
        this.position.x +=0.5;
    }

    moveRight(limite){
        if(this.position.x - 0.5 > -limite)
        this.position.x -=0.5;
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