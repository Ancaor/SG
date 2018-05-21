class GeneradorPartida extends THREE.Object3D {

    constructor(){
        super();

        this.mapas = [new Mapa(), new Mapa()];
        this.mapaAtual = 0;
    }


    getMapaActual(){
        return this.mapas[this.mapaAtual];
    }


}
