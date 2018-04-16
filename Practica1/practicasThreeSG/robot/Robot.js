
class Robot extends THREE.Object3D {


  constructor (parameters) {
    super();

this.material    = (parameters.material === undefined ? new THREE.MeshPhongMaterial ({color: 0x00604f, specular: 0xfbf804, shininess: 70}) : parameters.material);
    this.balanceo = 0;
    this.cabeceo = 0;
    this.altura = 5;
    this.rotacionY = 0;
    this.traslacionX = 0;
    this.TraslacionZ = 0;

    this.anguloRotacion = 10;
    this.velocidadRobot = 0.3;


    this.base = null;
    this.brazo_derecho= null;
    this.brazo_izquierdo = null;
    this.cuerpo = null;
    this.hombroDer = null;
    this.hombroIzq = null;

    this.brazo_der_completo = null;
    this.brazo_izq_completo = null;
    this.createBrazoDerComp();
    this.createBrazoIzqComp();
    this.cabeza= null;
    this.cuerpo = this.createCuerpo();


    // esferas para colisiones

    this.colisionGruesaY = 4.5;
    this.colisionFina1Y = 6.9;
    this.colisionFina2Y = 4.3;
    this.colisionFina3Y = 1.5;

    //Descomentar para ver las esferas de colisiones
    /*
    this.colisionGruesa = null;
    this.generarColisionGuesa();
    this.add(this.colisionGruesa);
    this.colisionFina1 = null;
    this.colisionFina2 = null;
    this.colisionFina3 = null;
    this.generarColisionesFinas();
    this.add(this.colisionFina1);
    this.add(this.colisionFina2);
    this.add(this.colisionFina3);
    */

    ////////////////////////////

    this.add(this.cuerpo);
    this.add(this.brazo_der_completo);
    this.add(this.brazo_izq_completo);
  }


  createBrazoDerComp(){
    this.brazo_der_completo = new THREE.Object3D();
    this.brazo_der_completo.applyMatrix (new THREE.Matrix4().makeTranslation(2,0,0));
    var base = this.createBaseBrazo();
    this.brazo_derecho = this.createBrazo();
    this.hombroDer = this.createHombro();
    this.brazo_der_completo.add(base);
    this.brazo_der_completo.add(this.brazo_derecho);
    this.brazo_der_completo.add(this.hombroDer);

  }

  createBrazoIzqComp(){
    this.brazo_izq_completo = new THREE.Object3D();
    this.brazo_izq_completo.applyMatrix (new THREE.Matrix4().makeTranslation(-2,0,0));
    var base = this.createBaseBrazo();
    this.brazo_izquierdo = this.createBrazo();
    this.hombroIzq = this.createHombro();
    this.brazo_izq_completo.add(base);
    this.brazo_izq_completo.add(this.brazo_izquierdo);
    this.brazo_izq_completo.add(this.hombroIzq);
  }


  createBaseBrazo(){
    var base = new THREE.Mesh (
      new THREE.CylinderGeometry (0.5,1,1, 16, 8), this.material);
    base.geometry.applyMatrix (new THREE.Matrix4().makeTranslation(0,0.5,0));
      return base;
  }

  createBrazo(){
    var cilindro = new THREE.CylinderGeometry (0.3, 0.3, 1, 16, 8);    // geometria cilindro
    cilindro.applyMatrix (new THREE.Matrix4().makeTranslation (0, 0.5, 0));   // pongo la geometria ciindro sobre el eje (se hace 1 vez en toda la ejecucion)
    var brazo_derecho = new THREE.Mesh (cilindro, this.material);             // asigno la geometria cilindro a un Mesh
      brazo_derecho.scale.set(1,this.altura,1);               //escala el Mesh
      brazo_derecho.position.y = 1;                           //mueve el mesh
      brazo_derecho.castShadow = true;                      
    return brazo_derecho;
  }

  createHombro(){
    var hombroDer = new THREE.Mesh (
      new THREE.BoxGeometry (1,1,1),this.material);
      hombroDer.applyMatrix (new THREE.Matrix4().makeTranslation (0, this.altura+1.5, 0));
      return hombroDer;
  }


