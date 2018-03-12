
class Robot extends THREE.Object3D {


  constructor (parameters) {
    super();

this.material    = (parameters.material === undefined ? new THREE.MeshPhongMaterial ({color: 0x00604f, specular: 0xfbf804, shininess: 70}) : parameters.material);
    this.balanceo = 0;
    this.cabececo = 0;
    this.altura = 5;


    this.brazo_1 = null;
    this.base = null;
    this.brazo_derecho= null;
    this.brazo_izquierdo = null;
    this.cuerpo = null;

    this.brazo_1 = this.createBrazo_1();
    this.brazo_2 = this.createBrazo_2();
    this.cuerpo = this.createCuerpo();
    //this.base = this.createBase();
    this.add(this.brazo_1);
    this.add(this.brazo_2);
    this.add(this.cuerpo);
  }

  createBrazo_1(){
    var base = this.createBase();
    base.applyMatrix (new THREE.Matrix4().makeTranslation(-2,0,0));
    return base;
  }

  createBrazo_2(){
    var base = this.createBase();
    base.applyMatrix (new THREE.Matrix4().makeTranslation(2,0,0));
    
    return base;
  }


  createBase(){
    var base = new THREE.Mesh (
      new THREE.CylinderGeometry (0.5,1,1, 16, 8), this.material);
    base.geometry.applyMatrix (new THREE.Matrix4().makeTranslation(0,0.5,0));
    base.add(this.createBrazo_derecho());
    //base.applyMatrix (new THREE.Matrix4().makeTranslation(2,0,0));
      return base;
  }

  createBrazo_derecho(){
    var brazo = new THREE.Mesh (
      new THREE.CylinderGeometry (0.3, 0.3, this.altura, 16, 8), this.material);
    brazo.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (0, 3.5, 0));
    brazo.castShadow = true;
    brazo.autoUpdateMatrix = false;
    brazo.updateMatrix();
    brazo.add(this.createHombro());
    return brazo;
  }

  createHombro(){
    var hombro = new THREE.Mesh (
      new THREE.BoxGeometry (1,1,1),this.material);
      hombro.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (0, this.altura+1.5, 0));
      return hombro;
  }

  createCuerpo(){
    var cuerpo = new THREE.Mesh (
      new THREE.CylinderGeometry (1.5, 1.5, 6, 16, 8), this.material);

      cuerpo.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0,this.))

      return cuerpo;
  }


}
