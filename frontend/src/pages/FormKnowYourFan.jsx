import { useState } from 'react'

export default function FormKnowYourFan() {
  const [form, setForm] = useState({
    nome: '',
    eventos: '',
    produtos: '',
    twitter: '',
    jogadores: '',
    jogos: '',
  })

  const [respostaIA, setRespostaIA] = useState('')
  const [recomendacoes, setRecomendacoes] = useState('')
  const [exibirResultado, setExibirResultado] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Validação
      const res = await fetch('https://know-your-fan-backend-joec.onrender.com/validar_social', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: form.nome,
          memoria: form.eventos,
          eventos: form.produtos,
          link: form.twitter.startsWith('@') ? form.twitter : `@${form.twitter}`
        })
      })
      const data = await res.json()
      setRespostaIA(data.resposta)

      // Recomendação
      const rec = await fetch('https://know-your-fan-backend-joec.onrender.com/recomendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jogos: form.jogos,
          jogadores: form.jogadores,
          eventos: form.eventos,
          produtos: form.produtos
        })
      })
      const recData = await rec.json()
      setRecomendacoes(recData.recomendacoes)
      setExibirResultado(true)
    } catch (error) {
      alert('Erro ao conectar com o servidor')
      console.error(error)
    }
  }

  const voltar = () => {
    setExibirResultado(false)
    setForm({ nome: '', eventos: '', produtos: '', twitter: '', jogadores: '', jogos: '' })
    setRespostaIA('')
    setRecomendacoes('')
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 min-h-screen bg-gradient-to-br from-black to-gray-900 text-white font-inter">
      <div className="glass-card w-full max-w-3xl rounded-2xl p-8 md:p-10">
        {!exibirResultado ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <h1 className="text-4xl font-bold text-center mb-6 gold-text font-['Orbitron']">KNOW YOUR FAN</h1>

            <input name="nome" value={form.nome} onChange={handleChange} placeholder="Nome completo" className="input-field w-full p-3 rounded-lg" required />
            <input name="eventos" value={form.eventos} onChange={handleChange} placeholder="Memória com a FURIA" className="input-field w-full p-3 rounded-lg" required />
            <input name="produtos" value={form.produtos} onChange={handleChange} placeholder="Eventos que participou" className="input-field w-full p-3 rounded-lg" required />
            <input name="twitter" value={form.twitter} onChange={handleChange} placeholder="@seuusuario" className="input-field w-full p-3 rounded-lg" required />
            <input name="jogadores" value={form.jogadores} onChange={handleChange} placeholder="Jogadores favoritos" className="input-field w-full p-3 rounded-lg" />
            <input name="jogos" value={form.jogos} onChange={handleChange} placeholder="Jogos favoritos" className="input-field w-full p-3 rounded-lg" />

            <button type="submit" className="btn-gold w-full py-3 px-6 rounded-lg text-lg font-semibold">ENVIAR</button>
          </form>
        ) : (
          <div>
            <h2 className="text-3xl font-bold text-center mb-6 gold-text">🎉 Obrigado, {form.nome.split(' ')[0]}!</h2>
            <div className="bg-gray-800 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4 gold-text">Resultado da IA:</h3>
              <p className="text-gray-300 whitespace-pre-wrap">{respostaIA}</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 gold-text">Recomendações:</h3>
              <ul className="list-disc list-inside text-white space-y-2">
                {recomendacoes.split('\n').map((rec, i) => (
                  <li key={i}>{rec}</li>
                ))}
              </ul>
            </div>
            <button onClick={voltar} className="mt-6 btn-gold py-3 px-6 rounded-lg font-semibold">Preencher novamente</button>
          </div>
        )}
      </div>
      <div className="logo-glow mt-8">
        <img src="https://furia.gg/wp-content/themes/furia/assets/img/logo.svg" alt="FURIA Logo" className="h-16 md:h-20" />
      </div>
    </div>
  )
}