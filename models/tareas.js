// en este arhivo se crea la clase tareas que almacena la estructura de la lista de tareas y los metodos para manipular esta lista


require('colors');

const Tarea = require('./tarea.js')

class Tareas {

    _listado={};

    get listadoArr(){ 
        let listado = []; 
        Object.keys(this._listado).forEach(key=>{
            listado.push(this._listado[key])
        })
        return listado;
    }

    constructor(){
        this._listado = {};
    }

    borrarTarea(id= ''){
        if (this._listado[id]){
            delete this._listado[id];
        }
    }

    cargarTareasFromArray( tareas = []){ 
        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        })        
    }

    crearTarea( descripction = ''){
        const tarea = new Tarea(descripction);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto (){
        console.log('')
        this.listadoArr.forEach((tarea,i)=>{ 
            const idx = `${ i + 1}.`.green; 
            const {description,completadoEn}= tarea; 
            const estado = (completadoEn) 
                ?'Completado'.green
                :'Pendiente'.red
            console.log(`${idx} ${description} :: ${estado}`)
        })
    }
    listarTareasCompletadas(completada){ 
        console.log('')
        let e = 1 
            this.listadoArr.forEach((tarea)=>{ 
                const {description,completadoEn}= tarea; 
                const estado = (completadoEn) 
                    ?'Completado'.green
                    :'Pendiente'.red
                if(completada && completadoEn != null){ 
                    console.log(`${e}.`.green + `${description} :: ${completadoEn}`)
                    e += 1
                } else if(!completada && completadoEn == null){ 
                    console.log(`${e}. `.green + `${description} :: ${estado}`)
                    e += 1
                }
            })
    }

    //creamos el metodo para alterar la propiedad de completadoEn de las tareas seleccionadas
    toggleCompletadas(ids=[]){ //esta funcion recibe los ids que retorna el inquire de tipo checkbox
        ids.forEach(id => {
            const tarea = this._listado[id]//creamos la variable tarea y le asignamos el valor de la tarea que queremos modificar us completadoEn buscando por el id en el objeto _listado
            if (!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString().cyan//Si la tarea seleccionada no tiene un valor es su propiedad completadoEn (osea no se ha completado antes) el valor que toma en el de la fecha al seleccionarse y a la vez transformamos esa fecha a un string
            }
        });

        //ahora para las tareas que no estan seleccionadas, la propiedad completadoEn debe ser igual a null si ya estuvieron seleccionadas o no
        this.listadoArr.forEach( tarea => { //recorremos el listado completo de tareas
            if (!ids.includes(tarea.id)) //si el arreglo de ids seleccionados no incluye el id de alguna tarea (osea entramos si el id que se evalua no es una de las tareas seleccionadas como completado) osea las pendientes
            {
               this._listado[tarea.id].completadoEn = null //le ponemos null a todas las tareas que no estan seleccionadas
            }
        })
    }
}
   


module.exports=Tareas;






