class Mapa extends THREE.Object3D{

    constructor(){
        super();

        this.InfoSalas = [
                            new InfoSalaMapa(48, 48, new Sala(5)), new InfoSalaMapa(0, 48, new Sala(14)), new InfoSalaMapa(-48, 48, new Sala(8)),
                            new InfoSalaMapa(48, 0,new Sala(11)), new InfoSalaMapa(0, 0, new Sala(15)), new InfoSalaMapa(-48, 0, new Sala(13)),
                            new InfoSalaMapa(48, -48, new Sala(6)), new InfoSalaMapa(0, -48, new Sala(12)), new InfoSalaMapa(-48, -48, new Sala(7))
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
                var aux = this.mapa[i][j].Sala;
                aux.position.x = this.mapa[i][j].Coordenada_X;
                aux.position.z = this.mapa[i][j].Coordenada_Z;
               
                var camara = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
                camara.position.set (aux.position.x, 70, aux.position.z-25);
                camara.lookAt(new THREE.Vector3 (aux.position.x,0,aux.position.z));
                aux.setCamara(camara);
                
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
                        var info_sala_actual = this.mapa[i][j];
                    }
                }
            }
        }
        
        return info_sala_actual;
    }

    setCameraAspect (anAspectRatio) {
        for(var i = 0; i < 3; i+=1){
            for(var j = 0; j < 3; j+=1){
                this.mapa[i][j].Sala.camara.aspect = anAspectRatio;
                this.mapa[i][j].Sala.camara.updateProjectionMatrix();
            }
        }
    }

}