class Sala extends THREE.Object3D{

    constructor(n_sala, n_enemigos,infoSala){
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
        }

        this.sala.scale.set(3,3,3);
        this.add(this.sala);

        this.infoSala = infoSala;

        this.limite = 21;
        this.tama_puerta = 2.5;
        this.long_pasillo = 3;

        this.enemigos = new THREE.Object3D;

        this.camara = null;

        this.tipo_sala = n_sala;

        this.puertas = [false, false, false, false];
        this.puertasIniciales = [false, false, false, false];

        
        
        if(this.tipo_sala == 3 || this.tipo_sala == 7 || this.tipo_sala == 6 || this.tipo_sala == 9 || this.tipo_sala == 13 || this.tipo_sala == 11 || this.tipo_sala == 12 || this.tipo_sala == 15){
            this.puertas[0] = true;
            this.puertasIniciales[0]=true;
            if(n_enemigos != 0){
                this.puerta_norte = new THREE.Mesh(new THREE.BoxGeometry (2*this.tama_puerta,13,this.long_pasillo),new THREE.MeshPhongMaterial ({color: 0x00604f, specular: 0xfbf804, shininess: 70}));
                this.puerta_norte.position.z = this.limite + this.long_pasillo;
                this.add(this.puerta_norte);
            }
        }

        if(this.tipo_sala == 4 || this.tipo_sala == 7 || this.tipo_sala == 8 || this.tipo_sala == 10 || this.tipo_sala == 13 || this.tipo_sala == 14 || this.tipo_sala == 12 || this.tipo_sala == 15){
            this.puertas[3] = true;
            this.puertasIniciales[3]=true;
            if(n_enemigos != 0){
                this.puerta_oeste = new THREE.Mesh(new THREE.BoxGeometry (this.long_pasillo,13,2*this.tama_puerta),new THREE.MeshPhongMaterial ({color: 0x00604f, specular: 0xfbf804, shininess: 70}));
                this.puerta_oeste.position.x = this.limite + this.long_pasillo;
                this.add(this.puerta_oeste);
            }
        }

        if(this.tipo_sala ==1 || this.tipo_sala == 8 || this.tipo_sala == 5 || this.tipo_sala == 9 || this.tipo_sala == 13 || this.tipo_sala == 14 || this.tipo_sala == 11 || this.tipo_sala == 15){
            this.puertas[2] = true;
            this.puertasIniciales[2]=true;
            if(n_enemigos != 0){
                this.puerta_sur = new THREE.Mesh(new THREE.BoxGeometry (2*this.tama_puerta,13,this.long_pasillo),new THREE.MeshPhongMaterial ({color: 0x00604f, specular: 0xfbf804, shininess: 70}));
                this.puerta_sur.position.z = -this.limite - this.long_pasillo;
                this.add(this.puerta_sur);
            }
            
        }

        if(this.tipo_sala == 2 || this.tipo_sala ==5 || this.tipo_sala == 6 || this.tipo_sala == 10 || this.tipo_sala == 14 || this.tipo_sala == 11 || this.tipo_sala == 12 || this.tipo_sala == 15){
            this.puertas[1] = true;
            this.puertasIniciales[1]=true;
            if(n_enemigos != 0){
                this.puerta_este = new THREE.Mesh(new THREE.BoxGeometry (this.long_pasillo,13,2*this.tama_puerta),new THREE.MeshPhongMaterial ({color: 0x00604f, specular: 0xfbf804, shininess: 70}));
                this.puerta_este.position.x = -this.limite - this.long_pasillo;
                this.add(this.puerta_este);
            }
        }


        for(var i = 0; i < n_enemigos; i+=1)
            this.enemigos.add(new Seta(this));

        this.add(this.enemigos);
    }

    update(Mono){
        var longitud = this.enemigos.children.length;

      for(var i=0;i < longitud; i++){
            this.enemigos.children[i].update(Mono);
        }

        if(longitud != 0){
            this.cerrarPuertas();
        }else{
            this.abrirPuertas();
        }
        
    }

    setCamara(una_camara){
        this.camara = una_camara;
    }

    eliminarEnemigo(enemigo){
        this.enemigos.remove(this.enemigos.children[enemigo]);
    }

    cerrarPuertas(){
        this.puertas = [false, false, false, false];
    }
     
    abrirPuertas(){
        this.puertas = this.puertasIniciales;
        
        if(this.puertas[0] == true)
            this.puerta_norte.visible = false;
        
        if(this.puertas[1] == true)
            this.puerta_este.visible = false;
        
        if(this.puertas[2] == true)
            this.puerta_sur.visible = false;
            
        if(this.puertas[3] == true)
            this.puerta_oeste.visible = false;
        
        
    }

}