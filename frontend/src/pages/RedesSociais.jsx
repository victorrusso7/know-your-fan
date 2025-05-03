import { useState } from 'react'
import api from '../services/api'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function RedesSociais() {
  const [dados, setDados] = useState({
    nome: '',
    link: '',
    memoria: '',
    eventos: '',
    jogos: '',
    jogadores: '',
    produtos: ''
  })

  const [resposta, setResposta] = useState('')
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) =>
    setDados({ ...dados, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErro('')
    setResposta('')

    try {
      const { data } = await api.post('/validar_social', dados)
      setResposta(data.resposta)

      // Salva no banco via backend Node
      await axios.post('http://localhost:5000/registro', {
        ...dados,
        resposta: data.resposta
      })

      // Redireciona para o perfil final com recomendações
      navigate('/perfil', {
        state: {
          ...dados,
          resposta: data.resposta
        }
      })
    } catch (err) {
      setErro('Falha ao validar ou salvar perfil. Confira se ambos os backends estão ativos.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Validação Social – FuriaBOT 🐯</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          placeholder="Seu Nome"
          name="nome"
          value={dados.nome}
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-2 border rounded"
          placeholder="Link do Perfil"
          name="link"
          value={dados.link}
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-2 border rounded"
          placeholder="Sua memória favorita com a FURIA"
          name="memoria"
          value={dados.memoria}
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-2 border rounded"
          placeholder="Eventos da FURIA que participou"
          name="eventos"
          value={dados.eventos}
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-2 border rounded"
          placeholder="Jogos favoritos"
          name="jogos"
          value={dados.jogos}
          onChange={handleChange}
        />
        <input
          className="w-full p-2 border rounded"
          placeholder="Jogadores favoritos da FURIA"
          name="jogadores"
          value={dados.jogadores}
          onChange={handleChange}
        />
        <input
          className="w-full p-2 border rounded"
          placeholder="Produtos FURIA que já comprou"
          name="produtos"
          value={dados.produtos}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-fuchsia-700 hover:bg-fuchsia-800 text-white font-semibold py-2 px-6 rounded"
          disabled={loading}
        >
          {loading ? 'Analisando…' : 'Validar com FuriaBOT'}
        </button>
      </form>

      {erro && <p className="mt-6 text-red-600">{erro}</p>}
    </div>
  )
}