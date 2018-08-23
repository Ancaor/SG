class teleport extends Objeto{
    constructor(sala){
        super();

        this.tipo = "Teleport";
        this.bonificacion = 1;

        this.visible = false;
        this.salaActual = sala;

        this.mesh = Potenciadores[4].clone();

        this.radioEsferaEnglobante = 0.3;
        this.mesh.layers.set(2);
        this.add(this.mesh);
    }

    update(Mono){

        var posicionZreal =  (this.mesh.position.z + this.salaActual.infoSala.Coordenada_Z)
        var posicionXreal =  (this.mesh.position.x + this.salaActual.infoSala.Coordenada_X)

        var difRadios = this.radioEsferaEnglobante + Mono.radioEsferaEnglobante;
        var posReal = new THREE.Vector3(posicionXreal,Mono.position.y,posicionZreal)
 
        var distanciaReal = posReal.distanceTo(Mono.position);
      
        var tiempoTranscurrido = (this.tiempoActual - this.tiempoAnterior)/1000;
 
       
        if(distanciaReal <= difRadios){
            this.tiempoAnterior = this.tiempoActual;
            return true;
        }
    }
}