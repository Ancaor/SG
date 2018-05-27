class GeneradorPartida extends THREE.Object3D {

    constructor(){
        super();

        this.mapas = [new Mapa(1), new MapaAleatorio(4,4), new MapaAleatorio(5,5)];
        this.mapaAtual = 0;
    }


    getMapaActual(){
        return this.mapas[this.mapaAtual];
    }


}
