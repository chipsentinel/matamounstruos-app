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
- [CartaView](#cartaview)
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
| React Router DOM | Libreria de rutas para React. | Se usa para asociar URLs con vistas. |
| SweetAlert2 | Libreria para alertas y confirmaciones. | Se usa en acceso de usuario, Barajas y Juego. |

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
| React Router DOM | Instalado | Permite navegar con rutas reales como `/baraja`, `/carta` o `/juego`. |
| SweetAlert2 | Configurado | Disponible para mensajes y confirmaciones en componentes concretos. |
| Logotipo | Añadido | Se guarda en `frontend/src/assets/` para usarlo en la navegacion y pantalla principal. |

Comandos usados en la fase inicial:

```bash
npm create vite@latest frontend
cd frontend
npm install
npm install bootstrap sweetalert2 react-bootstrap react-router-dom
npm run dev
```

## Pantallas

| Pantalla | Que muestra | Acciones | Estado |
| --- | --- | --- | --- |
| `HomeView` | Pantalla principal de la aplicacion. | Acceso inicial a las secciones principales. | Estructura inicial creada. |
| `BarajaView` | Gestion de barajas. | Listar, crear, editar y eliminar barajas. | Conectada con API. |
| `CartaView` | Gestion de cartas. | Listar cartas por baraja y crear, editar o borrar cartas. | Conectada con API. |
| `TematicaView` | Gestion de tarjetas tematicas. | Consultar y crear tarjetas. Editar y borrar quedan como mejora futura. | Conectada con API disponible. |
| `CardUsuario` | Acceso previo para secciones administrativas. | Identificar o registrar usuario de forma simple con avisos SweetAlert2. | Conectada con API. |
| `JuegoView` | Vista principal del juego. | Seleccionar baraja, obtener carta aleatoria y mostrar tarjeta si corresponde. | Conectada con API. |

Las pantallas se han creado dentro de `frontend/src/views/`.

La navegacion usa `react-router-dom`. `App.jsx` define las rutas principales y protege las vistas administrativas para que pasen antes por `CardUsuario` si no hay usuario activo.

## Componentes

| Componente | Uso | Datos que necesita |
| --- | --- | --- |
| `Navbar` | Permite cambiar entre las vistas principales y buscar texto en la pagina actual. | `vistaActual`, `cambiarVista` y `usuarioActivo`. |
| `CardUsuario` | Muestra el acceso de usuario antes de entrar en zonas administrativas. | `onAcceso`. |
| `HomeView` | Pantalla de inicio. | No necesita datos externos en esta fase. |
| `BarajaView` | Pantalla de gestion de barajas. | API de barajas y usuarios. |
| `CartaView` | Pantalla de gestion de cartas. | API de cartas, barajas y usuarios. |
| `TematicaView` | Pantalla de gestion de tarjetas tematicas. | API de tarjetas, barajas y usuarios. |
| `JuegoView` | Pantalla del flujo de juego. | API de barajas, carta aleatoria y tarjeta aleatoria. |

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
  routes.js
  views/
    HomeView.jsx
    BarajaView.jsx
    CartaView.jsx
    TematicaView.jsx
    JuegoView.jsx
  App.jsx
  main.jsx
```

Se evita crear carpetas adicionales como `layout/` o `ui/` hasta que sean necesarias. La prioridad sigue siendo mantener el proyecto simple, claro y mantenible.

`services/api.js` centraliza la URL base, la funcion comun `request()` y las llamadas `fetch()` de usuarios, barajas, cartas, tarjetas y juego.

`routes.js` centraliza las rutas principales para no repetir textos como `/baraja` o `/juego` por varios archivos.

La navegacion visible queda en `Inicio`, `Baraja`, `Carta`, `Tematica` y `Juego`. El logo funciona como acceso a inicio.

La `Navbar` se implementa con React-Bootstrap para mantener coherencia con el resto de componentes visuales. El logo actua como boton de inicio, las secciones activas se marcan con colores suaves y el usuario activo se muestra solo en la barra superior.

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

La funcion base `request(endpoint, options)` une la URL del backend con cada endpoint, convierte la respuesta a JSON y lanza errores usando `reason` o `message` devueltos por la API.

Cuando la respuesta no es correcta, el error conserva tambien `status`, `url` y `data`. Esto permite mostrar mensajes con SweetAlert2 y pintar informes de error concretos cuando el backend devuelve codigos como `422`.

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

`BarajaView` queda centrada solo en la gestion de barajas.

La vista permite consultar barajas existentes y administrar barajas del usuario identificado.

| Bloque | Uso | Estado |
| --- | --- | --- |
| Header | Presenta la gestion de barajas. | Conectado. |
| Listado | Muestra barajas en acordeon con propietario y descripcion. | Conectado con `getBarajas` y `getUsuarios`. |
| Acciones | Botones `Crear`, `Editar` y `Borrar`. | Cambian el formulario activo. |
| Formulario | Crea, edita o borra barajas. | Conectado con API. |
| Mensajes | Muestra errores, exitos y confirmacion de borrado con SweetAlert2. | Conectado. |
| Informe IT | Muestra URL y codigo si el backend devuelve `422`. | Conectado. |
| Card de ayuda | Explica como usar la pantalla. | Informativa. |

Funciones de API usadas:

- `getBarajas`
- `getUsuarios`
- `createBaraja`
- `updateBaraja`
- `deleteBaraja`

El borrado envia `idUsuario` para que el backend valide permisos.

Si el backend bloquea una descripcion con `TEST` o `PRUEBA`, `BarajaView` muestra el `reason` recibido con SweetAlert2 y deja visible un informe tecnico debajo del formulario.

## CartaView

`CartaView` se separa de `BarajaView` para que la gestion de cartas tenga su propia pantalla.

La vista permite consultar cartas por baraja y por valor, ademas de crear, editar y borrar cartas.

| Bloque | Uso | Estado |
| --- | --- | --- |
| Header | Presenta la gestion de cartas. | Conectado. |
| Listado | Muestra barajas y sus cartas. | Conectado con API. |
| Botones 1-12 | Permiten consultar cartas por valor dentro de una baraja. | Conectado. |
| Detalle de valor | Muestra nombre, resultado y cantidad de cartas con ese valor. | Conectado. |
| Acciones | Botones `Crear`, `Editar` y `Borrar`. | Cambian el formulario activo. |
| Formulario | Crea, edita o borra cartas. | Conectado con API. |
| Card de ayuda | Explica como usar la pantalla. | Informativa. |

Funciones de API usadas:

- `getBarajas`
- `getCartas`
- `getCartasPorBaraja`
- `getUsuarios`
- `createCarta`
- `updateCarta`
- `deleteCarta`

El borrado de cartas tambien envia `idUsuario` para validar permisos desde backend.

## TematicaView

`TematicaView` gestiona las tarjetas de teoria asociadas a una baraja.

En esta fase se conectan las operaciones disponibles en backend: consultar y crear tarjetas. Editar y borrar quedan visibles como mejora futura porque todavia no existen endpoints `PUT` y `DELETE` para tarjetas.

| Bloque | Uso | Estado |
| --- | --- | --- |
| Header | Presenta la vista de tematica. | Conectado. |
| Listado | Muestra tarjetas agrupadas por baraja. | Conectado con API. |
| Acciones | Botones `Crear`, `Editar` y `Borrar`. | Crear funciona; editar/borrar avisan mejora futura. |
| Formulario | Crea tarjetas con titulo, contenido y baraja asociada. | Conectado con API. |
| Card de ayuda | Explica como usar la pantalla. | Informativa. |

Funciones de API usadas:

- `getBarajas`
- `getUsuarios`
- `getTarjetas`
- `createTarjeta`

## JuegoView

`JuegoView` conecta el flujo principal del juego con el backend.

La vista permite elegir una baraja, obtener una carta aleatoria y mostrar una tarjeta de repaso cuando el resultado lo necesita.

| Bloque | Uso | Estado |
| --- | --- | --- |
| Header | Presenta la vista de juego. | Conectado. |
| Selector de baraja | Permite elegir la baraja con la que se juega. | Conectado con `getBarajas`. |
| Carta visual | Muestra la carta base con datos reales encima. | Conectado con API. |
| Resultado | Muestra `nombre`, `valor` y `tipoResultado`. | Conectado. |
| Tarjeta tematica | Se muestra si el resultado requiere repaso. | Conectado. |
| Acciones | `Juega` y `Probar otra vez`. | Solicitan otra carta aleatoria. |
| Avisos | Muestra mensajes del juego con SweetAlert2. | Conectado. |
| Card de ayuda | Explica el flujo del juego al usuario. | Informativa. |

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

Flujo actual:

```text
elegir baraja
sacar carta
mostrar carta y resultado
si el resultado es APTO, terminar ronda
si el resultado es NO_APTO o PRUEBA_OTRA_VEZ, pedir tarjeta tematica
permitir probar otra vez
```

Funciones de API usadas:

- `getBarajas`
- `getCartaAleatoriaDeBaraja`
- `getTarjetaAleatoriaDeCarta`

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

En `CardUsuario`, el acceso consulta `getUsuarios` y el registro usa `createUsuario`. Los errores y accesos correctos se muestran tambien con SweetAlert2.

## Estados de pantalla

Las vistas se resuelven con `react-router-dom`:

| Ruta | Vista |
| --- | --- |
| `/` | `HomeView` |
| `/home` | `HomeView` |
| `/usuario` | `CardUsuario` |
| `/baraja` | `BarajaView` |
| `/carta` | `CartaView` |
| `/tematica` | `TematicaView` |
| `/juego` | `JuegoView` |

`routes.js` guarda las rutas principales en `MAIN_ROUTES`.

`App.jsx` usa `Routes`, `Route`, `Navigate`, `useNavigate` y `useLocation` para controlar la navegacion.

Las secciones `/baraja`, `/carta` y `/tematica` requieren pasar antes por `CardUsuario` si todavia no hay un usuario activo.

El usuario activo se muestra solo en la `Navbar`, no dentro de cada vista. El buscador de la `Navbar` usa la busqueda nativa del navegador sobre el contenido visible de la pagina.

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
| No cambia la pantalla | El boton no llama a `cambiarVista` con el nombre correcto. | Revisar que coincidan valores como `baraja`, `carta`, `tematica` o `juego`. |
| No carga una vista | El componente no esta importado o exportado correctamente. | Revisar `import`, nombre del archivo y `export default`. |
| No aparece `CardUsuario` | La ruta protegida no pasa por `protegerVista`. | Revisar `App.jsx` y `Navigate`. |
| La imagen no se muestra | Se usa una ruta relativa directa a `src/assets`. | Importar la imagen y usar la variable en `src`. |
| Varias cards dan error | El `return` devuelve varios elementos hermanos sin padre. | Envolverlas en `section`, `div` o fragment. |
| Dos selects tienen el mismo id | Se copian varios ejemplos con `id` repetido. | Usar identificadores unicos como `selectBaraja` y `selectCarta`. |
| Texto encima de imagen no se coloca bien | Falta un contenedor relativo para posicionar el resultado. | Usar `position-relative` en el padre y `position-absolute` en el texto. |
| No se aplican estilos de la navbar | `App.css` no esta importado o Bootstrap pisa los estilos propios. | Importar Bootstrap como base en `main.jsx` y `App.css` desde `App.jsx`. |
| La pagina se mueve al cambiar de vista | Aparece o desaparece la barra de scroll vertical. | Usar `scrollbar-gutter: stable` en `index.css`. |

## Material para futuras tarjetas

| Titulo de tarjeta | Idea principal | Contenido clave |
| --- | --- | --- |
| Estructura inicial React | Separar componentes reutilizables y vistas principales. | `components/Navbar.jsx` y `views/*View.jsx`. |
| Navegacion con React Router | Asociar URLs reales con vistas. | `BrowserRouter`, `Routes`, `Route` y `Navigate`. |
| Navbar con Bootstrap | Crear una navegacion sencilla y responsive. | Clases `navbar`, `btn`, `d-flex`, `flex-wrap`. |
| Navbar con React-Bootstrap | Mantener la navegacion coherente con el resto de componentes. | `BootstrapNavbar`, `Container`, `Nav`, `Button` y `Form`. |
| Acceso previo | Proteger secciones administrativas sin autenticacion real todavia. | `usuarioActivo`, `vistaPendiente` y `CardUsuario`. |
| React-Bootstrap | Usar componentes Bootstrap dentro de React. | `Card`, `Form`, `Button`. |
| Servicio API frontend | Centralizar las llamadas al backend. | `services/api.js`, `request()` y funciones por recurso. |
| Assets en Vite | Cargar imagenes desde `src/assets`. | `import logoFull from '../assets/logo-full.webp'`. |
| Cards responsive | Agrupar cards para preparar desktop. | `section`, `d-flex`, `row`, `col-md-*`. |
| Barajas desplegables | Mostrar barajas en acordeon. | `Accordion` y `getBarajas`. |
| Cartas por baraja | Separar la gestion de cartas en su propia vista. | `CartaView`, botones 1-12 y formularios CRUD. |
| Tematicas desplegables | Mostrar tarjetas asociadas a una baraja. | `Accordion`, `getTarjetas` y `createTarjeta`. |
| Carta de juego | Superponer resultado real sobre una imagen base. | `position-relative`, `position-absolute` y `Card.Img`. |
| Flujo de juego | Jugar con carta aleatoria y tarjeta de repaso. | Selector de baraja, carta visual y tarjeta tematica. |

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

- Extender SweetAlert2 al resto de validaciones si se decide sustituir todos los mensajes en linea.
- Completar `PUT` y `DELETE` de tarjetas en backend para activar editar y borrar en `TematicaView`.

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
- [CartaView](#cartaview)
- [TematicaView](#tematicaview)
- [JuegoView](#juegoview)
- [Formularios](#formularios)
- [Estados de pantalla](#estados-de-pantalla)
- [Material para futuras tarjetas](#material-para-futuras-tarjetas)
- [Dudas o decisiones pendientes](#dudas-o-decisiones-pendientes)