  createCuerpo(){
    var cuerpo = new THREE.Mesh (
      new THREE.CylinderGeometry (1.5, 1.5, 6, 300, 8), this.material);
      cuerpo.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0,-2, 0));
      cuerpo.geometry.applyMatrix(new THREE.Matrix4().makeRotationY(3,14159));
      cuerpo.add(this.createCabeza());
      cuerpo.position.y = 7;
      cuerpo.castShadow = true;

      return cuerpo;
  }

  createCabeza(){
    this.cabeza = new THREE.Mesh (
      new THREE.SphereGeometry( 1.5, 32, 32 ), this.material);
      this.cabeza.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0,1, 0));
      this.cabeza.updateMatrix();
      this.cabeza.add(this.createOjo());

      return this.cabeza;
  }

  createOjo(){
    var ojo = new THREE.Mesh (
      new THREE.CylinderGeometry (0.25, 0.25, 1, 300, 8), this.material);
      ojo.geometry.applyMatrix(new THREE.Matrix4().makeRotationX(1.5708));
      ojo.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0,1.7,1));

      this.secondLight = new THREE.SpotLight( 0xffffff );
      this.secondLight.decay = 2;
      this.secondLight.power = 1;
      this.secondLight.intensity = 0.7;

      this.secondLight.penumbra = 0.5;
      this.secondLight.angle = 0.5;
      this.secondLight.position.set( 0, 0, 1.5 );
      this.secondLight.castShadow = true;
      this.secondLight.shadow.mapSize.width=2048
      this.secondLight.shadow.mapSize.height=2048;

      ojo.add (this.secondLight);

      this.objetivo = new THREE.Object3D();
      this.objetivo.position.set (0,-0.866025404,3);
      this.secondLight.target = this.objetivo;
      this.secondLight.castShadow = true;
      this.secondLight.add(this.objetivo);

      this.camara = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
      this.camara.position.set(0,0,2);
      this.camara.rotation.y = Math.PI;
      ojo.add(this.camara);

      return ojo;
  }

  generarColisionGuesa(){
    var material = new THREE.MeshPhongMaterial ({color: 0x00604f,transparent: true, opacity: 0.5});
      material.transparent = false;
        var geometria = new THREE.SphereGeometry (5,32,32);    // geometria esfera
        geometria.applyMatrix(new THREE.Matrix4().makeTranslation(0,this.colisionGruesaY ,0));
    this.colisionGruesa = new THREE.Mesh(geometria,material);
    this.colisionGruesa.material.transparent = true;
  }

  generarColisionesFinas(){
    var material = new THREE.MeshPhongMaterial ({color: 0xf90000,transparent: true, opacity: 0.7});

        var geometria = new THREE.SphereGeometry (2.6,32,32);    // geometria esfera
        geometria.applyMatrix(new THREE.Matrix4().makeTranslation(0,this.colisionFina1Y,0));
    this.colisionFina1 = new THREE.Mesh(geometria,material);

    var geometria = new THREE.SphereGeometry (2.6,32,32);    // geometria esfera
        geometria.applyMatrix(new THREE.Matrix4().makeTranslation(0,this.colisionFina2Y,0));
    this.colisionFina2 = new THREE.Mesh(geometria,material);

    var geometria = new THREE.SphereGeometry (2.6,32,32);    // geometria esfera
        geometria.applyMatrix(new THREE.Matrix4().makeTranslation(0,this.colisionFina3Y,0));
    this.colisionFina3 = new THREE.Mesh(geometria,material);
  }

  getPos(){
    return this.position;
  }

  setHead(cabeceo){
    this.cabeceo = cabeceo;
    this.cabeza.rotation.y=this.cabeceo;
  }

  setCuerpo(balanceo){
    this.balanceo = balanceo;
    this.cuerpo.rotation.x = this.balanceo;
  }

  setAltura(height){
    this.altura=height;
    this.cuerpo.position.y = this.altura;
    this.hombroDer.position.y = this.altura-0.5;
    this.hombroIzq.position.y = this.altura-0.5;
    this.brazo_derecho.scale.y = height-2;
    this.brazo_izquierdo.scale.y=height-2;
    
  }

  moveForward(){
    var radianes = (this.rotacionY * 2 * Math.PI) / 360;
    this.traslacionZ = Math.cos(radianes) * this.velocidadRobot; ; 
    this.traslacionX = Math.sin(radianes) * this.velocidadRobot; ; 
    this.position.z += this.traslacionZ;
    this.position.x += this.traslacionX;

  }

  moveBackward(){
    var radianes = (this.rotacionY * 2 * Math.PI) / 360;
    this.traslacionZ = Math.cos(radianes + Math.PI) * this.velocidadRobot; 
    this.traslacionX = Math.sin(radianes + Math.PI) * this.velocidadRobot; 
    this.position.z += this.traslacionZ;
    this.position.x += this.traslacionX;
  }

  turnRight(){
    this.rotacionY -= this.anguloRotacion;
    var radianes = (this.rotacionY * 2 * Math.PI) / 360;
    this.rotation.y = radianes;
  }

  turnLeft(){
    this.rotacionY += this.anguloRotacion;
    var radianes = (this.rotacionY * 2 * Math.PI) / 360;
    this.rotation.y = radianes;    
  }

  restartPosicion(){
    this.rotacionY = 0;
    this.traslacionX = 0;
    this.TraslacionZ = 0; 

    this.rotation.y = 0;
    this.position.x = 0;
    this.position.z = 0;
  }
}
