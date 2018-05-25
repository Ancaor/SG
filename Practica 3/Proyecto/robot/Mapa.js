class Mapa extends THREE.Object3D{

    constructor(tipo){
        super();

        if(tipo == 1){
            this.n_filas = 3;
            this.n_columnas = 3;
            
            var infoMapa = [this.n_filas, this.n_columnas];

            this.InfoSalas = [
                                new InfoSalaMapa(0, 0, infoMapa, 5), new InfoSalaMapa(0, 1, infoMapa, 14), new InfoSalaMapa(0,2, infoMapa, 8),
                                new InfoSalaMapa(1, 0, infoMapa, 11), new InfoSalaMapa(1, 1, infoMapa, 15), new InfoSalaMapa(1, 2, infoMapa, 13),
                                new InfoSalaMapa(2, 0, infoMapa, 6), new InfoSalaMapa(2, 1, infoMapa, 12), new InfoSalaMapa(2, 2,infoMapa, 7)
                            ];
        
            this.mapa = [ 
                            [ this.InfoSalas[0], this.InfoSalas[1], this.InfoSalas[2] ],
                            [ this.InfoSalas[3], this.InfoSalas[4], this.InfoSalas[5] ],
                            [ this.InfoSalas[6], this.InfoSalas[7], this.InfoSalas[8] ],
                        ]

            this.salaActual = this.mapa[1][1];
            this.salaInicio = null;

            this.finMapa = false;
            this.salasVisitadas = 0;


            if(this.n_filas > this.n_columnas)
                this.camaraMapa = new THREE.OrthographicCamera( (this.n_filas*48+6) / - 2, (this.n_filas*48+6) / 2, (this.n_filas*48+6) / 2, (this.n_filas*48+6) / - 2, 1, 100000 );
            else
                this.camaraMapa = new THREE.OrthographicCamera( (this.n_columnas*48+6) / - 2, (this.n_columnas*48+6) / 2, (this.n_columnas*48+6) / 2, (this.n_columnas*48+6) / - 2, 1, 100000 );
            

            if(this.n_filas %2 == 0){
                if(this.n_columnas %2 == 0){
                    var look = new THREE.Vector3 (24,0,24);
                    this.camaraMapa.position.set(24,200,23);
                }else{
                    var look = new THREE.Vector3 (0,0,24);
                    this.camaraMapa.position.set(0,200,23);
                }
            }else{
                if(this.n_columnas %2 == 0){
                    var look = new THREE.Vector3 (24,0,0);
                    this.camaraMapa.position.set(24,200,-1);
                }else{
                    var look = new THREE.Vector3 (0,0,0);
                    this.camaraMapa.position.set(0,200,-1);
                }
            }
            
            this.camaraMapa.lookAt(look);
            this.camaraMapa.layers.enable(2);
        }else if(tipo == 2){
            this.n_filas = 5;
            this.n_columnas = 5;
            
            var infoMapa = [this.n_filas, this.n_columnas];

            this.InfoSalas = [
                                new InfoSalaMapa(0, 0, infoMapa, 1), new InfoSalaMapa(0, 1, infoMapa, 5),new InfoSalaMapa(0, 2, infoMapa, 14),new InfoSalaMapa(0, 3, infoMapa, 14), new InfoSalaMapa(0,4, infoMapa, 4),
                                new InfoSalaMapa(1, 0, infoMapa, 6), new InfoSalaMapa(1, 1, infoMapa, 7),new InfoSalaMapa(1, 2, infoMapa, 11),new InfoSalaMapa(1, 3, infoMapa, 7), new InfoSalaMapa(1, 4, infoMapa, 1),
                                new InfoSalaMapa(2, 0, infoMapa, 1), new InfoSalaMapa(2, 1, infoMapa, 2),new InfoSalaMapa(2, 2, infoMapa, 15),new InfoSalaMapa(2, 3, infoMapa, 10), new InfoSalaMapa(2, 4, infoMapa, 7),
                                new InfoSalaMapa(3, 0, infoMapa, 6), new InfoSalaMapa(3, 1, infoMapa, 14),new InfoSalaMapa(3, 2, infoMapa, 7),new InfoSalaMapa(3, 3, infoMapa, 2), new InfoSalaMapa(3, 4, infoMapa, 8),
                                new InfoSalaMapa(4, 0, infoMapa, 2), new InfoSalaMapa(4, 1, infoMapa, 12), new InfoSalaMapa(4, 2, infoMapa, 10), new InfoSalaMapa(4, 3, infoMapa, 10), new InfoSalaMapa(4, 4,infoMapa, 7)
                            ];
        
            this.mapa = [ 
                            [ this.InfoSalas[0], this.InfoSalas[1], this.InfoSalas[2], this.InfoSalas[3], this.InfoSalas[4] ],
                            [ this.InfoSalas[5], this.InfoSalas[6], this.InfoSalas[7], this.InfoSalas[8], this.InfoSalas[9] ],
                            [ this.InfoSalas[10], this.InfoSalas[11], this.InfoSalas[12], this.InfoSalas[13], this.InfoSalas[14] ],
                            [ this.InfoSalas[15], this.InfoSalas[16], this.InfoSalas[17], this.InfoSalas[18], this.InfoSalas[19] ],
                            [ this.InfoSalas[20], this.InfoSalas[21], this.InfoSalas[22], this.InfoSalas[23], this.InfoSalas[24] ],
                        ]

            this.salaActual = this.mapa[2][2];
            this.salaInicio = null;

            this.finMapa = false;
            this.salasVisitadas = 0;


            if(this.n_filas > this.n_columnas)
                this.camaraMapa = new THREE.OrthographicCamera( (this.n_filas*48+6) / - 2, (this.n_filas*48+6) / 2, (this.n_filas*48+6) / 2, (this.n_filas*48+6) / - 2, 1, 100000 );
            else
                this.camaraMapa = new THREE.OrthographicCamera( (this.n_columnas*48+6) / - 2, (this.n_columnas*48+6) / 2, (this.n_columnas*48+6) / 2, (this.n_columnas*48+6) / - 2, 1, 100000 );
            

            if(this.n_filas %2 == 0){
                if(this.n_columnas %2 == 0){
                    var look = new THREE.Vector3 (24,0,24);
                    this.camaraMapa.position.set(24,200,23);
                }else{
                    var look = new THREE.Vector3 (0,0,24);
                    this.camaraMapa.position.set(0,200,23);
                }
            }else{
                if(this.n_columnas %2 == 0){
                    var look = new THREE.Vector3 (24,0,0);
                    this.camaraMapa.position.set(24,200,-1);
                }else{
                    var look = new THREE.Vector3 (0,0,0);
                    this.camaraMapa.position.set(0,200,-1);
                }
            }
            
            this.camaraMapa.lookAt(look);
            this.camaraMapa.layers.enable(2);
        }else if(tipo == 3){
            this.n_filas = 7;
            this.n_columnas = 7;
            
            var infoMapa = [this.n_filas, this.n_columnas];

            this.InfoSalas = [
                                new InfoSalaMapa(0, 0, infoMapa, 5), new InfoSalaMapa(0, 1, infoMapa, 14),new InfoSalaMapa(0, 2, infoMapa, 8),new InfoSalaMapa(0, 3, infoMapa, 1), new InfoSalaMapa(0,4, infoMapa, 5),new InfoSalaMapa(0, 5, infoMapa, 14), new InfoSalaMapa(0,6, infoMapa, 8),
                                new InfoSalaMapa(1, 0, infoMapa, 9), new InfoSalaMapa(1, 1, infoMapa, 3),new InfoSalaMapa(1, 2, infoMapa, 9),new InfoSalaMapa(1, 3, infoMapa, 9), new InfoSalaMapa(1, 4, infoMapa, 9),new InfoSalaMapa(1, 5, infoMapa, 3), new InfoSalaMapa(1, 6, infoMapa, 9),
                                new InfoSalaMapa(2, 0, infoMapa, 11), new InfoSalaMapa(2, 1, infoMapa, 14),new InfoSalaMapa(2, 2, infoMapa, 7),new InfoSalaMapa(2, 3, infoMapa, 6), new InfoSalaMapa(2, 4, infoMapa, 15),new InfoSalaMapa(2, 5, infoMapa, 14), new InfoSalaMapa(2, 6, infoMapa, 7),
                                new InfoSalaMapa(3, 0, infoMapa, 3), new InfoSalaMapa(3, 1, infoMapa, 11),new InfoSalaMapa(3, 2, infoMapa, 14),new InfoSalaMapa(3, 3, infoMapa, 10), new InfoSalaMapa(3, 4, infoMapa, 12),new InfoSalaMapa(3, 5, infoMapa, 13), new InfoSalaMapa(3, 6, infoMapa, 1),
                                new InfoSalaMapa(4, 0, infoMapa, 5), new InfoSalaMapa(4, 1, infoMapa, 12), new InfoSalaMapa(4, 2, infoMapa, 15), new InfoSalaMapa(4, 3, infoMapa, 8), new InfoSalaMapa(4, 4,infoMapa, 5),new InfoSalaMapa(4, 5, infoMapa, 12), new InfoSalaMapa(4, 6,infoMapa, 13),
                                new InfoSalaMapa(5, 0, infoMapa, 9), new InfoSalaMapa(5, 1, infoMapa, 1), new InfoSalaMapa(5, 2, infoMapa, 9), new InfoSalaMapa(5, 3, infoMapa, 9), new InfoSalaMapa(5, 4,infoMapa, 9),new InfoSalaMapa(5, 5, infoMapa, 1), new InfoSalaMapa(5, 6,infoMapa, 9),
                                new InfoSalaMapa(6, 0, infoMapa, 6), new InfoSalaMapa(6, 1, infoMapa, 12), new InfoSalaMapa(6, 2, infoMapa, 7), new InfoSalaMapa(6, 3, infoMapa, 3), new InfoSalaMapa(6, 4,infoMapa, 6), new InfoSalaMapa(6, 5, infoMapa, 12), new InfoSalaMapa(6, 6,infoMapa, 7)
                            ];
        
            this.mapa = [ 
                            [ this.InfoSalas[0], this.InfoSalas[1], this.InfoSalas[2], this.InfoSalas[3], this.InfoSalas[4], this.InfoSalas[5], this.InfoSalas[6] ],
                            [ this.InfoSalas[7], this.InfoSalas[8], this.InfoSalas[9], this.InfoSalas[10], this.InfoSalas[11], this.InfoSalas[12], this.InfoSalas[13] ],
                            [ this.InfoSalas[14], this.InfoSalas[15], this.InfoSalas[16], this.InfoSalas[17], this.InfoSalas[18], this.InfoSalas[19], this.InfoSalas[20] ],
                            [ this.InfoSalas[21], this.InfoSalas[22], this.InfoSalas[23], this.InfoSalas[24], this.InfoSalas[25], this.InfoSalas[26], this.InfoSalas[27] ],
                            [ this.InfoSalas[28], this.InfoSalas[29], this.InfoSalas[30], this.InfoSalas[31], this.InfoSalas[32], this.InfoSalas[33], this.InfoSalas[34] ],
                            [ this.InfoSalas[35], this.InfoSalas[36], this.InfoSalas[37], this.InfoSalas[38], this.InfoSalas[39], this.InfoSalas[40], this.InfoSalas[41] ],
                            [ this.InfoSalas[42], this.InfoSalas[43], this.InfoSalas[44], this.InfoSalas[45], this.InfoSalas[46], this.InfoSalas[47], this.InfoSalas[48] ]
                        ]

            this.salaActual = this.mapa[2][2];
            this.salaInicio = null;

            this.finMapa = false; 
            this.salasVisitadas = 0;


            if(this.n_filas > this.n_columnas)
                this.camaraMapa = new THREE.OrthographicCamera( (this.n_filas*48+6) / - 2, (this.n_filas*48+6) / 2, (this.n_filas*48+6) / 2, (this.n_filas*48+6) / - 2, 1, 100000 );
            else
                this.camaraMapa = new THREE.OrthographicCamera( (this.n_columnas*48+6) / - 2, (this.n_columnas*48+6) / 2, (this.n_columnas*48+6) / 2, (this.n_columnas*48+6) / - 2, 1, 100000 );
            

            if(this.n_filas %2 == 0){
                if(this.n_columnas %2 == 0){
                    var look = new THREE.Vector3 (24,0,24);
                    this.camaraMapa.position.set(24,200,23);
                }else{
                    var look = new THREE.Vector3 (0,0,24);
                    this.camaraMapa.position.set(0,200,23);
                }
            }else{
                if(this.n_columnas %2 == 0){
                    var look = new THREE.Vector3 (24,0,0);
                    this.camaraMapa.position.set(24,200,-1);
                }else{
                    var look = new THREE.Vector3 (0,0,0);
                    this.camaraMapa.position.set(0,200,-1);
                }
            }
            
            this.camaraMapa.lookAt(look);
            this.camaraMapa.layers.enable(2);
        }

    }

    generarMapa(){
        for(var i = 0; i < this.n_filas; i+=1){
            for(var j = 0; j < this.n_columnas; j+=1){
                var aux = this.mapa[i][j].Sala;
                aux.position.x = this.mapa[i][j].Coordenada_X;
                aux.position.z = this.mapa[i][j].Coordenada_Z;
                aux.enableLayers(1);

               
                var camara = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
                camara.position.set (aux.position.x, 70, aux.position.z-20);
                camara.layers.enable(1);

                camara.lookAt(new THREE.Vector3 (aux.position.x,0,aux.position.z));
                aux.setCamara(camara);
                
                this.add(aux);
            }
        }
        this.eleccionSalaInicio();

    }

    eleccionSalaInicio(){
        var i = Math.floor(Math.random() * (this.n_filas -0) + (0));
        var j = Math.floor(Math.random() * (this.n_columnas -0) + (0));
        console.log("La sala de inicio es la sala ["+i+"]["+j+"]");
        this.salaInicio = this.mapa[i][j];
        
        for(var i = this.salaInicio.Sala.n_enemigos-1; i >= 0; i-=1)
            this.salaInicio.Sala.eliminarEnemigo(i);
        
        this.salaInicio.Sala.eliminarObjeto();
        
    }

    calculaSalaActual(x_mono, z_mono){

        var lim_x_inf;
        var lim_x_sup;
        var lim_z_inf;
        var lim_z_sup;

        for(var i = 0; i < this.n_filas; i+=1){
            for(var j = 0; j < this.n_columnas; j+=1){

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
                        if(this.mapa[i][j].Visitada==false)
                            this.salasVisitadas += 1;

                        if((this.salasVisitadas == (this.n_filas * this.n_columnas)) && !this.finMapa){
                            this.mapa[i][j].Sala.ultimaSala = true;
                            this.finMapa = true;

                        }

                        this.salaActual = this.mapa[i][j];
                        this.mapa[i][j].Visitada=true;
                    }
                }
            }
        }
        
    }

    getSalaActual(){
        return this.salaActual;
    }

    setCameraAspect (anAspectRatio) {
        for(var i = 0; i < this.n_filas; i+=1){
            for(var j = 0; j < this.n_columnas; j+=1){
                this.mapa[i][j].Sala.camara.aspect = anAspectRatio;
                this.mapa[i][j].Sala.camara.updateProjectionMatrix();
            }
        }
    }

    muestraMapa(){
        for(var i = 0; i < this.n_filas; i+=1){
            for(var j = 0; j < this.n_columnas; j+=1){
                if(this.mapa[i][j].Visitada)
                    this.mapa[i][j].Sala.visible=true;
            }
        }
    }

    ocultaMapa(){
        for(var i = 0; i < this.n_filas; i+=1){
            for(var j = 0; j < this.n_columnas; j+=1){
                    this.mapa[i][j].Sala.visible=false;
            }
        }
    }

}