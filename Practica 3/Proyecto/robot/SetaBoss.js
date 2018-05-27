class SetaBoss extends Enemigo{
    constructor(sala){
        super();

        this.vida = 500;

        this.tiempoAnteriorAtaque1= Date.now();;
        this.tiempoActualAtaque1;

        this.primeraVez = true;

        this.tiempoAnteriorAtaque2 = Date.now();
        this.tiempoActualAtaque2;

        //this.mesh = new THREE.Mesh(new THREE.BoxGeometry(2,2,2),new THREE.MeshPhongMaterial ({color: 0xf90000,transparent: false, opacity: 0.7}));


        this.mesh = enemigos[3].clone();
        this.salaActual = sala;
        this.tapa_puerta = false;
        this.x = 0;
        this.z = 10;

        this.mesh.position.set(this.x,0,this.z);

        this.lagrimas = new THREE.Object3D;
        
        this.lagrima=null;

        this.inflar = true;

        this.radioEsferaEnglobante = 2;

        this.cadencia_ataque_1 = 1.5;
        this.cadencia_ataque_2 = 5;
        this.velocidadLagrima = 30;
        this.radioLagrima = 0.6;
        this.colorLagrima = 0xf90000;

        var longitud = this.mesh.children.lenght;

        this.mesh.children[0].layers.set(1);
        this.add(this.lagrimas);
        this.add(this.mesh);

    }

    setPosicion(x,y,z){
        this.position.set(x,y,z);
    }

    update(Mono){

        
        this.tiempoActualAtaque1 = Date.now();

        this.tiempoActualAtaque2 = Date.now();


        var tiempoTranscurridoAtaque2 = (this.tiempoActualAtaque2-this.tiempoAnteriorAtaque2)/1000;
        if(tiempoTranscurridoAtaque2 >= this.cadencia_ataque_2){
            if(!this.primeraVez){
                var tipo_invocacion = Math.floor(Math.random() * (2 - (0)) + (0));

                switch(tipo_invocacion){
                    case 0: this.salaActual.invocaEnemigo2();break;
                    case 1: this.salaActual.invocaSeta();this.salaActual.invocaSeta();break;
                }
            }else{ this.primeraVez = false;}

            this.tiempoAnteriorAtaque2 = this.tiempoActualAtaque2;
        }

       

        var tiempoTranscurridoAtaque1 = (this.tiempoActualAtaque1-this.tiempoAnteriorAtaque1)/1000;
        if(tiempoTranscurridoAtaque1 >= this.cadencia_ataque_1){
            this.lagrimas.add(new Lagrima({z:this.mesh.position.z+1,y:this.mesh.position.y+2,x:this.mesh.position.x,o:0,v:this.velocidadLagrima,r:this.radioLagrima,c:this.colorLagrima,t:0,xReal:this.salaActual.infoSala.Coordenada_X,zReal:this.salaActual.infoSala.Coordenada_Z}));
            this.lagrimas.add(new Lagrima({z:this.mesh.position.z,y:this.mesh.position.y+2,x:this.mesh.position.x+1,o:1,v:this.velocidadLagrima,r:this.radioLagrima,c:this.colorLagrima,t:0,xReal:this.salaActual.infoSala.Coordenada_X,zReal:this.salaActual.infoSala.Coordenada_Z}));
            this.lagrimas.add(new Lagrima({z:this.mesh.position.z-1,y:this.mesh.position.y+2,x:this.mesh.position.x,o:2,v:this.velocidadLagrima,r:this.radioLagrima,c:this.colorLagrima,t:0,xReal:this.salaActual.infoSala.Coordenada_X,zReal:this.salaActual.infoSala.Coordenada_Z}));
            this.lagrimas.add(new Lagrima({z:this.mesh.position.z,y:this.mesh.position.y+2,x:this.mesh.position.x-1,o:3,v:this.velocidadLagrima,r:this.radioLagrima,c:this.colorLagrima,t:0,xReal:this.salaActual.infoSala.Coordenada_X,zReal:this.salaActual.infoSala.Coordenada_Z}));
            this.lagrimas.add(new Lagrima({z:this.mesh.position.z+1,y:this.mesh.position.y+2,x:this.mesh.position.x,o:4,v:this.velocidadLagrima,r:this.radioLagrima,c:this.colorLagrima,t:0,xReal:this.salaActual.infoSala.Coordenada_X,zReal:this.salaActual.infoSala.Coordenada_Z}));
            this.lagrimas.add(new Lagrima({z:this.mesh.position.z+1,y:this.mesh.position.y+2,x:this.mesh.position.x,o:5,v:this.velocidadLagrima,r:this.radioLagrima,c:this.colorLagrima,t:0,xReal:this.salaActual.infoSala.Coordenada_X,zReal:this.salaActual.infoSala.Coordenada_Z}));
            this.lagrimas.add(new Lagrima({z:this.mesh.position.z+1,y:this.mesh.position.y+2,x:this.mesh.position.x,o:6,v:this.velocidadLagrima,r:this.radioLagrima,c:this.colorLagrima,t:0,xReal:this.salaActual.infoSala.Coordenada_X,zReal:this.salaActual.infoSala.Coordenada_Z}));
            this.lagrimas.add(new Lagrima({z:this.mesh.position.z+1,y:this.mesh.position.y+2,x:this.mesh.position.x,o:7,v:this.velocidadLagrima,r:this.radioLagrima,c:this.colorLagrima,t:0,xReal:this.salaActual.infoSala.Coordenada_X,zReal:this.salaActual.infoSala.Coordenada_Z}));
            this.tiempoAnteriorAtaque1 = this.tiempoActualAtaque1;

            this.inflar = true;
        }

        var porcentajeAnimacion = tiempoTranscurridoAtaque1 / (this.cadencia_ataque_1);
        var porcentaje_inflandose = 0.95;
        var porcentaje_desinflandose = 1-porcentaje_inflandose;
        var factor_escalado;

        if(porcentajeAnimacion <= porcentaje_inflandose){
            factor_escalado = 0.5 * porcentajeAnimacion / porcentaje_inflandose 
            factor_escalado+=0.75;
            this.mesh.scale.set(factor_escalado,factor_escalado,factor_escalado);
        }else{
            factor_escalado = (1-porcentajeAnimacion) / porcentaje_desinflandose * 0.5;
            factor_escalado+=0.75;
            this.mesh.scale.set(factor_escalado,factor_escalado,factor_escalado);
        }
        

        var longitud = this.lagrimas.children.length;

      for(var i=0;i < longitud; i++){
        var muerta = this.lagrimas.children[i].update(this.salaActual,0,0,Mono);
        if(muerta == -1){           //Si ha chocado con la pared
          this.lagrimas.remove(this.lagrimas.children[i]);
          longitud-=1;
          return false;
        }else if(muerta != -2){     //Si le ha dado al mono
            this.lagrimas.remove(this.lagrimas.children[i]);
            longitud-=1;
            console.log("Bajar vida mono");
            return true;
        }
        
      }

    }

    bajarVida(damage){
        this.vida -= damage;
        console.log(this.vida);

        if(this.vida <= 0)
            return true;

        return false;
    }

}