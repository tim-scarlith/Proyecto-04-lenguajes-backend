const fs = require('fs');

class ManejadorArchivos {
  escribir(nombreArchivo, datos) {
    const contenido = JSON.stringify(datos);
    fs.writeFile(nombreArchivo, contenido, (error) => {
      if (error) {
        console.error('Error al escribir en el archivo:', error);
      } else {
        console.log('Archivo guardado exitosamente.');
      }
    });
  }

  leerJSON(nombreArchivo) {
    try {
      const contenido = fs.readFileSync(nombreArchivo, 'utf8');
      const datos = JSON.parse(contenido);
      return datos;
    } catch (error) {
      console.error('Error al leer el archivo JSON:', error);
      return null;
    }
  }

  verificarNombre(nombre) {
    const datos = this.leerJSON('C:/Users/Usuario/Desktop/Proyecto 04/model/jugadores.JSON');
    for (let i = 0; i < datos.length; i++) {
      if (datos[i] === nombre) {
        return true;
      }
    }
    return false;
  }
}


// Ejemplo de uso
// const manejador = new ManejadorArchivos();
// const nombreArchivo = 'datos.json';
// manejador.leer(nombreArchivo);


// Ejemplo de uso
// const manejador = new ManejadorArchivos();
// const nombreArchivo = 'datos.json';
// const datos = {
//   jugadores: [
//     { nombre: 'Jugador 1', puntaje: 100 },
//     { nombre: 'Jugador 2', puntaje: 200 },
//     { nombre: 'Jugador 3', puntaje: 150 }
//   ],
//   tematica: 'Aventura',
//   idPartida: 'ABC123'
// };
// manejador.escribir(nombreArchivo, datos);
// manejador.leer(nombreArchivo);
module.exports = ManejadorArchivos;