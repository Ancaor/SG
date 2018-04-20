class Sala extends THREE.Object3D{

    constructor(){
        super();


        this.sala = objeto;
        this.sala.scale.set(3,3,3);
        this.add(this.sala);

        this.limite = 21;
        this.tama_puerta = 3.5;

        this.puertaSup = false;
        this.puertaInf = true;
        this.puertaDer = false;
        this.puertaIzq = false;

        
    }

}