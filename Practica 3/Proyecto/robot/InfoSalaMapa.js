class InfoSalaMapa extends THREE.Object3D{

    constructor(x,z,tipoSala,numEnem){
        super();
    
        this.Coordenada_X = x;
        this.Coordenada_Z = z;
        this.Sala = new Sala(tipoSala,numEnem,this);
        this.Visitada=false;
    
    }
}