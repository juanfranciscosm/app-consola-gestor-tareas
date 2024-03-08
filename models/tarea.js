//En este archivo se crea el objeto tarea donde se define la estructura de propiedades de cada tarea

//se importa el paquete necesario para crear ids unicos en el mundo para cada tarea
const { v4 : uuidv4 } = require('uuid') 

//se crea la clase de Tarea con sus propiedades
class Tarea {

    description = ''; //la tarea a realizar
    completadoEn = null ; //null si no se ha completado y tendra la fecha de completada cuando se marque como completada
    constructor (description) { //en el constructor del objeto se recibe la descripcion cuando se cree
        this.id = uuidv4(); //el id se generara aleatoramente
        this.description=description ;
    }
}

//se exporta la clase tarea
module.exports = Tarea ;





