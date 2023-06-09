var Partida = require('../model/partida');
var Jugador = require('../model/jugador');
var Administrador = require('../model/administradorPartidas')


const administrador = new Administrador();
module.exports = function (io) {

  io.on('connection', (socket) => {

    socket.on('hola', async (dato) => {
      console.log(`User join!!! ${dato}`);
    })
    //ROOM ES EL ID DE LA PARTIDA, NAME ES EL NOMBRE, la tematica es la cantidad de jugadores y el tipo el modo vs o
    socket.on('createParty', async ({room, name, cantidadvueltas, cantidadjugadores}) => {
      console.log("Creando partida... \n");
      if (administrador.existPartida(room)) {
        socket.join(room);
        console.log("Room Creada!!!");
        administrador.setPartida(new Partida(socket.id ,room, cantidadvueltas, cantidadjugadores, new Jugador(name, socket.id)));
      }
    })

    socket.on('unionParty', async ({room, name}) => {
      console.log("Uniendose a la partida...");
      if (!administrador.existPartida(room)) {
        socket.join(room);
        administrador.findPartida(room).nuevoJuagador(name, socket.id);

      }
    })

    socket.on('listaPartidas', async (name) => {
      socket.emit('partidas', administrador.listPartidas());
    })

    console.log(`ingresa una solicitud atravez del socket: ${socket.id}`);


  });

}