import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import logoFull from '../assets/logo-full.webp'

function HomeView() {
  return (
        <section className="container py-4 d-flex flex-column gap-3">
          <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={logoFull} />
          <Card.Body>
            <Card.Title>Matamoustros</Card.Title>
            <Card.Text>
            Juego pedagógico... Some quick example text to build on the card title and make up the
            bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Comienza a Jugar</Button>
          </Card.Body>
          </Card>
          
          <div className="home-actions">
            <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>Crea tu baraja</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Baraja y Cartas</Card.Subtitle>
                <Card.Text>
                Diseña tu mismo tu propia baraja y tus propias cartas
                </Card.Text>
                <Card.Link href="#">Card Link</Card.Link>
            </Card.Body>
            </Card>

            <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>Crea tu temática</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Infenta tus tarjetas</Card.Subtitle>
                <Card.Text>
                Diseña tu propio material para jugar, repasar, memorizar...
                </Card.Text>
                <Card.Link href="#">Card Link</Card.Link>
            </Card.Body>
            </Card>
          </div>
    </section>
  )
}

export default HomeView;