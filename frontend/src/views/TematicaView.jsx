import Card from 'react-bootstrap/Card';

function TematicaView() {
  return (
    <section className="container py-4 d-flex flex-column gap-3">
      <Card style={{ width: '18rem' }} className="mb-2">
        <Card.Body>
          <Card.Title> Temática </Card.Title>
          <Card.Text>
            Aquí se consultarán y crearán tarjetas de teoría.
          </Card.Text>
        </Card.Body>
      </Card>
      
      <div className="tematica-panel">

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
          </div>

    </section>
  );
}

export default TematicaView;