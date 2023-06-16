//var Jugador = require('../model/jugador');

class Tablero {
    constructor() {
      this.filas = 9;
      this.columnas = 7;
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
                console.log('numero a buscar', contador);
                return this.matriz[i][j];
            }
            contador++;
          }
        }
        console.log('numero a buscar no encontrado', contador);
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
            //this.findJugador(nombre) = actualPlayer;
            return true;
        }else{
            return false;
        }
        
    }

    //Funcion encargada de buscar un jugador por su nombre
    findJugador(nombre) {
        return this.jugadores.find(jugador => jugador.nombre === nombre);
    }


    //Funcion encargada de revisar si los campos se encuentran bloquedos 
    verificarBloqueos(numero){
        //var nMatriz = this.buscarElemento(numero);
        //console.log('El espacio de la matriz es ', nMatriz);
        //console.log('El espacio de la matriz es ', this.matriz);
        console.log('El espacio de la matriz es ', this.buscarElemento(numero));
        if(this.buscarElemento(numero)[1] == 'E'){
            return true;
        }else{
            return false;
        }
        
    }
    //Funcion encargada de verifiacar si se puede y realizar el movimiento de un punto a oro
    realizarMovimiento(nuevaPosicion,nombre){
        console.log("El movimiento que se quiere realizar",nuevaPosicion);
        if(this.verificarBloqueos(nuevaPosicion)){
            var actualPlayer = this.findJugador(nombre);
            if(this.valorarMovimiento(nuevaPosicion, actualPlayer.actual,nombre)){
                return true;
            }return false;
        }else{
            console.log("Se encuentra en una mala posicion ");
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
        console.log('Movimiento viejo ', actual);
        console.log('Movimiento nuevo ', nuevaPosicion);
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

    //Funcion encargada de evaluar si el jugador en turno adquiro un punto 
    recorrerPunto(listaRes, actual){
        if(this.obtenerColor(9+actual) == this.obtenerColor(actual) & !this.restriccionesAbajo.includes(actual)){
            listaRes.push(9+actual);
            this.recorrerPunto(9+actual);

            
        }if(this.obtenerColor(actual-9) == this.obtenerColor(actual) & !this.restriccionesArriba.includes(actual)){
            listaRes.push(actual-9);
            this.recorrerPunto(actual-9);
            
            
        }if(this.obtenerColor(actual-1) == this.obtenerColor(actual) & !this.restriccionesIZQ.includes(actual)){
            listaRes.push(actual-1);
            this.recorrerPunto(actual-1);
            

        }if(this.obtenerColor(actual+1) == this.obtenerColor(actual) & !this.restriccionesDER.includes(actual)){
            listaRes.push(actual+1);
            this.recorrerPunto(actual+1);
            

        }if(this.obtenerColor(actual-10) == this.obtenerColor(actual) & !this.restriccionesDigSupIZQ.includes(actual)){
            listaRes.push(actual-10);
            this.recorrerPunto(actual-10);
            
        }if(this.obtenerColor(actual-8) == this.obtenerColor(actual) & !this.restriccionesDigSupDER.includes(actual)){
            listaRes.push(actual-8);
            this.recorrerPunto(actual-8);
           

        }if(this.obtenerColor(actual+10) == this.obtenerColor(actual) & !this.restriccionesDigInfDER.includes(actual)){
            listaRes.push(actual+10);
            this.recorrerPunto(actual+10);
            
        }if(this.obtenerColor(actual+8) == this.obtenerColor(actual) & !this.restriccionesDigInfIZQ.includes(actual)){
            listaRes.push(actual+8);
            this.recorrerPunto(actual+8);
            
        }
        return true;
    }
  }
  module.exports = Tablero;
//   // Ejemplo de uso
//   const tablero = new Tablero();
//   const matrizAleatoria = tablero.generarMatrizAleatoria();
//   console.log(matrizAleatoria);