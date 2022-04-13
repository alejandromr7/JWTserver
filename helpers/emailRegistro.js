const nodemailer = require('nodemailer');

const emailRegistro = async (datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const { email, nombre, token } = datos;


    // Enviar email //
    const info = await transport.sendMail({
        from: 'APV -ADMIN',
        to: email,
        subject: 'Compruba de cuenta en APV',
        text: 'Compruba de cuenta en APV',
        html: `
                <p>Hola ${nombre} Comprueba tu cuenta en APV </p>
                <p>Tu cuenta ya esta lista, solo debes comprobarla en el siguiente enlace:
                <a href="${process.env.FRONTED_URL}/confirmar/${token}">Comprobar cuenta</a>
                </p>


            `
    });

    console.log('Mensaje enviado', info.messageId);
}

module.exports = emailRegistro;