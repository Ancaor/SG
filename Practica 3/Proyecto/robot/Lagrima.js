class Lagrima extends THREE.Object3D{
    constructor (parameters) {
        super();
        this.velocidad = parameters.v; //unidades / s
        this.tiempoAnterior = Date.now();
        this.tiempoActual = null;

        this.tiempoTranscurrido = 0;
        this.orientacion = parameters.o;

        this.posicionz = parameters.z;
        this.posiciony = parameters.y;
        this.posicionx = parameters.x;

        this.radio = parameters.r;



        

        this.material = new THREE.MeshPhongMaterial ({color: parameters.c,transparent: false, opacity: 0.7});
        
        var geometria = new THREE.SphereGeometry (1,32,32);    // geometria esfera

        this.lagrima = new THREE.Mesh (
            geometria, this.material);
        
        this.lagrima.scale.set(this.radio,this.radio,this.radio);
        this.position.set(this.posicionx,this.posiciony,this.posicionz)


        this.lagrima.castShadow = true;

        this.add(this.lagrima);

/////////////////////////////////////////////////////////////////////


    }

    update(sala, Coordenada_X, Coordenada_Z){
        this.tiempoActual = Date.now();

        this.tiempoTranscurrido = (this.tiempoActual-this.tiempoAnterior)/1000;
        
        switch(this.orientacion){

            case 0:
            if(this.position.z + (this.velocidad * this.tiempoTranscurrido) < sala.limite + Coordenada_Z){
             this.position.z += this.velocidad * this.tiempoTranscurrido;
            }
             else return true;
             
              break;
            case 2:
            if(this.position.z - (this.velocidad * this.tiempoTranscurrido) > -sala.limite + Coordenada_Z)
             this.position.z -= this.velocidad * this.tiempoTranscurrido;
             else return true; 
             break;

            case 1:
            if(this.position.x + (this.velocidad * this.tiempoTranscurrido) < sala.limite + Coordenada_X)
             this.position.x += this.velocidad * this.tiempoTranscurrido; 
             else return true;
             break;

            case 3:
            if(this.position.x - (this.velocidad * this.tiempoTranscurrido) > -sala.limite + Coordenada_X)
             this.position.x -= this.velocidad * this.tiempoTranscurrido; 
             else return true;
             break;
        
        }
        
        this.tiempoAnterior =this.tiempoActual;
        return false;
    }
    
}