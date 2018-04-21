class Sala extends THREE.Object3D{

    constructor(n_sala){
        super();

        switch(n_sala){
            case 1: this.sala = objetos_sala[0].clone(); break;
            case 2: this.sala = objetos_sala[1].clone(); break;
            case 3: this.sala = objetos_sala[2].clone(); break;
            case 4: this.sala = objetos_sala[3].clone(); break;
            case 5: this.sala = objetos_sala[4].clone(); break;
            case 6: this.sala = objetos_sala[5].clone(); break;
            case 7: this.sala = objetos_sala[6].clone(); break;
            case 8: this.sala = objetos_sala[7].clone(); break;
            case 9: this.sala = objetos_sala[8].clone(); break;
            case 10: this.sala = objetos_sala[9].clone(); break;
            case 11: this.sala = objetos_sala[10].clone(); break;
            case 12: this.sala = objetos_sala[11].clone(); break;
            case 13: this.sala = objetos_sala[12].clone(); break;
            case 14: this.sala = objetos_sala[13].clone(); break;
            case 15: this.sala = objetos_sala[14].clone(); break;
        }

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