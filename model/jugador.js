class Jugador{
    constructor(nombre, idJugador){
        this.nombre = nombre;
        this.idJugador = idJugador;
        this.actualElemento = [];
        this.actual = null;
        this.puntos = 0;
    }
}
//export default Jugador;
module.exports = Jugador;