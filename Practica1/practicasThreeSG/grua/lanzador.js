class Lanzador extends THREE.Object3D{
    constructor () {
        super();



        
////////////////////////////////////////////////////////////// Lanzador visible

        this.material = new THREE.MeshPhongMaterial ({color: 0x00604f, specular: 0xfbf804, shininess: 70});

        var geometria = new THREE.BoxGeometry (1,1,1, 16, 8);    // geometria cilindro
        geometria.applyMatrix (new THREE.Matrix4().makeTranslation(0,0.5,0));

        this.visor = new THREE.Mesh (
            geometria, this.material);
        //this.visor.geometry.applyMatrix (new THREE.Matrix4().makeTranslation(0,1,10));
        this.visor.scale.set(60,30,0.1);
        this.visor.position.z = 50;
        
        this.meteoritos = new THREE.Object3D();

        this.tiempoAnterior = Date.now();

        this.meteorito = new Meteorito({z:50,y:5,x:0});
        this.add(this.meteoritos);
        //this.add(this.meteorito);

        this.meteo = null;


        this.x = 0.5; 

        this.add(this.visor);

/////////////////////////////////////////////////////////////////////

    }

    update(){
        var tiempoActual = Date.now();
       // console.log(tiempoActual);
      // console.log()
       // console.log(tiempoActual);
       ;

        if((tiempoActual - this.tiempoAnterior)/1000 >4){
            this.meteo = new Meteorito({z:50,y:5,x:this.x});
            this.meteoritos.add(this.meteo);
            //this.add(this.meteoritos);
            console.log("entra");
        //    console.log(tiempoActual);
        this.tiempoAnterior = tiempoActual;
        if((this.x % 2) == 0)
        this.x +=1;
        else this.x -=2;
        }

        for(var i = 0; i < this.meteoritos.children.length ; i++){
            this.meteoritos.children[i].update();
        }
        
        
        //this.meteorito.update();
    }

}