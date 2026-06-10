# Tarjetas de estudio: frontend

Este documento queda como espacio de trabajo para definir las pantallas, componentes y estados visuales de las tarjetas de estudio.

La intención es preparar cómo se mostrará el contenido de repaso al usuario dentro de la aplicación.

## Indice

- [Objetivo](#objetivo)
- [Conceptos principales](#conceptos-principales)
- [Configuracion inicial](#configuracion-inicial)
- [Pantallas](#pantallas)
- [Componentes](#componentes)
- [React-Bootstrap](#react-bootstrap)
- [Servicio API](#servicio-api)
- [Imagenes y assets](#imagenes-y-assets)
- [Estructura responsive base](#estructura-responsive-base)
- [BarajaView](#barajaview)
- [TematicaView](#tematicaview)
- [JuegoView](#juegoview)
- [Formularios](#formularios)
- [Estados de pantalla](#estados-de-pantalla)
- [Contenido de una tarjeta](#contenido-de-una-tarjeta)
- [Errores frecuentes](#errores-frecuentes)
- [Material para futuras tarjetas](#material-para-futuras-tarjetas)
- [Dudas o decisiones pendientes](#dudas-o-decisiones-pendientes)
- [Navegacion final](#navegacion-final)

## Objetivo

Preparar el frontend de Matamounstruos App con React y Vite, siguiendo un enfoque responsive mobile-first.

La fase inicial del frontend se centra en crear la carpeta `frontend/`, instalar la base del proyecto, conectar más adelante con el backend mediante `fetch()` y construir la interfaz primero para móvil y después para escritorio.

## Conceptos principales

| Concepto | Explicacion | Notas |
| --- | --- | --- |
| React | Libreria para construir la interfaz del frontend. | Se crea mediante Vite. |
| Vite | Herramienta para crear y levantar el proyecto frontend. | Usa `npm run dev` en desarrollo. |
| Mobile-first | Forma de diseñar empezando por móvil. | Después se adapta a escritorio. |
| `fetch()` | API de JavaScript para pedir datos al backend. | Se usara para consumir la API REST. |
| Bootstrap | Framework CSS responsive. | Instalado e importado en `main.jsx`. |
| React-Bootstrap | Componentes Bootstrap adaptados a React. | Se usa para trabajar con `Card`, `Form` y `Button` como componentes JSX. |
| SweetAlert2 | Libreria para alertas y confirmaciones. | Instalado; se importara en los componentes donde se use. |

## Configuracion inicial

| Elemento | Estado | Explicacion |
| --- | --- | --- |
| `frontend/` | Creado | Carpeta independiente para el frontend. |
| React + Vite | Configurado | Proyecto creado con `npm create vite@latest frontend`. |
| Variante | Configurada | Se selecciono React con JavaScript. |
| `npm install` | Ejecutado | Instala las dependencias base del proyecto. |
| `npm run dev` | Comprobado | Arranca Vite en `http://localhost:5173/`. |
| `frontend/.gitignore` | Revisado | Evita subir `node_modules/`, `dist/` y archivos locales. |
| Bootstrap | Configurado | Instalado e importado globalmente en `frontend/src/main.jsx`. |
| React-Bootstrap | Instalado | Permite usar componentes como `Card`, `Form` y `Button` desde React. |
| SweetAlert2 | Instalado | Disponible para mensajes y confirmaciones en componentes concretos. |
| Logotipo | Añadido | Se guarda en `frontend/src/assets/` para usarlo en la navegacion y pantalla principal. |

Comandos usados en la fase inicial:

```bash
npm create vite@latest frontend
cd frontend
npm install
npm install bootstrap sweetalert2 react-bootstrap
npm run dev
```

## Pantallas

| Pantalla | Que muestra | Acciones | Estado |
| --- | --- | --- | --- |
| `HomeView` | Pantalla principal de la aplicacion. | Acceso inicial a las secciones principales. | Estructura inicial creada. |
| `BarajaView` | Gestion conjunta de barajas y cartas. | Listar, crear, editar y eliminar contenido de baraja mas adelante. | Estructura inicial creada. |
| `TematicaView` | Gestion de tarjetas tematicas. | Consultar y crear tarjetas mas adelante. | Estructura inicial creada. |
| `CardUsuario` | Acceso previo para secciones administrativas. | Simular identificacion antes de entrar en `Baraja` o `Tematica`. | Estructura inicial creada. |
| `JuegoView` | Vista principal del juego. | Seleccionar baraja y obtener carta aleatoria mas adelante. | Estructura inicial creada. |

Las pantallas se han creado dentro de `frontend/src/views/`.

En esta fase no se usa `react-router-dom`. La aplicacion cambia de vista mediante un estado en `App.jsx`, manteniendo una estructura sencilla y facil de defender.

## Componentes

| Componente | Uso | Datos que necesita |
| --- | --- | --- |
| `Navbar` | Permite cambiar entre las vistas principales. | `vistaActual` y `cambiarVista`. |
| `CardUsuario` | Muestra el acceso de usuario antes de entrar en zonas administrativas. | `onAcceso`. |
| `HomeView` | Pantalla de inicio. | No necesita datos externos en esta fase. |
| `BarajaView` | Pantalla de gestion de barajas y cartas. | Mas adelante consumira las API de barajas y cartas. |
| `TematicaView` | Pantalla de gestion de tarjetas tematicas. | Mas adelante consumira la API de tarjetas. |
| `JuegoView` | Pantalla del flujo de juego. | Mas adelante consumira la API de juego. |

Estructura inicial del frontend:

```text
frontend/src/
  assets/
    logo-full.webp
    logo-icon.webp
  components/
    Navbar.jsx
    CardUsuario.jsx
  services/
    api.js
  views/
    HomeView.jsx
    BarajaView.jsx
    TematicaView.jsx
    JuegoView.jsx
  App.jsx
  main.jsx
```

Se evita crear carpetas adicionales como `layout/` o `ui/` hasta que sean necesarias. La prioridad sigue siendo mantener el proyecto simple, claro y mantenible.

`services/api.js` se añade cuando empieza la conexion con backend. Centraliza la URL base, la funcion comun `request()` y las llamadas `fetch()` de usuarios, barajas, cartas, tarjetas y juego.

La navegacion visible se simplifica a `Inicio`, `Baraja`, `Tematica` y `Juego`. El logo funciona como acceso a inicio.

`Baraja` agrupa la gestion de barajas y cartas para reducir secciones en la interfaz. `Tematica` representa las tarjetas de teoria con un nombre mas claro para el usuario.

La `Navbar` se implementa con React-Bootstrap para mantener coherencia con el resto de componentes visuales. El logo actua como boton de inicio y las secciones activas se marcan con colores suaves inspirados en la maqueta inicial.

## React-Bootstrap

Bootstrap puede usarse de dos formas en el frontend:

| Forma | Ejemplo | Uso |
| --- | --- | --- |
| Clases Bootstrap | `className="container py-4"` | Utilidades de layout, espaciado, flex y botones simples. |
| Componentes React-Bootstrap | `<Card>`, `<Form>`, `<Button>` | Componentes visuales ya adaptados a React. |

Cuando se copia un ejemplo de Bootstrap HTML oficial dentro de React, hay que adaptarlo a JSX:

| HTML | JSX |
| --- | --- |
| `class` | `className` |
| `for` | `htmlFor` |
| `<input>` | `<input />` |
| `checked` | `defaultChecked` si no se controla con estado |

Con React-Bootstrap esta conversion se reduce porque se trabaja directamente con componentes:

```jsx
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
```

Esta opcion se usa para mantener la maquetacion sencilla y evitar crear componentes visuales desde cero.

## Servicio API

`frontend/src/services/api.js` centraliza las peticiones al backend con `fetch()`.

La funcion base `request(endpoint, options)` une la URL del backend con cada endpoint, convierte la respuesta a JSON y lanza errores usando el campo `message` devuelto por la API.

En esta fase quedan preparadas funciones para:

- Usuarios: `getUsuarios` y `createUsuario`.
- Barajas: `getBarajas`, `getIdBaraja`, `createBaraja`, `updateBaraja` y `deleteBaraja`.
- Cartas: `getCartas`, `getCartasPorBaraja`, `getIdCarta`, `createCarta`, `updateCarta` y `deleteCarta`.
- Tarjetas: `getTarjetas`, `getIdTarjeta` y `createTarjeta`.
- Juego: `getCartaAleatoriaDeBaraja` y `getTarjetaAleatoriaDeCarta`.

## Imagenes y assets

Las imagenes dentro de `frontend/src/assets/` se importan desde el componente que las usa.

Ejemplo:

```jsx
import logoFull from '../assets/logo-full.webp'
```

Despues se usa la variable importada:

```jsx
<Card.Img variant="top" src={logoFull} />
```

No se recomienda usar rutas relativas directas como `src="../assets/logo-full.webp"` en componentes React, porque Vite gestiona los assets mediante imports.

Si una imagen estuviera en `frontend/public/`, entonces se podria referenciar desde la raiz publica.

## Estructura responsive base

Cada vista puede empezar con una seccion contenedora:

```jsx
<section className="container py-4">
  ...
</section>
```

Este contenedor ayuda a:

- Agrupar todo el contenido de la vista.
- Mantener margenes responsive.
- Separar visualmente la vista de la navegacion.
- Devolver un unico elemento padre desde el `return`.

Cuando una vista contiene varias cards, React necesita que esten dentro de un elemento padre:

```jsx
<section className="container py-4 d-flex flex-column gap-3">
  <Card>...</Card>
  <Card>...</Card>
</section>
```

Para organizar cards relacionadas sin decidir todavia todo el responsive, se puede usar un `div` intermedio:

```jsx
<div className="d-flex flex-column gap-3">
  <Card>...</Card>
  <Card>...</Card>
</div>
```

Mas adelante ese `div` podra cambiarse por un grid Bootstrap:

```jsx
<div className="row g-3">
  <div className="col-12 col-md-4">...</div>
  <div className="col-12 col-md-4">...</div>
  <div className="col-12 col-md-4">...</div>
</div>
```

La idea es empezar en columna para movil y adaptar despues a escritorio.

## BarajaView

`BarajaView` agrupa la gestion de barajas y cartas dentro de una misma pantalla.

La estructura inicial queda dividida en bloques:

| Bloque | Uso | Estado |
| --- | --- | --- |
| Header | Presenta la vista de gestion de barajas y cartas. | Maquetacion inicial. |
| Acciones | Botones para `Crear`, `Editar` y `Borrar`. | Visual, sin logica conectada. |
| Selector de tipo | Botones para elegir entre `Baraja` y `Carta`. | Visual, sin estado especifico todavia. |
| Listado | Muestra barajas y, mas adelante, sus cartas. | Preparado con `Accordion`. |
| Paginacion | Deja preparada la navegacion por paginas. | Preparada con `Pagination`. |
| `baraja-form` | Espacio para crear, editar o borrar barajas. | Formulario placeholder. |
| `carta-form` | Espacio para crear, editar o borrar cartas. | Formulario placeholder. |

El listado de barajas se prepara con `Accordion`:

```jsx
<Accordion defaultActiveKey="0" flush>
  <Accordion.Item eventKey="0">
    <Accordion.Header>Baraja: Autoría Gitflow</Accordion.Header>
    <Accordion.Body>
      Aquí se verán las cartas de esta baraja.
    </Accordion.Body>
  </Accordion.Item>
</Accordion>
```

Este componente encaja porque permite desplegar una baraja y mostrar sus cartas dentro.

Debajo del listado se puede usar `Pagination`:

```jsx
<Pagination>
  <Pagination.First />
  <Pagination.Prev />
  <Pagination.Item active>{1}</Pagination.Item>
  <Pagination.Next />
  <Pagination.Last />
</Pagination>
```

La paginacion queda como estructura visual. Mas adelante se conectara con los datos reales si el listado crece.

Los formularios se separan para no mezclar responsabilidades:

```text
baraja-form
  crear / editar / borrar barajas

carta-form
  crear / editar / borrar cartas
```

Mas adelante los botones de accion y tipo decidiran que formulario se muestra y que operacion se prepara.

## TematicaView

`TematicaView` agrupa la gestion inicial de tarjetas tematicas.

La estructura inicial queda dividida en bloques:

| Bloque | Uso | Estado |
| --- | --- | --- |
| Header | Presenta la vista de tematica y tarjetas de teoria. | Maquetacion inicial. |
| Acciones | Botones para `Crear`, `Editar` y `Borrar`. | Visual, sin logica conectada. |
| Listado | Muestra barajas y, mas adelante, las tarjetas asociadas. | Preparado con `Accordion`. |
| Paginacion | Deja preparada la navegacion por paginas. | Preparada con `Pagination`. |
| Formulario | Espacio para crear o modificar tarjetas. | Formulario placeholder. |

El listado se prepara tambien con `Accordion`, igual que en `BarajaView`, porque una baraja puede tener varias tarjetas tematicas asociadas:

```jsx
<Accordion defaultActiveKey="0" flush>
  <Accordion.Item eventKey="0">
    <Accordion.Header>Baraja: Autoría Gitflow</Accordion.Header>
    <Accordion.Body>
      Aquí se verán las tarjetas de esta baraja.
    </Accordion.Body>
  </Accordion.Item>
</Accordion>
```

La paginacion queda debajo del listado para mantener el mismo patron visual que en `BarajaView`.

El formulario inicial de tematica queda preparado con:

```text
select de baraja
select de tarjeta
titulo
contenido
```

En esta fase los botones `Editar` y `Borrar` quedan como parte visual del panel. La funcionalidad real se añadira cuando se conecte el frontend con la API.

## JuegoView

`JuegoView` prepara la estructura visual del flujo de juego.

La estructura inicial queda dividida en bloques:

| Bloque | Uso | Estado |
| --- | --- | --- |
| Header | Presenta la vista de juego. | Maquetacion inicial. |
| Selector de baraja | Permite elegir la baraja que se usara para jugar. | Visual, sin datos de API. |
| Carta visual | Muestra una carta base con resultado de ejemplo. | Preparada con asset local. |
| Resultado | Deja espacio para `nombre`, `valor` y `tipoResultado`. | Placeholder visual. |
| Tarjeta tematica | Representa el repaso asociado a `NO_APTO` o `PRUEBA_OTRA_VEZ`. | Placeholder visual. |
| Acciones | Botones para iniciar o repetir la jugada. | Visual, sin logica conectada. |

La carta base se carga desde `frontend/src/assets/`:

```jsx
import cartaStandar from '../assets/carta-standar.webp'
```

Para escribir informacion encima de la carta se usa un contenedor relativo y contenido absoluto:

```jsx
<div className="position-relative">
  <Card.Img variant="top" src={cartaStandar} />

  <div className="position-absolute top-50 start-50 translate-middle text-center">
    <h3>Reina</h3>
    <p>Valor: 11</p>
    <strong>PRUEBA_OTRA_VEZ</strong>
  </div>
</div>
```

El flujo previsto es:

```text
elegir baraja
sacar carta
mostrar carta y resultado
si el resultado requiere repaso, mostrar tarjeta tematica
permitir repetir la jugada
```

En esta fase no se conecta todavia con la API. Los textos y resultados son placeholders para validar la estructura visual.

## Formularios

| Campo | Tipo | Obligatorio | Notas |
| --- | --- | --- | --- |
| Nombre | Texto | Si | Identifica al usuario de forma simple. |
| Password | Password | Si | Se usara para el acceso o registro. |
| Tipo de acceso | Radio | Si | Permite elegir entre conectarse o registrarse. |
| Nombre de baraja | Texto | Si | Se usara en `baraja-form`. |
| Descripcion de baraja | Texto | No | Se usara en `baraja-form`. |
| Baraja seleccionada | Select | Si | Permite relacionar cartas con una baraja. |
| Carta seleccionada | Select | Segun accion | Se usara al editar o borrar cartas. |
| Tipo de resultado | Select | Si | Valores previstos: `APTO`, `NO_APTO`, `PRUEBA_OTRA_VEZ`. |
| Tarjeta seleccionada | Select | Segun accion | Se usara al editar o borrar tarjetas. |
| Titulo de tarjeta | Texto | Si | Titulo de la tarjeta tematica. |
| Contenido de tarjeta | Texto | Si | Explicacion o material de repaso. |
| Baraja de juego | Select | Si | Permite elegir con que baraja se jugara. |

En `CardUsuario`, el formulario puede empezar con React-Bootstrap:

```jsx
<Form onSubmit={manejarAcceso}>
  <Form.Group className="mb-3" controlId="usuarioNombre">
    <Form.Label>Nombre</Form.Label>
    <Form.Control type="text" placeholder="Nick" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="usuarioPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" />
  </Form.Group>
</Form>
```

En esta fase los botones de acceso pueden simular la entrada del usuario. Mas adelante el formulario se conectara con una peticion `POST`.

## Estados de pantalla

- `home`: muestra `HomeView`.
- `usuario`: muestra `CardUsuario`.
- `baraja`: muestra `BarajaView`.
- `tematica`: muestra `TematicaView`.
- `juego`: muestra `JuegoView`.

`App.jsx` mantiene el estado `vistaActual` con `useState`.

La funcion `cambiarVista` se pasa a `Navbar` para controlar la navegacion desde un unico punto.

`Navbar` tambien recibe `vistaActual` para marcar visualmente el boton de la seccion activa.

Las secciones `baraja` y `tematica` requieren pasar antes por `CardUsuario` si todavia no hay un usuario activo. En esta fase el acceso se simula y queda preparado para conectarlo mas adelante con una peticion `POST`.

## Contenido de una tarjeta

```md
## Titulo

Pendiente.

## Explicacion

Pendiente.

## Idea clave

Pendiente.

## Ejemplo

Pendiente.
```

## Errores frecuentes

| Caso | Problema | Solucion |
| --- | --- | --- |
| `vistaActual` aparece subrayado | La variable se recibe en `Navbar`, pero no se usa. | Usarla para marcar el boton activo o no pasarla como prop. |
| No cambia la pantalla | El boton no llama a `cambiarVista` con el nombre correcto. | Revisar que coincidan valores como `baraja`, `tematica` o `juego`. |
| No carga una vista | El componente no esta importado o exportado correctamente. | Revisar `import`, nombre del archivo y `export default`. |
| No aparece `CardUsuario` | La `Navbar` llama directamente a `setVistaActual`. | Pasar la funcion `cambiarVista` para aplicar la comprobacion de usuario. |
| La imagen no se muestra | Se usa una ruta relativa directa a `src/assets`. | Importar la imagen y usar la variable en `src`. |
| Varias cards dan error | El `return` devuelve varios elementos hermanos sin padre. | Envolverlas en `section`, `div` o fragment. |
| Dos selects tienen el mismo id | Se copian varios ejemplos con `id` repetido. | Usar identificadores unicos como `selectBaraja` y `selectCarta`. |
| Texto encima de imagen no se coloca bien | Falta un contenedor relativo para posicionar el resultado. | Usar `position-relative` en el padre y `position-absolute` en el texto. |
| No se aplican estilos de la navbar | `App.css` no esta importado o Bootstrap pisa los estilos propios. | Importar Bootstrap como base en `main.jsx` y `App.css` desde `App.jsx`. |

## Material para futuras tarjetas

| Titulo de tarjeta | Idea principal | Contenido clave |
| --- | --- | --- |
| Estructura inicial React | Separar componentes reutilizables y vistas principales. | `components/Navbar.jsx` y `views/*View.jsx`. |
| Navegacion por estado | Cambiar de pantalla sin instalar router. | `useState`, `vistaActual` y `setVistaActual`. |
| Navbar con Bootstrap | Crear una navegacion sencilla y responsive. | Clases `navbar`, `btn`, `d-flex`, `flex-wrap`. |
| Navbar con React-Bootstrap | Mantener la navegacion coherente con el resto de componentes. | `BootstrapNavbar`, `Container`, `Nav`, `Button` y `Form`. |
| Acceso previo | Proteger secciones administrativas sin autenticacion real todavia. | `usuarioActivo`, `vistaPendiente` y `CardUsuario`. |
| React-Bootstrap | Usar componentes Bootstrap dentro de React. | `Card`, `Form`, `Button`. |
| Servicio API frontend | Centralizar las llamadas al backend. | `services/api.js`, `request()` y funciones por recurso. |
| Assets en Vite | Cargar imagenes desde `src/assets`. | `import logoFull from '../assets/logo-full.webp'`. |
| Cards responsive | Agrupar cards para preparar desktop. | `section`, `d-flex`, `row`, `col-md-*`. |
| Barajas desplegables | Mostrar barajas y cartas en un mismo panel. | `Accordion` y `Pagination`. |
| Formularios separados | Mantener barajas y cartas en bloques distintos. | `baraja-form` y `carta-form`. |
| Tematicas desplegables | Mostrar tarjetas asociadas a una baraja. | `Accordion`, `Pagination` y formulario de tarjeta. |
| Carta de juego | Superponer resultado sobre una imagen base. | `position-relative`, `position-absolute` y `Card.Img`. |
| Flujo de juego | Preparar la experiencia antes de conectar API. | Selector de baraja, carta visual y tarjeta tematica. |

Plantilla para ampliar tarjetas:

```md
## Titulo

Pendiente.

## Cuando se usa

Pendiente.

## Explicacion

Pendiente.

## Ejemplo

Pendiente.

## Error habitual

Pendiente.
```

## Dudas o decisiones pendientes

- Conectar llamadas al backend con `fetch()`.
- Configurar SweetAlert2 en acciones concretas.

## Navegacion final

- [Inicio](#tarjetas-de-estudio-frontend)
- [Indice](#indice)
- [Objetivo](#objetivo)
- [Configuracion inicial](#configuracion-inicial)
- [Pantallas](#pantallas)
- [Componentes](#componentes)
- [React-Bootstrap](#react-bootstrap)
- [Servicio API](#servicio-api)
- [Imagenes y assets](#imagenes-y-assets)
- [Estructura responsive base](#estructura-responsive-base)
- [BarajaView](#barajaview)
- [TematicaView](#tematicaview)
- [JuegoView](#juegoview)
- [Formularios](#formularios)
- [Estados de pantalla](#estados-de-pantalla)
- [Material para futuras tarjetas](#material-para-futuras-tarjetas)
- [Dudas o decisiones pendientes](#dudas-o-decisiones-pendientes)
