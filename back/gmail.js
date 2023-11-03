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
  return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset='utf-8'>
            <meta http-equiv='X-UA-Compatible' content='IE=edge'>
            <title>Template</title>
            <meta name='viewport' content='width=device-width, initial-scale=1'>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link
                href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500&display=swap"
                rel="stylesheet">
        </head>
        <body style="font-family: 'Ubuntu', sans-serif;">
            <section style="width: 600px; height: 882px;">
                <div
                    style="width: 600px; height: 203px; display: flex; justify-content: center; align-items: center; background-color: #2C3D52;">
                    <img
                        src="./assets/one-logo-1.png"
                        style="width: 115.75px; height: 65px;" />
                </div>
                <div
                    style="width: 400px; display: flex; flex-direction: column; gap: 2.5rem; padding: 0.5rem 2rem;">
                    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                        <div
                            class="display: flex; flex-direction: column; gap: 1.5rem;">
                            <h3
                                style="font-weight: 500; font-size: 24px; line-height: 30.07px; color: #2C3D52;">
                                Bem-vindo(a), ${name}!
                            </h3>
                            <span
                                style="font-weight: 500; font-size: 20px; line-height: 25.06px; color: #5B6676">
                                Prepare-se para ter o controle de toda sua vida em
                                suas
                                mãos
                            </span>
                        </div>
                        <div
                            style="display: flex; flex-direction: column; gap: 0.5rem;">
                            <span
                                style="font-weight: 400; font-size: 20px; line-height: 25.06px; color: #5B6676;">
                                É muito bom saber que você tem interesse em fazer
                                parte da comunidade One.
                            </span>
                            <span
                                style="font-weight: 400; font-size: 20px; line-height: 25.06px; color: #5B6676;">
                                Uma comunidade de pessoas em busca de um único
                                objetivo: ter o controle da saúde em mãos.
                            </span>
                        </div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.5rem;">
                        <span
                            style="font-weight: 500; font-size: 24px; line-height: 27.58px; color: #2C3D52;">Em
                            breve</span>
                        <div
                            style="background: linear-gradient(90deg, rgba(0, 174, 212, 0.1), rgba(22, 118, 243, 0.1))">
                            <span
                                style="font-weight: 500; font-size: 24px; line-height: 27.58px; background: linear-gradient(90deg, #00AED4, #1676F3); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent;">One
                                app
                            </span>
                        </div>
                    </div>
                </div>
                <div
                    style="width: 600px; height: 233px; display: flex; justify-content: space-between; flex-direction: column; background-color: #2C3D52; padding: 1.5rem 0;">
                    <div style="width: 600px; display: flex; height: 75px;">
                        <div
                            style="width: 322px; display: flex; flex-direction: column; gap: 0.5rem; padding: 0rem 2.5rem; padding-bottom: 0;">
                            <span
                                style="font-weight: 400; font-size: 14px; line-height: 16.09px; color: #F5F9FF;">Em
                                breve nas lojas digitais</span>
                            <div
                                style="width: 271px; height: 50px; display: flex; justify-content: space-between; gap: 1.5rem;">
                                <div
                                    style="width: 123px; height: 50px; padding: 0 4px; display: flex; align-items: center; gap: 8px;">
                                    <img
                                        src="./assets/apple-store.png"
                                        style="width: 21.6px; height: 21.6px;" />
                                    <span
                                        style="font-weight: 400; font-size: 13px; line-height: 15.86px; color: #F5F9FF;">
                                        App Store
                                    </span>
                                </div>
                                <div
                                    style="width: 123px; height: 50px; padding: 0 4px; display: flex; align-items: center; gap: 8px;">
                                    <img
                                        src="./assets/play-store.png"
                                        style="width: 21.6px; height: 21.6px;" />
                                    <span
                                        style="font-weight: 400; font-size: 13px; line-height: 15.86px; color: #F5F9FF;">
                                        Play Store
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div
                            style="display: flex; flex-direction: column; width: 166px; height: 75px; gap: 24px; ; padding: 1.5rem 2.5rem">
                            <span
                                style="font-weight: 400; font-size: 14px; line-height: 16.09px; color: #F5F9FF; text-wrap: nowrap;">
                                Siga nossas redes sociais
                            </span>
                            <div
                                style="display: flex; align-items: center; gap: 20px;">
                                <img
                                    src="./assets/instagram.png" />
                                <img
                                    src="./assets/linkedin.png" />
                            </div>
                        </div>
                    </div>
                    <div style="display: flex; width: 520px; height: 34px; gap: 3.5rem; padding: 0rem 2.5rem">
                        <p style="font-weight: 400; font-size: 10px; line-height: 12.2px; color: #F5F9FF; width: 162px;">
                            CNPJ 00.000.000/0000-00
                            Av. 7 de Setembro, nº 140. Sala 301,
                            CEP 00000-000, Curitiba/PR - Brasil
                        </p>
                        <p style="font-weight: 400; font-size: 10px; line-height: 12.2px; color: #F5F9FF;">
                            +55 41 0000-0000<br>
                            <a href="mailto:contato@1mage.org" style="text-decoration: none; color: #1674B8;">contato@1mage.org</a>
                        </p>
                    </div>
                    <span style="align-self: center; font-weight: 400; font-size: 10px; line-height: 12.2px; color: #F5F9FF;">
                        © 2023 One. Todos os direitos reservados.
                    </span>
                </div>
            </section>
        </body>
    </html>
  `
}