
/// The Model Facade class. The root node of the graph.
/**
 * @param renderer - The renderer to visualize the scene
 */
class TheScene extends THREE.Scene {

  constructor (renderer) {
    super();

    // Attributes

    this.ambientLight = null;
    this.spotLight = null;
    this.pointLight = null;
    
    this.trackballControls = null;

    this.mostrarMapa = false;
    this.camaraSala = null;
    this.camaraMapa = null;



    this.personaje = character;

    this.lagrimas = new THREE.Object3D;

    this.add(this.lagrimas)

    this.tiempoAnterior = Date.now();
    this.tiempoActual = null;

    this.tiempoActualDisparo = null;
    this.tiempoAnteriorDisparo = Date.now();

    
    this.tiempoTranscurrido = 0;


    
    this.loader = new OBJLoader();
    this.loader.LoadOBJ('modelos/Personaje/Amelio.mtl','modelos/Personaje/Amelio.obj');
    this.personaje = null;
    this.salas = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
    this.salasCargadas = 0;
    this.salaActual = null;
    this.mapa = null;

    this.camarasCargadas = false;

    this.createLights ();
    this.createCamera (renderer);
    this.axis = new THREE.AxisHelper (25);
    this.add (this.axis);
    this.model = this.createModel ();
    this.add (this.model);
    //this.add(this.lanzador);

    this.generadorPartida = null;

    this.modoJuego = -1;
    this.mapaGenerado = false;

  }


  /// It creates the camera and adds it to the graph
  /**
   * @param renderer - The renderer associated with the camera
   */
  createCamera (renderer) {
    this.camaraSala = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camaraSala.position.set (0, 70, -25);
    var look = new THREE.Vector3 (0,0,0);
    this.camaraSala.lookAt(look);
    this.camaraSala.layers.enable(1);


    this.camaraMapa = new THREE.OrthographicCamera( 200 / - 2, 200 / 2, 200 / 2, 200 / - 2, 1, 100000 );
    this.camaraMapa.position.set(0,200,-1);
    var look = new THREE.Vector3 (0,0,0);
    this.camaraMapa.lookAt(look);
    this.camaraMapa.layers.enable(2);


    this.trackballControls = new THREE.TrackballControls (this.camaraSala, renderer);
    this.trackballControls.rotateSpeed = 5;
    this.trackballControls.zoomSpeed = -2;
    this.trackballControls.panSpeed = 0.5;
    this.trackballControls.target = look;

    this.add(this.camaraSala);
  }

  /// It creates lights and adds them to the graph
  createLights () {
    // add subtle ambient lighting
    this.ambientLight = new THREE.AmbientLight(0xccddee, 0.1);
    this.add (this.ambientLight);

    // add spotlight for the shadows
    this.spotLight = new THREE.SpotLight( 0xffffff );
    this.spotLight.position.set( 20, 120, 0 );
    this.spotLight.castShadow = true;
    // the shadow resolution
    this.spotLight.shadow.mapSize.width=2048
    this.spotLight.shadow.mapSize.height=2048;
    this.add (this.spotLight);
  }

  /// It creates the geometric model: crane and ground
  /**
   * @return The model
   */
  createModel () {
    var model = new THREE.Object3D()
    var loader = new THREE.TextureLoader();

    return model;
  }

  // Public methods



