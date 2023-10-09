import dotenv from 'dotenv';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

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

async function sendToGmail(req, res) {
  try {
    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });


    const { email, name, age } = req.body;
    const subject = "Beta tester";
    const body = messageByAge(name, age);

    const raw = Buffer.from(
      `From: 'me'\n` +
      `To: ${email}\n` +
      `Subject: ${subject}\n\n` +
      `${body}`
    ).toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

    const response = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw,
      },
    });
    res.status(200).send(response.data);
  } catch (error) {
    res.status(400).send('Error sending email: ' + error)
  }
}

export default sendToGmail;