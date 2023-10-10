import sendToDrive from './drive.js';
import sendToGmail from './gmail.js';
import express from 'express';
import cors from 'cors';
import http from 'http';
import https from 'https';
import fs from 'fs';

const app = express();
const httpPort = 3000;

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

const httpServer = http.createServer(app);


httpServer.listen(httpPort, '127.0.0.1', () => {
  console.log(`Servidor rodando em http://localhost:${httpPort}`);
});
