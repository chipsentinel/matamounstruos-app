import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'

function CardUsuario({ onAcceso }) {
  function manejarAcceso(event) {
    event.preventDefault()
    onAcceso()
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
              <Form.Control type="text" placeholder="Nick" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="usuarioPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Acceso
            </Button>
            <Button variant="primary" type="submit">
              Registro
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </section>
  )
}

export default CardUsuario
