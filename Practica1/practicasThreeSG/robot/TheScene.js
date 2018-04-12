
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
    this.lanzadores = new Array();
    this.robot = null;
    this.primeraPersona = false;

    this.vida = 100;
    this.puntos = 0;

    this.estadoPartida = false;
    this.nivelDificultad = 0;
    this.cambiosNivel = [false, false, false, false, false, false, false, false];


    this.createLights ();
    this.createCamera (renderer);
    this.axis = new THREE.AxisHelper (25);
    this.add (this.axis);
    this.model = this.createModel ();
    this.add (this.model);



    var onProgress = function ( xhr ) {
      if ( xhr.lengthComputable ) {
        var percentComplete = xhr.loaded / xhr.total * 100;
        console.log( Math.round(percentComplete, 2) + '% downloaded' );
      }
    };

    var onError = function ( xhr ) { };

    var mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath('modelos/');
mtlLoader.load('Millennium_Falcon.mtl', function(materials) {
  materials.preload();
  var objLoader = new THREE.OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.setPath('modelos/');
  objLoader.load('Millennium_Falcon.obj', function(object) {
    object.position.y = 8;
    object.rotation.y = Math.PI
    object.rotation.x = -0.2;

    object.scale.set(0.3,0.3,0.3);
    object.position.z = 280;
    object.castShadow = true;
    scene.add(object);
  }, onProgress, onError);
    
});
/*
var mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath('modelos/');
mtlLoader.load('tie-intercept.mtl', function(materials) {
  materials.preload();
  var objLoader = new THREE.OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.setPath('modelos/');
  objLoader.load('tie-intercept.obj', function(object) {
    object.position.y = 15;
    object.rotation.y = Math.PI

    object.scale.set(2,2,2);
    object.position.z = 150;
    object.position.x = -50;
    object.castShadow = true;
    scene.add(object);
  }, onProgress, onError);
    
});
*/
/*
var geometria = new THREE.BoxGeometry (10000,10000,10000 );
var cubematerial = 
[
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load("imgs/blood_ft.png"), side: THREE.DoubleSide}),
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load("imgs/blood_bk.png"), side: THREE.DoubleSide}),
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load("imgs/blood_up.png"), side: THREE.DoubleSide}),
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load("imgs/blood_dn.png"), side: THREE.DoubleSide}),
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load("imgs/blood_rt.png"), side: THREE.DoubleSide}),
  new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load("imgs/blood_lf.png"), side: THREE.DoubleSide})

];

//var cubeMat = new THREE.MeshFaceMaterial(cubematerial);
this.cube = new THREE.Mesh(geometria,cubematerial);
scene.add(this.cube);
*/

