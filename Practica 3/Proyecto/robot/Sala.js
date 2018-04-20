class Sala extends THREE.Object3D{

    constructor(){
        super();


        this.sala = objeto;
        this.sala.scale.set(3,3,3);
        this.add(this.sala);

        this.limite = 21;
        this.tama_puerta = 2.5;

        this.puertaSup = true;
        this.puertaInf = true;
        this.puertaDer = true;
        this.puertaIzq = true;

        
    }

}