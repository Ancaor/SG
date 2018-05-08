class Mapa extends THREE.Object3D{

    constructor(){
        super();

        this.InfoSalas = [
                            new InfoSalaMapa(48, 48, 5,2), new InfoSalaMapa(0, 48, 14, 3), new InfoSalaMapa(-48, 48, 8, 1),
                            new InfoSalaMapa(48, 0,11, 2), new InfoSalaMapa(0, 0, 15, 1), new InfoSalaMapa(-48, 0,13, 1),
                            new InfoSalaMapa(48, -48, 6, 1), new InfoSalaMapa(0, -48, 12, 1), new InfoSalaMapa(-48, -48,7, 1)
                        ];
    
        this.mapa = [ 
                        [ this.InfoSalas[0], this.InfoSalas[1], this.InfoSalas[2] ],
                        [ this.InfoSalas[3], this.InfoSalas[4], this.InfoSalas[5] ],
                        [ this.InfoSalas[6], this.InfoSalas[7], this.InfoSalas[8] ],
                    ]

        this.salasVisitadas = new Array();

        this.camaraMapa = new THREE.OrthographicCamera( 200 / - 2, 200 / 2, 200 / 2, 200 / - 2, 1, 100000 );
        this.camaraMapa.position.set(0,200,-1);
        var look = new THREE.Vector3 (0,0,0);
        this.salaActual = this.mapa[1][1];
        this.camaraMapa.lookAt(look);
        this.camaraMapa.layers.enable(2);
        
    
    
    }

    generarMapa(){
        for(var i = 0; i < 3; i+=1){
            for(var j = 0; j < 3; j+=1){
                var aux = this.mapa[i][j].Sala;
                aux.layers.enable(2);
                aux.position.x = this.mapa[i][j].Coordenada_X;
                aux.position.z = this.mapa[i][j].Coordenada_Z;
                //aux.visible=false;
               
                var camara = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
                camara.position.set (aux.position.x, 70, aux.position.z-20);
                camara.layers.enable(1);
                camara.layers.disable(0);
                camara.layers.disable(2);
                camara.lookAt(new THREE.Vector3 (aux.position.x,0,aux.position.z));
                aux.setCamara(camara);
                
                this.add(aux);
            }
        }
    }

    calculaSalaActual(x_mono, z_mono){

        var lim_x_inf;
        var lim_x_sup;
        var lim_z_inf;
        var lim_z_sup;

        for(var i = 0; i < 3; i+=1){
            for(var j = 0; j < 3; j+=1){

                if(this.mapa[i][j] == this.salaActual){
                    lim_x_inf = this.mapa[i][j].Coordenada_X - this.mapa[i][j].Sala.limite - 2*this.mapa[i][j].Sala.long_pasillo;
                    lim_x_sup = this.mapa[i][j].Coordenada_X + this.mapa[i][j].Sala.limite + 2*this.mapa[i][j].Sala.long_pasillo;
                    lim_z_inf = this.mapa[i][j].Coordenada_Z - this.mapa[i][j].Sala.limite - 2*this.mapa[i][j].Sala.long_pasillo;
                    lim_z_sup = this.mapa[i][j].Coordenada_Z + this.mapa[i][j].Sala.limite + 2*this.mapa[i][j].Sala.long_pasillo;
                }
                else{
                    lim_x_inf = this.mapa[i][j].Coordenada_X - this.mapa[i][j].Sala.limite ;
                    lim_x_sup = this.mapa[i][j].Coordenada_X + this.mapa[i][j].Sala.limite ;
                    lim_z_inf = this.mapa[i][j].Coordenada_Z - this.mapa[i][j].Sala.limite ;
                    lim_z_sup = this.mapa[i][j].Coordenada_Z + this.mapa[i][j].Sala.limite ;
                }
               

                if(z_mono <= lim_z_sup && z_mono >= lim_z_inf){
                    if(x_mono <= lim_x_sup && x_mono >= lim_x_inf){
                        //var info_sala_actual = this.mapa[i][j];
                        this.salaActual = this.mapa[i][j];
                        this.mapa[i][j].Visitada=true;
                        this.mapa[i][j].MuestraSalaMinimapa();
                    }
                }
            }
        }
        
    }

    getSalaActual(){
        return this.salaActual;
    }

    setCameraAspect (anAspectRatio) {
        for(var i = 0; i < 3; i+=1){
            for(var j = 0; j < 3; j+=1){
                this.mapa[i][j].Sala.camara.aspect = anAspectRatio;
                this.mapa[i][j].Sala.camara.updateProjectionMatrix();
            }
        }
    }

    muestraMapa(){
        for(var i = 0; i < 3; i+=1){
            for(var j = 0; j < 3; j+=1){
                if(this.mapa[i][j].Visitada)
                    this.mapa[i][j].Sala.visible=true;
            }
        }
    }

    ocultaMapa(){
        for(var i = 0; i < 3; i+=1){
            for(var j = 0; j < 3; j+=1){
                    this.mapa[i][j].Sala.visible=false;
            }
        }
    }

}