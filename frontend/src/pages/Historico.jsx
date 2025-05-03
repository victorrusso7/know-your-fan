import { useState, useEffect } from 'react'
import api from '../services/api'

export default function Historico() {
  const [lista, setLista] = useState([])
  const [erro, setErro] = useState('')

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await api.get('/historico')
        setLista(data)
      } catch {
        setErro('Não foi possível carregar o histórico.')
      }
    })()
  }, [])

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Histórico de Validações</h2>

      {erro && <p className="text-red-600">{erro}</p>}

      {lista.length === 0 ? (
        <p>Nenhum registro encontrado.</p>
      ) : (
        <ul className="space-y-4">
          {lista.map((item, i) => (
            <li key={i} className="bg-gray-100 p-4 rounded">
              <p className="font-semibold">{item.nome}</p>
              <pre className="whitespace-pre-wrap">{item.resposta}</pre>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}