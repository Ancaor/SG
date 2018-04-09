/// Several functions, including the main


// map de teclas para el control fluido
codeset = { 37: false, 38: false, 39: false, 40: false, 32: false, 86: false };


//variable que indica que el juego se ha iniciado
juegoiniciado = false;

/// The scene graph
scene = null;

/// The GUI information
GUIcontrols = null;

/// The object for the statistics
stats = null;

/// A boolean to know if the left button of the mouse is down
mouseDown = false;

/// The current mode of the application
applicationMode = TheScene.NO_ACTION;

/// It creates the GUI and, optionally, adds statistic information
/**
 * @param withStats - A boolean to show the statictics or not
 */
function createGUI (withStats) {
  GUIcontrols = new function() {
    this.axis = true;
    this.lightIntensity = 0.5;
    this.secondLightIntensity = 0.5;
    this.secondLightIsOn = false; // Controla si la segunda luz esta encendida o no
    this.rotation_head = 0;
    this.balanceo_cuerpo=0;
    this.altura = 5;
    this.distance = 10;
    this.height   = 7;
    life=100;
    puntos=0;
    this.startGame=false;

    // Funcion que muestra un Mensaje

    this.showMessage = function(){
      setMessage ("Mensaje nuevo");
      applicationMode = TheScene.NO_ACTION;
    }

    this.quitaVida = function(){
      quitarVida();
    }

    this.darVida = function(){
      darVida();
    }

    this.aumentarPuntuacion = function(){
      darPuntos();
    }

  }

  var gui = new dat.GUI();
  var axisLights = gui.addFolder ('Axis and Lights');
    axisLights.add(GUIcontrols, 'axis').name('Axis on/off :');
    axisLights.add(GUIcontrols, 'lightIntensity', 0, 1.0).name('Light intensity :');
    axisLights.add(GUIcontrols, 'secondLightIsOn').name('Second light on/off :');
    axisLights.add(GUIcontrols, 'secondLightIntensity', 0, 1.0).name('Second Light intensity :');
    axisLights.add(GUIcontrols, 'startGame').name('Start game:');

  var actions = gui.addFolder ('Actions');
    var showingMessage = actions.add (GUIcontrols,'showMessage').name(': Show message :');
    var quitLife = actions.add (GUIcontrols,'quitaVida').name(': Quita vida :');
    var giveLife = actions.add (GUIcontrols,'darVida').name(': Da vida :');
    var givePoints = actions.add (GUIcontrols,'aumentarPuntuacion').name(': Da puntos :');
    


  var robotControls = gui.addFolder ('Crane Controls');
    robotControls.add (GUIcontrols, 'rotation_head', -1.39626, 1.39626, 0.001).name('Rotation_head :').listen();
    robotControls.add (GUIcontrols, 'balanceo_cuerpo', -0.785398,  0.523599,  0.01).name('Balanceo :').listen();
    robotControls.add (GUIcontrols, 'height', 7, 8, 0.1).name('Height :').listen();
    
    // The method  listen()  allows the height attribute to be written, not only read


  if (withStats)
    stats = initStats();
}

/// It adds statistics information to a previously created Div
/**
 * @return The statistics object
 */
function initStats() {

  var stats = new Stats();

  stats.setMode(0); // 0: fps, 1: ms

  // Align top-left
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';

  $("#Stats-output").append( stats.domElement );

  return stats;
}

/// It shows a feed-back message for the user
/**
 * @param str - The message
 */
function setMessage (str) {
  document.getElementById ("Messages").innerHTML = "<h2>"+str+"</h2>";
}

// Da puntos

function darPuntos() {
  var elem = document.getElementById("puntuacion"); 
  var id = setInterval(frame, 10);
  var timeout = puntos+10;  
  function frame(){
  if(puntos < timeout){
      puntos++; 
      elem.innerHTML = puntos * 1 ;
  }
  else clearInterval(id);
}

}

//Reinicia la barra de vida

function restartVida() {
 // console.log("restarteando");
  var elem = document.getElementById("myBar"); 
//  var id = setInterval(frame, 1);
//  function frame(){
  //  if(life < 100){
      this.scene.vida = 100;
      elem.style.width = this.scene.vida + '%'; 
      elem.innerHTML = this.scene.vida * 1  + '%';
      
   // }else clearInterval(id);
//}
  
}

function restartPuntos(){
  var elem = document.getElementById("puntuacion");
  puntos = 0;
  elem.innerHTML =puntos * 1;
}


// Quita vida

function quitarVida() {
  
  var elem = document.getElementById("myBar"); 
  var id = setInterval(frame, 10);
  var timeout = this.scene.vida-10;  
  function frame(){
  if(this.scene.vida > timeout){
    //console.log("quiteando");
    if (this.scene.vida <= 0) {
      clearInterval(id);
    } else {
      this.scene.vida-=5; 
      elem.style.width = this.scene.vida + '%'; 
      elem.innerHTML = this.scene.vida * 1  + '%';
    }
  }
  else clearInterval(id);
}
  
}

function IniciarPartida(){
  scene.changeStateGame();
  var elem = document.getElementById("Menu");
  elem.style.display = "none";
  juegoiniciado=true;
}

function restartCodeset(){
  codeset[37] = false
  codeset[38] = false
  codeset[39] = false
  codeset[40] = false
  codeset[32] = false
  codeset[86] = false
}

function MostrarMenu(){
  restartCodeset();
  var elem = document.getElementById("Menu");
  elem.style.display = "block";
  juegoiniciado=false;
}


