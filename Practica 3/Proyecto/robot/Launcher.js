class Launcher extends THREE.Object3D{
    constructor(){
        super();
        this.material = new THREE.MeshPhongMaterial ({color: 0x00604f, specular: 0xff, shininess: 3});

        var geometria = new THREE.BoxGeometry (0.5,0.5,0.1, 16, 8);    // geometria cilindro
       // geometria.applyMatrix (new THREE.Matrix4().makeTranslation(0,0.5,0));

        this.visor = new THREE.Mesh (
            geometria, this.material);
        

        this.visor.castShadow = true;
        this.visor.receiveShadow = true;
      //  this.add(this.visor)

        this.tiempoAnterior = Date.now();
        this.tiempoActual = null;
        this.tiempoTranscurrido = 0;

        this.tiempoEntreLanzamientos = 3//0.5;
        this.velocidadMeteoritos = 15;

        this.lagrimas = new THREE.Object3D;

        this.add(this.lagrimas);



    }

    update(){

        this.tiempoActual = Date.now();

        this.tiempoTranscurrido = (this.tiempoActual - this.tiempoAnterior)/1000;

        // Crea lagrimas pasado un tiempo
        if( this.tiempoTranscurrido > this.tiempoEntreLanzamientos){   // tiempo entre bolas
            console.log(scene.personaje.orientacion)
            this.lagrima = new Lagrima({z:this.position.z,y:this.position.y,x:this.position.x,o:scene.personaje.orientacion,v:this.velocidadMeteoritos});
            this.lagrimas.add(this.lagrima);
            this.tiempoAnterior = this.tiempoActual;
        }

        //Actualiza estado de meteoritos y detecta colisiones

        var longitud  = this.lagrimas.children.length;
        //console.log(longitud)

        for(var i = 0; i < longitud ; i++){
            this.lagrimas.children[i].update();
        }


    }
}