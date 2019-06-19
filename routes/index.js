const express = require('express');
const router = express.Router();

//Importar express validator
const { body } = require('express-validator/check');

//Importar controladores
const proyectosController = require('../controllers/proyectosController');
const tareasController = require('../controllers/tareasController');
const usuariosController = require('../controllers/usuariosController');
const authController = require('../controllers/authController');

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

    router.get('/', 
        authController.usuarioAutenticado, //Validar usuario autenticado
        proyectosController.proyectosHome
    );

    router.get('/nuevo-proyecto', 
        authController.usuarioAutenticado, 
        proyectosController.formularioProyecto
    );

    router.post('/nuevo-proyecto', 
        authController.usuarioAutenticado,
        //Sanitizar datos de entrada antes de insertar a DB
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.nuevoProyecto
    );

    //Listar proyecto - :url comodin
    router.get('/proyectos/:url', 
        authController.usuarioAutenticado,
        proyectosController.proyectoPorUrl
    );

    //Actualizar el proyecto
    router.get('/proyecto/editar/:id', 
        authController.usuarioAutenticado,
        proyectosController.formularioEditar
    );

    router.post('/nuevo-proyecto/:id', 
        authController.usuarioAutenticado,
        //Sanitizar datos de entrada antes de insertar a DB
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.actualizarProyecto
    );

    //Eliminar proyecto
    router.delete('/proyectos/:url', 
        authController.usuarioAutenticado,
        proyectosController.eliminarProyecto
    );

    //Rutas para TAREAS
    router.post('/proyectos/:url', 
        authController.usuarioAutenticado,
        tareasController.agregarTarea
    );

    //Actualizar tarea - PATCH similar a Update, cambia una porción del objeto
    router.patch('/tareas/:id', 
        authController.usuarioAutenticado,
        tareasController.cambiarEstadoTarea
    );

    //Eliminando tarea
    router.delete('/tareas/:id', 
        authController.usuarioAutenticado,
        tareasController.eliminarTarea
    );

    //CREAR NUEVA CUENTA
    router.get('/crear-cuenta', usuariosController.formCrearCuenta);
    router.post('/crear-cuenta', usuariosController.crearCuenta);
    router.get('/confirmar/:correo', usuariosController.confirmarCuenta);

    //INICIAR SESIÓN
    router.get('/iniciar-sesion', usuariosController.formIniciarSesion);
    //Autenticar usuario
    router.post('/iniciar-sesion', authController.autenticarUsuario);

    //CERRAR SESIÓN
    router.get('/cerrar-sesion', authController.cerrarSesion);

    //RESTABLECER CONTRASEÑA
    router.get('/reestablecer', usuariosController.formRestablecerPassword);
    router.post('/reestablecer', authController.enviarToken);
    router.get('/reestablecer/:token', authController.validarToken);
    router.post('/reestablecer/:token', authController.actualizarPassword);

    return router;
}
