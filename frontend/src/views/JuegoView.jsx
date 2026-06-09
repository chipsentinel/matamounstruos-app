import Card from 'react-bootstrap/Card';

function JuegoView() {
  return (
    <section className="container py-4 d-flex flex-column gap-3">
      <Card style={{ width: '18rem' }} className="mb-2">
        <Card.Body>
          <Card.Title> Juego </Card.Title>
          <Card.Text>
            Aquí se seleccionará una baraja y se obtendrá una carta aleatoria.
          </Card.Text>
        </Card.Body>
      </Card>

      <div className="juego-panel">

      </div>

      <div className="actions">
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
  );
}

export default JuegoView;