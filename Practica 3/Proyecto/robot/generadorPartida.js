class GeneradorPartida extends THREE.Object3D {

    constructor(){
        super();

        this.mapas = [new Mapa(1), new Mapa(2), new Mapa(3)];
        this.mapaAtual = 0;
    }


    getMapaActual(){
        return this.mapas[this.mapaAtual];
    }


}
