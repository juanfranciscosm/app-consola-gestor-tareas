//en este archivo estan las promesas con el inquierer para mostrar en consola y esperar un ingreso de informacion del usuario

//importamos el paquete inquirer
const inquirer = require('inquirer');
require('colors'); //importamos colors para darle color a lo que se muestra en consola

const preguntas = [ //el inquiere debe recibir un arreglo con un objeto con esta estructura segun su documentacion
    {
        type: 'list', //el tipo de inquirer
        name: "opcion", //el nombre de lo que vamos a extrar como ingreso de informacion
        message: "¿Qué deseas hacer?", //mensaje a mostrar como pregunta al ingreso de informacion del usuario
        choices: [ //las opciones que tiene el usuario
            {
                value: '1', //el valor que se retornara como respuesta a la seleccion del usuario y se le da el nombre puesto en 'name'
                name: `${'1.'.green} Crear tarea ` //lo que se muestra en consola y lo que selecciona el usuario

            },
            {
                value: '2',
                name: `${'2.'.green} Listar tarea`
            },
            {
                value: '3',
                name: `${'3.'.green} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.green} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar Tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar tarea`
            },
            {
                value: '0',
                name: 'Salir'
            }

        ]
    }
]

//la funcion asincrona para mostrar el menu principal

const inquirerMenu = async()=>{
    //el encablezado
    console.clear()
    console.log('======================='.green)
    console.log(' Seleccione una opcion '.grey)
    console.log('======================='.green)
    //el inquire muestra en consola las opciones miestras espera una respuesta
    const {opcion} = await inquirer.prompt (preguntas)
    //retorna la seleccion
    return opcion
}

//funcion asincrona para que la consola haga una pausa antes de seguir con el siguiente proceso
//esta funcion nos permitira hacer que la consola se espere y muestre la opcion que seleccionemos antes de volver al siguiete ciclo while en el que se encuentra el programa
const pausa = async() => {
    //utilizamos un inquirer esperando un enter para avanzar
    const confirmacion = [
        {
            type: 'input', //el tipo de inquirer en este caso es input que espera un ingreso de cualquier cosa y luego presiones enter para avanzar
            name: "confirmacion",
            message: `Presione ${"ENTER".green} para continuar`
        }
    ]
    console.log('\n') 
    return await inquirer.prompt (confirmacion) //con el await no se retorna nada hasta que el usuario ingrese en enter
}

//la funcion asincrona para solicitar el ingreso de la tarea al usuario
const leerInput = async(mensaje)=>{
    const question = [{
        type: 'input', //otro tipo input que espera un valor
        name: 'ingreso',
        message: mensaje,
        //se valida que lo que se ingrese sea diferente de algo null o vacio
        validate(value){
            if(value.length ===0){
                return 'Por favor ingrese un valor';
            }
            return true; //si es diferente de null se retorna verdadero a la funcion de validacion
        }
    }];

    const { ingreso }= await inquirer.prompt(question); //el inquiere retorna lo que escribio el usuario
    return ingreso
}

//esta funcion asincrona muestra en consola la lista de tareas para seleccionar cual desea el usuario eliminar
//esta funcion recibe la lista de objetos de las tareas y retorna el id de la tarea seleccionada por el usuario
const listadoTareasBorrar = async(tareas=[]) => { 
    //se usa el metodo map de una lista para reorganizar la informacion de la lista de atreas y adaptarla a la estructura de value / name que se requiere para enviar al inquire donde el value debe ser el id de la tarea y el name lo que se muestra en consola. Esta nueva lista con nueva estructura se almacena en la variable choices 
    const choices = tareas.map( (tarea, i) => {
        const idx = `${ i + 1}`. green;  //el numero de la lista que se muestra en consola aumentado en 1 cada que se evalua un elemento de la lista de tareas y se pintara de verde
        return{
            value : tarea.id, //enviamos el id de la tarea como valor
            name : `${idx} ${tarea.description}` //lo que se mostrara en consola
        }
    })
    //agregamos con unshift al inicio de la lista un nuevo objeto para escoger cancelar para y regresar al menu principal sin eliminar tarea
    choices.unshift({
        value: '0',
        name: '0.'.green + 'Cancelar'
    })

    //se crea la lista con el objeto y estructura que recibe el inquire
    const preguntas = [
        {
            type: 'list',
            name: 'id', //el name es id porque eso es lo que vamos a extraer, es el nombre de variabel que asignamos a lo que retornara el inquire
            message: 'Borrar',
            choices //la lista de objetos con las opciones que creamos usando map partiendo de la lista de tareas
        }
    ]

    const {id}=await inquirer.prompt(preguntas);
    return id; //retornamos el id de la tarea seleccionada por el usuario para eliminar
}


// esta funcion es para que el usuario confirme una accion realizada (la usaremos para confirmar si desea eliminar la tarea seleccionada pero se puede usar para confirmar lo que sea)
//esta funcion recibe el mensaje o pregunta que se mostrara en consola y retorna un true o false en respuesta a esta pregunta o mensaje
const confirmar = async(message) =>{
    //creamos la lista con el objeto en la estructura requerida por el inquirer
    const question = [
        {
            type: 'confirm', 
            name: 'ok',
            message 
        }
    ]
    const {ok} = await inquirer.prompt(question);
    return ok; //retornamos la respuesta
}

//esta funcion asincrona con un inquere muestra el listado de tareas usando un tipo de inquire para poder marcar como seleccionado o deseleccionar tares
//Esta funcion recibe la lista de tareas y retorna una lista de los ids de las tareas que se marcaron
const mostrarListadoChecklist = async(tareas=[]) => { 
    //usamos la misma logica del listado para borrar para crear la lista de objetos en la estructura que necesita el inquire, donde el value es el id de la tarea pero agregamos otra propiedad que es el checked que sera true si la propiedad de la tarea completadoEn no es null (es decir que se ha completo antes ) y false para las que el valor de completadoEn sea null (no esta completado, no se marca)
    const choices = tareas.map( (tarea, i) => {
        const idx = `${ i + 1}`. green; 
        return{
            value : tarea.id, 
            name : `${idx} ${tarea.description}`,
            checked: (tarea.completadoEn) ? true : false
        }
    })

    //hacemos la lista con el objeto que recibe el inquire y aagregamos el listado de opciones hecho arriba
    const pregunta = [
        {
            type: 'checkbox', //indicamos que el tipo de inquirer a utilizar es checkbox
            name: 'ids', //le damos el nombre de ids a la lista que retornara el inquierer
            message: 'Selecciones',
            choices // el listado de tareas con la propiedad nueva checked
        }
    ]

    const {ids}=await inquirer.prompt(pregunta); //se estrae los ids
    return ids; //se retorna la lista de ids que quedan seleccionados
}

//se exportan todas las funciones
module.exports ={
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
}