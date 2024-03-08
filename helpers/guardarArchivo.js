/* En este archivo esta el codigo para guardar y leer registros de la base de datos de tareas*/



const fs = require('fs'); //se llama el paquere fileSystem para poder modificar archivos en un directorio
const archivo = './db/data.json'; //ruta de donde se guardaran o tomaran los registros

//funcion que recibe el objeto con las propiedades de las tareas y se agregan a la lista de objetos en formato JSON como string
const guardarDB = (data) => {
    fs.writeFileSync(archivo, JSON.stringify(data))  //se utiliza metodo del paquete fileSystem para crear el archivo en la direccion indicada
}

//funcion para leer la base de datos en formato JSON
const leerDB = () => {
    //Si no hay informacion en la base de datos retorna null
    if (!fs.existsSync(archivo)){
        return null;
    }
    //si hay informacion en la base de datos 
    const info = fs.readFileSync(archivo, {encoding: 'utf-8'}) //utilizamos un metodo de fileSystem para leer la base de datos, para ello hay que decodificar el string
    const data = JSON.parse (info);//ahora hay que presentar el string en formato JSON (arreglo de objetos donde cada objeto es una tarea con sus propiedades)
    return data //retornamos el arreglo de objetos
}

module.exports = {guardarDB, leerDB } ; //exportamos las funciones
