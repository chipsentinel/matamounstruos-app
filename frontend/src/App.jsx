import { useState } from 'react'

import './App.css'

import Navbar from './components/Navbar'
import CardUsuario from './components/CardUsuario'

import HomeView from './views/HomeView'
import BarajaView from './views/BarajaView'
import TematicaView from './views/TematicaView'
import JuegoView from './views/JuegoView'

function App() {
  const [vistaActual, setVistaActual] = useState('home')
  const [usuarioActivo, setUsuarioActivo] = useState(false) // Empieza en false porque el usuario aun no se ha identificado.
  const [vistaPendiente, setVistaPendiente] = useState(null) // Guarda la vista protegida a la que se queria entrar despues del acceso.
  const vistaNavbar = vistaActual === 'usuario' && vistaPendiente ? vistaPendiente : vistaActual

  // Controla el cambio de vista y envia antes a identificacion si la seccion requiere usuario.
  function cambiarVista(vista) {
    const necesitaUsuario = vista === 'baraja' || vista === 'tematica'

    if (necesitaUsuario && !usuarioActivo) {
      setVistaPendiente(vista)
      setVistaActual('usuario')
      return
    }

    setVistaActual(vista)
  }

  // Simula el acceso de usuario y redirige a la vista que habia quedado pendiente.
  function accederComoUsuario() {
    setUsuarioActivo(true)
    setVistaActual(vistaPendiente || 'home')
    setVistaPendiente(null)
  }

  return (
    <>
      <Navbar vistaActual={vistaNavbar} cambiarVista={cambiarVista} />

      {vistaActual === 'home' && <HomeView />}
      {vistaActual === 'usuario' && <CardUsuario onAcceso={accederComoUsuario} />}
      {vistaActual === 'baraja' && <BarajaView />}
      {vistaActual === 'tematica' && <TematicaView />}
      {vistaActual === 'juego' && <JuegoView />}
    </>
  )
}

export default App
