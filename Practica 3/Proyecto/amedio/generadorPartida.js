class GeneradorPartida extends THREE.Object3D {

    constructor(tipo){
        super();
        if(tipo == 1)
            this.mapas = [ new MapaAleatorio(2,2), new Mapa(4), new MapaAleatorio(2,3), new Mapa(5), new MapaAleatorio(3,3), new Mapa(6)];
        else
            this.mapas = [ new Mapa(1), new Mapa(4), new Mapa(2), new Mapa(5), new Mapa(3), new Mapa(6)];
        

        this.mapaAtual = 0;
    }


    getMapaActual(){
        return this.mapas[this.mapaAtual];
    }


}