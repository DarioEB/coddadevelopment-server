const nodemailer = require('nodemailer');
require('dotenv').config({path: 'variables.env'});
const Contact = require('../models/Contact');
const Newsletter = require('../models/Newsletter');
const transporter = require('../config/transporter');
exports.sendMessage = async (req, res, next) => {

    try {
        const contact = new Contact(req.body);
        let info = await transporter.sendMail({
            from: 'CODDA <contact@coddadevelopment.com>', // sender address
            to: "darioe.barboza@gmail.com", // list of receivers
            subject: "Contacto realizado desde la página web", // Subject line
            text: `
Nombre: ${contact.name}
    
${contact.phone ? `Teléfono: ${contact.phone}` : ''}
    
${contact.contact_phone ? 'Si deseo que me contacten por teléfono' : 'No deseo que me contacten por teléfono'}
    
Email: ${contact.email}
    
${contact.org ? `Organización: ${contact.org}` : ''}
    
Subject: ${contact.subject}
    
Message: ${contact.message}
`, // plain text body
});

        res.json({message: 'Mensaje enviado correctamente', info});
        next();
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Mensaje no enviado'});
    }
}

exports.sendMessageUser = async (req, res, next) => {
    try {
        
        let info = await transporter.sendMail({
            from: 'CODDA <contact@coddadevelopment.com>', // sender address
            to: req.body.email, // list of receivers
            subject: "Recibimos tus datos.", // Subject line
            text: `
Hola ${req.body.name}, gracias por comunicarte con CODDA, responderemos tu 
solicitud en breve.            
`
        });

        console.log(info);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Mensaje no enviado'});
    }
}

exports.emailNewsletter = async (req, res, next) => {
    
    try {
        const newsletter = new Newsletter(req.body);
        let info = await transporter.sendMail({
            from: 'CODDA <contact@coddadevelopment.com>',
            to: newsletter.email,
            subject: "Gracias por dejarnos tu e-mail",
            text: `
Recibimos tu E-mail, en breve nos contactaremos con usted. Muchas gracias por contactarnos.
`,
        });
        await transporter.sendMail({
            from: 'CODDA <contact@coddadevelopment.com>',
            to: 'darioe.barboza@gmail.com',
            subject: 'E-mail recibido desde el newsletter de la página web coddadevelopment.com',
            text: `
Hola Dario, soy el administrador de correos de CODDA y tenes que contactarte con ${newsletter.email}            
`
});
        res.json({message: info});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Hubo un error'});
    }
}
