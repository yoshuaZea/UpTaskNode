const Usuarios = require('../models/Usuarios');

exports.formCrearCuenta = (req, res) => {
    res.render('paginas/crearCuenta', {
        nombrePagina : 'Crear cuenta en UpTask'
    })
}

exports.formIniciarSesion = (req, res) => {
    const { error } = res.locals.mensajes;
    res.render('paginas/iniciarSesion', {
        nombrePagina : 'Inicia sesión en UpTask',
        error
    })
}

exports.crearCuenta = async (req, res) => {
    //Validar que tengamos valores en el input
    const { email, password } = req.body;

    //Crear el usuario
    try{
        await Usuarios.create({
            email,
            password
        })
        res.redirect('/iniciar-sesion');
            
    } catch(error) {
        // console.log(error.errors);
        req.flash('error', error.errors.map(error => error.message));
        res.render('paginas/crearCuenta', {
            nombrePagina : 'Crear cuenta en UpTask',
            // errores: error.errors //Erorres tradicionales
            mensajes: req.flash(),
            email,
            password
        })
    }
}