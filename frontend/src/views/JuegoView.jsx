import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import cartaStandar from '../assets/carta-standar.webp'


function JuegoView() {
  return (
    <section className="container py-4 d-flex flex-column gap-3 view-container">
      <Card className="view-card mb-2">
        <Card.Body>
          <Card.Title> Juego </Card.Title>
          <Card.Text>
            Aquí se seleccionará una baraja y se obtendrá una carta aleatoria.
          </Card.Text>
        </Card.Body>
      </Card>

      <div className="juego-panel view-panel">
        <section className="mb-4">
            {/* Aqui he dudado entre elegir acordeon sobre form */}
            <Form.Group className="mb-3">
                <Form.Select id="selectBarajaJuego">
                    <option>Elige tu Baraja</option>
                </Form.Select>
            </Form.Group>
            <Card className="game-card mb-3">
            <div className="position-relative">
               <Card.Img className="card-image" variant="top" src={cartaStandar} />

                {/* Resultado visual de ejemplo. Mas adelante vendra de la API. */}
                <div className="card-result-content position-absolute top-50 start-50 translate-middle text-center bg-light bg-opacity-75 p-2 rounded">
                    <h3 className="mb-1">Reina</h3>
                    <p className="mb-1">Valor: 11</p>
                    <strong>PRUEBA_OTRA_VEZ</strong>
                </div>
            </div>

            <Card.Body>
                <Button variant="secondary">Juega</Button>
                <Button variant="secondary">Probar otra vez</Button>
            </Card.Body>
            </Card>

            {/* Esta tarjeta solo se mostrara si el resultado es NO_APTO o PRUEBA_OTRA_VEZ. */}
            <Card className="game-card">
            <Card.Body>
                <Card.Title>Tarjeta temática</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                Titulo Baraja
                </Card.Subtitle>
                <Card.Text>
                Contenido asociado a la baraja.
                </Card.Text>
            </Card.Body>
            </Card>

        </section>
      </div>

      <div className="actions view-actions">
            <Card className="action-card">
            <Card.Body>
                <Card.Title>Crea tu baraja</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Baraja y Cartas</Card.Subtitle>
                <Card.Text>
                Diseña tu mismo tu propia baraja y tus propias cartas
                </Card.Text>
                <Card.Link href="#">Card Link</Card.Link>
            </Card.Body>
            </Card>

            <Card className="action-card">
            <Card.Body>
                <Card.Title>Crea tu temática</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Inventa tus tarjetas</Card.Subtitle>
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