
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
    this.secondLight = null;  // luz aniadida
    this.camera = null;
    this.trackballControls = null;
    this.ground = null;

    this.mostrarMapa = false;




    this.personaje = character;

    this.lagrimas = new THREE.Object3D;

    this.add(this.lagrimas)

    this.tiempoAnterior = Date.now();
    this.tiempoActual = null;

    this.tiempoActualDisparo = null;
    this.tiempoAnteriorDisparo = Date.now();

    
    this.tiempoTranscurrido = 0;

    //this.lanzador = new Launcher();

    
    this.loader = new OBJLoader();
    this.loader.LoadOBJ('modelos/Personaje/Amelio.mtl','modelos/Personaje/Amelio.obj');
    this.personaje = null;
    this.salas = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
    this.salasCargadas = 0;
    this.salaActual = null;
    this.mapa = null;

    this.createLights ();
    this.createCamera (renderer);
    this.axis = new THREE.AxisHelper (25);
    this.add (this.axis);
    this.model = this.createModel ();
    this.add (this.model);
    //this.add(this.lanzador);

    //this.add(new Seta());




  }


  /// It creates the camera and adds it to the graph
  /**
   * @param renderer - The renderer associated with the camera
   */
  createCamera (renderer) {
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set (0, 70, -25);
    var look = new THREE.Vector3 (0,0,0);
    this.camera.lookAt(look);

    this.trackballControls = new THREE.TrackballControls (this.camera, renderer);
    this.trackballControls.rotateSpeed = 5;
    this.trackballControls.zoomSpeed = -2;
    this.trackballControls.panSpeed = 0.5;
    this.trackballControls.target = look;

    this.add(this.camera);
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
    
    var textura = loader.load ("imgs/ground.jpg");
    this.ground = new Ground (200, 200, new THREE.MeshPhongMaterial ({map: textura}), 4);
    //model.add (this.ground);

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
        this.loader.restart();
        this.add(this.personaje);
        this.loader.LoadOBJ('modelos/Enemigos/Mushroom.mtl','modelos/Enemigos/Mushroom.obj');
        
    }
    if(enemigos[0] == null && objetoCargado){
      enemigos[0] = objeto;
      this.loader.restart();
      this.loader.LoadOBJ('modelos/Salas/sala_1.mtl','modelos/Salas/sala_1.obj');
    }
    if(this.personaje != null && enemigos[0] != null &&this.salas[this.salasCargadas] == null && objetoCargado && this.salasCargadas < 14) {
        objetos_sala[this.salasCargadas] = objeto;
        this.loader.restart();
        this.salasCargadas++;
        var indice = this.salasCargadas+1;
        this.loader.LoadOBJ('modelos/Salas/sala_'+indice+'.mtl','modelos/Salas/sala_'+indice+'.obj')
    }
    if(this.salasCargadas == 14 && this.salas[this.salasCargadas] == null && objetoCargado){
        objetos_sala[this.salasCargadas] = objeto;
        this.loader.restart();
        this.salasCargadas++;
        this.mapa = new Mapa();
        this.mapa.generarMapa();
        this.add(this.mapa);
        this.salaActual = this.mapa.getSalaActual(0, 0);
        this.sala_anterior=this.salaActual;
    }
    if(this.salasCargadas == 15){   /// Basicamente esto es lo que se actualiza cada frame tras cargar todas las salas y el mapa
      this.salaActual = this.mapa.getSalaActual(this.personaje.position.x, this.personaje.position.z);
      this.salaActual.Sala.visible=true;
      
      if(this.salaActual != this.sala_anterior){
        this.sala_anterior.Sala.visible=false;
        
      }

      

      this.salaActual.Sala.update(this.personaje);

      //console.log(this.mostrarMapa)
     
      if(this.mostrarMapa){
        this.camera = this.mapa.camaraMapa;
      }else {this.camera = this.salaActual.Sala.camara;}
      

    //  this.camera = this.mapa.getSalaActual(this.personaje.position.x, this.personaje.position.z).Sala.camara;          /// Comentar si no se quiere que la cámara siga a la sala del mono
      this.sala_anterior = this.salaActual

      this.personaje.update();

      var longitud = this.lagrimas.children.length;

      for(var i=0;i < longitud; i++){
        var muerta = this.lagrimas.children[i].update(this.salaActual.Sala,this.salaActual.Coordenada_X,this.salaActual.Coordenada_Z,this.salaActual.Sala.enemigos);
        if(muerta == -1){
          this.lagrimas.remove(this.lagrimas.children[i]);
          longitud-=1;
        }else if(muerta != -2){
          this.lagrimas.remove(this.lagrimas.children[i]);
          longitud-=1;
          console.log("aaaaaaah colisionaste con " + muerta)

          var enemEliminado = this.salaActual.Sala.enemigos.children[muerta].bajarVida(this.personaje.damage);

          if(enemEliminado)
            this.salaActual.Sala.eliminarEnemigo(muerta);

        }
        
      }

    }
   
  }

  moveRobot(key){

    if(!this.mostrarMapa){
    var info_sala_actual = this.mapa.getSalaActual(this.personaje.position.x, this.personaje.position.z);
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
   // console.log(this.personaje.position)
   // console.log(this.personaje.ojoDer.position)
  this.tiempoActualDisparo = Date.now()
  this.personaje.ajustarOrientacion(orientacion);
  var tiempotransc = (this.tiempoActualDisparo - this.tiempoAnteriorDisparo) / 1000
   // console.log(tiempotransc)
   if( tiempotransc > this.personaje.cadencia){
    var a = new THREE.Vector3(this.personaje.position.x,this.personaje.position.y,this.personaje.position.z);
    
    a.add(this.personaje.ojoDer.position)
    

    //var a;
    var lagrima = new Lagrima({z:a.z,y:a.y,x:a.x,o:orientacion,v:this.personaje.velocidadLagrima,r:this.personaje.radioLagrima,c:this.personaje.colorLagrima,t:1,xReal:0,zReal:0});

    this.lagrimas.add(lagrima)
    //this.personaje.getWorldPosition(a);

   // console.log(a)
   // console.log(lagrima.position)
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
        
     //  this.lagrima.position.z += this.velocidad * this.tiempoTranscurrido;
        this.tiempoAnterior =this.tiempoActual;
    
  }

  /// It returns the camera
  /**
   * @return The camera
   */
  getCamera () {
      return this.camera;
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
    this.camera.aspect = anAspectRatio;
    this.camera.updateProjectionMatrix();
    this.mapa.setCameraAspect(anAspectRatio);
  }

  Mapa(){
    console.log("skjdkjss")
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
