class Lanzador extends THREE.Object3D{
    constructor () {
        super();
        
///////////////////  Mesh del lanzador de meteoritos

        this.material = new THREE.MeshPhongMaterial ({color: 0x00604f, specular: 0xff, shininess: 3});

        var geometria = new THREE.BoxGeometry (1,1,1, 16, 8);    // geometria cilindro
        geometria.applyMatrix (new THREE.Matrix4().makeTranslation(0,0.5,0));

        this.visor = new THREE.Mesh (
            geometria, this.material);
        

        this.visor.scale.set(120,30,0.1);
        this.visor.position.z = 0;

        this.visor.castShadow = true;
        this.visor.receiveShadow = true;
  
 ///////////////////
  
        this.meteoritos = new THREE.Object3D();

        this.tiempoAnterior = Date.now();
        this.tiempoActual = null;
        this.tiempoTranscurrido = 0;

        this.add(this.meteoritos);

        this.colisiones = new Array();
        this.orientacion = 's';


        //////////NIVELES DE DIFICULTAD/////////

        this.tiempoEntreLanzamientos = 0.5;
        this.velocidadMeteoritos = 15;

        ////////////////////////////////////////

        this.estado = 0; // Estados del lanzador : 0 no empezado, 1 funcionando,2 pausado , 3 reanudada

        this.x = 0.5;
        this.z = this.visor.position.z; 
        

        //Descomentar para ver fisicamente el lanzador

        //this.add(this.visor);




/////////////////////////////////////////////////////////////////////

    }

    /*Ajusta los tiempos para que los meteoritos conserven posición y velocidad tras la pausa
    */
    reanudar(){
        this.tiempoActual = Date.now();
        this.tiempoAnterior = (this.tiempoActual - (this.tiempoTranscurrido*1000));
    }

    /*Devuelve el estado del lanzador
    */
    getEstado(){
        return this.estado;
    }

    /*Cambia el estado del lanzador
    */
    setEstado(estado){
        this.estado = estado;
    }

    /*Cambia la posición y orientación de lanzador
    */
    setPosicion(x, y, z, or){
        this.orientacion = or;

        switch(this.orientacion){
            case 'n': this.visor.rotation.y = 0;this.z = z; break;
            case 's': this.visor.rotation.y = Math.PI;this.z = z;  break;
            case 'e': this.visor.rotation.y = Math.PI/2; this.x = x; break;
            case 'o': this.visor.rotation.y = 3*Math.PI/2; this.x = x; break;
        }

        this.visor.position.x = x;
        this.visor.position.y = y;
        this.visor.position.z = z;
    }


    /*Actualiza tiempos y el estado de los meteoritos.
      También es el encargado de gestionar las colisiones de meteoritos con el robot.

      argumentos:
        posRobot: vector con la posición del robot.
        ColisionGruesaY: valor de la componente Y del centro de la esfera de colisiones gruesa.
        ColisionFina1Y: valor de la componente Y del centro de la primera esfera de colisiones fina.
        ColisionFina2Y: valor de la componente Y del centro de la segunda esfera de colisiones fina.
        ColisionFina3Y: valor de la componente Y del centro de la tercera esfera de colisiones fina.
      
      return: Vector con todas las colisiones detectadas por los meteoritos del lanzador.
    */
    update(posRobot,ColisionGruesaY,ColisionFina1Y,ColisionFina2Y,ColisionFina3Y){

        var posFina = new Array(ColisionFina1Y,ColisionFina2Y,ColisionFina3Y); // solo tiene la y de cada centro de colisiones

        // En función del estado, ajusta tiempos.
        switch(this.estado){
            case 0:    ;break;
            case 1: this.tiempoActual = Date.now();
                for(var i = 0; i < this.meteoritos.children.length; i++){
                    this.meteoritos.children[i].setEstado(1);
                };
            break;
            case 2: ;break;
            case 3: this.reanudar(); this.estado = 1 ; 
                for(var i = 0; i < this.meteoritos.children.length; i++){
                    this.meteoritos.children[i].setEstado(3)
                }
                break;
        }

        
       this.tiempoTranscurrido = (this.tiempoActual - this.tiempoAnterior)/1000;

        // Crea meteoritos pasado un tiempo
        if( this.tiempoTranscurrido > this.tiempoEntreLanzamientos){   // tiempo entre bolas
            this.meteo = new Meteorito({z:this.z,y:5,x:this.x,o:this.orientacion,v:this.velocidadMeteoritos});
            this.meteoritos.add(this.meteo);
            this.tiempoAnterior = this.tiempoActual;
            if(this.orientacion == 's' || this.orientacion == 'n')
                this.x = Math.floor(Math.random() * 121) - 60;
            else
                this.z = Math.floor(Math.random() * 121) - 60;
        }

        //Actualiza estado de meteoritos y detecta colisiones

        var longitud  = this.meteoritos.children.length;

        for(var i = 0; i < longitud ; i++){
            var a = this.meteoritos.children[i].update(posRobot,ColisionGruesaY,posFina);

            if(a == 1){
                this.colisiones.push(this.meteoritos.children[i].getTipo());
                this.meteoritos.remove(this.meteoritos.children[i]);
                longitud = this.meteoritos.children.length;
            }
            else if(a == 2){
                this.meteoritos.remove(this.meteoritos.children[i]);
                longitud = this.meteoritos.children.length;
            }

        }
        return this.colisiones;

    }

    /*Devuelve el vector de colisiones
    */
    getColisiones(){
        return this.colisiones;
    }

    /*Ajusta el tiempo entre lanzamiento de meteoritos
    */
    setTiempoEntreLanzamientos(t){
        this.tiempoEntreLanzamientos = t;
    }

    /*Ajusta la velocidad de los meteoritos
    */
    setVelocidadMeteoritos(v){
        this.velocidadMeteoritos = v;
    }

    /*Vacia el vector de colisiones
    */
    restartColisiones(){
        while(this.colisiones.length)
        this.colisiones.pop();
    }

    /*Resetea el lanzador
    */
    restart(){
        this.estado = 0;
        while(this.meteoritos.length)
            this.meteoritos.pop();
    }

}