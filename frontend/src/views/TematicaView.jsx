// Hooks de React.
// useState guarda datos que cambian en pantalla.
// useEffect ejecuta codigo cuando el componente se carga.
import { useEffect, useState } from 'react';

// Componentes visuales de React-Bootstrap.
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';

// Funciones del servicio API que piden barajas, usuarios y tarjetas al backend.
import {
  createTarjeta,
  getBarajas,
  getTarjetas,
  getUsuarios,
} from '../services/api';

function TematicaView({ usuarioActivo }) {
  // Datos principales que vienen del backend y se pintan en la vista.
  const [barajas, setBarajas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [tarjetas, setTarjetas] = useState([]);

  // Estados de seleccion visual.
  const [barajaSeleccionada, setBarajaSeleccionada] = useState(null);
  const [accionActiva, setAccionActiva] = useState('crear');

  // Campos usados por el formulario de crear tarjeta.
  const [idBarajaTarjeta, setIdBarajaTarjeta] = useState('');
  const [tituloTarjeta, setTituloTarjeta] = useState('');
  const [contenidoTarjeta, setContenidoTarjeta] = useState('');

  // Mensajes de pantalla.
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const [mensajeFormulario, setMensajeFormulario] = useState('');

  // Pide las barajas al backend para poder agrupar las tarjetas.
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

  // Pide las tarjetas al backend para mostrarlas en la vista.
  async function cargarTarjetas() {
    try {
      setError('');

      const data = await getTarjetas();
      setTarjetas(data);
    } catch (error) {
      setError(error.message);
    }
  }

  // Pide usuarios para poder mostrar el propietario de cada baraja.
  async function cargarUsuarios() {
    try {
      setError('');

      const data = await getUsuarios();
      setUsuarios(data);
    } catch (error) {
      setError(error.message);
    }
  }

  // Recarga la informacion despues de crear una tarjeta.
  async function recargarDatos() {
    await cargarBarajas();
    await cargarTarjetas();
  }

  // Carga los datos principales cuando se entra por primera vez en esta vista.
  useEffect(() => {
    cargarBarajas();
    cargarTarjetas();
    cargarUsuarios();
  }, []);

  // Crea una tarjeta asociada a una baraja.
  async function crearNuevaTarjeta(event) {
    event.preventDefault();
    setError('');
    setMensajeFormulario('');

    try {
      if (!idBarajaTarjeta) {
        setError('Selecciona una baraja para crear la tarjeta.');
        return;
      }

      if (!tituloTarjeta || !contenidoTarjeta) {
        setError('Completa titulo y contenido de la tarjeta.');
        return;
      }

      await createTarjeta({
        titulo: tituloTarjeta,
        contenido: contenidoTarjeta,
        idBaraja: Number(idBarajaTarjeta),
      });

      setTituloTarjeta('');
      setContenidoTarjeta('');
      setMensajeFormulario('Tarjeta creada correctamente.');
      await recargarDatos();
    } catch (error) {
      setError(error.message);
    }
  }

  // Deja claro que editar y borrar tarjetas todavia no existen en el backend.
  function avisarMejoraFutura(accion) {
    setError('');
    setMensajeFormulario(`La accion ${accion} queda como mejora futura. El backend aun no tiene ese CRUD.`);
  }

  // Busca el nombre del usuario propietario de una baraja.
  function obtenerNombrePropietario(idUsuario) {
    const usuario = usuarios.find((usuario) => Number(usuario.idUsuario) === Number(idUsuario));
    return usuario?.nombre || `Usuario ${idUsuario}`;
  }

  // Devuelve las tarjetas asociadas a una baraja concreta.
  function obtenerTarjetasPorBaraja(idBaraja) {
    return tarjetas.filter((tarjeta) => Number(tarjeta.idBaraja) === Number(idBaraja));
  }

  // Decide si se muestran todas las barajas o solo la seleccionada.
  const barajasVisibles = barajaSeleccionada ? [barajaSeleccionada] : barajas;

  return (
    <section className="container py-4 d-flex flex-column gap-3 view-container">
      <Card className="view-card mb-2">
        <Card.Body>
          <Card.Title>Temática</Card.Title>
          <Card.Text>
            Aquí se consultarán y crearán tarjetas de teoría.
          </Card.Text>
        </Card.Body>
      </Card>

      <div className="tematica-panel view-panel">
        <section className="mb-4">
          {cargando && <p>Cargando temáticas...</p>}

          <Accordion flush>
            <Accordion.Item eventKey="tematicas">
              <Accordion.Header>Ver Tarjetas por Baraja</Accordion.Header>

              <Accordion.Body>
                {barajaSeleccionada && (
                  <Button
                    className="mb-3"
                    size="sm"
                    type="button"
                    variant="outline-secondary"
                    onClick={() => setBarajaSeleccionada(null)}
                  >
                    Ver todas las barajas
                  </Button>
                )}

                <Accordion activeKey={barajaSeleccionada ? '0' : undefined} flush>
                  {barajasVisibles.map((baraja, index) => {
                    const tarjetasDeBaraja = obtenerTarjetasPorBaraja(baraja.idBaraja);

                    return (
                      <Accordion.Item eventKey={String(index)} key={baraja.idBaraja}>
                        <Accordion.Header onClick={() => setBarajaSeleccionada(baraja)}>
                          <span>Baraja: {baraja.nombre}</span>
                          <span className="ms-auto me-3 text-muted small">
                            Propietario: {obtenerNombrePropietario(baraja.idUsuario)}
                          </span>
                        </Accordion.Header>

                        <Accordion.Body>
                          {tarjetasDeBaraja.length === 0 && (
                            <p className="mb-0">Esta baraja aun no tiene tarjetas.</p>
                          )}

                          {tarjetasDeBaraja.map((tarjeta) => (
                            <Card className="mb-2" key={tarjeta.idTarjeta}>
                              <Card.Body>
                                <Card.Title>{tarjeta.titulo}</Card.Title>
                                <Card.Text>{tarjeta.contenido}</Card.Text>
                              </Card.Body>
                            </Card>
                          ))}
                        </Accordion.Body>
                      </Accordion.Item>
                    );
                  })}
                </Accordion>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </section>

        <ButtonGroup size="lg" className="mb-2">
          {/* Editar y borrar quedan preparados visualmente para cuando exista PUT/DELETE de tarjetas. */}
          <Button className="button-crear" onClick={() => setAccionActiva('crear')}>Crear</Button>
          <Button className="button-editar" onClick={() => avisarMejoraFutura('editar')}>Editar</Button>
          <Button className="button-borrar" onClick={() => avisarMejoraFutura('borrar')}>Borrar</Button>
        </ButtonGroup>

        {accionActiva === 'crear' && (
          <div className="tematica-form">
            <Form onSubmit={crearNuevaTarjeta}>
              <fieldset>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="selectCrearTarjetaBaraja">Crear tarjeta</Form.Label>
                  <Form.Select
                    id="selectCrearTarjetaBaraja"
                    value={idBarajaTarjeta}
                    onChange={(event) => setIdBarajaTarjeta(event.target.value)}
                  >
                    <option value="">Selecciona Baraja</option>
                    {barajas.map((baraja) => (
                      <option key={baraja.idBaraja} value={baraja.idBaraja}>
                        {baraja.nombre}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label htmlFor="inputTituloTarjeta">Datos</Form.Label>
                  <Form.Control
                    id="inputTituloTarjeta"
                    placeholder="Título"
                    value={tituloTarjeta}
                    onChange={(event) => setTituloTarjeta(event.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    id="inputContenidoTarjeta"
                    placeholder="Contenido"
                    value={contenidoTarjeta}
                    onChange={(event) => setContenidoTarjeta(event.target.value)}
                  />
                </Form.Group>

                <Button className="button-crear" type="submit">Crear tarjeta</Button>
              </fieldset>
            </Form>
          </div>
        )}

        {error && (
          <p className="text-danger mb-0">{error}</p>
        )}

        {mensajeFormulario && (
          <p className="text-success mb-0">{mensajeFormulario}</p>
        )}
      </div>

      <div className="actions view-actions">
        <Card className="action-card">
          <Card.Body>
            <Card.Title>Cómo usar Temática</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Crea tarjetas de repaso</Card.Subtitle>
            <Card.Text>
              Consulta las tarjetas agrupadas por baraja y crea nuevas tarjetas
              indicando título, contenido y baraja asociada. Editar y borrar quedan
              preparados como mejora futura porque el backend aún no tiene esos CRUD.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </section>
  );
}

export default TematicaView;
