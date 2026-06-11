// Hooks de React.
// useState guarda datos que cambian en pantalla.
// useEffect ejecuta codigo cuando el componente se carga.
import { useEffect, useState } from 'react';

// Componentes visuales de React-Bootstrap.
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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
    cargarBarajas();
  }, []);

  // Saca una carta aleatoria de la baraja elegida.
  async function jugarCarta() {
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

          <Card className="game-card mb-3">
            <div className="position-relative">
              <Card.Img className="card-image" variant="top" src={cartaStandar} />

              <div className="card-result-content position-absolute top-50 start-50 translate-middle text-center bg-light bg-opacity-75 p-2 rounded">
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

          {tarjetaActual && (
            <Card className="game-card">
              <Card.Body>
                <Card.Title>Tarjeta temática</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {tarjetaActual.titulo}
                </Card.Subtitle>
                <Card.Text>
                  {tarjetaActual.contenido}
                </Card.Text>
              </Card.Body>
            </Card>
          )}

          {error && (
            <p className="text-danger mb-0">{error}</p>
          )}

          {mensajeJuego && (
            <p className="text-success mb-0">{mensajeJuego}</p>
          )}
        </section>
      </div>

      <div className="actions view-actions">
        <Card className="action-card">
          <Card.Body>
            <Card.Title>Cómo funciona el juego</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Repasa con cartas aleatorias</Card.Subtitle>
            <Card.Text>
              Elige una baraja y pulsa Juega para sacar una carta aleatoria. Si el
              resultado es APTO, la ronda termina. Si sale NO_APTO o PRUEBA_OTRA_VEZ,
              se muestra una tarjeta temática para repasar antes de intentarlo de nuevo.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </section>
  );
}

export default JuegoView;
