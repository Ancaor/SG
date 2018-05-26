class GeneradorPartida extends THREE.Object3D {

    constructor(){
        super();

        this.mapas = [new MapaAleatorio(2,3), new MapaAleatorio(4,3), new MapaAleatorio(5,5)];
        this.mapaAtual = 0;
    }


    getMapaActual(){
        return this.mapas[this.mapaAtual];
    }


}
