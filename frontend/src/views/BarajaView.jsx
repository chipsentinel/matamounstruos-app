import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Accordion from 'react-bootstrap/Accordion';
import Pagination from 'react-bootstrap/Pagination';
import Form from 'react-bootstrap/Form';


function BarajaView() {
  return (
    <section className="container py-4 d-flex flex-column gap-3 view-container">
      <Card className="view-card mb-2">
        <Card.Body>
          <Card.Title> Gestión de Barajas y Cartas </Card.Title>
          <Card.Text>
            Aquí se listarán, crearán, editarán y eliminarán barajas y cartas.
          </Card.Text>
        </Card.Body>
      </Card>
      
      <div className="baraja-panel view-panel">
        <ButtonGroup size="lg" className="mb-2">
          <Button>Crear</Button>
          <Button>Editar</Button>
          <Button>Borrar</Button>
        </ButtonGroup>
        <ButtonGroup size="lg" className="mb-2">
          <Button>Baraja</Button>
          <Button>Carta</Button>
        </ButtonGroup>

        {/* Baraja ( en el futuro pondre el valor y numeroCartasRepetidas de las cartas cuand se despliegue) */}
        <section className="mb-4">
          <Accordion defaultActiveKey="0" flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Baraja: Autoría Gitflow</Accordion.Header>
              <Accordion.Body>
                Aquí se verán las cartas de esta baraja.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>Baraja: SQL básico</Accordion.Header>
              <Accordion.Body>
                Aquí se verán las cartas de esta baraja.
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

        <div className="baraja-form">
          <Form>
            <fieldset>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="selectBarajaForm">Barajas</Form.Label>
                <Form.Select id="selectBarajaForm">
                  <option>Selecciona Baraja</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="inputNombreBaraja">Datos</Form.Label>
                <Form.Control id="inputNombreBaraja" placeholder="Nombre" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control id="inputDescripcionBaraja" placeholder="Escribe aquí la descripcion" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  id="checkBarajaForm"
                  label="Can't check this"
                />
              </Form.Group>
              <Button type="submit">Submit</Button>
            </fieldset>
          </Form>

        </div>
        <div className="carta-form">
          <Form>
            <fieldset>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="selectBarajaCarta">Cartas</Form.Label>
                <div className="d-flex flex-column flex-md-row gap-2">
                  <Form.Select id="selectBarajaCarta">
                    <option>Selecciona Baraja</option>
                  </Form.Select>
                  <Form.Select id="selectCartaForm">
                    <option>Selecciona Carta</option>
                  </Form.Select>
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="inputNombreCarta">Datos</Form.Label>
                <Form.Control id="inputNombreCarta" placeholder="Nombre" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Select id="selectTipoResultado">
                    <option>Tipo de Resultado</option>
                  </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  id="checkCartaForm"
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

export default BarajaView;