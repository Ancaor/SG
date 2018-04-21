class Mapa extends THREE.Object3D{

    constructor(salas){
        super();

        this.salas = salas;
        this.InfoSalas = [
                            new InfoSalaMapa(48, 48, salas[1]), new InfoSalaMapa(0, 48, salas[13]), new InfoSalaMapa(-48, 48, salas[3]),
                            new InfoSalaMapa(48, 0, salas[4]), new InfoSalaMapa(0, 0, salas[14]), new InfoSalaMapa(-48, 0, salas[7]),
                            new InfoSalaMapa(48, -48, salas[5]), new InfoSalaMapa(0, -48, salas[9]), new InfoSalaMapa(-48, -48, salas[6]),
                        ];
    
        this.mapa = [ 
                        [ this.InfoSalas[0], this.InfoSalas[1], this.InfoSalas[2] ],
                        [ this.InfoSalas[3], this.InfoSalas[4], this.InfoSalas[5] ],
                        [ this.InfoSalas[6], this.InfoSalas[7], this.InfoSalas[8] ],
                    ]
        
        
    
    
    }

    generarMapa(){
        for(var i = 0; i < 3; i+=1){
            for(var j = 0; j < 3; j+=1){
                console.log("InfoCasilla:\n\tCoordenada_X: "+this.mapa[i][j].Coordenada_X+"\n\tCoordenada_Z: "+this.mapa[i][j].Coordenada_Z);
                var aux = this.mapa[i][j].Sala;
                aux.position.x = this.mapa[i][j].Coordenada_X;
                aux.position.z = this.mapa[i][j].Coordenada_Z;
                this.add(aux);
            }
        }
    }

    getSalaActual(x_mono, z_mono){

        for(var i = 0; i < 3; i+=1){
            for(var j = 0; j < 3; j+=1){
                var lim_x_inf = this.mapa[i][j].Coordenada_X - this.mapa[i][j].Sala.limite - this.mapa[i][j].Sala.long_pasillo;
                var lim_x_sup = this.mapa[i][j].Coordenada_X + this.mapa[i][j].Sala.limite + this.mapa[i][j].Sala.long_pasillo;
                var lim_z_inf = this.mapa[i][j].Coordenada_Z - this.mapa[i][j].Sala.limite - this.mapa[i][j].Sala.long_pasillo;
                var lim_z_sup = this.mapa[i][j].Coordenada_Z + this.mapa[i][j].Sala.limite + this.mapa[i][j].Sala.long_pasillo;

                if(z_mono <= lim_z_sup && z_mono >= lim_z_inf){
                    if(x_mono <= lim_x_sup && x_mono >= lim_x_inf){
                        console.log("Fila: "+ i + "\tColumna: "+ j);
                        var info_sala_actual = this.mapa[i][j];
                    }
                }
            }
        }
        
        return info_sala_actual;
    }

}