class Lagrima extends THREE.Object3D{
    constructor (parameters) {
        super();
        this.velocidad = Math.random() * (parameters.v+10 - parameters.v) + parameters.v; //unidades / s
        this.tiempoAnterior = Date.now();
        this.tiempoActual = null;

        this.tiempoTranscurrido = 0;
        this.orientacion = parameters.o;

        this.posicionz = parameters.z;
        this.posiciony = parameters.y;
        this.posicionx = parameters.x;

        this.radio=0.25;



        

            this.material = new THREE.MeshPhongMaterial ({color: 0xf90000,transparent: false, opacity: 0.7});
        
        var geometria = new THREE.SphereGeometry (1,32,32);    // geometria esfera

        this.lagrima = new THREE.Mesh (
            geometria, this.material);
        
        this.lagrima.scale.set(this.radio,this.radio,this.radio);
        this.position.set(this.posicionx,this.posiciony,this.posicionz)


        this.lagrima.castShadow = true;

        this.add(this.lagrima);

/////////////////////////////////////////////////////////////////////


    }

    update(){
        this.tiempoActual = Date.now();

        this.tiempoTranscurrido = (this.tiempoActual-this.tiempoAnterior)/1000;
        
        switch(this.orientacion){
            case 0: this.lagrima.position.z += this.velocidad * this.tiempoTranscurrido; break;
            case 2: this.lagrima.position.z -= this.velocidad * this.tiempoTranscurrido; break;
            case 1: this.lagrima.position.x += this.velocidad * this.tiempoTranscurrido; break;
            case 3: this.lagrima.position.x -= this.velocidad * this.tiempoTranscurrido; break;
        }
        
       //this.lagrima.position.z += this.velocidad * this.tiempoTranscurrido;
        this.tiempoAnterior =this.tiempoActual;
    }
    
}