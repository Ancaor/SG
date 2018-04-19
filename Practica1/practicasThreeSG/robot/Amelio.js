class Amelio extends THREE.Object3D {
    constructor(parameters){
        super();

        var onProgress = function ( xhr ) {
            if ( xhr.lengthComputable ) {
              var percentComplete = xhr.loaded / xhr.total * 100;
              console.log( Math.round(percentComplete, 2) + '% downloaded' );
            }
          };
      
          var onError = function ( xhr ) { };
      
          this.mono = null;
          this.subirmono = true;
          this.pos_referencia = 5;
      
          // Carga de modelo .obj
       
          var mtlLoader = new THREE.MTLLoader();
          mtlLoader.setPath('modelos/');
          mtlLoader.load('mono.mtl', function(materials) {
          materials.preload();
          var objLoader = new THREE.OBJLoader();
          objLoader.setMaterials(materials);
          objLoader.setPath('modelos/');
          objLoader.load('mono.obj', function(object) {
          object.position.y = scene.pos_referencia;
          object.rotation.y = Math.PI
          //object.rotation.x = -0.2;
      
          object.scale.set(3,3,3);
          //object.position.z = 280;
          object.castShadow = true;
          //scene.add(object);
          var pepe = object;
          scene.add(pepe);
        
        }, onProgress, onError);
          
      });
      //console.log(scene.pepe);
     // this.mono = character.mono;
/*
      this.material = new THREE.MeshPhongMaterial ({color: 0x00604f, specular: 0xfbf804, shininess: 70});
      this.geo = new THREE.CylinderGeometry (0.5, 0.5, 1, 16, 8); 
      this.geo.applyMatrix (new THREE.Matrix4().makeTranslation (0, 0.5, 0));
      this.cuerpo = new THREE.Mesh(this.geo,this.material);
      this.cuerpo.scale.y = 4.5;
      this.cuerpo.position.y = 1;   
      //this.add(this.cuerpo);
      //character.mono.add(this.cuerpo);
  */
    }

    update(){
        if(this.subirmono){
            this.mono.position.y +=0.1;
            if(this.mono.position.y > (this.pos_referencia + 1))
            this.subirmono = false;
          }else{
            this.mono.position.y -=0.1;
            if(this.mono.position.y < (this.pos_referencia - 1))
            this.subirmono = true;
          }
    }

    moveForward(){
        this.mono.position.z -= 0.5;
    }
    
}
