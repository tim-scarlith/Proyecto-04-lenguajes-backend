//var Jugador = require('../model/jugador');

class Tablero {
    constructor() {
      this.filas = 7;
      this.columnas = 9;
      this.letras = ['B', 'Y', 'G', 'V', 'R', 'O', 'W'];
      this.jugadores = [];
      this.restriccionesArriba = [0,1,2,3,4,5,6,7,8];
      this.restriccionesAbajo = [54,55,56,57,58,59,60,61,62];
      this.restriccionesIZQ = [0,9,18,27,36,45,54];
      this.restriccionesDER = [8,17,26,35,44,53,62];
      this.restriccionesDigSupIZQ =  [0,1,2,3,4,5,6,7,8,9,18,27,36,45,54];
      this.restriccionesDigSupDER = [0,1,2,3,4,5,6,7,8,17,26,35,44,53,62];
      this.restriccionesDigInfDER = [54,55,56,57,58,59,60,61,17,26,35,44,53,62];
      this.restriccionesDigInfIZQ = [0,9,18,27,36,45,54,55,56,57,58,59,60,61,62];
      this.matriz=[];
    }
    
    generarMatrizAleatoria() {
      const matriz = [];
  
      for (let i = 0; i < this.filas; i++) {
        const fila = [];
        for (let j = 0; j < this.columnas; j++) {
          const letraAleatoria = this.letras[Math.floor(Math.random() * this.letras.length)];
          //fila.push(letraAleatoria);
          //fila.push([letraAleatoria,'E']);
          fila.push([letraAleatoria,'E']);//E = empty o vacio
        }
        matriz.push(fila);
      }
      this.matriz = matriz;
      //return matriz;
    }

    buscarElemento(numero) {
        //const matriz = this.generarMatrizAleatoria();
        //console.log("Lo que manda torres es:",numero);
        let contador = 0;
    
        for (let i = 0; i < this.filas; i++) {
          for (let j = 0; j < this.columnas; j++) {
            if (contador == numero) {
                //console.log('numero a buscar', contador);
                return this.matriz[i][j];
            }
            contador++;
          }
        }
        //console.log('numero a buscar no encontrado', contador);
        return null;
      }


    //Este metodo se encarga de verificar si un campo esta compuesto de [color,E], de esta forma se colocará un id que corresponde a el jugador en turno y retornara un true, de lo contrario seenviara un mensaje de false  
    verificarJugadorBloquearCampo(numero,nombre){
        var nMatriz = this.buscarElemento(numero);
        if(nMatriz[1] === 'E'){
            this.buscarElemento(numero)[1] = nombre;
            var actualPlayer = this.findJugador(nombre);
            actualPlayer.actual = numero;
            actualPlayer.actualElemento =  this.buscarElemento(numero);
            
            //console.log("El movimiento gurdado del jugador es =>>>>",actualPlayer.actual);
            return true;
        }else{
            return false;
        }
        
    }

    //Funcion encargada de buscar un jugador por su nombre
    findJugador(nombre) {
        //console.log("PLAYERS!!!!");
        //console.log(this.jugadores);
        return this.jugadores.find(jugador => jugador.nombre === nombre);
    }


    //Funcion encargada de revisar si los campos se encuentran bloquedos 
    verificarBloqueos(numero){
        //var nMatriz = this.buscarElemento(numero);
        //console.log('El espacio de la matriz es ', nMatriz);
        //console.log('El espacio de la matriz es ', this.matriz);
        //console.log('El espacio de la matriz es ', this.buscarElemento(numero));
        if(this.buscarElemento(numero)[1] == 'E'){
            return true;
        }else{
            return false;
        }
        
    }
    //Funcion encargada de verifiacar si se puede y realizar el movimiento de un punto a oro
    realizarMovimiento(nuevaPosicion,nombre){
        //console.log("nombre del jugador activo es: ",nombre);
        
        if(this.verificarBloqueos(nuevaPosicion)){
            var actualPlayer = this.findJugador(nombre);
            //console.log("El movimiento que se quiere realizar",actualPlayer.actual);
            if(this.valorarMovimiento(nuevaPosicion, actualPlayer.actual, nombre)){
                //aqui debe ir la funcion de comporbar punto
                this.evaluarPunto(nombre,nuevaPosicion);
                return true;
            }
            return false;
        }else{
            //console.log("Se encuentra en una mala posicion ");
            return false;
        }
    } 

