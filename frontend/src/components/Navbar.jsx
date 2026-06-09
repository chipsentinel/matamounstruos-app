import logoIcon from '../assets/logo-icon.webp'

function Navbar({ vistaActual, cambiarVista }) {
  return (
    <nav className="navbar navbar-dark bg-dark px-3">

      <div className="d-flex flex-wrap gap-2 align-item-center">
        <button
          className={`btn btn-sm ${vistaActual === 'home' ? 'btn-light' : 'btn-outline-light'}`}
          onClick={() => cambiarVista('home')}
          arial-label="Ir a inicio"
        >
          <img src={logoIcon} alt="Matamounstruos" width="40" height="30"/>
        </button>

        <button
          className={`btn btn-sm ${vistaActual === 'baraja' ? 'btn-light' : 'btn-outline-light'}`}
          onClick={() => cambiarVista('baraja')}
        >
          Baraja
        </button>

        <button
          className={`btn btn-sm ${vistaActual === 'tematica' ? 'btn-light' : 'btn-outline-light'}`}
          onClick={() => cambiarVista('tematica')}
        >
          Temática
        </button>

        <button
          className={`btn btn-sm ${vistaActual === 'juego' ? 'btn-light' : 'btn-outline-light'}`}
          onClick={() => cambiarVista('juego')}
        >
          Juego
        </button>
      </div>

      {/* buscador sin logica */}
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>

    </nav>
  )
}

export default Navbar