const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');

exports.proyectosHome = async (req, res) => {

    const usuarioId = res.locals.usuario.id;
    //Consulta para obtener todos los registros en BD
    const proyectos = await Proyectos.findAll({ where: { usuarioId } });

    res.render('paginas/proyectos', {
        nombrePagina : 'Proyectos',
        proyectos
    });
}

exports.formularioProyecto = async (req, res) => {
    //Query para obtener proyectos del usuario
    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyectos.findAll({ where: { usuarioId } });

    res.render('paginas/nuevoProyecto', {
        nombrePagina: "Nuevo Proyecto",
        proyectos
    })
}

//Función asyncrona
exports.nuevoProyecto = async (req, res) => {
    //Enviar a la consola lo que el usuario escriba
    // console.log(req.body);

    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyectos.findAll({ where: { usuarioId } });
    
    //Validar que tengamos valores en el input
    const { nombre } = req.body;

    let errores = [];

    if(!nombre){
        errores.push({'texto' : 'Agrega un nombre al proyecto'})
    }

    //Si hay errores
    if(errores.length > 0){
        res.render('paginas/nuevoProyecto', {
            nombrePagina: 'Nuevo Proyecto',
            errores, 
            proyectos
        });
    } else { //No hay errores
        //Insertar en base de datos con Promises
        //  Proyectos.create({ 
        //     nombre
        // })
        // .then(() => console.log('Insertado correctamente'))
        // .catch(error => console.error("Hubo un problema al insertar", error));

        //Utilizando ASYNC / AWAIT 
        const usuarioId = res.locals.usuario.id;
        await Proyectos.create({ nombre, usuarioId });
        res.redirect('/');
    }
}

exports.proyectoPorUrl = async (req, res) => {
    // Leer un dato por URL
    // res.send(req.params.url);

    const usuarioId = res.locals.usuario.id;
    const proyectosPromise = Proyectos.findAll({ where: { usuarioId } });

    const proyectoPromise = Proyectos.findOne({
        where: {
            url: req.params.url,
            usuarioId
        }
    });

    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise ]);

    //Consultar tareas del proyecto actual
    const tareas = await Tareas.findAll({
        where: {
            proyectoId: proyecto.id
        },
        //Informacion del modelo relacionado
        include: [
            { model: Proyectos}
        ]
    })

    //Validar si existen datos
    if(!proyecto) return next();

    //Render a la vista
    res.render('paginas/tareas', {
       nombrePagina: 'Tareas del Proyecto',
       proyectos,
       proyecto,
       tareas
    });
};

exports.formularioEditar = async (req, res) => {

    //Para múltiples consultas usar Promise
    const usuarioId = res.locals.usuario.id;
    const proyectosPromise = Proyectos.findAll({ where: { usuarioId } });

    const proyectoPromise = Proyectos.findOne({
        where: {
            id: req.params.id
        }
    });

    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise ]);

    res.render('paginas/nuevoProyecto', {
        nombrePagina: 'Editar proyecto',
        proyectos,
        proyecto
    });
};

exports.actualizarProyecto = async (req, res) => {
    //Enviar a la consola lo que el usuario escriba
    // console.log(req.body);

    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyectos.findAll({ where: { usuarioId } });
    
    //Validar que tengamos valores en el input
    const { nombre } = req.body;

    let errores = [];

    if(!nombre){
        errores.push({'texto' : 'Agrega un nombre al proyecto'})
    }

    //Si hay errores
    if(errores.length > 0){
        res.render('paginas/nuevoProyecto', {
            nombrePagina: 'Nuevo Proyecto',
            errores, 
            proyectos
        });
        
    } else { 
        await Proyectos.update(
            { nombre: nombre},
            { where: { id: req.params.id }}
        );
        res.redirect('/');
    }

}

exports.eliminarProyecto = async (req, res, next) => {
    //req contiene la información de query y params
    // console.log(req.query);
    const { urlProyecto } = req.query;

    const resultado = await Proyectos.destroy({
        where: { url: urlProyecto }
    });

    //Si falla la ejecución, next() para el siguiente middleware, retornar mensaje de error
    if(!resultado){
        return next();
    }

    //res.send() - envía toda la información

    res.status(200).send('Proyecto eliminado correctamente');
};