    //Funcion encargada de recivir los resultados provemientos de las variables y reasignar esos resultados a la posicion en la matris correspondiente
    asignacionEnLaMatriz(numero,nuevoElmento){
        let contador = 0;
    
        for (let i = 0; i < this.filas; i++) {
          for (let j = 0; j < this.columnas; j++) {
            if (contador == numero) {
                this.matriz[i][j] = nuevoElmento;
                this.matriz[i][j][1] = 'E';
            }
            contador++;
          }
        }
    }

    //Funcion encargada de valorar el movimiento que se desea realizar para todos los posibles esenarios y regresar si es posible o no 
    valorarMovimiento(nuevaPosicion, actual, nombre){

        var jugadorActual = this.findJugador(nombre);
        
        if(9+actual == nuevaPosicion & !this.restriccionesAbajo.includes(actual)){
            var var1 = this.buscarElemento(actual);
            var var2 = this.buscarElemento(actual+9);
            this.asignacionEnLaMatriz(actual,var2);
            this.asignacionEnLaMatriz(actual+9,var1);
            jugadorActual.actualElemento = [];
            jugadorActual.actual = null;
            return true;
        }else if(actual-9 == nuevaPosicion & !this.restriccionesArriba.includes(actual) ){
            var var1 = this.buscarElemento(actual);
            var var2 = this.buscarElemento(actual-9);
            this.asignacionEnLaMatriz(actual,var2);
            this.asignacionEnLaMatriz(actual-9,var1);
            jugadorActual.actualElemento = [];
            jugadorActual.actual = null;
            return true;
            
        }else if(actual-1 == nuevaPosicion & !this.restriccionesIZQ.includes(actual)){
            var var1 = this.buscarElemento(actual);
            var var2 = this.buscarElemento(actual-1);
            this.asignacionEnLaMatriz(actual,var2);
            this.asignacionEnLaMatriz(actual-1,var1);
            jugadorActual.actualElemento = [];
            jugadorActual.actual = null;
            return true;

        }else if(actual+1 == nuevaPosicion & !this.restriccionesDER.includes(actual)){
            var var1 = this.buscarElemento(actual);
            var var2 = this.buscarElemento(actual+1);
            this.asignacionEnLaMatriz(actual,var2);
            this.asignacionEnLaMatriz(actual+1,var1);
            jugadorActual.actualElemento = [];
            jugadorActual.actual = null;
            return true;

        }else if(actual-10 == nuevaPosicion & !this.restriccionesDigSupIZQ.includes(actual)){
            var var1 = this.buscarElemento(actual);
            var var2 = this.buscarElemento(actual-10);
            this.asignacionEnLaMatriz(actual,var2);
            this.asignacionEnLaMatriz(actual-10,var1);
            jugadorActual.actualElemento = [];
            jugadorActual.actual = null;
            return true;

        }else if(actual-8 == nuevaPosicion & !this.restriccionesDigSupDER.includes(actual)){
            var var1 = this.buscarElemento(actual);
            var var2 = this.buscarElemento(actual-8);
            this.asignacionEnLaMatriz(actual,var2);
            this.asignacionEnLaMatriz(actual-8,var1);
            jugadorActual.actualElemento = [];
            jugadorActual.actual = null;
            return true;

        }else if(actual+10 == nuevaPosicion & !this.restriccionesDigInfDER.includes(actual)){
            var var1 = this.buscarElemento(actual);
            var var2 = this.buscarElemento(actual+10);
            this.asignacionEnLaMatriz(actual,var2);
            this.asignacionEnLaMatriz(actual+10,var1);
            jugadorActual.actualElemento = [];
            jugadorActual.actual = null;
            return true;
        }else if(actual+8 == nuevaPosicion & !this.restriccionesDigInfIZQ.includes(actual)){
            var var1 = this.buscarElemento(actual);
            var var2 = this.buscarElemento(actual+8);
            this.asignacionEnLaMatriz(actual,var2);
            this.asignacionEnLaMatriz(actual+8,var1);
            jugadorActual.actualElemento = [];
            jugadorActual.actual = null;
            return true;
        }else{
            return false;
        }
    }

