import dotenv from 'dotenv';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import nodemailer from "nodemailer";

dotenv.config({ path: './process.env' });

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN, FOLDER_ID } = process.env;
const oAuth2Client = new OAuth2Client(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

function messageByAge(name, age) {
    const ageInt = parseInt(age);
    if (ageInt > 0 && age <= 30) {
        return `${name}`;
    }
    else if (ageInt > 30 && ageInt <= 60) {
        return `${name}, você`;
    }
    else if (ageInt > 60 && ageInt <= 80) {
        return `${name}, senhor`;
    }
    else {
        return `${name}, dom`;
    }
}

// async function sendToGmail(req, res) {
//   try {
//     const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });


//     const { email, name, age } = req.body;
//     const subject = "Beta tester";
//     const body = messageByAge(name, age);

//     const htmlBody = buildBodyHTMLEmail(name); // Your HTML content here

//     const raw = Buffer.from(
//       `From: 'me'\n` +
//       `To: ${email}\n` +
//       `Content-Type: text/html; charset=utf-8\n` +
//       `Subject: ${subject}\n\n` +
//       `${htmlBody}`
//     ).toString('base64')
//       .replace(/\+/g, '-')
//       .replace(/\//g, '_');

//     const response = await gmail.users.messages.send({
//       userId: 'me',
//       requestBody: {
//         raw,
//       },
//     });
//     res.status(200).send(response.data);
//   } catch (error) {
//     res.status(400).send('Error sending email: ' + error)
//   }
// }

async function sendToGmail(req, res) {
    try {
        oAuth2Client
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                type: 'OAuth2',
                user: 'fabio@1mage.org',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN
            },
        });


        const { email, name, age } = req.body;
        const subject = "Beta tester";
        const body = messageByAge(name, age);

        const htmlBody = buildBodyHTMLEmail(name); // Your HTML content here

        const mensagem = {
            from: 'fabio@1mage.org',
            to: email,
            subject: subject,
            html: htmlBody,
        };

        transporter.sendMail(mensagem, (error, info) => {
            if (error) {
                console.log('Erro ao enviar o e-mail:', error);
                res.status(400).send(error);
            } else {
                console.log('E-mail enviado com sucesso:', info.response);
                res.status(200).send(info.response);
            }
        });
    } catch (error) {
        res.status(400).send('Error sending email: ' + error)
    }
}

export default sendToGmail;

