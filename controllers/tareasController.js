const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');

exports.agregarTarea = async (req, res, next) => {
    //Obtener el proyecto actual
    const proyecto = await Proyectos.findOne({
        where: {
            url: req.params.url
        }
    });

    // console.log(proyecto);
    // console.log(req.body); //Viene del form
    // console.log(req.params); //Viene de la url
    
    //Leer valor del input 
    const { tarea, fecha_inicio } = req.body;
    
    //Variables para insertar
    const estado = 0; //Estado incompleto
    const proyectoId = proyecto.id; //Nombre igual como está en la tabla

    //Insertar en la base de datos 
    const resultado = await Tareas.create({ tarea, fecha_inicio, estado, proyectoId });

    //Si falla o no hay respuesta
    if(!resultado)
        next();

    //Redireccionar
    res.redirect(`/proyectos/${req.params.url}`);
}

exports.cambiarEstadoTarea = async (req, res, next) => {
    // console.log(req.params); //SOlo para PATCH
    const { id } = req.params;
    const tarea = await Tareas.findOne({
        where: { id : id}
    });
    
    //Cambiar el estado de la tarea
    let estado = 0;
    if(tarea.estado === estado){
        estado = 1;
    }

    tarea.estado = estado;

    //Usando PATCH con save se guardan los cambios
    const resultado = await tarea.save();

    if(!resultado) return next();

    res.status(200).send('Actualizado');
}

exports.eliminarTarea = async (req, res, next) => {
    //req.params toma el nombre que define el router
    //req.query toma el nombre de la varible que se envía desde axios
    // console.log(req.params);
    // console.log(req.query);

    const { id } = req.params;

    //Eliminar tarea
    const resultado = await Tareas.destroy({ 
        where: { id }
    });

    //Si no hay acciones
    if(!resultado) return next();

    //Retonar respuesta
    res.status(200).send('Tarea eliminada');
};