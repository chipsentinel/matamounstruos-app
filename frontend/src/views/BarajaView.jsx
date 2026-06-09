import Card from 'react-bootstrap/Card';

function BarajaView() {
  return (
    <section className="container py-4 d-flex flex-column gap-3">
      <Card style={{ width: '18rem' }} className="mb-2">
        <Card.Body>
          <Card.Title> Gestión de Barajas y Cartas </Card.Title>
          <Card.Text>
            Aquí se listarán, crearán, editarán y eliminarán barajas y cartas.
          </Card.Text>
        </Card.Body>
      </Card>
      
      <div className="baraja-panel">

      </div>

      <div className="actions">
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

export default BarajaView;