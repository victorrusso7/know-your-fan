// src/components/Navbar.jsx
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 flex gap-4">
      <Link to="/">Home</Link>
      <Link to="/cadastro">Cadastro</Link>
      <Link to="/upload-documento">Upload Documento</Link>
      <Link to="/redes-sociais">Redes Sociais</Link>
      <Link to="/perfil">Perfil</Link>
    </nav>
  )
}