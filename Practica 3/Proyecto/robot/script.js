/// Several functions, including the main
character = null;

objeto = null;
objetos_sala = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
objetoCargado = false;
enemigos = [null,null,null];
puertas = [null, null];
Potenciadores = [null,null,null,null,null];

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
    this.axis = false;
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

function seleccionarModoAleatorio() {
  scene.modoJuego = 1;
  ocultarMenuInicial();
}

function seleccionarModoPredeterminado(){
  scene.modoJuego = 0;
  ocultarMenuInicial();
}

function ocultarMenuInicial(){
  var elem = document.getElementById("menu-principal");
  elem.style.display = "none";
}

function mostrarMenuInicial(){
  var elem = document.getElementById("menu-principal");
  elem.style.display = "block";
}
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
  renderer.setClearColor(new THREE.Color(0x00000000),1);
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

  renderViewport(scene, scene.getCamera(),0,0,1,1);

  renderViewport(scene, scene.getCameraMapa(),0.85,0.85,0.15,0.15);
  //renderer.render(scene, scene.getCamera());
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


function quitarVida() {
  
  var elem = document.querySelectorAll("#vida li");
  li = elem[elem.length-1];
  li.parentNode.removeChild(li);
  
}

function quitarTodaLaVida() {
  
  var elem = document.querySelectorAll("#vida li");

  for(var i = elem.length-1; i >= 0; i-=1){
    li = elem[i];
    li.parentNode.removeChild(li);
  }
  
}

function initVida(vidaTotal) {

  quitarTodaLaVida();
  var elem = document.getElementById("vida");
  
  for(var i = 0; i < vidaTotal; i+=1){
    darVida();
  }
  
}

function darVida(l) {
  var elem = document.getElementById("vida");

  var li = document.createElement("li");
  li.id = "heart";
  elem.appendChild(li);
}

function actualizaAtaque(atk) {

  var elem = document.querySelectorAll("#ataque p");
  var p =  elem[elem.length-1];
  p.parentNode.removeChild(p);

  elem = document.getElementById("ataque");

  p = document.createElement("p");
  var t = document.createTextNode("Ataque: "+atk);
  p.appendChild(t);
  elem.appendChild(p);
}

function actualizaCadencia(cad) {
  var elem = document.querySelectorAll("#cadencia p");
  var p =  elem[elem.length-1];
  p.parentNode.removeChild(p);

  elem = document.getElementById("cadencia");

  p = document.createElement("p");
  var t = document.createTextNode("Cadencia: "+cad);
  p.appendChild(t);
  elem.appendChild(p);
}

function actualizaRadioLagrima(rad){

  var elem = document.querySelectorAll("#radioLagrima p");
  var p =  elem[elem.length-1];
  p.parentNode.removeChild(p);

  elem = document.getElementById("radioLagrima");

  p = document.createElement("p");
  var t = document.createTextNode("Radio Proyectil: "+rad);
  p.appendChild(t);
  elem.appendChild(p);
}



function renderViewport(escena, camara, left, top, width, height){
  var l = left * window.innerWidth;
  var t = top * window.innerHeight;
  var w = width * window.innerWidth;
  var h = height * window.innerHeight;
  renderer.setViewport(l,t,w,h);
  renderer.setScissor(l,t,w,h);
  renderer.setScissorTest(true);
  camara.aspect = w/h;
  renderer.render(escena, camara);

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
