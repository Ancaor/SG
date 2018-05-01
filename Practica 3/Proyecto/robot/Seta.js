class Seta extends Enemigo{
    constructor(sala){
        super();

        this.tiempoAnterior = Date.now();
        this.tiempoActual;

        this.mesh = new THREE.Mesh(new THREE.BoxGeometry(2,2,2),new THREE.MeshPhongMaterial ({color: 0xf90000,transparent: false, opacity: 0.7}));
        this.mesh.position.set(0,1,7);

        this.lagrimas = new THREE.Object3D;
        
        this.lagrima=null;

        this.inflar = true;

        this.cadencia = 1;

        this.salaActual = sala;

        this.add(this.lagrimas);
        this.add(this.mesh);
    }

    setPosicion(x,y,z){
        this.position.set(x,y,z);
    }

    update(){

        this.tiempoActual = Date.now();

        var tiempoTranscurrido = (this.tiempoActual-this.tiempoAnterior)/1000;
        console.log("transcurrido: " + tiempoTranscurrido);
        if(tiempoTranscurrido >= this.cadencia){
            console.log("entra update");
            this.lagrimas.add(new Lagrima({z:this.mesh.position.z,y:this.mesh.position.y,x:this.mesh.position.x,o:0,v:10}));
            this.lagrimas.add(new Lagrima({z:this.mesh.position.z,y:this.mesh.position.y,x:this.mesh.position.x,o:1,v:10}));
            this.lagrimas.add(new Lagrima({z:this.mesh.position.z,y:this.mesh.position.y,x:this.mesh.position.x,o:2,v:10}));
            this.lagrimas.add(new Lagrima({z:this.mesh.position.z,y:this.mesh.position.y,x:this.mesh.position.x,o:3,v:10}));
            this.tiempoAnterior = this.tiempoActual;

            this.inflar = true;
        }

        var porcentajeAnimacion = tiempoTranscurrido / (this.cadencia);
        
        if(this.inflar){
            var factor = porcentajeAnimacion * 0.2 / 0.9;
            factor +=1;
            console.log(factor)
            this.mesh.scale.set(factor,factor,factor);
            if(porcentajeAnimacion >= 0.9){
                this.inflar = false;
            }
        }else{
            var porcentaje = 1-porcentajeAnimacion;
            var factor = ((porcentaje * 0.2) / 0.1)+1;
            this.mesh.scale.set(factor,factor,factor);
        }
    
        

        var longitud = this.lagrimas.children.length;

      for(var i=0;i < longitud; i++){
        var muerta = this.lagrimas.children[i].update(this.salaActual,this.salaActual.position.x,this.salaActual.position.z);
        if(muerta){
          this.lagrimas.remove(this.lagrimas.children[i]);
        }
        
      }


      



        
        

    }

}