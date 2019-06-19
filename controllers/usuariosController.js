const Usuarios = require('../models/Usuarios');
const enviarEmail = require('../handlers/email');

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
        });

        //Crear un URL de confirmar cuenta
        const confirmarUrl = `http://${req.headers.host}/confirmar/${email}`;

        //Crear el objeto de usuario
        const usuario = {
            email
        }

        //Enviar el email
        await enviarEmail.enviar({
            usuario,
            subject: 'Confirma tu cuenta UpTask',
            confirmarUrl,
            archivo: 'confirmar-cuenta'
        });

        //Redireccionar al usuario
        req.flash('correcto', 'Se envió un mensaje a tu correo, confirma tu cuenta');
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

exports.formRestablecerPassword = (req, res) => {
    res.render('paginas/reestablecer', {
        nombrePagina: 'Restablecer tu contraseña'
    })
}

//Cambia el estado de una cuenta
exports.confirmarCuenta = async (req, res) => {
    // res.json(req.params.correo);
    const usuario = await Usuarios.findOne({
        where: { email: req.params.correo }
    });

    if(!usuario){
        req.flash('error', 'No válido');
        res.redirect('/crear-cuenta');
    }

    usuario.activo = 1;
    await usuario.save();

    req.flash('correcto', 'Cuenta activada correctamente.');
    res.redirect('/iniciar-sesion');
}