import React, { useState } from 'react'

export default function UploadDocumento() {
  const [file, setFile] = useState(null)

  const handleChange = e => setFile(e.target.files[0])
  const handleUpload = () => {
    // lógica de upload pro serviço Node / S3 / etc.
    alert(`Enviando: ${file?.name}`)
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📤 Upload de Documento</h2>
      <input type="file" onChange={handleChange} className="mb-4" />
      <button onClick={handleUpload} className="bg-blue-600 text-white py-2 px-4 rounded">
        Enviar Documento
      </button>
    </div>
  )
}