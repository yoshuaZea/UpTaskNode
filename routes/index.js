const express = require('express');
const router = express.Router();

//Importar express validator
const { body } = require('express-validator/check');

//Importar controladores
const proyectosController = require('../controllers/proyectosController');
const tareasController = require('../controllers/tareasController');

//Exportar una sola parte del código
module.exports = function(){
    //Ruta para el home
    // router.get('/', (req, res) => {
    //     //Para mostrar la información en pantalla
    //     /* req (request) = petición al servidor
    //     *  res (response) =  respuesta del servidor
    //     */
    //     res.send("Index");
    //     // res.json(productos);
    // });

    router.get('/', proyectosController.proyectosHome);
    router.get('/nuevo-proyecto', proyectosController.formularioProyecto);
    router.post('/nuevo-proyecto', 
        //Sanitizar datos de entrada antes de insertar a DB
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.nuevoProyecto
    );

    //Listar proyecto - :url comodin
    router.get('/proyectos/:url', proyectosController.proyectoPorUrl);

    //Actualizar el proyecto
    router.get('/proyecto/editar/:id', proyectosController.formularioEditar);
    router.post('/nuevo-proyecto/:id', 
        //Sanitizar datos de entrada antes de insertar a DB
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.actualizarProyecto
    );

    //Eliminar proyecto
    router.delete('/proyectos/:url', proyectosController.eliminarProyecto);

    //Rutas para TAREAS
    router.post('/proyectos/:url', tareasController.agregarTarea);

    return router;
}
