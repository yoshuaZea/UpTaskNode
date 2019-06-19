const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const util = require('util');
const emailConfig = require('../config/email');


//Configuración de credenciales de la clase definida en config
let transport = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
      user: emailConfig.user,
      pass: emailConfig.pass
    },
    tls:{
        secureProtocol: "TLSv1_method"
    }
});

// Opciones del correo
let mailOptions = {
    from: '"UpTask" <no-reply@uptask.com>', 
    to: "correo@correo.com", 
    subject: "Password Reset", 
    text: "Hola", 
    html: "<b>Hola</b>"
};

//Ejecutar envío
transport.sendMail(mailOptions, function(error, info){
  if(error){
    return console.log("Fail: " + error);
  }
  console.log('Message sent: ' + info.response);
});

  