import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Accordion from 'react-bootstrap/Accordion';
import Pagination from 'react-bootstrap/Pagination';
import Form from 'react-bootstrap/Form';

function TematicaView() {
  return (
    <section className="container py-4 d-flex flex-column gap-3 view-container">
      <Card className="view-card mb-2">
        <Card.Body>
          <Card.Title> Temática </Card.Title>
          <Card.Text>
            Aquí se consultarán y crearán tarjetas de teoría.
          </Card.Text>
        </Card.Body>
      </Card>
      
      {/* Tarjeta ( queda previsto para el futuro PUT y DELETE) */}
      <div className="tematica-panel view-panel">
        <ButtonGroup size="lg" className="mb-2">
          <Button>Crear</Button>
          <Button>Editar</Button> {/* No funciona */}
          <Button>Borrar</Button> {/* No funciona */}
        </ButtonGroup>

        {/* Tarjeta ( en el futuro pondre titulo + contenido de las tarjetas cuando se despliegue) */}
        <section className="mb-4">
          <Accordion defaultActiveKey="0" flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Baraja: Autoría Gitflow</Accordion.Header>
              <Accordion.Body>
                Aquí se verán las tarjetas de esta baraja.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>Baraja: SQL básico</Accordion.Header>
              <Accordion.Body>
                Aquí se verán las tarjetas de esta baraja.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <Pagination>
            <Pagination.First />
            <Pagination.Prev />
            <Pagination.Item>{1}</Pagination.Item>
            <Pagination.Ellipsis />

            <Pagination.Item>{10}</Pagination.Item>
            <Pagination.Item>{11}</Pagination.Item>
            <Pagination.Item active>{12}</Pagination.Item>
            <Pagination.Item>{13}</Pagination.Item>
            <Pagination.Item disabled>{14}</Pagination.Item>

            <Pagination.Ellipsis />
            <Pagination.Item>{20}</Pagination.Item>
            <Pagination.Next />
            <Pagination.Last />
          </Pagination>
        </section>

        <div className="carta-form">
          <Form>
            <fieldset>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="selectBarajaTematica">Temática</Form.Label>
                <div className="d-flex flex-column flex-md-row gap-2">
                  <Form.Select id="selectBarajaTematica">
                    <option>Selecciona Baraja</option>
                  </Form.Select>
                  <Form.Select id="selectTarjetaTematica">
                    <option>Selecciona Tarjeta</option>
                  </Form.Select>
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="inputTituloTarjeta">Datos</Form.Label>
                <Form.Control id="inputTituloTarjeta" placeholder="Título" />
                <Form.Control id="inputContenidoTarjeta" placeholder="Contenido" />
              </Form.Group>
    
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  id="checkTematicaForm"
                  label="Can't check this"
                />
              </Form.Group>
              <Button type="submit">Submit</Button>
            </fieldset>
          </Form>
        </div>
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
          </div>

    </section>
  );
}

export default TematicaView;