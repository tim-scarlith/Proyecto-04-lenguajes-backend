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

  agregarObjeto(nombreArchivo, nuevoObjeto) {
    // Leer el contenido actual del archivo
    fs.readFile(nombreArchivo, 'utf-8', (error, contenidoActual) => {
      if (error) {
        console.error('Error al leer el archivo:', error);
        //return;
      }
  
      let datos = [];
      try {
        // Parsear el contenido del archivo a un objeto JavaScript
        datos = JSON.parse(contenidoActual);
      } catch (parseError) {
        console.error('Error al parsear el contenido del archivo:', parseError);
        //return;
      }
  
      // Añadir el nuevo objeto al array de objetos
      datos.push(nuevoObjeto);
  
      // Convertir los datos actualizados a JSON
      const contenidoActualizado = JSON.stringify(datos);
  
      // Escribir los datos actualizados en el archivo
      fs.writeFile(nombreArchivo, contenidoActualizado, (error) => {
        if (error) {
          console.error('Error al escribir en el archivo:', error);
        } else {
          console.log('Nuevo objeto agregado exitosamente.');
        }
      });
    });
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