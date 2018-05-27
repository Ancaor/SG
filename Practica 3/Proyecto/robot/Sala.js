class Sala extends THREE.Object3D{

    constructor(n_sala, n_enemigos, tieneObjeto, infoSala){
        super();

        switch(n_sala){
            case 1: this.sala = objetos_sala[0].clone(); break;
            case 2: this.sala = objetos_sala[1].clone(); break;
            case 3: this.sala = objetos_sala[2].clone(); break;
            case 4: this.sala = objetos_sala[3].clone(); break;
            case 5: this.sala = objetos_sala[4].clone(); break;
            case 6: this.sala = objetos_sala[5].clone(); break;
            case 7: this.sala = objetos_sala[6].clone(); break;
            case 8: this.sala = objetos_sala[7].clone(); break;
            case 9: this.sala = objetos_sala[8].clone(); break;
            case 10: this.sala = objetos_sala[9].clone(); break;
            case 11: this.sala = objetos_sala[10].clone(); break;
            case 12: this.sala = objetos_sala[11].clone(); break;
            case 13: this.sala = objetos_sala[12].clone(); break;
            case 14: this.sala = objetos_sala[13].clone(); break;
            case 15: this.sala = objetos_sala[14].clone(); break;
            case 16: this.sala = objetos_sala[15].clone(); break;
            case 17: this.sala = objetos_sala[15].clone(); break;
            case 18: this.sala = objetos_sala[15].clone(); break;
        }

        this.n_enemigos = n_enemigos;

        this.sala.scale.set(3,3,3);
        this.add(this.sala);

        this.infoSala = infoSala;

        this.limite = 21;
        this.tama_puerta = 2.5;
        this.long_pasillo = 3;

        this.enemigos = new THREE.Object3D;
        this.objeto = new THREE.Object3D;


        this.ultimaSala = false;

        this.finMapa = false;


        this.camara = null;

        this.tipo_sala = n_sala;

        this.puertas = [false, false, false, false];
        this.puertasIniciales = [false, false, false, false];

        this.puertas_mesh = [
            puertas[1].clone(),
            puertas[0].clone(),
            puertas[1].clone(),
            puertas[0].clone()
        ];

        this.puertas_mesh[0].position.z = this.limite + this.long_pasillo;
        this.puertas_mesh[1].position.x = -this.limite - this.long_pasillo;
        this.puertas_mesh[2].position.z = -this.limite - this.long_pasillo;
        this.puertas_mesh[3].position.x = this.limite + this.long_pasillo;

        this.puertas_mesh[0].visible = false;
        this.puertas_mesh[1].visible = false;
        this.puertas_mesh[2].visible = false;
        this.puertas_mesh[3].visible = false;

        this.add(this.puertas_mesh[0]);
        this.add(this.puertas_mesh[1]);
        this.add(this.puertas_mesh[2]);
        this.add(this.puertas_mesh[3]);

        
        
        if(this.tipo_sala == 3 || this.tipo_sala == 7 || this.tipo_sala == 6 || this.tipo_sala == 9 || this.tipo_sala == 13 || this.tipo_sala == 11 || this.tipo_sala == 12 || this.tipo_sala == 15){
            this.puertas[0] = true;
            this.puertasIniciales[0]=true;
            if( this.n_enemigos != 0){
                this.puertas_mesh[0].visible = true;
            }
        }

        if(this.tipo_sala == 4 || this.tipo_sala == 7 || this.tipo_sala == 8 || this.tipo_sala == 10 || this.tipo_sala == 13 || this.tipo_sala == 14 || this.tipo_sala == 12 || this.tipo_sala == 15){
            this.puertas[3] = true;
            this.puertasIniciales[3]=true;
            if( this.n_enemigos != 0){
                this.puertas_mesh[3].visible = true;
            }
        }

        if(this.tipo_sala ==1 || this.tipo_sala == 8 || this.tipo_sala == 5 || this.tipo_sala == 9 || this.tipo_sala == 13 || this.tipo_sala == 14 || this.tipo_sala == 11 || this.tipo_sala == 15){
            this.puertas[2] = true;
            this.puertasIniciales[2]=true;
            if( this.n_enemigos != 0){
                this.puertas_mesh[2].visible = true;
            }
            
        }

        if(this.tipo_sala == 2 || this.tipo_sala ==5 || this.tipo_sala == 6 || this.tipo_sala == 10 || this.tipo_sala == 14 || this.tipo_sala == 11 || this.tipo_sala == 12 || this.tipo_sala == 15){
            this.puertas[1] = true;
            this.puertasIniciales[1]=true;
            if( this.n_enemigos != 0){
                this.puertas_mesh[1].visible = true;
            }
        }


        if(this.tipo_sala < 16){
            for(var i = 0; i < n_enemigos; i+=1){
                var rand = Math.floor(Math.random() * 3) + 1;
                if(rand == 1)
                    this.enemigos.add(new enemigo2(this));
                else if (rand == 2)
                    this.enemigos.add(new Seta(this));
                else if (rand == 3)
                    this.enemigos.add(new enemigo3(this));
            }
        }else if(this.tipo_sala == 16){
            
            this.enemigos.add(new SetaBoss(this));
        }
        else if(this.tipo_sala == 17){
            this.enemigos.add(new enemigo3Boss(this));
            
        }else if(this.tipo_sala == 18){
            this.enemigos.add(new enemigo2Boss(this));
            
        }

        this.add(this.enemigos);
        this.add(this.objeto);
        

    }

    update(Mono){
        var longitud = this.enemigos.children.length;

        for(var i=0;i < longitud; i++){
            var colision_mono = this.enemigos.children[i].update(Mono);
            if(colision_mono)
                return this.enemigos.children[i];
        }

        if(this.objeto.children.length == 1){
            if(this.objeto.children[0].visible){
                var colision_mono = this.objeto.children[0].update(Mono);
                if(colision_mono){
                    var aux = this.objeto.children[0].clone();
                    this.objeto.remove(this.objeto.children[0]);
                    return aux;
                }
            }
        }

        if(longitud != 0){
            this.cerrarPuertas();
        }else{
            if(this.ultimaSala && !this.finMapa){
                //this.remove(this.objeto);
                this.objeto.remove(this.objeto.children[0]);
                this.objeto.add( new teleport(this));
                this.finMapa = true;
            }
            this.abrirPuertas();
            if(this.objeto.children.length == 1)
                this.muestraObjeto();
        }
        
        return null;
    }

    activaTeleport(){
        this.add(this.teleport);
    }

    setCamara(una_camara){
        this.camara = una_camara;
    }

    eliminarEnemigo(enemigo){
        this.enemigos.remove(this.enemigos.children[enemigo]);
    }

    invocaSeta(){
        this.enemigos.add(new Seta(this));
    }

    invocaEnemigo2(){
        this.enemigos.add(new enemigo2(this));
    }

    invocaEnemigo3(){
        this.enemigos.add(new enemigo3(this));
    }

    eliminarObjeto(enemigo){
        this.objeto.remove(this.objeto.children[0]);
    }

    muestraObjeto(){
        this.objeto.children[0].visible = true;
    }

    cerrarPuertas(){
        this.puertas = [false, false, false, false];
    }
     
    abrirPuertas(){
        this.puertas = this.puertasIniciales;
        this.puertas_mesh[0].visible = false;
        this.puertas_mesh[1].visible = false;
        this.puertas_mesh[2].visible = false;
        this.puertas_mesh[3].visible = false;
        
    }

    enableLayers(layer){
        var longitud = this.sala.children.length;

        for(var i = 0; i < longitud; i+=1){
            this.sala.children[i].layers.enable(layer);
        }


        this.puertas_mesh[0].layers.enable(layer);
        this.puertas_mesh[1].layers.enable(layer);
        this.puertas_mesh[2].layers.enable(layer);
        this.puertas_mesh[3].layers.enable(layer);
        if(this.objeto.children.length == 1)
            this.objeto.children[0].children[0].layers.enable(layer);
        

    }

    disableLayers(layer){
        var longitud = this.sala.children.length;

        for(var i = 0; i < longitud; i+=1){
            this.sala.children[i].layers.disable(layer);
        }

        this.puertas_mesh[0].layers.disable(layer);
        this.puertas_mesh[1].layers.disable(layer);
        this.puertas_mesh[2].layers.disable(layer);
        this.puertas_mesh[3].layers.disable(layer);
        if(this.objeto.children.length == 1)
            this.objeto.children[0].children[0].layers.disable(layer);
    }

    setLayers(layer){

        for(var i = 0; i < 32; i+=1)
            this.disableLayers(i);

        this.enableLayers(layer);
    }
}