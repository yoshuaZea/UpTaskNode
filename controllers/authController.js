const passport = require('passport');
const Usuarios = require('../models/Usuarios');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const crypto = require('crypto');
const bcrypt = require('bcrypt-nodejs');

//Autenticación local por usuario y contraseña
exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorios'
});

//Función para revisar si el usuario está logueado o no
exports.usuarioAutenticado = (req, res, next) => {
    //Si el usuario está autenticado
    if(req.isAuthenticated()){
        return next();
    }
    //Si no está autenticado, redireccionar a login
    return res.redirect('/iniciar-sesion');
}

exports.cerrarSesion = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/iniciar-sesion');
    });
};

//Genera un token si el usuario es válido
exports.enviarToken = async (req, res) => {
    //Verificar que exista el usuario
    const { email } = req.body; //Destroctoring
    const usuario = await Usuarios.findOne({ where: { email }});

    //Si no existe el usuario
    if(!usuario){
        req.flash('error', 'No existe esa cuenta.');
        res.redirect('/reestablecer');
    }

    //Generar el token cuando existe el usuario
    usuario.token = crypto.randomBytes(20).toString('hex');
    usuario.expiracion = Date.now() + 3600000;

    //Guardar los datos en BD con save, porque la consulta anterior está ligada
    await usuario.save();

    //Url de rest
    const resetUrl = `http://${req.headers.host}/reestablecer/${usuario.token}`;
    console.log(resetUrl);
}

exports.validarToken = async (req, res) => {
    //Imprimir JSON
    // res.json(req.parms.token);

    const usuario = await Usuarios.findOne({
        where:{
            token: req.params.token
        }
    });

    //Si no encuentra usuario
    if(!usuario){
        req.flash('error', 'No válido');
        res.redirect('/reestablecer');
    }

    //Formulario para generar password
    res.render('paginas/resetPassword', {
        nombrePagina: 'Reestablecer conntraseña'
    });
}

exports.actualizarPassword = async (req, res) => {
    // console.log(req.params.token); //Imprimir variables por URL

    let fecha_actual = Date.now();
    //Verifica token valido y fecha de expiración
    const usuario = await Usuarios.findOne({
        where: {
            token: req.params.token,
            expiracion: {
                [Op.gte]: fecha_actual
            }
        }
    });

    //Si existe el usuario
    if(!usuario){
        req.flas('error', 'No válido');
        res.redirect('/reestablecer');
    }

    //Hashear el nuevo password
    usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    usuario.token = null;
    usuario.expiracion = null;
    //Guadar la actualizacion de datos
    await usuario.save();

    req.flash('correcto', 'Tu password se ha modificado correctamente');
    res.redirect('/iniciar-sesion');
}
