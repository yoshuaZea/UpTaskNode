const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmltotext = require('html-to-text');
const util = require('util');
const emailConfig = require('../config/email');

async function main(){
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  //Configuración de credenciales de la clase definida en config
  let transport = nodemailer.createTransport({
      host: emailConfig.host,
      port: emailConfig.port,
      secure: false,
      auth: {
        user: emailConfig.user,
        pass: emailConfig.pass
      },
      tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false

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
  let info = await transport.sendMail({
      from: '"UpTask" <no-reply@uptask.com>', 
      to: "correo@correo.com", 
      subject: "Password Reset", 
      text: "Hola", 
      html: "<b>Hola</b>"
  });

  console.log("Mensaje enviado: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

main().catch(console.error);