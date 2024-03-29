const Sequelize = require('sequelize');
const db = require('../config/db');
const Proyectos = require('./Proyectos');

const Tareas = db.define('tareas', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tarea: Sequelize.STRING(100),
    fecha_inicio: Sequelize.DATEONLY,
    estado: Sequelize.INTEGER(1)
});
//Crear la llave foránea
Tareas.belongsTo(Proyectos);

// Proyectos.hasMany(Tareas);

module.exports = Tareas;