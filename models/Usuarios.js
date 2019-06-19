const Sequelize = require('sequelize');
const db = require('../config/db');
const Proyectos = require('../models/Proyectos');
const bcrypt = require('bcrypt-nodejs');

const Usuarios = db.define('usuarios', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            isEmail: {
                msg: 'Agrega un correo válido'
            },
            notEmpty: {
                msg: 'El email no puede ser vacío'
            }
        },
        unique: {
            args: true,
            msg: 'Usuario ya registrado'
        }
    }, 
    password: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El password no puede ser vacío'
            }
        }
    },
    activo: {
        type: Sequelize.INTEGER(1),
        defaultValue: 0
    },
    token: Sequelize.STRING,
    expiracion: Sequelize.DATE
}, {
    hooks:{
        beforeCreate(usuario){
            // console.log('Creando nuevo usuario');
            //Hashear una contraseña con bcrypt-nodejs
            //Más detalles en la página oficila de bcrypt
            usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10))
            
        }
    }
});

//Métodos personalizados
Usuarios.prototype.verificarPassword = function(password){
    return bcrypt.compareSync(password, this.password); //this.password usuario de la BD
}

//Relación con tablas
Usuarios.hasMany(Proyectos);

module.exports = Usuarios;