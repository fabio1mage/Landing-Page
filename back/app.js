import sendToDrive from './drive.js';
import sendToGmail from './gmail.js';
import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/store', (req, res) => {
    sendToDrive(req, res);
});

app.post('/notify', (req, res) => {
    sendToGmail(req, res);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});