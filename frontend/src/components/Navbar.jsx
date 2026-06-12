import { useState } from 'react'

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import BootstrapNavbar from 'react-bootstrap/Navbar'
import logoIcon from '../assets/logo-icon.webp'

function Navbar({ vistaActual, cambiarVista, usuarioActivo }) {
  // Mantiene el texto escrito en el buscador sin afectar al resto de vistas.
  const [busqueda, setBusqueda] = useState('')

  // Busca texto dentro de la pagina visible usando la busqueda nativa del navegador.
  function buscarEnPagina(event) {
    event.preventDefault()

    const texto = busqueda.trim()

    if (!texto) {
      return
    }

    window.find(texto)
  }

  return (
    <BootstrapNavbar className="app-navbar">
      <Container fluid className="app-navbar-content p-0 d-flex flex-column flex-md-row gap-2 align-items-stretch align-items-md-center">
        <Nav className="d-flex flex-row flex-wrap gap-2 align-items-center">
          <Button
            className={`app-navbar-logo-button ${
              vistaActual === 'home' ? 'app-navbar-home-active' : ''
            }`}
            variant="outline-secondary"
            size="sm"
            onClick={() => cambiarVista('home')}
            aria-label="Ir a inicio"
            type="button"
          >
            <img
              className="app-navbar-logo"
              src={logoIcon}
              alt="Matamounstruos"
            />
          </Button>

          <Button
            className={`${
              vistaActual === 'baraja' ? 'app-navbar-baraja-active' : ''
            }`}
            variant="outline-secondary"
            size="sm"
            onClick={() => cambiarVista('baraja')}
            type="button"
          >
            Baraja
          </Button>

          <Button
            className={`${
              vistaActual === 'carta' ? 'app-navbar-carta-active' : ''
            }`}
            variant="outline-secondary"
            size="sm"
            onClick={() => cambiarVista('carta')}
            type="button"
          >
            Carta
          </Button>

          <Button
            className={`${
              vistaActual === 'tematica' ? 'app-navbar-tematica-active' : ''
            }`}
            variant="outline-secondary"
            size="sm"
            onClick={() => cambiarVista('tematica')}
            type="button"
          >
            Tema
          </Button>

          <Button
            className={`${
              vistaActual === 'juego' ? 'app-navbar-juego-active' : ''
            }`}
            variant="outline-secondary"
            size="sm"
            onClick={() => cambiarVista('juego')}
            type="button"
          >
            Juego
          </Button>
        </Nav>

        {usuarioActivo && (
          /* Solo se muestra cuando App.jsx ya tiene un usuario activo. */
          <span className="app-navbar-user">
            Usuario: {usuarioActivo.nombre}
          </span>
        )}

        {/* Buscador sencillo: localiza texto dentro de la pagina actual. */}
        <Form
          className="d-flex gap-2 app-navbar-search ms-md-auto"
          onSubmit={buscarEnPagina}
        >
          <Form.Control
            type="search"
            placeholder="Buscar"
            aria-label="Search"
            value={busqueda}
            onChange={(event) => setBusqueda(event.target.value)}
          />

          <Button variant="outline-info" type="submit">
            Buscar
          </Button>
        </Form>
      </Container>
    </BootstrapNavbar>
  )
}

export default Navbar
