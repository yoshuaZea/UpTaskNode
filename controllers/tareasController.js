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
    // console.log(req.body);

    //Leer valor del input 
    const { tarea } = req.body;
    
    //Variables para insertar
    const estado = 0; //Estado incompleto
    const proyectoId = proyecto.id; //Nombre igual como está en la tabla

    //Insertar en la base de datos 
    const resultado = await Tareas.create({ tarea, estado, proyectoId });

    //Si falla o no hay respuesta
    if(!resultado)
        next();

    //Redireccionar
    res.redirect(`/proyectos/${req.params.url}`);
}