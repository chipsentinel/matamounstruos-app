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

// Funciones del servicio API que piden cartas, barajas y usuarios al backend.
import {
  createCarta,
  deleteCarta,
  getBarajas,
  getCartas,
  getCartasPorBaraja,
  getUsuarios,
  updateCarta,
} from '../services/api';

function CartaView({ usuarioActivo }) {
  // Datos principales que vienen del backend y se pintan en la vista.
  const [barajas, setBarajas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [cartasPorBaraja, setCartasPorBaraja] = useState({});
  const [cartas, setCartas] = useState([]);

  // Estados de seleccion visual.
  const [barajaSeleccionada, setBarajaSeleccionada] = useState(null);
  const [valorSeleccionado, setValorSeleccionado] = useState({});
  const [accionActiva, setAccionActiva] = useState('crear');

  // Campos usados por los formularios de carta.
  const [idBarajaCarta, setIdBarajaCarta] = useState('');
  const [idCartaFormulario, setIdCartaFormulario] = useState('');
  const [nombreCarta, setNombreCarta] = useState('');
  const [valorCarta, setValorCarta] = useState('');
  const [tipoResultado, setTipoResultado] = useState('');

  // Mensajes de pantalla.
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const [mensajeFormulario, setMensajeFormulario] = useState('');

  // Pide las barajas al backend para poder agrupar cartas por baraja.
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

  // Pide todas las cartas al backend para rellenar selects de editar y borrar.
  async function cargarCartas() {
    try {
      setError('');

      const data = await getCartas();
      setCartas(data);
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

  // Recarga cartas despues de crear, editar o borrar.
  async function recargarDatos() {
    setCartasPorBaraja({});
    setValorSeleccionado({});
    await cargarBarajas();
    await cargarCartas();
  }

  // Carga los datos principales cuando se entra por primera vez en esta vista.
  useEffect(() => {
    cargarBarajas();
    cargarCartas();
    cargarUsuarios();
  }, []);

  // Crea una carta dentro de la baraja seleccionada.
  async function crearNuevaCarta(event) {
    event.preventDefault();
    setError('');
    setMensajeFormulario('');

    try {
      if (!idBarajaCarta) {
        setError('Selecciona una baraja para crear la carta.');
        return;
      }

      if (!nombreCarta || !valorCarta || !tipoResultado) {
        setError('Completa nombre, valor y tipo de resultado de la carta.');
        return;
      }

      await createCarta({
        nombre: nombreCarta,
        valor: Number(valorCarta),
        tipoResultado,
        idBaraja: Number(idBarajaCarta),
      });

      setNombreCarta('');
      setValorCarta('');
      setTipoResultado('');
      setMensajeFormulario('Carta creada correctamente.');
      await recargarDatos();
    } catch (error) {
      setError(error.message);
    }
  }

  // Edita una carta seleccionada desde el formulario.
  async function editarCartaSeleccionada(event) {
    event.preventDefault();
    setError('');
    setMensajeFormulario('');

    try {
      if (!idCartaFormulario) {
        setError('Selecciona una carta para editar.');
        return;
      }

      if (!nombreCarta || !valorCarta || !tipoResultado) {
        setError('Completa nombre, valor y tipo de resultado de la carta.');
        return;
      }

      await updateCarta(idCartaFormulario, {
        nombre: nombreCarta,
        valor: Number(valorCarta),
        tipoResultado,
      });

      setIdCartaFormulario('');
      setNombreCarta('');
      setValorCarta('');
      setTipoResultado('');
      setMensajeFormulario('Carta editada correctamente.');
      await recargarDatos();
    } catch (error) {
      setError(error.message);
    }
  }

  // Borra una carta si el usuario tiene permisos en el backend.
  async function borrarCartaSeleccionada(event) {
    event.preventDefault();
    setError('');
    setMensajeFormulario('');

    try {
      if (!usuarioActivo?.idUsuario) {
        setError('Necesitas identificarte para borrar una carta.');
        return;
      }

      if (!idCartaFormulario) {
        setError('Selecciona una carta para borrar.');
        return;
      }

      await deleteCarta(idCartaFormulario, usuarioActivo.idUsuario);

      setIdCartaFormulario('');
      setMensajeFormulario('Carta borrada correctamente.');
      await recargarDatos();
    } catch (error) {
      setError(error.message);
    }
  }

  // Carga las cartas de una baraja cuando el usuario abre esa baraja.
  async function cargarCartasDeBaraja(idBaraja, forzarRecarga = false) {
    const baraja = barajas.find((baraja) => baraja.idBaraja === idBaraja);
    setBarajaSeleccionada(baraja);

    // Si ya tenemos las cartas cargadas, no repetimos la llamada salvo que se pida refrescar.
    if (cartasPorBaraja[idBaraja] && !forzarRecarga) {
      return;
    }

    try {
      setError('');

      const data = await getCartasPorBaraja(idBaraja);

      setCartasPorBaraja((cartasActuales) => ({
        ...cartasActuales,
        [idBaraja]: data,
      }));
    } catch (error) {
      setError(error.message);
    }
  }

  // Busca si existe una carta con el valor indicado dentro de una baraja.
  function obtenerCartaPorValor(cartas, valor) {
    return cartas.find((carta) => Number(carta.valor) === valor);
  }

  // Devuelve todas las cartas que tienen el mismo valor dentro de una baraja.
  function obtenerCartasPorValor(cartas, valor) {
    return cartas.filter((carta) => Number(carta.valor) === valor);
  }

  // Busca el nombre del usuario propietario de una baraja.
  function obtenerNombrePropietario(idUsuario) {
    const usuario = usuarios.find((usuario) => Number(usuario.idUsuario) === Number(idUsuario));
    return usuario?.nombre || `Usuario ${idUsuario}`;
  }

  // Decide si se muestran todas las barajas o solo la seleccionada.
  const barajasVisibles = barajaSeleccionada ? [barajaSeleccionada] : barajas;

  // Filtra las cartas del formulario segun la baraja elegida.
  const cartasFormulario = idBarajaCarta
    ? cartas.filter((carta) => String(carta.idBaraja) === String(idBarajaCarta))
    : cartas;

  return (
    <section className="container py-4 d-flex flex-column gap-3 view-container">
      <Card className="view-card mb-2">
        <Card.Body>
          <Card.Title>Gestión de Cartas</Card.Title>
          <Card.Text>
            Aquí se listarán, crearán, editarán y eliminarán cartas.
          </Card.Text>
        </Card.Body>
      </Card>

      <div className="carta-panel view-panel">
        <section className="mb-4">
          {cargando && <p>Cargando barajas...</p>}

          <Accordion flush>
            <Accordion.Item eventKey="cartas">
              <Accordion.Header>Ver Cartas por Baraja</Accordion.Header>

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
                      <Accordion.Header onClick={() => cargarCartasDeBaraja(baraja.idBaraja)}>
                        <span>Baraja: {baraja.nombre}</span>
                        <span className="ms-auto me-3 text-muted small">
                          Propietario: {obtenerNombrePropietario(baraja.idUsuario)}
                        </span>
                      </Accordion.Header>

                      <Accordion.Body>
                        <p>{baraja.descripcion || 'Aquí se verán las cartas de esta baraja.'}</p>

                        <div className="row g-2">
                          {Array.from({ length: 12 }, (_, index) => {
                            const valor = index + 1;
                            const cartas = cartasPorBaraja[baraja.idBaraja] || [];
                            const carta = obtenerCartaPorValor(cartas, valor);

                            return (
                              <div className="col-3" key={valor}>
                                <button
                                  className="btn btn-outline-secondary w-100"
                                  type="button"
                                  onClick={async () => {
                                    // Refresca cartas antes de mostrar el detalle para ver cambios recientes.
                                    await cargarCartasDeBaraja(baraja.idBaraja, true);
                                    setValorSeleccionado({
                                      ...valorSeleccionado,
                                      [baraja.idBaraja]: valor,
                                    });
                                  }}
                                >
                                  {carta ? carta.valor : valor}
                                </button>
                              </div>
                            );
                          })}
                        </div>

                        {valorSeleccionado[baraja.idBaraja] && (
                          <div className="border rounded p-3 mt-3">
                            {(() => {
                              const valor = valorSeleccionado[baraja.idBaraja];
                              const cartas = cartasPorBaraja[baraja.idBaraja] || [];
                              const cartasDelValor = obtenerCartasPorValor(cartas, valor);
                              const carta = cartasDelValor[0];

                              if (!carta) {
                                return (
                                  <p className="mb-0">
                                    No hay cartas creadas con el valor {valor}.
                                  </p>
                                );
                              }

                              return (
                                <>
                                  <p className="mb-1">
                                    Valor seleccionado: {valor}
                                  </p>
                                  <p className="mb-1">
                                    Cartas con este valor: {cartasDelValor.length}
                                  </p>
                                  <p className="mb-1">
                                    Nombre: {carta.nombre}
                                  </p>
                                  <p className="mb-0">
                                    Resultado: {carta.tipoResultado}
                                  </p>
                                </>
                              );
                            })()}
                          </div>
                        )}
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </section>

        <ButtonGroup size="lg" className="mb-2">
          {/* Selector de accion: cambia entre crear, editar y borrar cartas. */}
          <Button className="button-crear" onClick={() => setAccionActiva('crear')}>Crear</Button>
          <Button className="button-editar" onClick={() => setAccionActiva('editar')}>Editar</Button>
          <Button className="button-borrar" onClick={() => setAccionActiva('borrar')}>Borrar</Button>
        </ButtonGroup>

        <div className="carta-form">
          {accionActiva === 'crear' && (
            <Form onSubmit={crearNuevaCarta}>
              <fieldset>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="selectCrearCartaBaraja">Crear carta</Form.Label>
                  <Form.Select
                    id="selectCrearCartaBaraja"
                    value={idBarajaCarta}
                    onChange={(event) => setIdBarajaCarta(event.target.value)}
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
                    id="inputCrearNombreCarta"
                    placeholder="Nombre"
                    value={nombreCarta}
                    onChange={(event) => setNombreCarta(event.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    id="inputCrearValorCarta"
                    placeholder="Valor"
                    value={valorCarta}
                    onChange={(event) => setValorCarta(event.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Select
                    id="selectCrearTipoResultado"
                    value={tipoResultado}
                    onChange={(event) => setTipoResultado(event.target.value)}
                  >
                    <option value="">Tipo de Resultado</option>
                    <option>APTO</option>
                    <option>NO_APTO</option>
                    <option>PRUEBA_OTRA_VEZ</option>
                  </Form.Select>
                </Form.Group>

                <Button className="button-crear" type="submit">Crear carta</Button>
              </fieldset>
            </Form>
          )}

          {accionActiva === 'editar' && (
            <Form onSubmit={editarCartaSeleccionada}>
              <fieldset>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="selectEditarCartaBaraja">Editar carta</Form.Label>
                  <div className="d-flex flex-column flex-md-row gap-2">
                    <Form.Select
                      id="selectEditarCartaBaraja"
                      value={idBarajaCarta}
                      onChange={(event) => {
                        setIdBarajaCarta(event.target.value);
                        setIdCartaFormulario('');
                        setNombreCarta('');
                        setValorCarta('');
                        setTipoResultado('');
                      }}
                    >
                      <option value="">Selecciona Baraja</option>
                      {barajas.map((baraja) => (
                        <option key={baraja.idBaraja} value={baraja.idBaraja}>
                          {baraja.nombre}
                        </option>
                      ))}
                    </Form.Select>

                    <Form.Select
                      id="selectEditarCarta"
                      value={idCartaFormulario}
                      onChange={(event) => {
                        const idCarta = event.target.value;
                        const carta = cartas.find((carta) => String(carta.idCarta) === idCarta);

                        setIdCartaFormulario(idCarta);
                        setNombreCarta(carta?.nombre || '');
                        setValorCarta(carta?.valor || '');
                        setTipoResultado(carta?.tipoResultado || '');
                      }}
                    >
                      <option value="">Selecciona Carta</option>
                      {cartasFormulario.map((carta) => (
                        <option key={carta.idCarta} value={carta.idCarta}>
                          {carta.nombre} - valor {carta.valor}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    id="inputEditarNombreCarta"
                    placeholder="Nuevo nombre"
                    value={nombreCarta}
                    onChange={(event) => setNombreCarta(event.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    id="inputEditarValorCarta"
                    placeholder="Nuevo valor"
                    value={valorCarta}
                    onChange={(event) => setValorCarta(event.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Select
                    id="selectEditarTipoResultado"
                    value={tipoResultado}
                    onChange={(event) => setTipoResultado(event.target.value)}
                  >
                    <option value="">Tipo de Resultado</option>
                    <option>APTO</option>
                    <option>NO_APTO</option>
                    <option>PRUEBA_OTRA_VEZ</option>
                  </Form.Select>
                </Form.Group>

                <Button className="button-editar" type="submit">Editar carta</Button>
              </fieldset>
            </Form>
          )}

          {accionActiva === 'borrar' && (
            <Form onSubmit={borrarCartaSeleccionada}>
              <fieldset>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="selectBorrarCartaBaraja">Borrar carta</Form.Label>
                  <div className="d-flex flex-column flex-md-row gap-2">
                    <Form.Select
                      id="selectBorrarCartaBaraja"
                      value={idBarajaCarta}
                      onChange={(event) => {
                        setIdBarajaCarta(event.target.value);
                        setIdCartaFormulario('');
                      }}
                    >
                      <option value="">Selecciona Baraja</option>
                      {barajas.map((baraja) => (
                        <option key={baraja.idBaraja} value={baraja.idBaraja}>
                          {baraja.nombre}
                        </option>
                      ))}
                    </Form.Select>

                    <Form.Select
                      id="selectBorrarCarta"
                      value={idCartaFormulario}
                      onChange={(event) => setIdCartaFormulario(event.target.value)}
                    >
                      <option value="">Selecciona Carta</option>
                      {cartasFormulario.map((carta) => (
                        <option key={carta.idCarta} value={carta.idCarta}>
                          {carta.nombre} - valor {carta.valor}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                </Form.Group>

                <Button className="button-borrar" type="submit">Borrar carta</Button>
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
            <Card.Title>Cómo usar Cartas</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Completa cada baraja</Card.Subtitle>
            <Card.Text>
              Selecciona una baraja para ver sus cartas. Los botones del 1 al 12
              muestran la información de las cartas de ese valor. Desde el formulario
              puedes crear, editar o borrar cartas asociadas a una baraja.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </section>
  );
}

export default CartaView;
