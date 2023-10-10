import sendToDrive from './drive.js';
import sendToGmail from './gmail.js';
import express from 'express';
import cors from 'cors';
import http from 'http';
import https from 'https';
import fs from 'fs';

const app = express();
const httpPort = 3000;
const httpsPort = 3001;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  console.log("chamou o get");
  res.status(200).json("chamou o get");
});

app.post('/store', (req, res) => {
    sendToDrive(req, res);
});

app.post('/notify', (req, res) => {
    sendToGmail(req, res);
});

var privateKey  = fs.readFileSync('/etc/letsencrypt/live/1mage.org/privkey.pem');
var certificate = fs.readFileSync('/etc/letsencrypt/live/1mage.org/cert.pem');

var credentials = {key: privateKey, cert: certificate};

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);


httpServer.listen(httpPort, '0.0.0.0', () => {
  console.log(`Servidor rodando em http://localhost:${httpPort}`);
});

httpsServer.listen(httpsPort, '0.0.0.0', () => {
  console.log(`Servidor rodando em https://localhost:${httpsPort}`);
});
