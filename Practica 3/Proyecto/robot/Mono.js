class Mono extends Physijs.BoxMesh{

    constructor(){
        

        var material = new THREE.MeshPhongMaterial ({color: 0xf90000,transparent: false, opacity: 0.7});
        super(geometria, material, 0);
        this.position.y = 5;


        ///Movimiento

        this.velocidad_X = 5;
        this.velocidad_Y = 0;
        this.velocidad_Z = 5;

        ///
        this.subir_cara = false;
        this.posicion_base = 6;
        this.position.y = this.posicion_base;
        //

        this.orientacion = 0 //0:z+ , 1:x+ , 2:z- , 3 :x-       

        
    }

    update(){
      //  console.log(this.mono);

      if(this.subir_cara){
        this.position.y +=0.005;
        console.log("subiendo. Y="+this.position.y);
        if(this.position.y >= (this.posicion_base+0.5))
            this.subir_cara = false;

      }else{
        this.position.y -=0.005;
        console.log("bajandoY="+this.position.y);
        if(this.position.y <= (this.posicion_base-0.5))
            this.subir_cara = true;
      }

     // this.ojoDer.update();

    }


    moveForward(){
        this.__dirtyPosition = true;
        this.position.z += 0.5;
    }

    moveBackward(){
        this.__dirtyPosition = true;
        this.position.z -= 0.5;
    }

    moveLeft(){
        this.__dirtyPosition = true;
        this.position.x +=0.5;
    }

    moveRight(){
        this.__dirtyPosition = true;
        this.position.x -=0.5;
    }

    ajustarOrientacion(o){

        this.__dirtyRotation = true;
        switch(o){
            case 0: this.rotation.y = 0 ;break;
            case 1: this.rotation.y = (Math.PI/2) ;break;
            case 2: this.rotation.y = Math.PI ;break;
            case 3: this.rotation.y = -(Math.PI/2) ;break;
        }
        this.orientacion = o;

    }
   

}