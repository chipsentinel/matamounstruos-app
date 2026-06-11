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

// Funciones del servicio API que piden barajas y usuarios al backend.
import {
  createBaraja,
  deleteBaraja,
  getBarajas,
  getUsuarios,
  updateBaraja,
} from '../services/api';

function BarajaView({ usuarioActivo }) {
  // Datos principales que vienen del backend y se pintan en la vista.
  const [barajas, setBarajas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  // Estados de seleccion visual.
  const [barajaSeleccionada, setBarajaSeleccionada] = useState(null);
  const [accionActiva, setAccionActiva] = useState('crear');

  // Campos usados por los formularios de baraja.
  const [idBarajaFormulario, setIdBarajaFormulario] = useState('');
  const [nombreBaraja, setNombreBaraja] = useState('');
  const [descripcionBaraja, setDescripcionBaraja] = useState('');

  // Mensajes de pantalla.
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const [mensajeFormulario, setMensajeFormulario] = useState('');

  // Pide las barajas al backend y actualiza el listado en pantalla.
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

  // Recarga barajas despues de crear, editar o borrar.
  async function recargarDatos() {
    await cargarBarajas();
  }

  // Carga las barajas cuando se entra por primera vez en esta vista.
  useEffect(() => {
    async function cargarDatosIniciales() {
      await cargarBarajas();
      await cargarUsuarios();
    }

    cargarDatosIniciales();
  }, []);

  // Crea una baraja usando el usuario identificado en CardUsuario.
  async function crearNuevaBaraja(event) {
    event.preventDefault();
    setError('');
    setMensajeFormulario('');

    try {
      if (!usuarioActivo?.idUsuario) {
        setError('Necesitas identificarte para crear una baraja.');
        return;
      }

      if (!nombreBaraja || !descripcionBaraja) {
        setError('Completa nombre y descripcion de la baraja.');
        return;
      }

      await createBaraja({
        nombre: nombreBaraja,
        descripcion: descripcionBaraja,
        idUsuario: usuarioActivo.idUsuario,
      });

      setNombreBaraja('');
      setDescripcionBaraja('');
      setMensajeFormulario('Baraja creada correctamente.');
      await recargarDatos();
    } catch (error) {
      setError(error.message);
    }
  }

  // Edita una baraja seleccionada desde el formulario.
  async function editarBarajaSeleccionada(event) {
    event.preventDefault();
    setError('');
    setMensajeFormulario('');

    try {
      if (!idBarajaFormulario) {
        setError('Selecciona una baraja para editar.');
        return;
      }

      if (!nombreBaraja || !descripcionBaraja) {
        setError('Completa nombre y descripcion de la baraja.');
        return;
      }

      await updateBaraja(idBarajaFormulario, {
        nombre: nombreBaraja,
        descripcion: descripcionBaraja,
      });

      setIdBarajaFormulario('');
      setNombreBaraja('');
      setDescripcionBaraja('');
      setMensajeFormulario('Baraja editada correctamente.');
      await recargarDatos();
    } catch (error) {
      setError(error.message);
    }
  }

  // Borra una baraja si el usuario tiene permisos en el backend.
  async function borrarBarajaSeleccionada(event) {
    event.preventDefault();
    setError('');
    setMensajeFormulario('');

    try {
      if (!usuarioActivo?.idUsuario) {
        setError('Necesitas identificarte para borrar una baraja.');
        return;
      }

      if (!idBarajaFormulario) {
        setError('Selecciona una baraja para borrar.');
        return;
      }

      await deleteBaraja(idBarajaFormulario, usuarioActivo.idUsuario);

      setIdBarajaFormulario('');
      setBarajaSeleccionada(null);
      setMensajeFormulario('Baraja borrada correctamente.');
      await recargarDatos();
    } catch (error) {
      setError(error.message);
    }
  }

  // Busca el nombre del usuario propietario de una baraja.
  function obtenerNombrePropietario(idUsuario) {
    const usuario = usuarios.find((usuario) => Number(usuario.idUsuario) === Number(idUsuario));
    return usuario?.nombre || `Usuario ${idUsuario}`;
  }

  // Decide si se muestran todas las barajas o solo la seleccionada.
  const barajasVisibles = barajaSeleccionada ? [barajaSeleccionada] : barajas;

  return (
    <section className="container py-4 d-flex flex-column gap-3 view-container">
      <Card className="view-card mb-2">
        <Card.Body>
          <Card.Title>Gestión de Barajas</Card.Title>
          <Card.Text>
            Aquí se listarán, crearán, editarán y eliminarán barajas.
          </Card.Text>
        </Card.Body>
      </Card>

      <div className="baraja-panel view-panel">
        <section className="mb-4">
          {cargando && <p>Cargando barajas...</p>}

          <Accordion flush>
            <Accordion.Item eventKey="barajas">
              <Accordion.Header>Ver Barajas</Accordion.Header>

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
                  {barajasVisibles.map((baraja, index) => (
                    <Accordion.Item eventKey={String(index)} key={baraja.idBaraja}>
                      <Accordion.Header onClick={() => setBarajaSeleccionada(baraja)}>
                        <span>Baraja: {baraja.nombre}</span>
                        <span className="ms-auto me-3 text-muted small">
                          Propietario: {obtenerNombrePropietario(baraja.idUsuario)}
                        </span>
                      </Accordion.Header>

                      <Accordion.Body>
                        <p className="mb-0">
                          {baraja.descripcion || 'Esta baraja no tiene descripcion.'}
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </section>

        <ButtonGroup size="lg" className="mb-2">
          {/* Selector de accion: cambia entre crear, editar y borrar barajas. */}
          <Button className="button-crear" onClick={() => setAccionActiva('crear')}>Crear</Button>
          <Button className="button-editar" onClick={() => setAccionActiva('editar')}>Editar</Button>
          <Button className="button-borrar" onClick={() => setAccionActiva('borrar')}>Borrar</Button>
        </ButtonGroup>

        <div className="baraja-form">
          {accionActiva === 'crear' && (
            <Form onSubmit={crearNuevaBaraja}>
              <fieldset>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="inputCrearNombreBaraja">Crear baraja</Form.Label>
                  <Form.Control
                    id="inputCrearNombreBaraja"
                    placeholder="Nombre"
                    value={nombreBaraja}
                    onChange={(event) => setNombreBaraja(event.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    id="inputCrearDescripcionBaraja"
                    placeholder="Escribe aquí la descripcion"
                    value={descripcionBaraja}
                    onChange={(event) => setDescripcionBaraja(event.target.value)}
                  />
                </Form.Group>

                <Button className="button-crear" type="submit">Crear baraja</Button>
              </fieldset>
            </Form>
          )}

          {accionActiva === 'editar' && (
            <Form onSubmit={editarBarajaSeleccionada}>
              <fieldset>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="selectEditarBaraja">Editar baraja</Form.Label>
                  <Form.Select
                    id="selectEditarBaraja"
                    value={idBarajaFormulario}
                    onChange={(event) => {
                      const idBaraja = event.target.value;
                      const baraja = barajas.find((baraja) => String(baraja.idBaraja) === idBaraja);

                      setIdBarajaFormulario(idBaraja);
                      setNombreBaraja(baraja?.nombre || '');
                      setDescripcionBaraja(baraja?.descripcion || '');
                    }}
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
                  <Form.Control
                    id="inputEditarNombreBaraja"
                    placeholder="Nuevo nombre"
                    value={nombreBaraja}
                    onChange={(event) => setNombreBaraja(event.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    id="inputEditarDescripcionBaraja"
                    placeholder="Nueva descripcion"
                    value={descripcionBaraja}
                    onChange={(event) => setDescripcionBaraja(event.target.value)}
                  />
                </Form.Group>

                <Button className="button-editar" type="submit">Editar baraja</Button>
              </fieldset>
            </Form>
          )}

          {accionActiva === 'borrar' && (
            <Form onSubmit={borrarBarajaSeleccionada}>
              <fieldset>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="selectBorrarBaraja">Borrar baraja</Form.Label>
                  <Form.Select
                    id="selectBorrarBaraja"
                    value={idBarajaFormulario}
                    onChange={(event) => setIdBarajaFormulario(event.target.value)}
                  >
                    <option value="">Selecciona Baraja</option>
                    {barajas.map((baraja) => (
                      <option key={baraja.idBaraja} value={baraja.idBaraja}>
                        {baraja.nombre}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Button className="button-borrar" type="submit">Borrar baraja</Button>
              </fieldset>
            </Form>
          )}
        </div>

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
            <Card.Title>Cómo usar Barajas</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Organiza tus contenidos</Card.Subtitle>
            <Card.Text>
              Abre el acordeón para consultar las barajas creadas. Usa los botones
              Crear, Editar y Borrar para administrar tus barajas con el usuario
              identificado.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </section>
  );
}

export default BarajaView;
