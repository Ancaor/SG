class Mono extends THREE.Object3D{

    constructor(){
        
        super();

        this.material = new THREE.MeshPhongMaterial ({color: 0xf90000,transparent: false, opacity: 0.7});

        
        this.cara =  new Physijs.BoxMesh(geometria, this.material, 0);
        this.add(this.cara);

        ///
        this.subir_cara = false;
        this.posicion_base = 5;
        this.position.y = this.posicion_base;
        //

        this.orientacion = 0 //0:z+ , 1:x+ , 2:z- , 3 :x-

        this.ojoDer = new Launcher();
        this.ojoDer.position.y = 5;

        this.ojoDer.position.z = 1.2;
        this.ojoDer.position.x = 0.6;
        this.ojoDer.position.y = 0.4;

        this.add(this.ojoDer);
        

        
    }
/*
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
        this.position.z += 0.5;
    }

    moveBackward(){
        this.position.z -= 0.5;
    }

    moveLeft(){
        this.position.x +=0.5;
    }

    moveRight(){
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
   */

}