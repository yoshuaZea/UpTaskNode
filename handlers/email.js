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

//Generar HTML
const generarHTML = (archivo, opciones = {}) => {
  const html = pug.renderFile(`${__dirname}/../views/emails/${archivo}.pug`, opciones);
  return juice(html);
}


exports.enviar = async (opciones) => {
  const html = generarHTML(opciones.archivo, opciones);
  const text = htmlToText.fromString(html);
  
  // Opciones del correo
  let mailOptions = {
      from: '"UpTask" <no-reply@uptask.com>', 
      to: opciones.usuario.email, 
      subject: opciones.subject, 
      text,
      html
  };

  const enviarEmail = util.promisify(transport.sendMail, transport);
  return enviarEmail.call(transport, mailOptions);
  
}

//Ejecutar envío - Test Plantillas
// transport.sendMail(mailOptions, function(error, info){
//   if(error){
//     return console.log("Fail: " + error);
//   }
//   console.log('Message sent: ' + info.response);
// });

  