    //Funcione encargada de obtener el color de un elemento de la matriz
    obtenerColor(numero){
        let contador = 0;
        for (let i = 0; i < this.filas; i++) {
          for (let j = 0; j < this.columnas; j++) {
            if (contador == numero) {   
                return this.matriz[i][j][0];
            }
            contador++;
          }
        }
        return null;
    }
    //funcion encargada de setear colres aleatorios en los espacios de la lista.
    cambiarColor(numero){
        let contador = 0;
        for (let i = 0; i < this.filas; i++) {
          for (let j = 0; j < this.columnas; j++) {
            if (contador == numero) {   
                this.matriz[i][j][0] = this.letras[Math.floor(Math.random() * this.letras.length)];
            }
            contador++;
          }
        }
    }
    // fucion encargada de comprobar si un punto es valido, dada una lista temporal que debe ser 3>=listaRes
    evaluarPunto(nombre,actual){
        var jugadorActual = this.findJugador(nombre);
        var recorrerPunto = this.recorrerPunto(actual);
        if(recorrerPunto.length >= 3){
            //funcion de cambiar color
            for(let i=0; i<recorrerPunto.length; i++){
                var numero = recorrerPunto[numero];
                this.cambiarColor(numero);
            }
            //agregar punto al jugador en turno
            jugadorActual.puntos += recorrerPunto.length;
        }

    }

    //Funcion encargada de evaluar si el jugador en turno adquiro un punto 
    recorrerPunto(actual){
        //console.log("ENtrando a la funcion de evaluar punto y asignar puntos!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        var listaRes = [];
        var listaTotal = [];
        //if(this.obtenerColor(9+actual) == this.obtenerColor(actual) & !this.restriccionesAbajo.includes(actual)){
            listaTotal.push(this.recorrerPuntoAbajo(listaRes, actual));           
        //}if(this.obtenerColor(actual-9) == this.obtenerColor(actual) & !this.restriccionesArriba.includes(actual)){
            listaTotal.push(this.recorrerPuntoArriba(listaRes, actual));        
        //}if(this.obtenerColor(actual-1) == this.obtenerColor(actual) & !this.restriccionesIZQ.includes(actual)){
            listaTotal.push(this.recorrerPuntoIZQ(listaRes, actual));         
        //}if(this.obtenerColor(actual+1) == this.obtenerColor(actual) & !this.restriccionesDER.includes(actual)){
            listaTotal.push(this.recorrerPuntoDER(listaRes, actual));
        //}if(this.obtenerColor(actual-10) == this.obtenerColor(actual) & !this.restriccionesDigSupIZQ.includes(actual)){
            listaTotal.push(this.recorrerPuntoDigSupIZQ(listaRes, actual));    //obtenerColornull       
        //}if(this.obtenerColor(actual-8) == this.obtenerColor(actual) & !this.restriccionesDigSupDER.includes(actual)){
            listaTotal.push(this.recorrerPuntoDigSupDER(listaRes, actual));       
        //}if(this.obtenerColor(actual+10) == this.obtenerColor(actual) & !this.restriccionesDigInfDER.includes(actual)){
            listaTotal.push(this.recorrerPuntoDigInfDER(listaRes, actual));    
        //}if(this.obtenerColor(actual+8) == this.obtenerColor(actual) & !this.restriccionesDigInfIZQ.includes(actual)){
            listaTotal.push(this.recorrerPuntoDigInfIZQ(listaRes, actual));           
        //}
        return listaTotal;
    }




