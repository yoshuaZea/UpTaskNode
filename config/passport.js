const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//Referencia al método donde vamos a autenticar
const Usuarios = require('../models/Usuarios');

//LocalStrategy - Login con credenciales propias (usuario y password)
passport.use(
    new LocalStrategy(
        {
            //Por defautl passport espera un usuario y password
            //Renombrar los campos de acuerdo al modelo
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try{
                const usuario = await Usuarios.findOne({
                    where: { 
                        email: email,
                        activo: 1
                    }
                });

                //El usuario existe, password incorrecto
                if(!usuario.verificarPassword(password)){
                    return done(null, false, {
                        message: 'Password incorrecto'
                    });
                }

                //El email existe, password correcto
                return done(null, usuario);

            } catch(error){
                //Ese usuario no existe
                return done(null, false, {
                    message: 'Esta cuenta no existe'
                });
            }
        }
    )
);

//Serializar el usaurio
passport.serializeUser((usuario, callback) => {
    callback(null, usuario);
});

//Deserializar el usuario
passport.deserializeUser((usuario, callback) => {
    callback(null, usuario);
})

//Exportar libreria
module.exports = passport;