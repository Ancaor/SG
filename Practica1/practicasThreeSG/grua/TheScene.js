
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
    this.pared = null;

    this.lanzador = null;
    this.robot = null;
    this.primeraPersona = false;

    this.estadoPartida = false;


    this.createLights ();
    this.createCamera (renderer);
    this.axis = new THREE.AxisHelper (25);
    this.add (this.axis);
    this.model = this.createModel ();
    this.add (this.model);
  }

  /// It creates the camera and adds it to the graph
  /**
   * @param renderer - The renderer associated with the camera
   */
  createCamera (renderer) {
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set (0, 120, -10);
    var look = new THREE.Vector3 (0,0,40);
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
    this.spotLight.position.set( 60, 60, 40 );
    this.spotLight.castShadow = true;
    // the shadow resolution
    this.spotLight.shadow.mapSize.width=2048
    this.spotLight.shadow.mapSize.height=2048;
    this.add (this.spotLight);

    // add secondLife

    this.secondLight = new THREE.SpotLight( 0xff0000 );
    this.secondLight.position.set( -10, 60, 20 );
    this.secondLight.castShadow = true;
    // the shadow resolution
    this.secondLight.shadow.mapSize.width=2048
    this.secondLight.shadow.mapSize.height=2048;
    this.add (this.secondLight);


  }

  /// It creates the geometric model: crane and ground
  /**
   * @return The model
   */
  createModel () {
    var model = new THREE.Object3D()
    var loader = new THREE.TextureLoader();
    var textura2 = loader.load("imgs/r2d2_torso.jpg");
    this.robot = new Robot({material:new THREE.MeshPhongMaterial ({map: textura2})});
    model.add (this.robot);
    
    var textura = loader.load ("imgs/ground.jpg");
    this.ground = new Ground (300, 300, new THREE.MeshPhongMaterial ({map: textura}), 4);
    model.add (this.ground);

    //lanzador oculto para meteoritos
    this.lanzador = new Lanzador();
    model.add(this.lanzador);


    this.material = new THREE.MeshPhongMaterial ({color: 0x00604f, specular: 0xfbf804, shininess: 70});
    this.pared = new THREE.Mesh (
      new THREE.BoxGeometry (0.2, 300, 300, 1, 1, 1),
      this.material);
    this.pared.applyMatrix (new THREE.Matrix4().makeTranslation (150,0,0));
    
    this.par = new THREE.Mesh (
      new THREE.BoxGeometry (0.2, 300, 300, 1, 1, 1),
      this.material);
    this.par.applyMatrix (new THREE.Matrix4().makeTranslation (-150,0,0));
      this.pared.castShadow=true;
      this.par.castShadow=true
    model.add(this.pared);
    model.add(this.par);

// pruebasz
    //this.meteorito = new Meteorito();
    //model.add(this.meteorito);
//pruebas

    return model;
  }

  // Public methods



  /// It sets the crane position according to the GUI
  /**
   * @controls - The GUI information
   */
  animate (controls) {
    this.axis.visible = controls.axis;
    this.spotLight.intensity = controls.lightIntensity;
    
    this.robot.setHead(controls.rotation_head);
    this.robot.setCuerpo(controls.balanceo_cuerpo);
    this.robot.setAltura(controls.height);

    if(controls.secondLightIsOn)
      this.secondLight.intensity = controls.secondLightIntensity;  // Controla la intensidad de la segunda luz
    else this.secondLight.intensity = 0;
    

    var aux = this.robot.getPos();
    var x = aux.x;
    var y = aux.y;
    var z = aux.z;

    var pepe = new THREE.Vector3(x,y,z);
   // console.log(pepe);

    if(this.estadoPartida){
      if(this.lanzador.getEstado() == 0 || this.lanzador.getEstado() == 1){
        this.lanzador.setEstado(1);
        this.lanzador.update(pepe,this.robot.colisionGruesaY,this.robot.colisionFina1Y,this.robot.colisionFina2Y,this.robot.colisionFina3Y);
        this.procesaColisiones();
      }else if(this.lanzador.getEstado() == 2){
        this.lanzador.setEstado(3);
        this.lanzador.update(pepe,this.robot.colisionGruesaY,this.robot.colisionFina1Y,this.robot.colisionFina2Y,this.robot.colisionFina3Y);
        this.procesaColisiones();
      }
    }else {
      if(this.lanzador.getEstado() == 1 || this.lanzador.getEstado() == 2 ){
        this.lanzador.setEstado(2);
      }
    }    
  }

  changeCamera(){
    if(this.primeraPersona == true)
      this.primeraPersona = false;
    else
      this.primeraPersona = true; 
  }

  procesaColisiones(){
    var colisiones = this.lanzador.getColisiones();

    if(colisiones.length > 0){
      var longitud  = colisiones.length;
      for(var i = 0; i < longitud; i++){
        switch(colisiones[i]){
          case 0: //console.log(this.robot.life)
                  if(this.robot.life <= 10){
                    //console.log("restar vida")
                    this.reiniciarPartida();
                    alert("Has perdido. Te has quedado sin vida"); 
                    
                  //  this.lanzador.restartColisiones();                 
                  }else{
                  //  console.log("quitamos vida");
                  quitarVida() ;
                  this.robot.life -= 10;
                  } break;
          case 1:  darVida();this.robot.life += 10; break;
          case 2:  darPuntos();break;
        }
      }
    }

    this.lanzador.restartColisiones();
  }

  changeStateGame(){
    if(this.estadoPartida)
      this.estadoPartida = false;
    else this.estadoPartida = true;
  }

  moveRobot(key){
    if(this.estadoPartida){
      switch(key){
        case 37:
            this.robot.turnLeft();
            break;
        case 39:
            this.robot.turnRight();
            break;
        case 38:
            this.robot.moveForward();
            break;
        case 40:
            this.robot.moveBackward();
            break;
      }
      if(this.robot.position.x > 150 || this.robot.position.z > 150 || this.robot.position.x < -150 || this.robot.position.z < -150 ){
        this.reiniciarPartida();
        alert("Has perdido. Te has salido de los límites del mapa");
      }
    }
    
  }
  //  this.meteorito.update();
  
  //}
   
  reiniciarPartida(){
    this.robot.restartPosicion();
    this.lanzador.restart();
    this.changeStateGame();
    this.robot.life = 100;
    restartVida();
    restartPuntos();
  }
    
    


  /// It returns the camera
  /**
   * @return The camera
   */
  getCamera () {
    if(this.primeraPersona)
      return this.robot.camara;
    else
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
  }

}

  // class variables

  // Application modes
  TheScene.NO_ACTION = 0;
  TheScene.ADDING_BOXES = 1;
  TheScene.MOVING_BOXES = 2;
  TheScene.DELETING_BOXES = 3;  // Modo de borrado de cajas

  // Actions
  TheScene.NEW_BOX = 0;
  TheScene.MOVE_BOX = 1;
  TheScene.SELECT_BOX = 2;
  TheScene.ROTATE_BOX = 3;
  TheScene.END_ACTION = 10;