  /// Actualiza la escena
  /**
   * @controls - The GUI information
   */
  animate (controls) {
    this.axis.visible = controls.axis;

    if(this.personaje == null && objetoCargado) { 
        this.personaje = new Mono();
        initVida(this.personaje.vida);
        this.loader.restart();
        this.add(this.personaje);
        this.loader.LoadOBJ('modelos/Enemigos/Mushroom.mtl','modelos/Enemigos/Mushroom.obj');
        
    }
    if(enemigos[0] == null && objetoCargado){
      enemigos[0] = objeto;
      this.loader.restart();
      this.loader.LoadOBJ('modelos/Enemigos/enemigo2.mtl','modelos/Enemigos/enemigo2.obj');
    }
    if(enemigos[1] == null && objetoCargado){
      enemigos[1] = objeto;
      this.loader.restart();
      this.loader.LoadOBJ('modelos/Enemigos/Bomba.mtl','modelos/Enemigos/Bomba.obj');
    }
    if(enemigos[2] == null && objetoCargado){
      enemigos[2] = objeto;
      this.loader.restart();
      this.loader.LoadOBJ('modelos/Enemigos/MushroomBoss.mtl','modelos/Enemigos/MushroomBoss.obj');
    }
    if(enemigos[3] == null && objetoCargado){
      enemigos[3] = objeto;
      this.loader.restart();
      this.loader.LoadOBJ('modelos/Enemigos/enemigo2Boss.mtl','modelos/Enemigos/enemigo2Boss.obj');
    }
    if(enemigos[4] == null && objetoCargado){
      enemigos[4] = objeto;
      this.loader.restart();
      this.loader.LoadOBJ('modelos/Enemigos/BombaBoss.mtl','modelos/Enemigos/BombaBoss.obj');
    }
    if(enemigos[5] == null && objetoCargado){
      enemigos[5] = objeto;
      this.loader.restart();
      this.loader.LoadOBJ('modelos/Objetos/Espada.mtl','modelos/Objetos/Espada.obj');
    }
    
    if(Potenciadores[0] == null && objetoCargado){
      Potenciadores[0] = objeto;
      this.loader.restart();
      this.loader.LoadOBJ('modelos/Objetos/Bola.mtl','modelos/Objetos/Bola.obj');
    }
    if(Potenciadores[1] == null && objetoCargado){
      Potenciadores[1] = objeto;
      this.loader.restart();
      this.loader.LoadOBJ('modelos/Objetos/Cadencia.mtl','modelos/Objetos/Cadencia.obj');
    }
    if(Potenciadores[2] == null && objetoCargado){
      Potenciadores[2] = objeto;
      this.loader.restart();
      this.loader.LoadOBJ('modelos/Objetos/heart.mtl','modelos/Objetos/heart.obj');
    }
    if(Potenciadores[3] == null && objetoCargado){
      Potenciadores[3] = objeto;
      this.loader.restart();
      this.loader.LoadOBJ('modelos/Objetos/teleport.mtl','modelos/Objetos/teleport.obj');
    }
    if(Potenciadores[4] == null && objetoCargado){
      Potenciadores[4] = objeto;
      this.loader.restart();
      this.loader.LoadOBJ('modelos/Salas/Puertas/door1.mtl','modelos/Salas/Puertas/door1.obj');
    }
    if(puertas[0] == null && objetoCargado){
      puertas[0] = objeto;
      this.loader.restart();
      this.loader.LoadOBJ('modelos/Salas/Puertas/door2.mtl','modelos/Salas/Puertas/door2.obj');
    }
    if(puertas[1] == null && objetoCargado){
      puertas[1] = objeto;
      this.loader.restart();
      this.loader.LoadOBJ('modelos/Salas/sala_1.mtl','modelos/Salas/sala_1.obj');
    }
    if(this.personaje != null && enemigos[0] != null &&this.salas[this.salasCargadas] == null && objetoCargado && this.salasCargadas < 15) {
        objetos_sala[this.salasCargadas] = objeto;
        this.loader.restart();
        this.salasCargadas++;
        var indice = this.salasCargadas+1;
        console.log(indice);
        this.loader.LoadOBJ('modelos/Salas/sala_'+indice+'.mtl','modelos/Salas/sala_'+indice+'.obj')
    }
    if(this.salasCargadas == 15 && this.salas[this.salasCargadas] == null && objetoCargado ){
        objetos_sala[this.salasCargadas] = objeto;
        this.loader.restart();
        this.salasCargadas++;
        mostrarMenuInicial();
        
    }

    if(this.modoJuego != -1 && !this.mapaGenerado){
        this.generadorPartida = new GeneradorPartida(this.modoJuego);
        this.mapa = this.generadorPartida.getMapaActual();
        this.camaraMapa = this.mapa.camaraMapa;
        this.mapa.generarMapa();
        this.personaje.setPosicion(this.mapa.salaInicio.Coordenada_X, this.mapa.salaInicio.Coordenada_Z );
        this.mapa.ocultaMapa();
        this.add(this.mapa);
        this.salaActual = this.mapa.getSalaActual();
        this.camaraSala = this.salaActual.Sala.camara;

        this.sala_anterior=this.salaActual;
        this.actualizarHud();
        this.mapaGenerado = true;
    }
    if(this.salasCargadas == 16 && this.mapaGenerado){   /// Basicamente esto es lo que se actualiza cada frame tras cargar todas las salas y el mapa
      this.mapa.calculaSalaActual(this.personaje.position.x, this.personaje.position.z);
      this.salaActual = this.mapa.getSalaActual(); 
      this.salaActual.Sala.setLayers(1);
      this.salaActual.Sala.enableLayers(2);
      this.salaActual.Sala.visible=true;
      
      if(this.salaActual != this.sala_anterior){
        this.sala_anterior.Sala.disableLayers(1);
        this.sala_anterior.Sala.visible=false;
        
      }      

      var colisionMono = this.salaActual.Sala.update(this.personaje);

      if(colisionMono instanceof Enemigo){
        this.personaje.vida -= 1;
        quitarVida();
        if(this.personaje.vida <= 0){
          alert("Has perdido. Te has quedado sin vida");
          this.reiniciarPartida();          
        }
      }
      else if(colisionMono instanceof Objeto){

        if(colisionMono.tipo != "Teleport"){
          this.personaje.aplicarBonificador(colisionMono.tipo, colisionMono.bonificacion);
          console.log("cogiste " + colisionMono.tipo);
        }else{
          this.remove(this.mapa);
          this.generadorPartida.mapaAtual +=1;
          if(this.generadorPartida.mapaAtual == this.generadorPartida.mapas.length){
            alert("Has ganado!");
            this.reiniciarPartida();
          }else{
            this.SiguienteNivel();
          }
      }
    }


      this.mapa.muestraMapa();
      
      if(this.mostrarMapa){
        this.camaraSala = this.mapa.camaraMapa;
      }else {this.camaraSala = this.salaActual.Sala.camara;}
      
    
    //  this.camaraSala = this.mapa.calculaSalaActual(this.personaje.position.x, this.personaje.position.z).Sala.camara;          /// Comentar si no se quiere que la cámara siga a la sala del mono
      this.sala_anterior = this.salaActual;

      this.personaje.update();

      var longitud = this.lagrimas.children.length;

      for(var i=0;i < longitud; i++){
        var impacto = this.lagrimas.children[i].update(this.salaActual.Sala,this.salaActual.Coordenada_X,this.salaActual.Coordenada_Z,this.salaActual.Sala.enemigos);
        if(impacto == -1){    // Impacta con una pared
          this.lagrimas.remove(this.lagrimas.children[i]);
          longitud-=1;
        }else if(impacto != -2){    // Si ha impactado con algo distinto a la pared
          this.lagrimas.remove(this.lagrimas.children[i]);
          longitud-=1;
          console.log("Bajar vida enemigo numero " + impacto)

          var enemEliminado = this.salaActual.Sala.enemigos.children[impacto].bajarVida(this.personaje.damage);

          if(enemEliminado)
            this.salaActual.Sala.eliminarEnemigo(impacto);

        }
        
      }

    }
   
  }

reiniciarPartida(){
  this.personaje.restart();
  this.remove(this.mapa);

  this.mapaGenerado =false;
  this.modoJuego = -1;
  mostrarMenuInicial();
 

  codeset = { 37: false, 38: false, 39: false, 40: false, 86: false, 77:false, 65: false, 68: false, 87: false, 83: false}

 
}

actualizarHud(){
  initVida(this.personaje.vida);
  actualizaCadencia(this.personaje.cadencia);
  actualizaAtaque(this.personaje.damage);
  actualizaRadioLagrima(this.personaje.radioLagrima);
}

SiguienteNivel(){
  this.mapa = this.generadorPartida.getMapaActual();  
  this.camaraMapa = this.mapa.camaraMapa;
  this.mapa.generarMapa();
  this.personaje.setPosicion(this.mapa.salaInicio.Coordenada_X, this.mapa.salaInicio.Coordenada_Z );
  this.mapa.ocultaMapa();
  this.salaActual = this.mapa.getSalaActual();
  this.camaraSala = this.salaActual.Sala.camara;
  this.add(this.mapa);
  this.sala_anterior=this.salaActual;
}