    //Funcion encargada de evaluar si el movimiento hacia arriba
    recorrerPuntoAbajo(listaRes, actual){
        //console.log("numero del actual", actual);
        //console.log("ACTUAL COLOR: ",this.obtenerColor(actual));
        //console.log("NEXT COLOR: ",this.obtenerColor(9+actual));
        if(this.obtenerColor(9+actual) == this.obtenerColor(actual) & !this.restriccionesAbajo.includes(actual)){
            listaRes.push(actual+9);
            this.recorrerPuntoAbajo(listaRes,9+actual);        
        }
        return listaRes;
    }
    //Funcion encargada de evaluar si el movimiento hacia abajo
    recorrerPuntoArriba(listaRes, actual){
        if(this.obtenerColor(actual-9) == this.obtenerColor(actual) & !this.restriccionesArriba.includes(actual)){
            listaRes.push(actual-9); 
            //listaRes+=[actual-9];
            this.recorrerPuntoArriba(listaRes,actual-9);               
        }
        return listaRes;
    } 
    //Funcion encargada de evaluar si el movimiento hacia izq
    recorrerPuntoIZQ(listaRes, actual){   
        if(this.obtenerColor(actual-1) == this.obtenerColor(actual) & !this.restriccionesIZQ.includes(actual)){
            listaRes.push(actual-1);
            this.recorrerPuntoIZQ(listaRes, actual-1);  
        }
        return listaRes;
    }
    //Funcion encargada de evaluar si el movimiento hacia der
    recorrerPuntoDER(listaRes, actual){  
        if(this.obtenerColor(actual+1) == this.obtenerColor(actual) & !this.restriccionesDER.includes(actual)){
            listaRes.push(actual+1);
            this.recorrerPuntoDER(listaRes, actual+1);
        }
        return listaRes;
    }
    //Funcion encargada de evaluar si el movimiento hacia  dig sup izq
    recorrerPuntoDigSupIZQ(listaRes, actual){  
        if(this.obtenerColor(actual-10) == this.obtenerColor(actual) & !this.restriccionesDigSupIZQ.includes(actual)){
            listaRes.push(actual-10);
            this.recorrerPuntoDigSupIZQ(listaRes,actual-10);      
        }
        return listaRes;
    }
    //Funcion encargada de evaluar si el movimiento hacia diag sup der
    recorrerPuntoDigSupDER(listaRes, actual){  
        if(this.obtenerColor(actual-8) == this.obtenerColor(actual) & !this.restriccionesDigSupDER.includes(actual)){
            listaRes.push(actual-8);
            this.recorrerPuntoDigSupDER(listaRes,actual-8);
        }
        return listaRes;
    }
    //Funcion encargada de evaluar si el movimiento hacia diag inf der
    recorrerPuntoDigInfDER(listaRes, actual){
        if(this.obtenerColor(actual+10) == this.obtenerColor(actual) & !this.restriccionesDigInfDER.includes(actual)){
            listaRes.push(actual+10);
            this.recorrerPuntoDigInfDER(listaRes, actual+10);              
        }
        return listaRes;
    }
    //Funcion encargada de evaluar si el movimiento hacia diag inf izq
    recorrerPuntoDigInfIZQ(listaRes, actual){
        if(this.obtenerColor(actual+8) == this.obtenerColor(actual) & !this.restriccionesDigInfIZQ.includes(actual)){
            listaRes.push(actual+8);
            this.recorrerPuntoDigInfIZQ(listaRes, actual+8);  
        }
        return listaRes;
    }
  }
  module.exports = Tablero;
//   // Ejemplo de uso
//   const tablero = new Tablero();
//   const matrizAleatoria = tablero.generarMatrizAleatoria();
//   console.log(matrizAleatoria);