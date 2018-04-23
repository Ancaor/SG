class InfoSalaMapa extends THREE.Object3D{

    constructor(x,z,sala){
        super();
    
        this.Coordenada_X = x;
        this.Coordenada_Z = z;
        this.Sala = sala;
        this.Visitada=false;
    
    }
}