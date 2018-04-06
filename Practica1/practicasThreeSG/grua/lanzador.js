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
        this.tiempoActual = null;
        this.tiempoTranscurrido = 0;

        this.meteorito = new Meteorito({z:50,y:5,x:0});
        this.add(this.meteoritos);
        //this.add(this.meteorito);

        this.meteo = null;

        this.estado = 0; // 0 no empezado, 1 funcionando,2 pausado , 3 reanudada


        this.x = 0.5; 

        this.add(this.visor);

/////////////////////////////////////////////////////////////////////

    }

    reanudar(){
        this.tiempoActual = Date.now();
        this.tiempoAnterior = (this.tiempoActual - (this.tiempoTranscurrido*1000));
        console.log("actual");
        console.log(this.tiempoActual/1000);
        console.log("anterior");
        console.log(this.tiempoAnterior/1000);
    }

    getEstado(){
        return this.estado;
    }

    setEstado(estado){
        this.estado = estado;
    }

    update(){
        //this.reanudar();
        //console.log(this.tiempoActual);
        //console.log(this.tiempoAnterior);
        
        switch(this.estado){
            case 0:    ;break;
            case 1: this.tiempoActual = Date.now();
                for(var i = 0; i < this.meteoritos.children.length; i++){
                    this.meteoritos.children[i].setEstado(1);
                };
            break;
            case 2: ;break;
            case 3: this.reanudar(); this.estado = 1 ; 
                for(var i = 0; i < this.meteoritos.children.length; i++){
                    this.meteoritos.children[i].setEstado(3)
                }
                break;
        }

        
       // console.log(tiempoActual);
      // console.log()
       // console.log(tiempoActual);
       this.tiempoTranscurrido = (this.tiempoActual - this.tiempoAnterior)/1000;
       console.log("timpo transcurrido")
       console.log(this.tiempoTranscurrido);

        if( this.tiempoTranscurrido >0.5){   // tiempo entre bolas
            this.meteo = new Meteorito({z:50,y:5,x:this.x});
            this.meteoritos.add(this.meteo);
            //this.add(this.meteoritos);
            console.log("entra");
        //    console.log(tiempoActual);
        this.tiempoAnterior = this.tiempoActual;
        this.x = Math.floor(Math.random() * 61) - 30;
        }

        var longitud  = this.meteoritos.children.length;

        for(var i = 0; i < longitud ; i++){
            var a = this.meteoritos.children[i].update();

            if(a){
                console.log("true");
                this.meteoritos.remove(this.meteoritos.children[i]);
                longitud = this.meteoritos.children.length;
              // i+=2;
            }

        }
        
        
        //this.meteorito.update();
    }

}