class Bomba extends Enemigo{
    constructor(sala){
        super();

        this.salaActual = sala;

        this.mesh = enemigos[2].clone();
        this.radioEsferaEnglobante = 1;

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


        this.tiempoAnterior = Date.now();
        this.tiempoActual;


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
        



    }

    update(Mono){

        this.tiempoActual = Date.now();

        /* movimiento */

        var posicionZreal =  (this.mesh.position.z + this.salaActual.infoSala.Coordenada_Z)
        var posicionXreal =  (this.mesh.position.x + this.salaActual.infoSala.Coordenada_X)

       var posicionNueva = new THREE.Vector3( this.mesh.position.x + (this.direccion.x * this.velocidad),this.mesh.position.y,this.mesh.position.z + (this.direccion.z * this.velocidad));


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

        if(this.vida <= 0)
            return true;

        return false;
    }

    calcularNuevaDireccion(muro){
        var angulo = Math.floor(Math.random() * (290) + (24));
              angulo = angulo/100;

              this.mesh.rotation.y -= (this.direccion.angleTo(muro));


              this.mesh.rotation.y -= angulo;

              var ref = new THREE.Vector3(0,1,0);

              muro = muro.applyAxisAngle(ref,-angulo);


              this.direccion = muro;
    }

}