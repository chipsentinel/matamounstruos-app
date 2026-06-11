// Hooks de React.
// useState guarda datos que cambian en pantalla.
// useEffect ejecuta codigo cuando el componente se carga.
import { useEffect, useState } from 'react';

// Componentes visuales de React-Bootstrap.
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Accordion from 'react-bootstrap/Accordion';
import Pagination from 'react-bootstrap/Pagination';
import Form from 'react-bootstrap/Form';

// Funcion del servicio API que pide las barajas al backend.
import { getBarajas } from '../services/api';

function BarajaView() {
  const [barajas, setBarajas] = useState([]);      // Guarda la lista de barajas recibidas desde el backend.
  const [cargando, setCargando] = useState(false); // Indica si la peticion al backend esta en proceso.
  const [error, setError] = useState('');          // Guarda un mensaje de error si la peticion falla.

  // Carga las barajas cuando se entra por primera vez en esta vista.
  useEffect(() => {
    async function cargarBarajas() {
      try {
        setCargando(true);
        setError('');

        const data = await getBarajas();
        setBarajas(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setCargando(false);
      }
    }

    cargarBarajas();
  }, []);

  return (
    <section className="container py-4 d-flex flex-column gap-3 view-container">
      <Card className="view-card mb-2">
        <Card.Body>
          <Card.Title>Gestión de Barajas y Cartas</Card.Title>
          <Card.Text>
            Aquí se listarán, crearán, editarán y eliminarán barajas y cartas.
          </Card.Text>
        </Card.Body>
      </Card>

      <div className="baraja-panel view-panel">
        <ButtonGroup size="lg" className="mb-2">
          <Button>Baraja</Button>
          <Button>Carta</Button>
        </ButtonGroup>

        <ButtonGroup size="lg" className="mb-2">
          <Button>Crear</Button>
          <Button>Editar</Button>
          <Button>Borrar</Button>
        </ButtonGroup>

        {/* Baraja (en el futuro pondre el valor y numeroCartasRepetidas de las cartas cuando se despliegue). */}
        <section className="mb-4">
          {cargando && <p>Cargando barajas...</p>}
          {error && <p>{error}</p>}

          <Accordion defaultActiveKey="barajas" flush>
            <Accordion.Item eventKey="barajas">
              <Accordion.Header>Barajas</Accordion.Header>

              <Accordion.Body>
                <Accordion flush>
                  {barajas.map((baraja, index) => (
                    <Accordion.Item eventKey={String(index)} key={baraja.idBaraja}>
                      <Accordion.Header>
                        Baraja: {baraja.nombre}
                      </Accordion.Header>

                      <Accordion.Body>
                        {baraja.descripcion || 'Aquí se verán las cartas de esta baraja.'}
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <Pagination>
            <Pagination.First />
            <Pagination.Prev />
            <Pagination.Item active>{1}</Pagination.Item>
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
                  {barajas.map((baraja) => (
                    <option key={baraja.idBaraja} value={baraja.idBaraja}>
                      {baraja.nombre}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="inputNombreBaraja">Datos</Form.Label>
                <Form.Control id="inputNombreBaraja" placeholder="Nombre" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  id="inputDescripcionBaraja"
                  placeholder="Escribe aquí la descripcion"
                />
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
                    {barajas.map((baraja) => (
                      <option key={baraja.idBaraja} value={baraja.idBaraja}>
                        {baraja.nombre}
                      </option>
                    ))}
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
