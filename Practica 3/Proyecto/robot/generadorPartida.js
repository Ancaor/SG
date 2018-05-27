class GeneradorPartida extends THREE.Object3D {

    constructor(tipo){
        super();
        if(tipo = 1)
            this.mapas = [new MapaAleatorio(2,3), new MapaAleatorio(4,3), new MapaAleatorio(5,5)];
        else 
            this.mapas = [new Mapa(1), new Mapa(2), new Mapa(3)];

        this.mapaAtual = 0;
    }


    getMapaActual(){
        return this.mapas[this.mapaAtual];
    }


}
