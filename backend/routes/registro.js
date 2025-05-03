const express = require('express')
const router = express.Router()
const { salvarPerfil } = require('../controllers/registroController')

router.post('/', salvarPerfil)

module.exports = router