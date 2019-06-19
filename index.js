//Importar la librería de express para configuración del servidor
const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');

//Helpers funciones propias
const helpers = require('./helpers');

//Crear la conexión a la DB
const db = require('./config/db');

//Importar modelos
require('./models/Proyectos');
require('./models/Tareas');
require('./models/Usuarios');

//Validar la conexión a la DB
db.authenticate()
    .then(() => console.log("Conexión DB exitosa"))
    .catch(error => console.error("No se pudo conectar a la DB", error));

//Sincronizar con la DB para crear modelos
db.sync()
    .then(() => console.log("Sincronización DB Exitosa"))
    .catch(error => console.error("No se pudo sincronizar la DB", error));

//Crear una app de express
const app = express();

//Cargar los archivos estáticos
app.use(express.static('public'));

//Habilitar PUG - Template Engine
app.set('view engine', 'pug');

//Habilitar bodyParser para leer datos del formulario
app.use(bodyParser.urlencoded({extended: true}));

//Agregamos express Validator a toda la aplicación
app.use(expressValidator());

//Añadir la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

//Agregar flash messages para mostrar mensajes bajo ciertas condiciones
app.use(flash());

//Agregar la cookie
app.use(cookieParser());

//Sessiones nos permiten navegar entre las distintas paginas sin volver a autenticar
app.use(session({
    secret: 'supersecreto',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

//Pasar vardump mediante un middleware
app.use((req, res, next) => {
    //Forma  de crear variables para todos los archivos del proyecto
    res.locals.vardump = helpers.vardump;
    res.locals.mensajes = req.flash();
    //Definir variable de sesión
    res.locals.usuario = {...req.user} || null; //(express operator)... crea una copia de una variable
    next();
});

//Mapear las rutas definidas
app.use('/', routes());

//Método para configurar el puerto
app.listen(3000);

//Probar plantillas de correo
// require('./handlers/email');
