import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

export default function Perfil() {
  const location = useLocation()
  const dados = location.state
  const [recomendacoes, setRecomendacoes] = useState('')
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    const fetchRecomendacoes = async () => {
      try {
        const { data } = await axios.post('https://know-your-fan-4bk0.onrender.com/recomendar', {
          jogos: dados.jogos || '',
          jogadores: dados.jogadores || '',
          eventos: dados.eventos || '',
          produtos: dados.produtos || ''
        })
        setRecomendacoes(data.recomendacoes)
      } catch (err) {
        setRecomendacoes('❌ Não foi possível gerar recomendações no momento.')
        console.error(err)
      } finally {
        setCarregando(false)
      }
    }

    if (dados) fetchRecomendacoes()
  }, [dados])

  if (!dados) return <p className="text-white p-8">Dados não fornecidos.</p>

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat text-white flex items-center justify-center px-4"
      style={{ backgroundImage: "url('/bg-furia.jpg')" }}
    >
      <div className="bg-black/80 backdrop-blur-md rounded-xl shadow-xl p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-4 text-center text-fuchsia-500">
          🎉 Obrigado, {dados.nome}!
        </h1>

        <p className="text-center text-lg mb-6 text-gray-300">
          Você foi analisado pelo <span className="text-yellow-400 font-semibold">FuriaBOT 🐯</span>
        </p>

        <h2 className="text-xl font-bold mb-2 text-yellow-400">📣 Resultado:</h2>
        <div className="bg-gray-900 p-4 rounded-md border-l-4 border-fuchsia-600 whitespace-pre-wrap mb-6 text-sm">
          {dados.resposta}
        </div>

        <h2 className="text-xl font-bold mb-2 text-yellow-400">🔥 Recomendado para você:</h2>
        <div className="bg-gray-900 p-4 rounded-md border-l-4 border-yellow-500 whitespace-pre-wrap text-sm">
          {carregando ? '⏳ FuriaBOT está escolhendo algo especial pra você...' : recomendacoes}
        </div>

        <div className="flex justify-center mt-10">
          <img src="/furia-logo.png" alt="Logo FURIA" className="w-24 opacity-80" />
        </div>
      </div>
    </div>
  )
}