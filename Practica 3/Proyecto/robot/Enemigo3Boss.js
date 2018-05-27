class enemigo3Boss extends Enemigo{
    constructor(sala){
        super();

        this.salaActual = sala;
        //this.mesh = new THREE.Mesh(new THREE.BoxGeometry(2,2,2),new THREE.MeshPhongMaterial ({color: 0xf90000,transparent: false, opacity: 0.7}));

        this.mesh = enemigos[5].clone();
        this.radioEsferaEnglobante = 2;

        this.vector_inicial = new THREE.Vector3(0,0,1);

        this.velocidad = 0.25;

        this.vida = 450;
        this.primeraVez = true;

        this.tapa_puerta = false;
        this.x = 0;
        this.z = 15;

    

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


        var direccion_inicial = Math.floor(Math.random() * (4 - (0)) + (0));

        switch(direccion_inicial){
            case 0: 
                this.direccion = new THREE.Vector3(-1,0,0); 
            break;
            case 1: 
                this.direccion = new THREE.Vector3(1,0,0); 
                this.mesh.rotation.y += Math.PI;
            break;
            case 2: 
                this.direccion = new THREE.Vector3(0,0,1);
                this.mesh.rotation.y += Math.PI/2;
            break;
            case 3: 
                this.direccion = new THREE.Vector3(0,0,-1); 
                this.mesh.rotation.y -= Math.PI/2;
            break;
        }


        this.tiempoAnteriorInvocacion = Date.now();
        this.tiempoActualInvocacion;
        this.cadenciaInvocacion = 5;
        



    }

    update(Mono){

        this.tiempoActual = Date.now();
        this.tiempoActualInvocacion = Date.now();

        var tiempoTranscurridoInvocacion = (this.tiempoActualInvocacion-this.tiempoAnteriorInvocacion)/1000;

        if(tiempoTranscurridoInvocacion >= this.cadenciaInvocacion){
            if(!this.primeraVez){
                var tipo_invocacion = Math.floor(Math.random() * (3 - (0)) + (0));

                switch(tipo_invocacion){
                    case 0: this.salaActual.invocaEnemigo3();this.salaActual.invocaEnemigo3();break;
                    case 1: this.salaActual.invocaSeta();this.salaActual.invocaEnemigo3();break;
                    case 2: this.salaActual.invocaEnemigo2();break;
                }
            }else{ this.primeraVez = false;}
            this.tiempoAnteriorInvocacion = this.tiempoActualInvocacion;
        }

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


       if((posicionNueva.x + this.radioEsferaEnglobante) > (this.salaActual.limite)){
              // Ha chocado con el muro izquierdo;
        this.calcularNuevaDireccion(new THREE.Vector3(0,0,1));
        
       }else if((posicionNueva.x - this.radioEsferaEnglobante) < ((-this.salaActual.limite))){
        //choca con muro derecho
        this.calcularNuevaDireccion(new THREE.Vector3(0,0,-1));


        //console.log("choca-der")
       }else if((posicionNueva.z + this.radioEsferaEnglobante) > ((this.salaActual.limite))){
        //choca muro arriba
        this.calcularNuevaDireccion(new THREE.Vector3(-1,0,0));


       }else if((posicionNueva.z - this.radioEsferaEnglobante)< ((-this.salaActual.limite))){
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

                var muroChoque = new THREE.Vector3(this.direccion.x,this.direccion.y,this.direccion.z);

                muroChoque = muroChoque.applyAxisAngle(new THREE.Vector3(0,1,0),-Math.PI/2);
                muroChoque.normalize();
                
                
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

             

              this.mesh.rotation.y -= (this.direccion.angleTo(muro));


              this.mesh.rotation.y -= angulo;

              var ref = new THREE.Vector3(0,1,0);

              muro = muro.applyAxisAngle(ref,-angulo);

             // console.log("Nueva dir = " + muro.x + " , " + muro.z);

              this.direccion = muro;
    }

}