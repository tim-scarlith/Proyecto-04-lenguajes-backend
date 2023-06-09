//import obligatorios
import express from 'express';
import morgan from 'morgan';
import { Server as SocketServer } from 'socket.io';
import http from 'http';
import cors from 'cors';
//imports de archivos
import { default as moduloleerEscribir } from './model/leerEscribir.js';
import { default as administradorPartidas } from './model/administradorPartidas.js';
import { default as jugador } from './model/jugador.js';
import { default as partida } from './model/partida.js';
import { Socket } from 'dgram';

const ManejadorArchivos = new moduloleerEscribir();
const AdministradorPartidas = new administradorPartidas();
const app = express();
const server = http.createServer(app);
const io  = new SocketServer(server,{
    cors:{
        origin:'*',//'http://localhost:3000'
    }
});

app.use(cors());
app.use(morgan("dev"));

//Conecciones del web socket
io.on('connection',(socket)=>{
    console.log(socket.id);
    console.log("Usuario Concectado con el servidor!!!");
    
    //Esta seccion se encarga de recibir la solicitud de creacion de salas
    socket.on('createParty',(mensaje)=>{
        if (AdministradorPartidas.existPartida(mensaje.nombre)) {
            socket.join(mensaje.nombre);
            //console.log("Sala Creada!!!");
            var Juagador = new jugador(mensaje.nombreJugador, socket.id);
            var npartida = new partida(mensaje.nombre);
            npartida.nuevoJuagador(Juagador);
            AdministradorPartidas.setPartida(npartida);
          }
    });

    socket.on('unionParty', (mensaje) => {
        console.log("Uniendose a la partida...");
        if (AdministradorPartidas.existPartida(mensaje.roomName)) {
          socket.join(mensaje.roomName);
          var Juagador = new jugador(mensaje.nombre, socket.id);
          var npartida = AdministradorPartidas.findPartida(mensaje.roomName);
    
          // Verificar si se encontró la partida antes de llamar a nuevoJuagador
          if (npartida) {
            npartida.nuevoJuagador(Juagador);
            console.log("Usuario " + socket.id + " se ha unido a la sala " + mensaje.roomName);
            io.sockets.emit('unionParty', true);
          } else {
            console.log("No se encontró la partida");
          }
        } else {
          console.log("No se logró unir");
        }
    });


    socket.on('partyInfo',(mensaje)=>{
        var npartida = AdministradorPartidas.findPartida(mensaje.roomName);
        // Verificar si se encontró la partida antes de llamar a nuevoJuagador
        if (npartida) {
          //npartida.getListaJugadores();
          console.log("Informaicon de la partida enviada...");
          socket.emit('partyInfo', npartida.getListaJugadores());
        }
    });
    // socket.on('unionParty', (mensaje) => {
    //     console.log("Uniendose a la partida...");//{roomName, name}
    //     if (AdministradorPartidas.existPartida(mensaje.roomName)) {
    //       socket.join(mensaje.roomName);
    //       var Juagador = new jugador(mensaje.nombre, socket.id);
    //       var npartida = new partida();
    //       npartida = AdministradorPartidas.findPartida(mensaje.roomName);
    //       npartida.nuevoJuagador(Juagador);//.nuevoJuagador(mensaje.nombre, socket.id);
    //       console.log("Usuario " +socket.id+ " se ha unido a la sala "+mensaje.roomName);
    //       io.emit('unionParty',true);
            
    //     }else{
    //         console.log("no se logro unir");
    //     }
    //   })
});

//Solicitudes http
app.options('/log/:name', cors());
app.get('/log/:name', cors(), (req, res) => {
  const nombre = req.params.name; 
  console.log(nombre);
  res.send({reespuesta:ManejadorArchivos.verificarNombre(nombre)});
});


//app.listen(4000);
server.listen(4000);
console.log("Server on port 4000");
















// const express = require('express');
// const morgan = require('morgan');
// const cors = require('cors');
// const app = express();
// const http = require('http').Server(app);
// const io = require('socket.io')(http);
// var Partida = require('./model/jugador');
// var Jugador = require('./model/partida');
// var Administrador = require('./model/administradorPartidas')
// var ManejadorArchivos = require('./model/leerEscribir');

//const nManejadorArchivos = new ManejadorArchivos();
