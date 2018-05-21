class Mapa extends THREE.Object3D{

    constructor(){
        super();

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