this.background = new THREE.CubeTextureLoader()
					.setPath( 'imgs/' )
					.load( [ 'blood_ft.png', 'blood_bk.png', 'blood_up.png', 'blood_dn.png', 'blood_rt.png', 'blood_lf.png' ] );

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
    this.spotLight.position.set( 0, 60, -80 );
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
    this.lanzador.setPosicion(0, 0, 150, 's');
    this.lanzadores.push(this.lanzador);
    
    
    for(var i = 0; i < this.lanzadores.length; i++)
      model.add(this.lanzadores[i]);


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
    //this.spotLight.intensity = controls.lightIntensity;
    
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


    switch(this.nivelDificultad){
      case 1:
        for(var i = 0; i < this.lanzadores.length; i++){
          this.lanzadores[i].setTiempoEntreLanzamientos(0.5); 
          this.lanzadores[i].setVelocidadMeteoritos(10);
        }
        break;

      case 2:
        if(!this.cambiosNivel[0]){
          this.spotLight.power=Math.PI;
          this.cambiosNivel[0] = true;
          for(var i = 0; i < this.lanzadores.length; i++){
            this.lanzadores[i].setTiempoEntreLanzamientos(0.4); 
            this.lanzadores[i].setVelocidadMeteoritos(20);
          }
        }        
        break;

      case 3:
      if(!this.cambiosNivel[1]){
        this.spotLight.power=0;
        this.cambiosNivel[1] = true;
      }
      break;

      case 4:
        if(!this.cambiosNivel[2]){
          this.lanzador = new Lanzador();
          this.lanzador.setPosicion(-150, 0, 0, 'e');
          this.lanzadores.push(this.lanzador);
          this.lanzador.setTiempoEntreLanzamientos(0.4); 
          this.lanzador.setVelocidadMeteoritos(20);
          this.model.add(this.lanzadores[this.lanzadores.length - 1]);
          this.spotLight.power=Math.PI;
          this.cambiosNivel[2] = true;
        }
        
        break;
      
      case 5:
        if(!this.cambiosNivel[3]){
          this.spotLight.power=Math.PI;
          for(var i = 0; i < this.lanzadores.length; i++){
            this.lanzadores[i].setTiempoEntreLanzamientos(0.3); 
            this.lanzadores[i].setVelocidadMeteoritos(30);
          }
          this.cambiosNivel[3] = true;
        }        
        break;

        case 6:
          if(!this.cambiosNivel[4]){
            this.spotLight.power=0;
            this.cambiosNivel[4] = true;
          }        
        break;

        case 7:
          if(!this.cambiosNivel[5]){
            this.lanzador = new Lanzador();
            this.lanzador.setPosicion(150, 0, 0, 'o');
            this.lanzadores.push(this.lanzador);
            this.lanzador.setTiempoEntreLanzamientos(0.3); 
            this.lanzador.setVelocidadMeteoritos(30);
            this.model.add(this.lanzadores[this.lanzadores.length - 1]);
            this.spotLight.power=Math.PI;
            this.cambiosNivel[5] = true;
          }        
        break;

        case 8:
        if(!this.cambiosNivel[6]){
          this.spotLight.power=Math.PI;
          for(var i = 0; i < this.lanzadores.length; i++){
            this.lanzadores[i].setTiempoEntreLanzamientos(0.2); 
            this.lanzadores[i].setVelocidadMeteoritos(40);
          }
          this.cambiosNivel[6] = true;
        }        
        break;

        case 9:
          if(!this.cambiosNivel[7]){
            this.spotLight.power=0;
            this.cambiosNivel[7] = true;
          }        
        break;

    }

    for(var i = 0; i < this.lanzadores.length; i++){
      if(this.estadoPartida){
        if(this.lanzadores[i].getEstado() == 0 || this.lanzadores[i].getEstado() == 1){
          this.lanzadores[i].setEstado(1);
          this.lanzadores[i].update(pepe,this.robot.colisionGruesaY,this.robot.colisionFina1Y,this.robot.colisionFina2Y,this.robot.colisionFina3Y);
          this.procesaColisiones(i);
        }else if(this.lanzadores[i].getEstado() == 2){
          this.lanzadores[i].setEstado(3);
          this.lanzadores[i].update(pepe,this.robot.colisionGruesaY,this.robot.colisionFina1Y,this.robot.colisionFina2Y,this.robot.colisionFina3Y);
          this.procesaColisiones(i);
        }
      }else {
        if(this.lanzadores[i].getEstado() == 1 || this.lanzadores[i].getEstado() == 2 ){
          this.lanzadores[i].setEstado(2);
        }
      }
    }    
  }

  changeCamera(){
    if(this.primeraPersona == true)
      this.primeraPersona = false;
    else
      this.primeraPersona = true; 
  }

  procesaColisiones(indice){
      var colisiones = this.lanzadores[indice].getColisiones();
      if(colisiones.length > 0){
        var longitud  = colisiones.length;
        for(var i = 0; i < longitud; i++){
          switch(colisiones[i]){
            case 0: //console.log(this.robot.life)
                    if(this.vida <= 10){
                      //console.log("restar vida")
                      this.reiniciarPartida();
                      alert("Has perdido. Te has quedado sin vida"); 
                      
                    //  this.lanzador.restartColisiones();                 
                    }else{
                    //  console.log("quitamos vida");
                    quitarVida() ;
                    //this.robot.life -= 10;
                    } break;
            case 1:  darVida();break;//this.robot.life += 10; break;
            case 2:  this.puntos += 10; 
                    darPuntos();
                    if(this.puntos < 10){
                      this.nivelDificultad = 1;
                    }else if(this.puntos < 20){
                        this.nivelDificultad = 2;
                    }
                    else if(this.puntos < 30){
                      this.nivelDificultad = 3;
                    }
                    else if(this.puntos < 40){
                      this.nivelDificultad = 4;
                    }
                    else if(this.puntos < 50){
                      this.nivelDificultad = 5;
                    }
                    else if(this.puntos < 60){
                      this.nivelDificultad = 6;
                    }
                    else if(this.puntos < 70){
                      this.nivelDificultad = 7;
                    }
                    else if(this.puntos < 80){
                      this.nivelDificultad = 8;
                    }
                    else if(this.puntos >= 80){
                      this.nivelDificultad = 9;
                    }


                    actualizarNivel();

                    break;
          }
        }
        this.lanzadores[indice].restartColisiones();
      }
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
    for(var i = 0; i < this.lanzadores.length; i++)
      this.lanzadores[i].restart();
    this.changeStateGame();
    restartVida();
    restartPuntos();
    MostrarMenu();
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
