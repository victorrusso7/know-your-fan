import { useState } from 'react'
import './KnowYourFanPage.css' // você vai colar o CSS personalizado aqui depois

export default function KnowYourFanPage() {
  const [fileName, setFileName] = useState('Nenhum arquivo selecionado')
  const [showThanks, setShowThanks] = useState(false)
  const [nome, setNome] = useState('')

  const handleFileChange = (e) => {
    setFileName(e.target.files[0]?.name || 'Nenhum arquivo selecionado')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const nomeDigitado = e.target.fullname.value.split(' ')[0]
    setNome(nomeDigitado)
    setShowThanks(true)
  }

  return (
    <div className="furiabot-container">
      <div className="glass-card">
        {!showThanks ? (
          <form onSubmit={handleSubmit}>
            <h1 className="titulo">KNOW YOUR FAN 🔥</h1>
            <input type="text" name="fullname" placeholder="Nome Completo" required />
            <input type="email" name="email" placeholder="Email" required />
            <button type="submit">Enviar para FuriaBOT</button>

            <div className="upload">
              <label htmlFor="doc">Upload de documento</label>
              <input type="file" id="doc" onChange={handleFileChange} />
              <p>{fileName}</p>
            </div>
          </form>
        ) : (
          <div>
            <h2 className="titulo">🎉 Obrigado, {nome}!</h2>
            <p className="resposta">A IA está gerando suas recomendações...</p>
            <button onClick={() => setShowThanks(false)}>Preencher novamente</button>
          </div>
        )}
      </div>
    </div>
  )
}