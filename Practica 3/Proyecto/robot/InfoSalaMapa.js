class InfoSalaMapa extends THREE.Object3D{

    constructor(fila, columna, infoSala, tipoSala){
        super();
    
        var fila_centro = Math.floor(infoSala[0]/2);
        var columna_centro = Math.floor(infoSala[1]/2);
        
        var z = -(fila-fila_centro)*48;
        var x = -(columna-columna_centro)*48;


        console.log("Sala["+fila+"]["+columna+"] está en X = "+x+"   Z = "+z);
        this.Coordenada_X = x;
        this.Coordenada_Z = z;


        var max_enemigos = 4;

        var numeroEnemigos = Math.floor(Math.random() * (max_enemigos -0) + (0));

        var rand = Math.floor(Math.random() * (10 -0) + (0))

        if(rand <= 4)
           var tieneObjeto = false;
        else
           var tieneObjeto = true;


        this.Sala = new Sala(tipoSala,numeroEnemigos, tieneObjeto, this);
        this.Visitada=false;
    
    }

}