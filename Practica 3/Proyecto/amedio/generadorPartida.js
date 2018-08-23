class GeneradorPartida extends THREE.Object3D {

    constructor(tipo){
        super();
        if(tipo == 1){
            var rand1 = Math.floor(Math.random() * (4 -2) + (2));
            var rand2 = Math.floor(Math.random() * (4 -2) + (2));
            var rand3 = Math.floor(Math.random() * (5 -2) + (2));
            var rand4 = Math.floor(Math.random() * (5 -2) + (2));
            var rand5 = Math.floor(Math.random() * (6 -3) + (3));
            var rand6 = Math.floor(Math.random() * (6 -3) + (3));
            this.mapas = [ new MapaAleatorio(rand1,rand2), new Mapa(5), new MapaAleatorio(rand3,rand4), new Mapa(5), new MapaAleatorio(rand5,rand6), new Mapa(6)];
        
        }else
            this.mapas = [ new Mapa(1), new Mapa(4), new Mapa(2), new Mapa(5), new Mapa(3), new Mapa(6)];
        

        this.mapaAtual = 0;
    }


    getMapaActual(){
        return this.mapas[this.mapaAtual];
    }


}