  moveRobot(key){

    if(!this.mostrarMapa){
    var info_sala_actual = this.mapa.getSalaActual(); 
    switch(key){
      case 65:
        this.personaje.moveLeft(info_sala_actual.Sala, info_sala_actual.Coordenada_X, info_sala_actual.Coordenada_Z );
        break;
      case 68:
        this.personaje.moveRight(info_sala_actual.Sala, info_sala_actual.Coordenada_X, info_sala_actual.Coordenada_Z );
        break;
      case 87:
        this.personaje.moveForward(info_sala_actual.Sala, info_sala_actual.Coordenada_X, info_sala_actual.Coordenada_Z );
        break;
      case 83:
        this.personaje.moveBackward(info_sala_actual.Sala, info_sala_actual.Coordenada_X, info_sala_actual.Coordenada_Z );
        break;
      }
    }
    
    
  }

  disparar(orientacion){
  this.tiempoActualDisparo = Date.now()
  this.personaje.ajustarOrientacion(orientacion);
  var tiempotransc = (this.tiempoActualDisparo - this.tiempoAnteriorDisparo) / 1000
   
   if( tiempotransc > this.personaje.cadencia){
    var a = new THREE.Vector3(this.personaje.position.x,this.personaje.position.y,this.personaje.position.z);
    
    a.add(this.personaje.ojoDer.position)
    

    
    var lagrima = new Lagrima({z:a.z,y:a.y,x:a.x,o:orientacion,v:this.personaje.velocidadLagrima,r:this.personaje.radioLagrima,c:this.personaje.colorLagrima,t:1,xReal:0,zReal:0});

    this.lagrimas.add(lagrima)
  
   this.tiempoAnteriorDisparo = this.tiempoActualDisparo

   }

   

  }

