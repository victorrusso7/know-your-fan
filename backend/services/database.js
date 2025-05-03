const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('fan_data.db')

// Criação da tabela se não existir
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS perfis (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    link TEXT,
    memoria TEXT,
    eventos TEXT,
    resposta TEXT,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
  )`)
})

module.exports = db