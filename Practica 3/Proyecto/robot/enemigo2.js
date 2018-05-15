class enemigo2 extends Enemigo{
    constructor(sala){
        super();

        this.salaActual = sala;
        this.mesh = new THREE.Mesh(new THREE.BoxGeometry(2,2,2),new THREE.MeshPhongMaterial ({color: 0xf90000,transparent: false, opacity: 0.7}));

        this.mesh = enemigos[1].clone();
        this.radioEsferaEnglobante = 2;

        this.vector_inicial = new THREE.Vector3(0,0,1);

        this.velocidad = 0.3;

        this.vida = 60;


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
        



        var longitud = this.mesh.children.length;

        for(var i = 0; i < longitud; i +=1)
            this.mesh.children[i].layers.set(1);

        this.add(this.mesh);

        

        //this.mesh.position.set(5,1,5);

        this.tiempoAnterior = Date.now();
        this.tiempoActual;


        //aniumacion
        this.parpadeo = false;

        this.setVisible = true;
        this.tiempoInicioAnimacion;
        this.tiempoActualAnimacion;
    }





    update(Mono){

        this.tiempoActual = Date.now();



        
        /* movimiento */

        

        var posicionZreal =  (this.mesh.position.z + this.salaActual.infoSala.Coordenada_Z)
        var posicionXreal =  (this.mesh.position.x + this.salaActual.infoSala.Coordenada_X)




       var vector_unitario = new THREE.Vector3(Mono.position.x - posicionXreal ,0,Mono.position.z - posicionZreal);
       vector_unitario = vector_unitario.normalize();
        

       this.mesh.position.x += (vector_unitario.x * this.velocidad);  // tiempo ?
       
       this.mesh.position.z += (vector_unitario.z * this.velocidad); // tiempo ?

       var angulo_rot = this.vector_inicial.angleTo(vector_unitario);

       if(vector_unitario.x > 0)
       this.mesh.rotation.y = angulo_rot;
       else this.mesh.rotation.y = -angulo_rot;


       /*         fin-movimiento          */


        //animacion si ha chocado con personaje

        /*
       if(this.parpadeo){
           console.log("entra")
           this.tiempoActualAnimacion = Date.now();
           var tiempoTranscurridoAnimacion = (this.tiempoActualAnimacion - this.tiempoInicioAnimacion)/1000;

           if(tiempoTranscurridoAnimacion < 2){
                if(this.setVisible){
                    this.mesh.visible = true;
                    this.setVisible = false;
                }else {
                    this.mesh.visible = false;
                    this.setVisible = true;
                }
           }else{
                this.parpadeo = false;
                this.setVisible = true;
           } 

       }

       */


       //colisiones

       var difRadios = this.radioEsferaEnglobante + Mono.radioEsferaEnglobante;

       var posReal = new THREE.Vector3(posicionXreal,Mono.position.y,posicionZreal)

       var distanciaReal = posReal.distanceTo(Mono.position);
     
       var tiempoTranscurrido = (this.tiempoActual - this.tiempoAnterior)/1000;
        //console.log(tiempoTranscurrido)

      
            if(distanciaReal <= difRadios){
                this.tiempoAnterior = this.tiempoActual;

                this.mesh.position.x -= (10 * vector_unitario.x);   // para que se despegue
                this.mesh.position.z -= (10 * vector_unitario.z);   // para que se despegue

              //  this.tiempoInicioAnimacion = Date.now();
              //  this.parpadeo = true; // descomenta para parpadeo
                return true;
                
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
