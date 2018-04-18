class Personaje extends THREE.Object3D{

    constructor(){
        super();

        this.fisica = character;

        this.add(this.fisica)
    }

    update(){
        this.fisica.update();
    }
}