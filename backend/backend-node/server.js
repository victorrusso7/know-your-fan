const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.static('uploads'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

app.post('/ocr', upload.single('document'), (req, res) => {
  if (!req.file) return res.status(400).send('Nenhum arquivo enviado');
  res.json({ filePath: `uploads/${req.file.filename}` });
});

app.listen(3001, () => {
  console.log('Node.js server (upload) rodando na porta 3001');
});
