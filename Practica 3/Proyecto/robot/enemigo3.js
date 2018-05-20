class enemigo3 extends Enemigo{
    constructor(sala){
        super();

        this.salaActual = sala;
        this.mesh = new THREE.Mesh(new THREE.BoxGeometry(2,2,2),new THREE.MeshPhongMaterial ({color: 0xf90000,transparent: false, opacity: 0.7}));

        this.mesh = enemigos[1].clone();
        this.radioEsferaEnglobante = 1.5;

        this.vector_inicial = new THREE.Vector3(0,0,1);

        this.velocidad = 0.2;

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


        this.direccion = new THREE.Vector3(-1,0,0);



    }

    update(Mono){

        this.tiempoActual = Date.now();

        /* movimiento */

        var posicionZreal =  (this.mesh.position.z + this.salaActual.infoSala.Coordenada_Z)
        var posicionXreal =  (this.mesh.position.x + this.salaActual.infoSala.Coordenada_X)

      // var vector_unitario = new THREE.Vector3(Mono.position.x - posicionXreal ,0,Mono.position.z - posicionZreal);
      // vector_unitario = vector_unitario.normalize();
        
      // this.mesh.position.x + (this.direccion.x * this.velocidad)  // tiempo ?
       
      // this.mesh.position.z + (this.direccion.z * this.velocidad); // tiempo ?
      //console.log('Avance ' + (this.direccion.x * this.velocidad))

       var posicionNueva = new THREE.Vector3( this.mesh.position.x + (this.direccion.x * this.velocidad),this.mesh.position.y,this.mesh.position.z + (this.direccion.z * this.velocidad));

       //console.log('Pos ' + posicionNueva.x)

       //console.log(this.salaActual.limite+this.salaActual.infoSala.Coordenada_X)

     //  console.log( this.mesh.position.x)


       if(posicionNueva.x > (this.salaActual.limite)){
              // Ha chocado con el muro izquierdo;

              this.calcularNuevaDireccion(new THREE.Vector3(0,0,1));
             

        //  console.log("ejntra")
        //console.log("choca-izquierda")
       //    this.mesh.position.z += (posicionNueva.z * this.velocidad); // tiempo ?
       }else if(posicionNueva.x < ((-this.salaActual.limite))){
        //choca con muro derecho
        this.calcularNuevaDireccion(new THREE.Vector3(0,0,-1));
        //console.log("choca-der")
       }else if(posicionNueva.z > ((this.salaActual.limite))){
        //choca muro arriba
        this.calcularNuevaDireccion(new THREE.Vector3(-1,0,0));
       }else if(posicionNueva.z < ((-this.salaActual.limite))){
        //choca muro abajo
        this.calcularNuevaDireccion(new THREE.Vector3(1,0,0));
       }else{
        this.mesh.position.x = posicionNueva.x;
        this.mesh.position.z = posicionNueva.z;
       }



       /*         fin-movimiento          */

       var difRadios = this.radioEsferaEnglobante + Mono.radioEsferaEnglobante;

       var posReal = new THREE.Vector3(posicionXreal,Mono.position.y,posicionZreal)

       var distanciaReal = posReal.distanceTo(Mono.position);
     
       var tiempoTranscurrido = (this.tiempoActual - this.tiempoAnterior)/1000;
        //console.log(tiempoTranscurrido)

            if(tiempoTranscurrido > 1){
            if(distanciaReal <= difRadios){
                this.tiempoAnterior = this.tiempoActual;

                var muroChoque = this.direccion.applyAxisAngle(new THREE.Vector3(0,1,0),-Math.PI/2)
                this.calcularNuevaDireccion(muroChoque)
              
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

    calcularNuevaDireccion(muro){
        var angulo = Math.floor(Math.random() * (290) + (24));
              angulo = angulo/100;
              //console.log("angulo: " + angulo);

            
              var ref = new THREE.Vector3(0,1,0);

              muro = muro.applyAxisAngle(ref,-angulo);

             // console.log("Nueva dir = " + muro.x + " , " + muro.z);

              this.direccion = muro;
    }

}