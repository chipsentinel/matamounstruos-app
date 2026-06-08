function Navbar({ vistaActual, cambiarVista }) {
  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <span className="navbar-brand">Matamounstruos</span>

      <div className="d-flex flex-wrap gap-2">
        <button
          className={`btn btn-sm ${vistaActual === 'home' ? 'btn-light' : 'btn-outline-light'}`}
          onClick={() => cambiarVista('home')}
        >
          Inicio
        </button>

        <button
          className={`btn btn-sm ${vistaActual === 'barajas' ? 'btn-light' : 'btn-outline-light'}`}
          onClick={() => cambiarVista('barajas')}
        >
          Barajas
        </button>

        <button
          className={`btn btn-sm ${vistaActual === 'cartas' ? 'btn-light' : 'btn-outline-light'}`}
          onClick={() => cambiarVista('cartas')}
        >
          Cartas
        </button>

        <button
          className={`btn btn-sm ${vistaActual === 'tarjetas' ? 'btn-light' : 'btn-outline-light'}`}
          onClick={() => cambiarVista('tarjetas')}
        >
          Tarjetas
        </button>

        <button
          className={`btn btn-sm ${vistaActual === 'juego' ? 'btn-light' : 'btn-outline-light'}`}
          onClick={() => cambiarVista('juego')}
        >
          Juego
        </button>
      </div>
    </nav>
  )
}

export default Navbar