// Da vida
function darVida(){
  var elem = document.getElementById("myBar"); 
  var id = setInterval(frame, 10);
  var timeout = this.scene.vida+10;  
  function frame(){
  if(this.scene.vida < timeout){
    if (this.scene.vida >= 100) {
      clearInterval(id);
    } else {
      this.scene.vida+=5; 
      elem.style.width = this.scene.vida + '%'; 
      elem.innerHTML = this.scene.vida * 1  + '%';
    }
  }
  else clearInterval(id);
}
}

/// It processes the clic-down of the mouse
/**
 * @param event - Mouse information
 */
function onMouseDown (event) {
  if (event.ctrlKey) {
    // The Trackballcontrol only works if Ctrl key is pressed
    scene.getCameraControls().enabled = true;
  } else {
    scene.getCameraControls().enabled = false;
    if (event.button === 0) {   // Left button
      mouseDown = true;
      switch (applicationMode) {
        case TheScene.ADDING_BOXES :
          scene.addBox (event, TheScene.NEW_BOX);
          break;
        case TheScene.MOVING_BOXES :
          scene.moveBox (event, TheScene.SELECT_BOX);
          break;
        case TheScene.DELETING_BOXES:
          scene.deleteBox (event);
          break;
        default :
          applicationMode = TheScene.NO_ACTION;
          break;
      }
    } else {
      setMessage ("");
      applicationMode = TheScene.NO_ACTION;
    }
  }
}

/// It processes the drag of the mouse
/**
 * @param event - Mouse information
 */
function onMouseMove (event) {
  if (mouseDown) {
    switch (applicationMode) {
      case TheScene.ADDING_BOXES :
      case TheScene.MOVING_BOXES :
        scene.moveBox (event, TheScene.MOVE_BOX);
        break;
      case TheScene.DELETING_BOXES : break;    // necesario para que al soltar raton no se salga de la accion
      default :
        applicationMode = TheScene.NO_ACTION;
        break;
    }
  }
}

/// It processes the clic-up of the mouse
/**
 * @param event - Mouse information
 */
function onMouseUp (event) {
  if (mouseDown) {
    switch (applicationMode) {
      case TheScene.ADDING_BOXES :
        scene.addBox (event, TheScene.END_ACTION);
        break;
      case TheScene.MOVING_BOXES :
        scene.moveBox (event, TheScene.END_ACTION);
        break;
      case TheScene.DELETING_BOXES : break;    // necesario para que al soltar raton no se salga de la accion
      default :
        applicationMode = TheScene.NO_ACTION;
        break;
    }
    mouseDown = false;
  }
}

/// It processes the wheel rolling of the mouse
/**
 * @param event - Mouse information
 */
function onMouseWheel (event) {
  if (event.ctrlKey) {
    // The Trackballcontrol only works if Ctrl key is pressed
    scene.getCameraControls().enabled = true;
  } else {
    scene.getCameraControls().enabled = false;
    if (mouseDown) {
      switch (applicationMode) {
        case TheScene.MOVING_BOXES :
          scene.moveBox (event, TheScene.ROTATE_BOX);
          break;
        case TheScene.ADDING_BOXES :
          scene.moveBox (event, TheScene.ROTATE_BOX);
      }
    }
  }
}

/// It processes the window size changes
function onWindowResize () {
  scene.setCameraAspect (window.innerWidth / window.innerHeight);
  renderer.setSize (window.innerWidth, window.innerHeight);
}

/// It creates and configures the WebGL renderer
/**
 * @return The renderer
 */
function createRenderer () {
  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  return renderer;
}

/// It renders every frame
function render() {
  requestAnimationFrame(render);

  stats.update();
  scene.getCameraControls().update ();
  scene.animate(GUIcontrols);

  renderer.render(scene, scene.getCamera());
  keyboardInput();
}

function keyboardInput(){

  

    if(codeset[37] == true){
      //console.log("Izquierda");
      scene.moveRobot(37);
    }
    if(codeset[38] == true){
      //console.log("Arriba");
      scene.moveRobot(38);
    }
    if(codeset[39] == true){
      //console.log("Derecha");
      scene.moveRobot(39);
    }
    if(codeset[40] == true){
      //console.log("Abajo");
      scene.moveRobot(40);
    }
    if(juegoiniciado)
    if(codeset[32] == true){
     scene.changeStateGame();
     codeset[32] = false;
    }
    if(codeset[86] == true){
      console.log("cambio de cámara");
      scene.changeCamera();
      codeset[86] = false;
     }
}

/// The main function
$(function () {
  // create a render and set the size
  renderer = createRenderer();
  // add the output of the renderer to the html element
  $("#WebGL-output").append(renderer.domElement);
  // liseners
  window.addEventListener ("resize", onWindowResize);
  window.addEventListener ("mousemove", onMouseMove, true);
  window.addEventListener ("mousedown", onMouseDown, true);
  window.addEventListener ("mouseup", onMouseUp, true);
  window.addEventListener ("mousewheel", onMouseWheel, true);   // For Chrome an others
  window.addEventListener ("DOMMouseScroll", onMouseWheel, true); // For Firefox

  window.addEventListener('keydown', function(event) {
    //console.log(event.keyCode);
    if (event.keyCode in codeset) {
      codeset[event.keyCode] = true;
    }
  });
  window.addEventListener('keyup', function(event){
    if(event.keyCode in codeset){
      codeset[event.keyCode] = false;
    }
  });

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  scene = new TheScene (renderer.domElement);

  createGUI(true);

  render();
});
