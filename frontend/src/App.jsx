import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Cadastro from './pages/Cadastro'
import UploadDocumento from './pages/UploadDocumento'
import RedesSociais from './pages/RedesSociais'
import Historico from './pages/Historico'
import Perfil from './pages/Perfil'
import FormKnowYourFan from './pages/FormKnowYourFan'

export default function App() {
  return (
    <>
      <nav className="flex gap-4 bg-black text-white p-4">
        <Link to="/">Home</Link>
        <Link to="/cadastro">Cadastro</Link>
        <Link to="/upload-documento">Upload</Link>
        <Link to="/redes-sociais">Redes Sociais</Link>
        <Link to="/historico">Histórico</Link>
        <Link to="/perfil">Perfil</Link>
        <Link to="/know-your-fan">Know Your Fan</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/upload-documento" element={<UploadDocumento />} />
        <Route path="/redes-sociais" element={<RedesSociais />} />
        <Route path="/historico" element={<Historico />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/know-your-fan" element={<FormKnowYourFan />} />
      </Routes>
    </>
  )
}