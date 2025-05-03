const db = require('../services/database')

const salvarPerfil = (req, res) => {
  const { nome, link, memoria, eventos, resposta } = req.body

  if (!nome || !link || !memoria || !eventos || !resposta) {
    return res.status(400).json({ error: 'Dados incompletos' })
  }

  const query = `INSERT INTO perfis (nome, link, memoria, eventos, resposta)
                 VALUES (?, ?, ?, ?, ?)`

  db.run(query, [nome, link, memoria, eventos, resposta], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message })
    }

    res.status(201).json({ id: this.lastID })
  })
}

module.exports = { salvarPerfil }