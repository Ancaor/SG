/// Several functions, including the main
character = null;

objeto = null;
objetos_sala = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
objetoCargado = false;
enemigos = [null,null,null];

// map de teclas para el control fluido
codeset = { 37: false, 38: false, 39: false, 40: false, 86: false, 77:false, 65: false, 68: false, 87: false, 83: false};


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

    // Funcion que muestra un Mensaje

    this.showMessage = function(){
      setMessage ("Mensaje nuevo");
      applicationMode = TheScene.NO_ACTION;
    }

  }

  var gui = new dat.GUI();
  var axisLights = gui.addFolder ('Axis and Lights');
    axisLights.add(GUIcontrols, 'axis').name('Axis on/off :');
    axisLights.add(GUIcontrols, 'lightIntensity', 0, 1.0).name('Light intensity :');
    axisLights.add(GUIcontrols, 'secondLightIsOn').name('Second light on/off :');
    axisLights.add(GUIcontrols, 'secondLightIntensity', 0, 1.0).name('Second Light intensity :');

  var actions = gui.addFolder ('Actions');
    var showingMessage = actions.add (GUIcontrols,'showMessage').name(': Show message :');
    


  var robotControls = gui.addFolder ('Robot Controls');
    
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

// Quita vida

function restartCodeset(){
  codeset[37] = false
  codeset[38] = false
  codeset[39] = false
  codeset[40] = false
  codeset[32] = false
  codeset[86] = false
  codeset[77] = false
  codeset[65] = false
  codeset[68] = false
  codeset[87] = false
  codeset[83] = false
}

/// It processes the clic-down of the mouse
/**
 * @param event - Mouse information
 */
function onMouseDown (event) {
  if (event.ctrlKey) {
    // The Trackballcontrol only works if Ctrl key is pressed
    scene.getCameraControls().enabled = true;
  } else scene.getCameraControls().enabled = false;
}

/// It processes the drag of the mouse
/**
 * @param event - Mouse information
 */
function onMouseMove (event) {
 
}

/// It processes the clic-up of the mouse
/**
 * @param event - Mouse information
 */
function onMouseUp (event) {
  if (mouseDown) {
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
  renderer.setClearColor(new THREE.Color(0x000000), 1.0);
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
      scene.disparar(1);
    }
    if(codeset[38] == true){
      scene.disparar(0);
    }
    if(codeset[39] == true){
      scene.disparar(3);
    }
    if(codeset[40] == true){
      scene.disparar(2);
    }
    if(codeset[65] == true){
      scene.moveRobot(65)
    }
    if(codeset[68] == true){
      scene.moveRobot(68)
    }
    if(codeset[87] == true){
      scene.moveRobot(87)
    }
    if(codeset[83] == true){
      scene.moveRobot(83)
    }

    if(codeset[77]==true){
      scene.Mapa();
      codeset[77]=false;
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
