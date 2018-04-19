class Esfera_Helicoidal extends THREE.Object3D{
    constructor (parameters) {
        super();

        this.material = new THREE.MeshPhongMaterial ({color: 0xf90000,transparent: false, opacity: 0.7});

        this.geometria = new THREE.SphereGeometry (1,32,32);

        this.velocidad = 2.5; // altura / seg
        this.velocidad_rotacion = 360; // grados / seg
        this.altura_max = 10;

        this.radio = 5;
        this.rotacion_y = 0;
        this.tiempoAnterior = Date.now();
        this.tiempoActual = null;

        this.geometria.applyMatrix (new THREE.Matrix4().makeTranslation (this.radio, 0.5, 0));

      //  this.esfera = new THREE.Mesh(geometria,material);
        this.esfera = new THREE.Mesh (
            this.geometria, this.material);


        this.subir = true;

        

        this.add(this.esfera);
        

    }

    update(radio){
        this.radio = radio;

        this.geometria = new THREE.SphereGeometry (1,32,32);
        this.geometria.applyMatrix (new THREE.Matrix4().makeTranslation (this.radio, 0.5, 0));

        this.esfera.geometry = this.geometria;

        this.tiempoActual = Date.now();

        this.tiempoTranscurrido = (this.tiempoActual-this.tiempoAnterior)/1000;
        this.tiempoAnterior = this.tiempoActual;


        this.esfera.rotation.y += ((this.velocidad_rotacion * this.tiempoTranscurrido)*(Math.PI/180));
        if(this.esfera.position.y >= this.altura_max){
            this.subir = false;
        }else if(this.esfera.position.y <= 0){
            this.subir = true;
        }

        if(this.subir){
            this.esfera.position.y += this.velocidad * this.tiempoTranscurrido;
        }else
        this.esfera.position.y -= this.velocidad * this.tiempoTranscurrido;
        
        
    }


}