  updateLagrimas(){
    this.tiempoActual = Date.now();

        this.tiempoTranscurrido = (this.tiempoActual-this.tiempoAnterior)/1000;
        
        switch(this.orientacion){
            case 0: this.lagrima.position.z += this.velocidad * this.tiempoTranscurrido; break;
            case 2: this.lagrima.position.z -= this.velocidad * this.tiempoTranscurrido; break;
            case 1: this.lagrima.position.x += this.velocidad * this.tiempoTranscurrido; break;
            case 3: this.lagrima.position.x -= this.velocidad * this.tiempoTranscurrido; break;
        }
        
     
        this.tiempoAnterior =this.tiempoActual;
    
  }

  /// It returns the camera
  /**
   * @return The camera
   */
  getCamera () {
      return this.camaraSala;
  }

  /// It returns the camera controls
  /**
   * @return The camera controls
   */
  getCameraControls () {
    return this.trackballControls;
  }

  /// It updates the aspect ratio of the camera
  /**
   * @param anAspectRatio - The new aspect ratio for the camera
   */
  setCameraAspect (anAspectRatio) {
    this.camaraSala.aspect = anAspectRatio;
    this.camaraSala.updateProjectionMatrix();
    this.mapa.setCameraAspect(anAspectRatio);
  }

  getCameraMapa(){
    return this.camaraMapa;
  }

  Mapa(){
    if(this.mostrarMapa == true){
      this.mostrarMapa = false;
      this.mapa.ocultaMapa();
    }
    else{
      this.mostrarMapa = true; 
      this.mapa.muestraMapa();
      
    }
      
  }

}