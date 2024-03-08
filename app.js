require('colors');
const {inquirerMenu, 
        pausa,
        leerInput,
        listadoTareasBorrar,
        confirmar,
        mostrarListadoChecklist
    } = require(`./helpers/inquirer.js`);
const Tarea = require('./models/tarea');
const {guardarDB, leerDB} = require('./helpers/guardarArchivo');
const Tareas = require('./models/tareas')
console.clear();

const main = async()=>{
    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();
 
    if (tareasDB) { 
        tareas.cargarTareasFromArray(tareasDB)
    }

    do {
        console.clear();
        opt= await inquirerMenu(); 
        switch (opt) {
            case '1':
                const ingreso = await leerInput('Tarea nueva: ')
                tareas.crearTarea(ingreso) 
            break;
            case '2':
                tareas.listadoCompleto();
            break;
            case '3':
                tareas.listarTareasCompletadas(true)
            break;
            case '4':
                tareas.listarTareasCompletadas(false)
            break;
            case '5':
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids)
            break;
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id === '0'){
                    break;
                }
                const ok = await confirmar('¿Estas seguro?') 
                if(ok){
                    tareas.borrarTarea(id)
                    console.log('Tarea eliminada con exito')
               }
            break;
        }
        guardarDB(tareas.listadoArr)

        await pausa(); 
    } while( opt !== '0')
}


main();







