class Sala extends THREE.Object3D{

    constructor(n_sala){
        super();

        this.sala = objeto;
        this.sala.scale.set(3,3,3);
        this.add(this.sala);

        this.limite = 21;
        this.tama_puerta = 2.5;
        this.long_pasillo = 3;


        this.camara = null;

        this.tipo_sala = n_sala;

        this.puertas = [false, false, false, false];

        
        if(this.tipo_sala == 3 || this.tipo_sala == 7 || this.tipo_sala == 6 || this.tipo_sala == 9 || this.tipo_sala == 13 || this.tipo_sala == 11 || this.tipo_sala == 12 || this.tipo_sala == 15)
            this.puertas[0] = true;

        if(this.tipo_sala == 4 || this.tipo_sala == 7 || this.tipo_sala == 8 || this.tipo_sala == 10 || this.tipo_sala == 13 || this.tipo_sala == 14 || this.tipo_sala == 12 || this.tipo_sala == 15)
            this.puertas[3] = true;

        if(this.tipo_sala ==1 || this.tipo_sala == 8 || this.tipo_sala == 5 || this.tipo_sala == 9 || this.tipo_sala == 13 || this.tipo_sala == 14 || this.tipo_sala == 11 || this.tipo_sala == 15)
            this.puertas[2] = true;

        if(this.tipo_sala == 2 || this.tipo_sala ==5 || this.tipo_sala == 6 || this.tipo_sala == 10 || this.tipo_sala == 14 || this.tipo_sala == 11 || this.tipo_sala == 12 || this.tipo_sala == 15)
            this.puertas[1] = true;
        
    }

    setCamara(una_camara){
        this.camara = una_camara;
    }

}