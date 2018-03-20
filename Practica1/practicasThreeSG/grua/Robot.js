
class Robot extends THREE.Object3D {


  constructor (parameters) {
    super();

this.material    = (parameters.material === undefined ? new THREE.MeshPhongMaterial ({color: 0x00604f, specular: 0xfbf804, shininess: 70}) : parameters.material);
    this.balanceo = 0;
    this.cabeceo = 0;
    this.altura = 5;


    this.brazo_1 = null;
    this.base = null;
    this.brazo_derecho= null;
    this.brazo_izquierdo = null;
    this.cuerpo = null;
    this.hombroDer = null;
    this.hombroIzq = null;

  //  this.brazo_1 = this.createBrazo_1();
    this.brazo_der_completo = null;
    this.brazo_izq_completo = null;
    this.createBrazoDerComp();
    this.createBrazoIzqComp();
    //this.brazo_2 = this.createBrazo_2();
    this.cabeza= null;
    this.cuerpo = this.createCuerpo();
    
    //this.base = this.createBase();
   // this.add(this.brazo_1);
    //this.add(this.brazo_2);
    this.add(this.cuerpo);
    this.add(this.brazo_der_completo);
    this.add(this.brazo_izq_completo);
  }

  createBrazo_1(){
    var base = this.createBaseIzquierdo();
    base.applyMatrix (new THREE.Matrix4().makeTranslation(-2,0,0));
    return base;
  }

  createBrazo_2(){
    var base = this.createBaseDerecha();
    base.applyMatrix (new THREE.Matrix4().makeTranslation(2,0,0));
    
    return base;
  }

  createBrazoDerComp(){
    this.brazo_der_completo = new THREE.Object3D();
    this.brazo_der_completo.applyMatrix (new THREE.Matrix4().makeTranslation(2,0,0));
    var base = this.createBaseDerecha();
    this.brazo_derecho = this.createBrazo_derecho();
    this.hombroDer = this.createHombroDerecho();
    this.brazo_der_completo.add(base);
    this.brazo_der_completo.add(this.brazo_derecho);
    this.brazo_der_completo.add(this.hombroDer);

  }

  createBrazoIzqComp(){
    this.brazo_izq_completo = new THREE.Object3D();
    this.brazo_izq_completo.applyMatrix (new THREE.Matrix4().makeTranslation(-2,0,0));
    var base = this.createBaseDerecha();
    this.brazo_izquierdo = this.createBrazo_derecho();
    this.hombroIzq = this.createHombroDerecho();
    this.brazo_izq_completo.add(base);
    this.brazo_izq_completo.add(this.brazo_izquierdo);
    this.brazo_izq_completo.add(this.hombroIzq);
  }


  createBaseDerecha(){
    var base = new THREE.Mesh (
      new THREE.CylinderGeometry (0.5,1,1, 16, 8), this.material);
    base.geometry.applyMatrix (new THREE.Matrix4().makeTranslation(0,0.5,0));
    //base.add(this.createBrazo_derecho());
    //base.add(this.createHombroDerecho());
    //base.applyMatrix (new THREE.Matrix4().makeTranslation(2,0,0));
      return base;
  }

  createBaseIzquierdo(){
    var base = new THREE.Mesh (
      new THREE.CylinderGeometry (0.5,1,1, 16, 8), this.material);
    base.geometry.applyMatrix (new THREE.Matrix4().makeTranslation(0,0.5,0));
    base.add(this.createBrazo_izquierdo());
    //base.applyMatrix (new THREE.Matrix4().makeTranslation(2,0,0));
      return base;
  }

  createBrazo_derecho(){
    var cilindro = new THREE.CylinderGeometry (0.3, 0.3, 1, 16, 8);
    cilindro.applyMatrix (new THREE.Matrix4().makeTranslation (0, 0.5, 0));
    var brazo_derecho = new THREE.Mesh (cilindro, this.material);
      brazo_derecho.scale.set(1,this.altura,1);
      brazo_derecho.position.y = 1;
      brazo_derecho.castShadow = true;
     // this.brazo_derecho.add(this.createHombroDerecho());
    return brazo_derecho;
  }

  createBrazo_izquierdo(){
    this.brazo_izquierdo = new THREE.Mesh (
      new THREE.CylinderGeometry (0.3, 0.3, this.altura, 16, 8), this.material);
      this.brazo_izquierdo.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (0, 3.5, 0));
      this.brazo_izquierdo.castShadow = true;
      this.brazo_izquierdo.add(this.createHombroIzquierdo());
    return this.brazo_izquierdo;
  }

  createHombroDerecho(){
    var hombroDer = new THREE.Mesh (
      new THREE.BoxGeometry (1,1,1),this.material);
      hombroDer.applyMatrix (new THREE.Matrix4().makeTranslation (0, this.altura+1.5, 0));
      return hombroDer;
  }

  createHombroIzquierdo(){
    this.hombroIzq = new THREE.Mesh (
      new THREE.BoxGeometry (1,1,1),this.material);
      this.hombroIzq.applyMatrix (new THREE.Matrix4().makeTranslation (0, this.altura+1.5, 0));
      return this.hombroIzq;
  }

  createCuerpo(){
    var cuerpo = new THREE.Mesh (
      new THREE.CylinderGeometry (1.5, 1.5, 6, 300, 8), this.material);
      cuerpo.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0,-2, 0));
      cuerpo.geometry.applyMatrix(new THREE.Matrix4().makeRotationY(3,14159));
      cuerpo.add(this.createCabeza());
      cuerpo.position.y = 7;


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

      return ojo;
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
    //this.applyMatrix(new THREE.Matrix4().makeTranslation(0,1, 0));
    
  }
}
