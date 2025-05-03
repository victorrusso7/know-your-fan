const express = require('express');
const cors = require('cors');
const uploadRoute = require('./routes/upload');
const path = require('path');
const registroRoute = require('./routes/registro');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/registro', registroRoute);

// Serve arquivos da pasta uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rota de upload
app.use('/upload', uploadRoute);

app.listen(5000, () => {
  console.log('✅ Backend Node.js rodando na porta 5000');
});