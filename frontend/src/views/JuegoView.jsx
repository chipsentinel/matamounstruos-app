// Hooks de React.
// useState guarda datos que cambian en pantalla.
// useEffect ejecuta codigo cuando el componente se carga.
import { useEffect, useState } from 'react';

// Componentes visuales de React-Bootstrap.
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';

// Funciones del servicio API que conectan la vista de juego con el backend.
import {
  getBarajas,
  getCartaAleatoriaDeBaraja,
  getTarjetaAleatoriaDeCarta,
} from '../services/api';

import cartaStandar from '../assets/carta-standar.webp';

function JuegoView() {
  // Datos principales que vienen del backend.
  const [barajas, setBarajas] = useState([]);
  // cartaActual pinta el resultado central; tarjetaActual pinta el repaso superior.
  const [cartaActual, setCartaActual] = useState(null);
  const [tarjetaActual, setTarjetaActual] = useState(null);

  // Seleccion y mensajes de pantalla.
  const [idBarajaSeleccionada, setIdBarajaSeleccionada] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const [mensajeJuego, setMensajeJuego] = useState('');

  // Pide las barajas al backend para poder elegir con cual jugar.
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

  // Carga las barajas cuando se entra por primera vez en esta vista.
  useEffect(() => {
    async function cargarDatosIniciales() {
      await cargarBarajas();
    }

    cargarDatosIniciales();
  }, []);

  // Muestra los errores como alertas rojas con SweetAlert2.
  useEffect(() => {
    if (!error) {
      return;
    }

    Swal.fire({
      icon: 'error',
      title: 'Atención',
      text: error,
    });
  }, [error]);

  // Muestra los mensajes del juego como alertas verdes con SweetAlert2.
  useEffect(() => {
    if (!mensajeJuego) {
      return;
    }

    Swal.fire({
      icon: 'success',
      title: 'Juego',
      text: mensajeJuego,
    });
  }, [mensajeJuego]);

  // Saca una carta aleatoria de la baraja elegida.
  async function jugarCarta() {
    // Cada jugada empieza limpia para que no queden resultados anteriores en pantalla.
    setError('');
    setMensajeJuego('');
    setCartaActual(null);
    setTarjetaActual(null);

    try {
      if (!idBarajaSeleccionada) {
        setError('Selecciona una baraja para jugar.');
        return;
      }

      const carta = await getCartaAleatoriaDeBaraja(idBarajaSeleccionada);
      setCartaActual(carta);

      // APTO termina la ronda: no hace falta pedir tarjeta de repaso.
      if (carta.tipoResultado === 'APTO') {
        setMensajeJuego('Eres APTO. Has terminado esta ronda.');
        return;
      }

      await cargarTarjetaDeEstudio(carta.idCarta);
    } catch (error) {
      setError(error.message);
    }
  }

  // Pide una tarjeta de estudio cuando la carta no es APTO.
  async function cargarTarjetaDeEstudio(idCarta) {
    try {
      const tarjeta = await getTarjetaAleatoriaDeCarta(idCarta);

      if (tarjeta.message) {
        // El backend puede responder con message cuando no hay tarjeta disponible.
        setMensajeJuego(tarjeta.message);
        return;
      }

      setTarjetaActual(tarjeta);
      setMensajeJuego('Revisa esta tarjeta y prueba otra vez.');
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <section className="container py-4 d-flex flex-column gap-3 view-container">
      <Card className="view-card mb-2">
        <Card.Body>
          <Card.Title>Juego</Card.Title>
          <Card.Text>
            Aquí se seleccionará una baraja y se obtendrá una carta aleatoria.
          </Card.Text>
        </Card.Body>
      </Card>

      <div className="juego-panel view-panel">
        <section className="mb-4">
          {cargando && <p>Cargando barajas...</p>}

          <Form.Group className="mb-3">
            <Form.Label htmlFor="selectBarajaJuego">Baraja</Form.Label>
            <Form.Select
              id="selectBarajaJuego"
              value={idBarajaSeleccionada}
              onChange={(event) => {
                // Cambiar de baraja reinicia la ronda visualmente.
                setIdBarajaSeleccionada(event.target.value);
                setCartaActual(null);
                setTarjetaActual(null);
                setMensajeJuego('');
                setError('');
              }}
            >
              <option value="">Elige tu Baraja</option>
              {barajas.map((baraja) => (
                <option key={baraja.idBaraja} value={baraja.idBaraja}>
                  {baraja.nombre}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <div className="actions view-actions home-action-cards juego-action-cards">
            <Card className="game-card action-card">
              <div className="position-relative">
                <Card.Img className="card-image" variant="top" src={cartaStandar} />

                {/* La tarjeta de repaso aparece arriba para convivir con el resultado central. */}
                {tarjetaActual && (
                  <div className="card-topic-content position-absolute top-0 start-50 translate-middle-x text-center bg-light p-2 mt-3 rounded">
                    <h4 className="mb-1">{tarjetaActual.titulo}</h4>
                    <p className="mb-0">{tarjetaActual.contenido}</p>
                  </div>
                )}

                {/* El resultado de la carta se mantiene centrado como informacion principal. */}
                <div className="card-result-content position-absolute top-50 start-50 translate-middle text-center bg-light p-2 rounded">
                  {cartaActual ? (
                    <>
                      <h3 className="mb-1">{cartaActual.nombre}</h3>
                      <p className="mb-1">Valor: {cartaActual.valor}</p>
                      <strong>{cartaActual.tipoResultado}</strong>
                    </>
                  ) : (
                    <>
                      <h3 className="mb-1">Carta</h3>
                      <p className="mb-0">Selecciona baraja y juega.</p>
                    </>
                  )}
                </div>
              </div>

              <Card.Body className="d-flex gap-2">
                <Button className="button-crear" type="button" onClick={jugarCarta}>
                  Juega
                </Button>

                <Button className="button-editar" type="button" onClick={jugarCarta}>
                  Probar otra vez
                </Button>
              </Card.Body>
            </Card>

            <Card className="action-card">
              <Card.Body>
                <Card.Title>Cómo funciona el juego</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Repasa con cartas aleatorias</Card.Subtitle>
                <Card.Text>
                  Elige una baraja y pulsa Juega para sacar una carta aleatoria. Si el
                  resultado es APTO, la ronda termina. Si sale NO_APTO o PRUEBA_OTRA_VEZ,
                  se muestra una tarjeta temática para repasar antes de intentarlo de nuevo.
                  <br />
                  <br />
                  Cada carta representa una prueba rápida: puede confirmar que ya dominas
                  el contenido o mandarte a revisar una explicación concreta. Usa Probar
                  otra vez para sacar una nueva carta cuando quieras seguir practicando.
                  <br />
                  <br />
                  La idea es avanzar poco a poco, repasando solo lo necesario. Si una carta
                  te pide volver a estudiar, lee la tarjeta temática, quédate con la parte
                  importante y vuelve a jugar hasta que consigas superar la ronda.
                  <br />
                  <br />
                  También puedes crear tus propias barajas, añadir cartas con distintos
                  resultados y preparar tarjetas temáticas adaptadas a lo que quieras
                  estudiar. Así el juego se convierte en un repaso hecho a tu medida.
                  <br />
                  <br />
                  Una buena baraja mezcla preguntas faciles, trampas pequeñas y recordatorios
                  clave. No hace falta que todo sea perfecto desde el primer dia: empieza con
                  unas pocas cartas, juega una ronda y ajusta lo que veas flojo. El juego
                  no juzga, solo insiste con una paciencia sospechosamente elegante.
                  <br />
                  <br />
                  Puedes usarlo para vocabulario, formulas, historia, programacion o cualquier
                  tema que necesite repeticion. Si una carta te gana, no pasa nada: es solo
                  informacion diciendo "eh, mirame otra vez". Repasas, vuelves a pulsar y
                  poco a poco conviertes el caos en memoria util.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>

        </section>
      </div>

    </section>
  );
}

export default JuegoView;
