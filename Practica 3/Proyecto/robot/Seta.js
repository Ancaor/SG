class Seta extends Enemigo{
    constructor(sala){
        super();

        this.tiempoAnterior = Date.now();
        this.tiempoActual;

        this.mesh = new THREE.Mesh(new THREE.BoxGeometry(2,2,2),new THREE.MeshPhongMaterial ({color: 0xf90000,transparent: false, opacity: 0.7}));

        this.salaActual = sala;
        this.tapa_puerta = false;
        this.x = 0;
        this.z = 0;

        do{
            this.x = Math.random() * (20 - (-20)) + (-20);
            this.z = Math.random() * (20 - (-20)) + (-20);

/************************ Código para evitar crear la seta en la puerta *************************************** /



            if(this.salaActual.puertas[0] && this.z > 14 && this.x > -3.5 && this.x < 3.5){
                this.tapa_puerta = true;
                console.log("Tapa puerta superior: ("+this.x+",1,"+this.z+")");
            }

            if(this.salaActual.puertas[2] && this.z < -14 && this.x > -3.5 && this.x < 3.5){
                this.tapa_puerta = true;
                console.log("Tapa puerta inferior: ("+this.x+",1,"+this.z+")");
            }

            if(this.salaActual.puertas[1] && this.x < -14 && this.z > -3.5 && this.z < 3.5){
                this.tapa_puerta = true;
                console.log("Tapa puerta derecha: ("+this.x+",1,"+this.z+")");
            }

            if(this.salaActual.puertas[3] && this.x > 14 && this.z > -3.5 && this.z < 3.5){
                this.tapa_puerta = true;
                console.log("Tapa puerta izquierda: ("+this.x+",1,"+this.z+")");
            }
*/
        }while( this.tapa_puerta );

        this.mesh.position.set(this.x,1,this.z);

        this.lagrimas = new THREE.Object3D;
        
        this.lagrima=null;

        this.inflar = true;

        this.cadencia = 2;

        

        this.add(this.lagrimas);
        this.add(this.mesh);
    }

    setPosicion(x,y,z){
        this.position.set(x,y,z);
    }

    update(){

        this.tiempoActual = Date.now();

        var tiempoTranscurrido = (this.tiempoActual-this.tiempoAnterior)/1000;
        if(tiempoTranscurrido >= this.cadencia){
            this.lagrimas.add(new Lagrima({z:this.mesh.position.z+1,y:this.mesh.position.y,x:this.mesh.position.x,o:0,v:10}));
            this.lagrimas.add(new Lagrima({z:this.mesh.position.z,y:this.mesh.position.y,x:this.mesh.position.x+1,o:1,v:10}));
            this.lagrimas.add(new Lagrima({z:this.mesh.position.z-1,y:this.mesh.position.y,x:this.mesh.position.x,o:2,v:10}));
            this.lagrimas.add(new Lagrima({z:this.mesh.position.z,y:this.mesh.position.y,x:this.mesh.position.x-1,o:3,v:10}));
            this.tiempoAnterior = this.tiempoActual;

            this.inflar = true;
        }

        var porcentajeAnimacion = tiempoTranscurrido / (this.cadencia);
        var porcentaje_inflandose = 0.95;
        var porcentaje_desinflandose = 1-porcentaje_inflandose;
        var factor_escalado;

        if(porcentajeAnimacion <= porcentaje_inflandose){
            factor_escalado = 0.5 * porcentajeAnimacion / porcentaje_inflandose 
            factor_escalado+=1;
            this.mesh.scale.set(factor_escalado,factor_escalado,factor_escalado);
        }else{
            factor_escalado = (1-porcentajeAnimacion) / porcentaje_desinflandose * 0.5;
            factor_escalado+=1;
            this.mesh.scale.set(factor_escalado,factor_escalado,factor_escalado);
        }
        

        var longitud = this.lagrimas.children.length;

      for(var i=0;i < longitud; i++){
        var muerta = this.lagrimas.children[i].update(this.salaActual,0,0);
        if(muerta){
          this.lagrimas.remove(this.lagrimas.children[i]);
        }
        
      }


      



        
        

    }

}