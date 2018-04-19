class OBJLoader extends THREE.Object3D{

    constructor(){
        super();
        
    }

    LoadGeometry(OBJFile){
        var loader = new THREE.OBJLoader();
    
        loader.load(
    
            OBJFile,
    
            function (object) {
                object.traverse(function (child){
      
                if (child instanceof THREE.Mesh) {
                    geometria = new THREE.Geometry().fromBufferGeometry( child.geometry );
                    geometriaCargada = true;
                    }
                });
            },function ( xhr ) {
                console.log( (xhr.loaded / xhr.total * 100) + '% Geometría cargada' );
            },function ( err ) {
                console.error( 'Error al cargar geometría' );
            }
    
        );
    }

    LoadSuelo(OBJFile){
        var loader = new THREE.OBJLoader();
    
        loader.load(
    
            OBJFile,
    
            function (object) {
                object.traverse(function (child){
      
                if (child instanceof THREE.Mesh) {
                    suelo = new THREE.Geometry().fromBufferGeometry( child.geometry );
                    }
                });
            },function ( xhr ) {
                console.log( (xhr.loaded / xhr.total * 100) + '% Geometría cargada' );
            },function ( err ) {
                console.error( 'Error al cargar geometría' );
            }
    
        );
    }

    LoadOBJ(){
        var loader = new THREE.OBJLoader();

        loader.load(

            'modelos/Amelio.obj',

            function (object) {
                character.cara = object;

                character.cara.traverse(function (child){
                    if (child instanceof THREE.Mesh) {

                        geometria_mono = new THREE.Geometry().fromBufferGeometry( child.geometry );

                    console.log("va haciendo algo");
                    }
                });

                character.cara.scale.set(1.5,1.5,1.5);
                //character.cara.position.y = character.posicion_base;
                character.add (character.cara);
                character.cargado = true;
            },null,null

        );
    }

    restart(){
        geometria = null;
        objeto = null;
        geometriaCargada = false;
        objetoCargado = false;

    }


}