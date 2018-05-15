class Seta extends Enemigo{
    constructor(sala){
        super();

        this.vida = 100;

        this.tiempoAnterior = Date.now();
        this.tiempoActual;

        //this.mesh = new THREE.Mesh(new THREE.BoxGeometry(2,2,2),new THREE.MeshPhongMaterial ({color: 0xf90000,transparent: false, opacity: 0.7}));


        this.mesh = enemigos[0].clone();
        this.salaActual = sala;
        this.tapa_puerta = false;
        this.x = 0;
        this.z = 0;

        do{
            this.x = Math.random() * (20 - (-20)) + (-20);
            this.z = Math.random() * (20 - (-20)) + (-20);

/************************ Código para evitar crear la seta en la puerta ***************************************/



            if((this.salaActual.puertas[0] && this.z > 14 && this.x > -3.5 && this.x < 3.5) 
                || (this.salaActual.puertas[2] && this.z < -14 && this.x > -3.5 && this.x < 3.5) 
                || (this.salaActual.puertas[1] && this.x < -14 && this.z > -3.5 && this.z < 3.5)
                || (this.salaActual.puertas[3] && this.x > 14 && this.z > -3.5 && this.z < 3.5)){
                this.tapa_puerta = true;
            }else{
                this.tapa_puerta = false;
            }
            
        }while( this.tapa_puerta );

        this.mesh.position.set(this.x,0,this.z);

        this.lagrimas = new THREE.Object3D;
        
        this.lagrima=null;

        this.inflar = true;

        this.radioEsferaEnglobante = 2;
        /*
        this.esferaGeometria = new THREE.SphereGeometry (this.radioEsferaEnglobante,32,32);
        this.esferaEnglobante = new THREE.Mesh(this.esferaGeometria,new THREE.MeshPhongMaterial ({color: 0x00604f, specular: 0xfbf804, shininess: 70}))
        this.esferaEnglobante.position.set(this.x,1,this.z);
        this.add(this.esferaEnglobante)
*/
        //Propiedades de las lágrimas
        this.cadencia = 1.5;
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

        this.tiempoActual = Date.now();

       

        var tiempoTranscurrido = (this.tiempoActual-this.tiempoAnterior)/1000;
        if(tiempoTranscurrido >= this.cadencia){
            this.lagrimas.add(new Lagrima({z:this.mesh.position.z+1,y:this.mesh.position.y+2,x:this.mesh.position.x,o:0,v:this.velocidadLagrima,r:this.radioLagrima,c:this.colorLagrima,t:0,xReal:this.salaActual.infoSala.Coordenada_X,zReal:this.salaActual.infoSala.Coordenada_Z}));
            this.lagrimas.add(new Lagrima({z:this.mesh.position.z,y:this.mesh.position.y+2,x:this.mesh.position.x+1,o:1,v:this.velocidadLagrima,r:this.radioLagrima,c:this.colorLagrima,t:0,xReal:this.salaActual.infoSala.Coordenada_X,zReal:this.salaActual.infoSala.Coordenada_Z}));
            this.lagrimas.add(new Lagrima({z:this.mesh.position.z-1,y:this.mesh.position.y+2,x:this.mesh.position.x,o:2,v:this.velocidadLagrima,r:this.radioLagrima,c:this.colorLagrima,t:0,xReal:this.salaActual.infoSala.Coordenada_X,zReal:this.salaActual.infoSala.Coordenada_Z}));
            this.lagrimas.add(new Lagrima({z:this.mesh.position.z,y:this.mesh.position.y+2,x:this.mesh.position.x-1,o:3,v:this.velocidadLagrima,r:this.radioLagrima,c:this.colorLagrima,t:0,xReal:this.salaActual.infoSala.Coordenada_X,zReal:this.salaActual.infoSala.Coordenada_Z}));
            this.tiempoAnterior = this.tiempoActual;

            this.inflar = true;
        }

        var porcentajeAnimacion = tiempoTranscurrido / (this.cadencia);
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