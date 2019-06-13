//Importar la librería ORM
const Sequelize = require('sequelize');
//Cargar la configuración de la conexión
const db = require('../config/db');
const slug = require('slug');
const shortid = require('shortid');


//Crear la estructura de una tabla en BD
const Proyectos = db.define('proyectos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 
    nombre: Sequelize.STRING,
    url: Sequelize.STRING
    
}, {
    //Corren una función en determinado tiempo
    hooks: {
        beforeCreate(proyecto){
            const url = slug(proyecto.nombre).toLowerCase();
            proyecto.url = `${url}-${shortid.generate()}`
        }
    }
});

module.exports = Proyectos;