import { useState } from 'react'
import Navbar from './components/Navbar'
import HomeView from './views/HomeView'
import BarajasView from './views/BarajasView'
import CartasView from './views/CartasView'
import TarjetasView from './views/TarjetasView'
import JuegoView from './views/JuegoView'

function App() {
  const [vistaActual, setVistaActual] = useState('home')

  return (
    <>
      <Navbar vistaActual={vistaActual} cambiarVista={setVistaActual} />

      {vistaActual === 'home' && <HomeView />}
      {vistaActual === 'barajas' && <BarajasView />}
      {vistaActual === 'cartas' && <CartasView />}
      {vistaActual === 'tarjetas' && <TarjetasView />}
      {vistaActual === 'juego' && <JuegoView />}
    </>
  )
}

export default App