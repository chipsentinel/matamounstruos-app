import { useState } from 'react'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Swal from 'sweetalert2'
import { createUsuario, getUsuarios } from '../services/api'

function CardUsuario({ onAcceso }) {
  const [nombre, setNombre] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function manejarAcceso(event) {
    event.preventDefault()
    await accederUsuario()
  }

  // Muestra errores de acceso y registro con SweetAlert2.
  function mostrarError(mensaje) {
    setError(mensaje)
    Swal.fire('Error', mensaje, 'error')
  }

  async function accederUsuario() {
    setError('')

    try {
      if (!nombre || !password) {
        mostrarError('Introduce nick y password.')
        return
      }

      const usuarios = await getUsuarios()
      const usuarioEncontrado = usuarios.find((usuario) => usuario.nombre === nombre)

      if (!usuarioEncontrado) {
        mostrarError('Usuario no encontrado. Puedes registrarte con ese nombre.')
        return
      }

      await Swal.fire('Acceso correcto', `Bienvenido, ${usuarioEncontrado.nombre}.`, 'success')
      onAcceso(usuarioEncontrado)
    } catch (error) {
      mostrarError(error.message)
    }
  }

  async function registrarUsuario() {
    setError('')

    try {
      if (!nombre || !password) {
        mostrarError('Introduce nick y password.')
        return
      }

      const usuarioCreado = await createUsuario({ nombre, password })

      await Swal.fire('Usuario registrado', `Bienvenido, ${nombre}.`, 'success')
      onAcceso({
        idUsuario: usuarioCreado.idUsuario,
        nombre,
        rol: 'usuario',
      })
    } catch (error) {
      mostrarError(error.message)
    }
  }

  return (
    <section className="container py-4 view-container">
      <Card className="view-card">
        <Card.Body>
          <Card.Title>Identificate</Card.Title>
          <Card.Text>
            Accede para administrar barajas, cartas y tarjetas temáticas.
          </Card.Text>

          <Form onSubmit={manejarAcceso}>
            <Form.Group className="mb-3" controlId="usuarioNick">
              <Form.Label>Nick</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nick"
                value={nombre}
                onChange={(event) => setNombre(event.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="usuarioPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Group>

            {error && <p>{error}</p>}

            <Button
              className="button-acceso me-2"
              variant="primary"
              type="submit"
            >
              Acceso
            </Button>

            <Button
              className="button-registro"
              variant="primary"
              type="button"
              onClick={registrarUsuario}
            >
              Registro
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </section>
  )
}

export default CardUsuario
