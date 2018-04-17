class Mono extends THREE.Object3D{

    constructor(){
        super();


        this.cargado = false;

        this.cuerpo = null;
        this.cara = null

        ///
        this.subir_cara = false;
        this.posicion_base = 8;
        //

        this.generarCuerpo();
        this.generarCara();

        

        

        
    }

    update(){
      //  console.log(this.mono);

      if(this.subir_cara){
        this.cara.position.y +=0.005;
        if(this.cara.position.y >= (this.posicion_base+0.5))
            this.subir_cara = false;

      }else{
        this.cara.position.y -=0.005;
        if(this.cara.position.y <= (this.posicion_base-0.5))
            this.subir_cara = true;
      }

    }

    generarCuerpo(){
        this.cuerpo = new THREE.CylinderGeometry (0.5,0.5,1,32);
        this.cuerpo.applyMatrix (new THREE.Matrix4().makeTranslation (0, 0.5, 0)); 
        this.material = new THREE.MeshBasicMaterial ({color: 0x005fff});
        this.cuerpo = new THREE.Mesh(this.cuerpo,this.material);
        this.cuerpo.scale.y = 5;
        this.cuerpo.position.y = 3;
        this.add(this.cuerpo);
    }

    generarCara(){
        var loader = new THREE.OBJLoader();

        loader.load(

            'modelos/Amelio.obj',

            function (object) {
                character.cara = object;
                character.cara.scale.set(1.5,1.5,1.5);
                character.cara.position.y = character.posicion_base;
                character.add (character.cara);
                character.cargado = true;
            },null,null

        );
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
   

}