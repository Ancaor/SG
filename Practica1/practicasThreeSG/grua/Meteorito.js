class Meteorito extends THREE.Object3D{
    constructor () {
        super();
        this.velocidad = 10; //unidades / s
        this.tiempoAnterior = Date.now();

        this.radioColisionGruesa = 5;
        this.posColisionGruesa = new THREE.Vector3(0,4.5,0);

        this.radioColisionFina = 2.6;
        this.posColisionFina = new Array(new THREE.Vector3(0,6.9,0),new THREE.Vector3(0,4.3,0),new THREE.Vector3(0,1.5,0));


        this.radio=3;



        
////////////////////////////////////////////////////////////// Lanzador visible

        this.material = new THREE.MeshPhongMaterial ({color: 0xf90000,transparent: false, opacity: 0.7});

        var geometria = new THREE.SphereGeometry (1,32,32);    // geometria esfera
        //geometria.applyMatrix (new THREE.Matrix4().makeTranslation(0,1,0));

        this.meteorito = new THREE.Mesh (
            geometria, this.material);
        //this.visor.geometry.applyMatrix (new THREE.Matrix4().makeTranslation(0,1,10));
        this.meteorito.scale.set(3,3,3);
        this.meteorito.position.z = 50; 
        this.meteorito.position.y = 7;

        this.add(this.meteorito);

/////////////////////////////////////////////////////////////////////

    }

    reset(){
        this.meteorito.position.z = 50;
    }

    update(){
        var tiempoActual = Date.now();
        this.meteorito.position.z -= this.velocidad * (tiempoActual-this.tiempoAnterior)/1000; // /1000 para ponerlo en ms.
        
        this.tiempoAnterior = tiempoActual;
        // detectar colisiones y hacer algo

        var diferencia_radios = this.radio + this.radioColisionGruesa;
        //console.log(this.meteorito.position);

        var distanciaReal = this.meteorito.position.distanceTo(this.posColisionGruesa);
       

        //if(this.meteorito.position.z < 20){
        //    console.log(distanciaReal);
       // }

        //console.log(this.meteorito.position);
        if(distanciaReal <= diferencia_radios){
           // console.log("grande");
            for(var i=0; i < this.posColisionFina.length; i++){
                var distanciaReal = this.meteorito.position.distanceTo(this.posColisionFina[i]);
                diferencia_radios = this.radio + this.radioColisionFina;
                if(distanciaReal <= diferencia_radios){
                    console.log(i);
                    this.reset();
                }
            }
           // console.log(this.posColisionFina.length)
        }
            
           // 
        

    }

}