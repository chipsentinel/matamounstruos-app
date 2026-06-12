import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import logoFull from '../assets/logo-full.webp'

function HomeView() {
  return (
        <section className="container py-4 d-flex flex-column gap-3 view-container">
          <Card className="view-card">
            <Card.Img variant="top" src={logoFull} />
            <Card.Body>
                <Card.Title>Matamounstruos</Card.Title>
                <Card.Text>
                  Juego pedagógico para crear barajas, cartas y tarjetas de repaso.
                </Card.Text>
                <Button variant="primary" as={Link} to="/juego">Comienza a Jugar</Button>
 
            </Card.Body>
          </Card>
          
          {/* Cards de acceso rapido: reutilizan el layout flexible usado tambien en JuegoView. */}
          <div className="actions view-actions home-action-cards">
            <Card className="action-card">
                <Card.Body>
                    <Card.Title>Barajas</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Consulta, Crea, Edita y Borra</Card.Subtitle>
                    <Card.Text>
                    Diseña tu mismo tu propia baraja y tus propias cartas
                    </Card.Text>
                    <Card.Link as={Link} to="/baraja">
                        Gestiona tus Barajas
                    </Card.Link>
                </Card.Body>
            </Card>

            <Card className="action-card">
                <Card.Body>
                    <Card.Title>Cartas</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Consulta, Crea, Edita y Borra</Card.Subtitle>
                    <Card.Text>
                    Diseña tu mismo tus propias cartas
                    </Card.Text>
                    <Card.Link as={Link} to="/carta">
                        Gestiona tus Cartas
                    </Card.Link>
                </Card.Body>
            </Card>

            <Card className="action-card">
                <Card.Body>
                    <Card.Title>Temática</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Consultar y Crea</Card.Subtitle>
                    <Card.Text>
                    Diseña tu propio material para jugar, repasar, memorizar...
                    </Card.Text>
                    <Card.Link as={Link} to="/tematica">
                        Gestiona tu Temario
                    </Card.Link>
                </Card.Body>
            </Card>
          </div>
    </section>
  )
}

export default HomeView;