function buildBodyHTMLEmail(name) {
    return `<!DOCTYPE html>
    <html>
        <head>
            <meta charset='utf-8'>
            <meta http-equiv='X-UA-Compatible' content='IE=edge'>
            <title>Template</title>
            <meta name='viewport' content='width=device-width, initial-scale=1'>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link
                href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,400;1,500;1,700&display=swap"
                rel="stylesheet">
        </head>
        <body style="font-family: 'Ubuntu', sans-serif; margin: 0; padding: 0;">
            <table role="presentation" width="100%"
                style="max-width: 600px; margin: auto;" cellspacing="0"
                cellpadding="0">
                <tr>
                    <td
                        style="background-color: #2C3D52; text-align: center; padding: 40px;">
                        <!-- Use a publicly accessible image URL -->
                        <img
                            src="https://raw.githubusercontent.com/fabio1mage/Landing-Page-Icons/main/one-logo-1.png"
                            alt="Logo" width="115.75" style="margin-bottom: 20px;" />
                    </td>
                </tr>
                <tr>
                    <td style="padding: 20px;">
                        <h3
                            style="font-weight: 500; font-size: 24px; line-height: 30.07px; color: #2C3D52;">
                            Bem-vindo(a), ${name}!
                        </h3>
                        <p
                            style="font-weight: 400; font-size: 20px; line-height: 25.06px; color: #5B6676; margin: 0;">
                            Prepare-se para ter o controle de toda sua vida em suas
                            mãos.
                        </p>
                        <!-- Rest of your content -->
                    </td>
                </tr>
                <tr>
                    <td style="padding: 20px;">
                        <p
                            style="font-weight: 400; font-size: 20px; line-height: 25.06px; color: #5B6676;">
                            É muito bom saber que você tem interesse em fazer parte
                            da comunidade One.
                        </p>
                        <p
                            style="font-weight: 400; font-size: 20px; line-height: 25.06px; color: #5B6676;">
                            Uma comunidade de pessoas em busca de um único objetivo:
                            ter o controle da saúde em mãos.
                        </p>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 20px;">
                        <table role="presentation" width="100%">
                            <tr>
                                <td
                                    style="font-weight: 500; font-size: 24px; line-height: 27.58px; color: #2C3D52; padding-bottom: 20px;">
                                    Em breve
                                </td>
                                <td
                                    style="background: linear-gradient(90deg, rgba(0, 174, 212, 0.1), rgba(22, 118, 243, 0.1)); text-align: center;">
                                    <span
                                        style="font-weight: 500; font-size: 24px; line-height: 27.58px; color: #2C3D52;">
                                        One app
                                    </span>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td
                        style="background-color: #2C3D52; padding: 30px; text-align: center;">
                        <table role="presentation" width="50%" style="display: inline; margin-right: 24px;">
                            <tr>
                                <td
                                    style="font-weight: 400; font-size: 14px; line-height: 16.09px; color: white; padding-bottom: 20px;">
                                    Em breve nas lojas digitais
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <table role="presentation" cellspacing="0"
                                        cellpadding="0" align="center"
                                        style="margin: auto;">
                                        <tr>
                                            <td>
                                                <a
                                                    style="color: white; text-decoration: none;"
                                                    href="https://www.apple.com/ios/app-store/"
                                                    target="_blank">
                                                    <img
                                                        src="https://raw.githubusercontent.com/fabio1mage/Landing-Page-Icons/main/apple-store.png"
                                                        alt="Disponível na App Store"
                                                        width="25"
                                                        style="display: block; margin-right: 10px;">
                                                </a>
                                            </td>
                                            <td>
                                                <a
                                                    style="color: white; text-decoration: none;"
                                                    href="https://play.google.com/store"
                                                    target="_blank">
                                                    <img
                                                        src="https://raw.githubusercontent.com/fabio1mage/Landing-Page-Icons/main/play-store.png"
                                                        alt="Disponível no Google Play"
                                                        width="25"
                                                        style="display: block;">
                                                </a>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                        <table role="presentation" width="50%" style="display: inline; margin-left: 24px;">
                            <tr>
                                <td
                                    style="font-weight: 400; font-size: 14px; line-height: 16.09px; color: white; padding-top: 20px;">
                                    Siga nossas redes sociais
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <table role="presentation" cellspacing="0"
                                        cellpadding="0" align="center"
                                        style="margin: auto;">
                                        <tr>
                                            <td>
                                                <a
                                                    style="color: white; text-decoration: none;"
                                                    href="http://instagram.com/yourprofile"
                                                    target="_blank">
                                                    <img
                                                        src="https://raw.githubusercontent.com/fabio1mage/Landing-Page-Icons/main/instagram.png"
                                                        alt="Instagram" width="25"
                                                        style="margin-right: 10px;">
                                                </a>
                                            </td>
                                            <td>
                                                <a
                                                    style="color: white; text-decoration: none;"
                                                    href="http://linkedin.com/company/yourprofile"
                                                    target="_blank">
                                                    <img
                                                        src="https://raw.githubusercontent.com/fabio1mage/Landing-Page-Icons/main/linkedin.png"
                                                        alt="LinkedIn" width="25">
                                                </a>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td
                        style="background-color: #2C3D52; padding: 20px; text-align: center; color: white; font-size: 10px; line-height: 12.2px;">
                        CNPJ 00.000.000/0000-00<br>
                        Av. 7 de Setembro, nº 140. Sala 301,<br>
                        CEP 00000-000, Curitiba/PR - Brasil<br>
                        +55 41 0000-0000<br>
                        <a href="mailto:contato@1mage.org"
                            style="color: #1674B8; text-decoration: none;">
                            contato@1mage.org
                        </a><br>
                        © 2023 One. Todos os direitos reservados.
                    </td>
                </tr>
            </table>
        </body>
    </html>
    `
}