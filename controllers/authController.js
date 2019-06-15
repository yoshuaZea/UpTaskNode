const passport = require('passport');

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