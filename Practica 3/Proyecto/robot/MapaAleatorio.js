class MapaAleatorio extends THREE.Object3D{

    constructor(fil, col){
        super();

            this.n_filas = fil;
            this.n_columnas = col;
            
            var infoMapa = [this.n_filas, this.n_columnas];

            this.All = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
            this.Top = [3, 6, 7, 9, 11, 12, 13, 15];
            this.Down = [1, 5, 8, 9, 11, 13, 14, 15];
            this.Left = [4, 7, 8, 10, 12, 13, 14, 15];
            this.Right = [2, 5, 6, 10, 11, 12, 14, 15];
            this.UnaPuerta = [1, 2, 3, 4];
            this.DosPuertas = [5, 6, 7, 8, 9 ,10];     


            do{
                this.tipoSalas = this.creaMatrizVacia();

                this.salas_camino = this.creaMatrizVacia();

                this.RellenaTipoSalas();

            }while(this.HaySalaVacia());
                

            this.InfoSalas = new Array();

            for(var i = 0; i < this.n_filas; i+=1){
                for(var j = 0; j < this.n_columnas; j+=1){
                    this.InfoSalas.push( new InfoSalaMapa(i,j,infoMapa,this.tipoSalas[i][j]));
                }
            }


            this.mapa = new Array();

            for(var i = 0; i < this.n_filas; i+=1){
                var aux = new Array();
                for(var j = 0; j < this.n_columnas; j+=1){
                    aux.push(this.InfoSalas[i*this.n_columnas+j]);
                }
                this.mapa.push(aux);
            }

            this.salaActual = this.mapa[1][1];
            this.salaInicio = null;

            this.finMapa = false;
            this.salasVisitadas = 0;


            if(this.n_filas > this.n_columnas)
                this.camaraMapa = new THREE.OrthographicCamera( (this.n_filas*48+6) / - 2, (this.n_filas*48+6) / 2, (this.n_filas*48+6) / 2, (this.n_filas*48+6) / - 2, 1, 100000 );
            else
                this.camaraMapa = new THREE.OrthographicCamera( (this.n_columnas*48+6) / - 2, (this.n_columnas*48+6) / 2, (this.n_columnas*48+6) / 2, (this.n_columnas*48+6) / - 2, 1, 100000 );
            

            if(this.n_filas %2 == 0){
                if(this.n_columnas %2 == 0){
                    var look = new THREE.Vector3 (24,0,24);
                    this.camaraMapa.position.set(24,200,23);
                }else{
                    var look = new THREE.Vector3 (0,0,24);
                    this.camaraMapa.position.set(0,200,23);
                }
            }else{
                if(this.n_columnas %2 == 0){
                    var look = new THREE.Vector3 (24,0,0);
                    this.camaraMapa.position.set(24,200,-1);
                }else{
                    var look = new THREE.Vector3 (0,0,0);
                    this.camaraMapa.position.set(0,200,-1);
                }
            }
            
            this.camaraMapa.lookAt(look);
            this.camaraMapa.layers.enable(2);

    }

    creaMatrizVacia(){
        var res = new Array();

        for(var i = 0; i < this.n_filas; i += 1){
            var aux = new Array();
            for(var j = 0; j < this.n_columnas; j += 1){
                aux.push(0);
            }
            res.push(aux);
        }

        return res;
    }

    RellenaTipoSalas(){

        var tipoSalaColocadas = 0;
        var salasTotales = this.n_filas*this.n_columnas;
        var ubicacion = [Math.floor(this.n_filas/2), Math.floor(this.n_columnas/2)];

        var limites = this.getLimites(ubicacion);
        

        var puedeIr = this.getPosiblesCaminos(ubicacion);
        var obligaciones_sala = this.getCaminosObligados(ubicacion, puedeIr);
        var conjunto = this.calcularConjunto(puedeIr, obligaciones_sala, 5);

        var elegido = this.eligeSalaAleatoria(conjunto);
        this.tipoSalas[ubicacion[0]][ubicacion[1]] = elegido;
        var caminos = this.getPuertas(elegido);
        

        this.salas_camino[ubicacion[0]][ubicacion[1]] = this.getNumeroCaminos(elegido, ubicacion);
        var caminos_abiertos = this.getCaminosAbiertos();
/*
        this.MuestraTipoSalas();
        this.MuestraSalasCamino();
        
*/

        tipoSalaColocadas += 1;
        var colocados = [false, false, false, false];
        var ubicacion_top, ubicacion_left, ubicacion_down, ubicacion_right;
        var fin = false;


        while(tipoSalaColocadas < salasTotales && !fin){
            colocados = [false, false, false, false];

            ubicacion_top = [ubicacion[0]-1, ubicacion[1]];
            ubicacion_right = [ubicacion[0], ubicacion[1]+1];
            ubicacion_down = [ubicacion[0]+1, ubicacion[1]];
            ubicacion_left = [ubicacion[0], ubicacion[1]-1];

            if(caminos[0] && this.tipoSalas[ubicacion_top[0]][ubicacion_top[1]] == 0){

                
                puedeIr = this.getPosiblesCaminos(ubicacion_top);
                obligaciones_sala = this.getCaminosObligados(ubicacion_top, puedeIr);
                if(tipoSalaColocadas == salasTotales - 1)
                    caminos_abiertos = 5;
                else
                    caminos_abiertos = this.getCaminosAbiertos();
                conjunto = this.calcularConjunto(puedeIr, obligaciones_sala, caminos_abiertos);
                elegido = this.eligeSalaAleatoria(conjunto);
                this.tipoSalas[ubicacion_top[0]][ubicacion_top[1]] = elegido;
                this.actualizarNumeroCaminos();
                tipoSalaColocadas += 1;

                colocados[0] = true;

            }
            else if(caminos[1] && this.tipoSalas[ubicacion_right[0]][ubicacion_right[1]] == 0){

                puedeIr = this.getPosiblesCaminos(ubicacion_right);
                obligaciones_sala = this.getCaminosObligados(ubicacion_right, puedeIr);
                if(tipoSalaColocadas == salasTotales - 1)
                    caminos_abiertos = 5;
                else
                    caminos_abiertos = this.getCaminosAbiertos();
                conjunto = this.calcularConjunto(puedeIr, obligaciones_sala, caminos_abiertos);
                elegido = this.eligeSalaAleatoria(conjunto);
                this.tipoSalas[ubicacion_right[0]][ubicacion_right[1]] = elegido;
                this.actualizarNumeroCaminos();
                tipoSalaColocadas += 1;

                colocados[1] = true;

            }
            else if(caminos[2]&& this.tipoSalas[ubicacion_down[0]][ubicacion_down[1]] == 0){

                puedeIr = this.getPosiblesCaminos(ubicacion_down);
                obligaciones_sala = this.getCaminosObligados(ubicacion_down, puedeIr);
                if(tipoSalaColocadas == salasTotales - 1)
                    caminos_abiertos = 5;
                else
                    caminos_abiertos = this.getCaminosAbiertos();
                conjunto = this.calcularConjunto(puedeIr, obligaciones_sala, caminos_abiertos);
                elegido = this.eligeSalaAleatoria(conjunto);
                this.tipoSalas[ubicacion_down[0]][ubicacion_down[1]] = elegido;
                this.actualizarNumeroCaminos();
                tipoSalaColocadas += 1;

                colocados[2] = true;

            }

            else if(caminos[3] && this.tipoSalas[ubicacion_left[0]][ubicacion_left[1]] == 0){

                puedeIr = this.getPosiblesCaminos(ubicacion_left);
                obligaciones_sala = this.getCaminosObligados(ubicacion_left, puedeIr);
                if(tipoSalaColocadas == salasTotales - 1)
                    caminos_abiertos = 5;
                else
                    caminos_abiertos = this.getCaminosAbiertos();
                conjunto = this.calcularConjunto(puedeIr, obligaciones_sala, caminos_abiertos);
                elegido = this.eligeSalaAleatoria(conjunto);
                this.tipoSalas[ubicacion_left[0]][ubicacion_left[1]] = elegido;
                this.actualizarNumeroCaminos();
                tipoSalaColocadas += 1;

                colocados[3] = true;

            }
/*
            this.MuestraPuedeIr(puedeIr);
            this.MuestraObligaciones(obligaciones_sala);
            this.MuestraConjunto(conjunto);
*/
            if(colocados[0]){
                ubicacion = ubicacion_top;
                caminos = this.getPuertas(this.tipoSalas[ubicacion[0]][ubicacion[1]]);
            }
            else if(colocados[1]){
                ubicacion = ubicacion_right;
                caminos = this.getPuertas(this.tipoSalas[ubicacion[0]][ubicacion[1]]);
            }
            else if(colocados[2]){
                ubicacion = ubicacion_down;
                caminos = this.getPuertas(this.tipoSalas[ubicacion[0]][ubicacion[1]]);
            }
            else if(colocados[3]){
                ubicacion = ubicacion_left;
                caminos = this.getPuertas(this.tipoSalas[ubicacion[0]][ubicacion[1]]);
            }
            else{
                ubicacion = this.buscaUbicacionConCamino();
                if(ubicacion == null){
                    fin = true;
                }else{
                    caminos = this.getPuertas(this.tipoSalas[ubicacion[0]][ubicacion[1]]);
                }
            }
            
        }

        
    }

    getCaminosAbiertos(){
        var n = 0;
        for(var i = 0; i < this.n_filas; i += 1){
            for(var j = 0; j < this.n_columnas; j += 1){
                if(this.salas_camino[i][j] != 0)
                    n+=this.salas_camino[i][j];
            }
        }
        return n;
    }


    buscaUbicacionConCamino(){
        var ubicacion = null;
        for(var i = 0; i < this.n_filas; i += 1){
            for(var j = 0; j < this.n_columnas; j += 1){
                if(this.salas_camino[i][j] != 0)
                    ubicacion = [i,j];
            }
        }
        return ubicacion;
    }

    calcularConjunto(puedeIr, obligaciones_sala, caminos_abiertos){

        var debeIr = obligaciones_sala[0];
        var noDebeIr = obligaciones_sala[1];
    
        var conjunto = this.All;
        var c_aux_t = this.All;
        var c_aux_r = this.All;
        var c_aux_d = this.All;
        var c_aux_l = this.All;

        if(noDebeIr[0])
            puedeIr[0] = false;
        if(noDebeIr[1])
            puedeIr[1] = false;
        if(noDebeIr[2])
            puedeIr[2] = false;
        if(noDebeIr[3])
            puedeIr[3] = false;

        if(!puedeIr[0])
            conjunto = this.Diferencia(conjunto, this.Top);
        if(!puedeIr[1])
            conjunto = this.Diferencia(conjunto, this.Right);
        if(!puedeIr[2])
            conjunto = this.Diferencia(conjunto, this.Down);
        if(!puedeIr[3])
            conjunto = this.Diferencia(conjunto, this.Left);


        var caminos_obligado = 0;
        if(debeIr[0]){
            c_aux_t = this.Top;
            caminos_obligado+=1;
        }
        if(debeIr[1]){
            c_aux_r = this.Right;
            caminos_obligado+=1;
        }
        if(debeIr[2]){
            c_aux_d = this.Down;
            caminos_obligado+=1;
        }
        if(debeIr[3]){
            c_aux_l = this.Left;
            caminos_obligado+=1;
        }

        



        var conjunto_debe = _.intersection(c_aux_t, c_aux_r, c_aux_d, c_aux_l);

        conjunto = this.Interseccion(conjunto_debe, conjunto);

        if(caminos_abiertos == 1 && caminos_obligado == 1)
            conjunto = this.Diferencia(conjunto, this.UnaPuerta);


        return conjunto;          

    }

    salaTopBloqueada(ubicacion){
        var ubicacion_top = [ubicacion[0]-1, ubicacion[1]];

        var bloqueado_top = false;
        var bloqueado_left = false;
        var bloqueado_right = false;

        var left = [ubicacion_top[0], ubicacion_top[1]-1];
        var right = [ubicacion_top[0], ubicacion_top[1]+1];
        var top = [ubicacion_top[0]-1, ubicacion_top[1]];

        var limites = this.getLimites(ubicacion_top);

        if(limites[0])
            bloqueado_top = true;
        else if(this.tipoSalas[top[0]][top[1]] != 0)
            bloqueado_top = true;
        
        if(limites[1])
            bloqueado_right = true;
        else if(this.tipoSalas[right[0]][right[1]] != 0)
            bloqueado_right = true;

        if(limites[3])
            bloqueado_left = true;
        else if(this.tipoSalas[left[0]][left[1]] != 0)
            bloqueado_left = true;

        if(bloqueado_top && bloqueado_right && bloqueado_left)
            return true;
        else return false;
    }

    salaRightBloqueada(ubicacion){
        var ubicacion_right = [ubicacion[0], ubicacion[1]+1];

        var bloqueado_top = false;
        var bloqueado_down = false;
        var bloqueado_right = false;

        var down = [ubicacion_right[0]+1, ubicacion_right[1]];
        var right = [ubicacion_right[0], ubicacion_right[1]+1];
        var top = [ubicacion_right[0]-1, ubicacion_right[1]];

        var limites = this.getLimites(ubicacion_right);

        if(limites[0])
            bloqueado_top = true;
        else if(this.tipoSalas[top[0]][top[1]] != 0)
            bloqueado_top = true;
        
        if(limites[1])
            bloqueado_right = true;
        else if(this.tipoSalas[right[0]][right[1]] != 0)
            bloqueado_right = true;

        if(limites[2])
            bloqueado_down = true;
        else if(this.tipoSalas[down[0]][down[1]] != 0)
            bloqueado_down = true;

        if(bloqueado_top && bloqueado_right && bloqueado_down)
            return true;
        else return false;
    }

    salaDownBloqueada(ubicacion){
        var ubicacion_down = [ubicacion[0]+1, ubicacion[1]];

        var bloqueado_down = false;
        var bloqueado_left = false;
        var bloqueado_right = false;

        var left = [ubicacion_down[0], ubicacion_down[1]-1];
        var right = [ubicacion_down[0], ubicacion_down[1]+1];
        var down = [ubicacion_down[0]+1, ubicacion_down[1]];

        var limites = this.getLimites(ubicacion_down);

        if(limites[2])
            bloqueado_down = true;
        else if(this.tipoSalas[down[0]][down[1]] != 0)
            bloqueado_down = true;
        
        if(limites[1])
            bloqueado_right = true;
        else if(this.tipoSalas[right[0]][right[1]] != 0)
            bloqueado_right = true;

        if(limites[3])
            bloqueado_left = true;
        else if(this.tipoSalas[left[0]][left[1]] != 0)
            bloqueado_left = true;

        if(bloqueado_down && bloqueado_right && bloqueado_left)
            return true;
        else return false;
    }

    salaLeftBloqueada(ubicacion){
        var ubicacion_left = [ubicacion[0], ubicacion[1]-1];

        var bloqueado_top = false;
        var bloqueado_down = false;
        var bloqueado_left = false;

        var down = [ubicacion_left[0]+1, ubicacion_left[1]];
        var left = [ubicacion_left[0], ubicacion_left[1]-1];
        var top = [ubicacion_left[0]-1, ubicacion_left[1]];

        var limites = this.getLimites(ubicacion_left);

        if(limites[0])
            bloqueado_top = true;
        else if(this.tipoSalas[top[0]][top[1]] != 0)
            bloqueado_top = true;
        
        if(limites[3])
            bloqueado_left = true;
        else if(this.tipoSalas[left[0]][left[1]] != 0)
            bloqueado_left = true;

        if(limites[2])
            bloqueado_down = true;
        else if(this.tipoSalas[down[0]][down[1]] != 0)
            bloqueado_down = true;

        if(bloqueado_top && bloqueado_left && bloqueado_down)
            return true;
        else return false;
    }

    getCaminosObligados(ubicacion, puedeIr){
        var debeIr = [false, false, false, false];
        var noDebeIr =  [false, false, false, false];
        
        if(puedeIr[0]){                                             //ARRIBA
            if(this.tipoSalas[ubicacion[0]-1][ubicacion[1]] != 0){                    
                var tipo_aux = this.tipoSalas[ubicacion[0]-1][ubicacion[1]];
                var puertas_aux = this.getPuertas(tipo_aux);
                if(puertas_aux[2]){                                 // SI LA SALA DE ARRIBA TIENE PUERTA ABAJO
                    debeIr[0] = true;
                }else{
                    noDebeIr[0] = true;
                }
            }
            if(this.tipoSalas[ubicacion[0]-1][ubicacion[1]] == 0 && this.salaTopBloqueada(ubicacion)){
                debeIr[0] = true;
            }
        } else noDebeIr[0] = true;

        if(puedeIr[1]){                                             //DERECHA
            if(this.tipoSalas[ubicacion[0]][ubicacion[1]+1] != 0){                    
                var tipo_aux = this.tipoSalas[ubicacion[0]][ubicacion[1]+1];
                var puertas_aux = this.getPuertas(tipo_aux);
                if(puertas_aux[3]){                                 // SI LA SALA DE DERECHA TIENE PUERTA IZQUIERDA
                    debeIr[1] = true;
                }else{
                    noDebeIr[1] = true;
                }
            }
            if(this.tipoSalas[ubicacion[0]][ubicacion[1]+1] == 0 && this.salaRightBloqueada(ubicacion)){
                debeIr[1] = true;
            }
        }else noDebeIr[1] = true;

        if(puedeIr[2]){                                             //ABAJO
            if(this.tipoSalas[ubicacion[0]+1][ubicacion[1]] != 0){                    
                var tipo_aux = this.tipoSalas[ubicacion[0]+1][ubicacion[1]];
                var puertas_aux = this.getPuertas(tipo_aux);
                if(puertas_aux[0]){                                 // SI LA SALA DE ABAJO TIENE PUERTA ARRIBA
                    debeIr[2] = true;
                }else{
                    noDebeIr[2] = true;
                }
            }
            if(this.tipoSalas[ubicacion[0]+1][ubicacion[1]] == 0 && this.salaDownBloqueada(ubicacion)){
                debeIr[2] = true;
            }
        }else noDebeIr[2] = true;

        if(puedeIr[3]){                                             //IZQUIERDA
            if(this.tipoSalas[ubicacion[0]][ubicacion[1]-1] != 0){                    
                var tipo_aux = this.tipoSalas[ubicacion[0]][ubicacion[1]-1];
                var puertas_aux = this.getPuertas(tipo_aux);
                if(puertas_aux[1]){                                 // SI LA SALA DE IZQUIERDA TIENE PUERTA DERECHA 
                    debeIr[3] = true;
                }else{
                    noDebeIr[3] = true;
                }
            }
            if(this.tipoSalas[ubicacion[0]][ubicacion[1]-1] == 0 && this.salaLeftBloqueada(ubicacion)){
                debeIr[3] = true;
            }
        }else noDebeIr[3] = true;

        var aux = [debeIr, noDebeIr];

        return aux;
    }


    getPosiblesCaminos(ubicacion){
        var puedeIr = [true, true, true, true]
        var limites = this.getLimites(ubicacion);

        if(limites[0])
            puedeIr[0] = false;
        if(limites[1])
            puedeIr[1] = false;
        if(limites[2])
            puedeIr[2] = false;
        if(limites[3])
            puedeIr[3] = false;

        return puedeIr;
    }


    getLimites(ubicacion){
        var limites = [false, false, false, false];
        if(ubicacion[0] == 0)
            limites[0] = true;
        if(ubicacion[0] == this.n_filas-1)
            limites[2] = true;
        if(ubicacion[1] == 0)
            limites[3] = true;
        if(ubicacion[1] == this.n_columnas-1)
            limites[1] = true;


        return limites;
    }

    getPuertas(tipoSala){
        var top = false;
        var right = false;
        var down = false;
        var left = false;
        if(this.Top.indexOf(tipoSala)>-1){
            top = true;
        }
        if(this.Right.indexOf(tipoSala)>-1){
            right = true;
        }
        if(this.Down.indexOf(tipoSala)>-1){
            down = true;
        }
        if(this.Left.indexOf(tipoSala)>-1){
            left = true;
        }

        var caminos = [top, right, down, left];
        return caminos;
    }


    actualizarNumeroCaminos(){
        for(var i =0; i < this.n_filas; i+=1){
            for(var j =0; j < this.n_columnas; j+=1){
                this.salas_camino[i][j] = this.getNumeroCaminos(this.tipoSalas[i][j], [i,j]);
            }
        }
    }

    getNumeroCaminos(tipoSala, ubicacion){
        var n = 0;
        var limites = this.getLimites(ubicacion);
        if(this.Top.indexOf(tipoSala)>-1){
            if(!limites[0] && this.tipoSalas[ubicacion[0]-1][ubicacion[1]] == 0)
                n+=1;
        }
        if(this.Right.indexOf(tipoSala)>-1){
            if(!limites[1] && this.tipoSalas[ubicacion[0]][ubicacion[1]+1] == 0)
                n+=1;
        }
        if(this.Down.indexOf(tipoSala)>-1){
            if(!limites[2] && this.tipoSalas[ubicacion[0]+1][ubicacion[1]] == 0)
                n+=1;
        }
        if(this.Left.indexOf(tipoSala)>-1){
            if(!limites[3] && this.tipoSalas[ubicacion[0]][ubicacion[1]-1] == 0)
                n+=1;
        }

        return n;
    }

    eligeSalaAleatoria(conjunto){
        var max = conjunto.length;
        var indiceElegido = Math.floor(Math.random() * (max -0) + (0));
        return conjunto[indiceElegido];
    }

    Union(conjunto1, conjunto2){
        return _.union(conjunto1, conjunto2);
    }

    Diferencia(conjunto1, conjunto2){
        return _.difference(conjunto1, conjunto2);
    }

    Interseccion(conjunto1, conjunto2){
        return _.intersection(conjunto1, conjunto2);
    }

    MuestraConjunto(conjunto){
        var cad = "Conjunto = {";
        for(var i = 0; i < conjunto.length; i += 1){
            cad += conjunto[i].toString();
            if(i+1 != conjunto.length)
                cad += ", ";
        }
        cad += " }";
        console.log(cad);
    }

    MuestraPuedeIr(conjunto){
        var cad = "Puede ir = {";
        for(var i = 0; i < conjunto.length; i += 1){
            cad += conjunto[i].toString();
            if(i+1 != conjunto.length)
                cad += ", ";
        }
        cad += " }\n";
        console.log(cad);
    }

    MuestraObligaciones(conjunto){
        var debe = conjunto[0];
        var noDebe = conjunto[1];
        var cad = "Debe = {";
        for(var i = 0; i < debe.length; i += 1){
            cad += debe[i].toString();
            if(i+1 != debe.length)
                cad += ", ";
        }
        cad += " }\n";

        cad += "No debe = {";
        for(var i = 0; i < noDebe.length; i += 1){
            cad += noDebe[i].toString();
            if(i+1 != noDebe.length)
                cad += ", ";
        }
        cad += " }";
        console.log(cad);
    }

    MuestraTipoSalas(){
        var cad = "TipoSalas = {\n";
        for(var i = 0; i < this.n_filas; i += 1){
            cad += "[ ";
            for(var j = 0; j < this.n_columnas; j +=1){
                cad += this.tipoSalas[i][j].toString();
                if(j+1 != this.n_columnas)
                    cad += ", ";
            }
            cad+=" ]\n";
        }
        cad += " \n}";
        console.log(cad);
    }

    MuestraSalasCamino(){
        var cad = "Salas_Camino = {\n";
        for(var i = 0; i < this.n_filas; i += 1){
            cad += "[ ";
            for(var j = 0; j < this.n_columnas; j +=1){
                cad += this.salas_camino[i][j].toString();
                if(j+1 != this.n_columnas)
                    cad += ", ";
            }
            cad+=" ]\n";
        }
        cad += " \n}";
        console.log(cad);
    }

    HaySalaVacia(){
        for(var i = 0; i < this.n_filas; i+=1){
            for(var j = 0; j < this.n_columnas; j+=1){
                if(this.tipoSalas[i][j] == 0)
                return true;
            }
        }
        return false;

    }

    generarMapa(){
        for(var i = 0; i < this.n_filas; i+=1){
            for(var j = 0; j < this.n_columnas; j+=1){
                var aux = this.mapa[i][j].Sala;
                aux.position.x = this.mapa[i][j].Coordenada_X;
                aux.position.z = this.mapa[i][j].Coordenada_Z;
                aux.enableLayers(1);

               
                var camara = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
                camara.position.set (aux.position.x, 70, aux.position.z-20);
                camara.layers.enable(1);

                camara.lookAt(new THREE.Vector3 (aux.position.x,0,aux.position.z));
                aux.setCamara(camara);
                
                this.add(aux);
            }
        }
        this.eleccionSalaInicio();

    }

    eleccionSalaInicio(){
        var i = Math.floor(Math.random() * (this.n_filas -0) + (0));
        var j = Math.floor(Math.random() * (this.n_columnas -0) + (0));
        console.log("La sala de inicio es la sala ["+i+"]["+j+"]");
        this.salaInicio = this.mapa[i][j];
        
        for(var i = this.salaInicio.Sala.n_enemigos-1; i >= 0; i-=1)
            this.salaInicio.Sala.eliminarEnemigo(i);
        
        this.salaInicio.Sala.eliminarObjeto();
        
    }

    calculaSalaActual(x_mono, z_mono){

        var lim_x_inf;
        var lim_x_sup;
        var lim_z_inf;
        var lim_z_sup;

        for(var i = 0; i < this.n_filas; i+=1){
            for(var j = 0; j < this.n_columnas; j+=1){

                if(this.mapa[i][j] == this.salaActual){
                    lim_x_inf = this.mapa[i][j].Coordenada_X - this.mapa[i][j].Sala.limite - 2*this.mapa[i][j].Sala.long_pasillo;
                    lim_x_sup = this.mapa[i][j].Coordenada_X + this.mapa[i][j].Sala.limite + 2*this.mapa[i][j].Sala.long_pasillo;
                    lim_z_inf = this.mapa[i][j].Coordenada_Z - this.mapa[i][j].Sala.limite - 2*this.mapa[i][j].Sala.long_pasillo;
                    lim_z_sup = this.mapa[i][j].Coordenada_Z + this.mapa[i][j].Sala.limite + 2*this.mapa[i][j].Sala.long_pasillo;
                }
                else{
                    lim_x_inf = this.mapa[i][j].Coordenada_X - this.mapa[i][j].Sala.limite ;
                    lim_x_sup = this.mapa[i][j].Coordenada_X + this.mapa[i][j].Sala.limite ;
                    lim_z_inf = this.mapa[i][j].Coordenada_Z - this.mapa[i][j].Sala.limite ;
                    lim_z_sup = this.mapa[i][j].Coordenada_Z + this.mapa[i][j].Sala.limite ;
                }
               

                if(z_mono <= lim_z_sup && z_mono >= lim_z_inf){
                    if(x_mono <= lim_x_sup && x_mono >= lim_x_inf){
                        //var info_sala_actual = this.mapa[i][j];
                        if(this.mapa[i][j].Visitada==false)
                            this.salasVisitadas += 1;

                        if((this.salasVisitadas == (this.n_filas * this.n_columnas)) && !this.finMapa){
                            this.mapa[i][j].Sala.ultimaSala = true;
                            this.finMapa = true;

                        }

                        this.salaActual = this.mapa[i][j];
                        this.mapa[i][j].Visitada=true;
                    }
                }
            }
        }
        
    }

    getSalaActual(){
        return this.salaActual;
    }

    setCameraAspect (anAspectRatio) {
        for(var i = 0; i < this.n_filas; i+=1){
            for(var j = 0; j < this.n_columnas; j+=1){
                this.mapa[i][j].Sala.camara.aspect = anAspectRatio;
                this.mapa[i][j].Sala.camara.updateProjectionMatrix();
            }
        }
    }

    muestraMapa(){
        for(var i = 0; i < this.n_filas; i+=1){
            for(var j = 0; j < this.n_columnas; j+=1){
                if(this.mapa[i][j].Visitada)
                    this.mapa[i][j].Sala.visible=true;
            }
        }
    }

    ocultaMapa(){
        for(var i = 0; i < this.n_filas; i+=1){
            for(var j = 0; j < this.n_columnas; j+=1){
                    this.mapa[i][j].Sala.visible=false;
            }
        }
    }

}