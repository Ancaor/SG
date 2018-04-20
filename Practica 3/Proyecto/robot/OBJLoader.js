class OBJLoader extends THREE.Object3D{

    constructor(){
        super();
        
    }

    LoadOBJ(Path_Mat, Path_Obj){
        var mtlLoader = new THREE.MTLLoader();
				mtlLoader.load( Path_Mat, function( materials ) {

					materials.preload();

					var objLoader = new THREE.OBJLoader();
					objLoader.setMaterials( materials );
					objLoader.load( Path_Obj, function ( object ) {

                        object.traverse(function (child){
                            if(child instanceof THREE.Mesh){
                                child.castShadow = true;
                                child.receiveShadow = true;
                            }
                        })

                        
                        objeto = object;
                        objetoCargado = true;

					},function ( xhr ) {

                        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
                
                    },
                    // called when loading has errors
                    function ( error ) {
                
                        console.log( 'An error happened' );
                
                    } );

                });
                


    }

    restart(){
        objeto = null;
        objetoCargado = false;

    }


}