const nodemailer = require('nodemailer');

const emailOlvidePassword = async (datos) => {
    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "35038b7b34deb0",
            pass: "e596f00f5bc9ea"
        }
    });

    const { email, nombre, token } = datos;


    // Enviar email //
    const info = await transport.sendMail({
        from: 'APV -ADMIN',
        to: email,
        subject: 'Reestablece tu password',
        text: 'Reestablece tu password',
        html: `
                <p>Hola ${nombre} has solicitado reestablecer tu password en APV </p>
                <p>Sigue el siguiente enlace para generar tu nuevo password:
                <a href="${process.env.FRONTED_URL}/olvide-password/${token}">Reestablecer cuenta</a>
                </p>


            `
    });

    console.log('MEnsaje enviado', info.messageId);
}

module.exports = emailOlvidePassword;