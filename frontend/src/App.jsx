import { useState } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'

import './App.css'

import Navbar from './components/Navbar'
import CardUsuario from './components/CardUsuario'

import HomeView from './views/HomeView'
import BarajaView from './views/BarajaView'
import CartaView from './views/CartaView'
import TematicaView from './views/TematicaView'
import JuegoView from './views/JuegoView'
import { MAIN_ROUTES } from './routes'

function obtenerVistaActual(pathname) {
  const rutaEncontrada = Object.entries(MAIN_ROUTES).find(([, ruta]) => ruta === pathname)

  return rutaEncontrada?.[0] === 'root' ? 'home' : rutaEncontrada?.[0] || 'home'
}

function App() {
  const navigate = useNavigate()
  const location = useLocation()

  const [usuarioActivo, setUsuarioActivo] = useState(null) // Empieza en null porque el usuario aun no se ha identificado.
  const [vistaPendiente, setVistaPendiente] = useState(null) // Guarda la vista protegida a la que se queria entrar despues del acceso.

  const vistaActual = obtenerVistaActual(location.pathname)
  const vistaPendienteActual = location.state?.vistaPendiente || vistaPendiente
  const vistaNavbar = vistaActual === 'usuario' && vistaPendienteActual ? vistaPendienteActual : vistaActual

  // Cambia la ruta usando React Router y envia antes a identificacion si la vista requiere usuario.
  function cambiarVista(vista) {
    const necesitaUsuario = vista === 'baraja' || vista === 'carta' || vista === 'tematica'

    if (necesitaUsuario && !usuarioActivo) {
      setVistaPendiente(vista)
      navigate(MAIN_ROUTES.usuario, { state: { vistaPendiente: vista } })
      return
    }

    navigate(MAIN_ROUTES[vista] || MAIN_ROUTES.home)
  }

  // Guarda el usuario identificado y vuelve a la vista que habia quedado pendiente.
  function accederComoUsuario(usuario) {
    const vistaDestino = vistaPendienteActual || 'home'

    setUsuarioActivo(usuario)
    setVistaPendiente(null)
    navigate(MAIN_ROUTES[vistaDestino] || MAIN_ROUTES.home, { replace: true })
  }

  // Evita entrar a zonas de administracion sin pasar antes por CardUsuario.
  function protegerVista(vista, componente) {
    if (!usuarioActivo) {
      return <Navigate to={MAIN_ROUTES.usuario} state={{ vistaPendiente: vista }} replace />
    }

    return componente
  }

  return (
    <>
      <Navbar
        vistaActual={vistaNavbar}
        cambiarVista={cambiarVista}
        usuarioActivo={usuarioActivo}
      />

      <Routes>
        <Route path={MAIN_ROUTES.root} element={<HomeView />} />
        <Route path={MAIN_ROUTES.home} element={<HomeView />} />
        <Route path={MAIN_ROUTES.usuario} element={<CardUsuario onAcceso={accederComoUsuario} />} />
        <Route
          path={MAIN_ROUTES.baraja}
          element={protegerVista('baraja', <BarajaView usuarioActivo={usuarioActivo} />)}
        />
        <Route
          path={MAIN_ROUTES.carta}
          element={protegerVista('carta', <CartaView usuarioActivo={usuarioActivo} />)}
        />
        <Route
          path={MAIN_ROUTES.tematica}
          element={protegerVista('tematica', <TematicaView usuarioActivo={usuarioActivo} />)}
        />
        <Route path={MAIN_ROUTES.juego} element={<JuegoView />} />
        <Route path="*" element={<Navigate to={MAIN_ROUTES.home} replace />} />
      </Routes>
    </>
  )
}

export default App
