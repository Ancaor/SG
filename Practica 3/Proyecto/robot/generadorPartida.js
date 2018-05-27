class GeneradorPartida extends THREE.Object3D {

    constructor(){
        super();

        this.mapas = [new MapaAleatorio(2,3), new MapaAleatorio(3,2), new MapaAleatorio(4,4)];
        this.mapaAtual = 0;
    }


    getMapaActual(){
        return this.mapas[this.mapaAtual];
    }


}
