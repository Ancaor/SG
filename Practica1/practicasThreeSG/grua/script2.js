/// Several functions, including the main

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
    this.secondLightIsOn = true; // Controla si la segunda luz esta encendida o no
    this.rotation_head = 0;
    this.balanceo_cuerpo=0;
    this.altura = 5;
    this.distance = 10;
    this.height   = 7;
    life=100;
    puntos=0;

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

// Quita vida

function quitarVida() {
  var elem = document.getElementById("myBar"); 
  var id = setInterval(frame, 10);
  var timeout = life-10;  
  function frame(){
  if(life > timeout){
    if (life <= 0) {
      clearInterval(id);
    } else {
      life--; 
      elem.style.width = life + '%'; 
      elem.innerHTML = life * 1  + '%';
    }
  }
  else clearInterval(id);
}
  
}

// Da vida
function darVida(){
  var elem = document.getElementById("myBar"); 
  var id = setInterval(frame, 10);
  var timeout = life+10;  
  function frame(){
  if(life < timeout){
    if (life >= 100) {
      clearInterval(id);
    } else {
      life++; 
      elem.style.width = life + '%'; 
      elem.innerHTML = life * 1  + '%';
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

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  scene = new TheScene (renderer.domElement);

  createGUI(true);

  render();
});
