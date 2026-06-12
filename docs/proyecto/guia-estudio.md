# Guia de estudio del proyecto

Matamounstruos App es una aplicacion de repaso con cartas. El usuario crea o selecciona barajas, juega sacando cartas aleatorias y, segun el resultado de la carta, puede recibir una tarjeta tematica para repasar antes de volver a intentarlo.

## Explicacion corta

El proyecto esta dividido en frontend, backend y base de datos.

El frontend esta hecho con React y Vite. Muestra las vistas, formularios, navegacion y avisos visuales con SweetAlert2.

El backend esta hecho con Express. Expone una API REST con rutas para usuarios, barajas, cartas, tarjetas y juego.

La base de datos usa MariaDB. Guarda usuarios, barajas, cartas y tarjetas, manteniendo relaciones entre ellas mediante claves foraneas.

## Flujo principal

1. El usuario entra en la aplicacion.
2. Se registra o accede desde `CardUsuario`.
3. Puede gestionar barajas, cartas y tarjetas.
4. En la vista de juego selecciona una baraja.
5. El frontend pide al backend una carta aleatoria.
6. El backend consulta MariaDB y devuelve la carta.
7. El frontend muestra el resultado.
8. Si toca repasar, se pide una tarjeta y se muestra en la parte superior de la carta.
9. Los avisos importantes se muestran con SweetAlert2.

## Puntos que conviene tener claros

- `frontend/src/services/api.js` centraliza las llamadas `fetch()`.
- `frontend/src/App.jsx` controla rutas y vistas protegidas.
- Cada vista del frontend se encarga de pedir datos, guardarlos en estado y pintarlos.
- `backend/src/app.js` registra middlewares y rutas.
- Cada archivo de `backend/src/routes` conecta una URL con un controlador.
- Cada controlador valida datos, consulta la base de datos y devuelve JSON.
- `backend/src/config/db.js` crea la conexion con MariaDB.
- `backend/src/utils/index.js` contiene funciones pequenas y faciles de testear.
- Los tests unitarios prueban funciones aisladas.
- Postman/Newman prueba la API levantada, como si fuera un cliente real.

## Checklist de revision

- Backend arranca con `npm run dev`.
- Frontend arranca con `npm run dev`.
- Frontend compila con `npm run build`.
- Tests unitarios pasan con `npm test`.
- Coleccion Postman pasa con Newman.
- Docker Compose levanta base de datos, backend y frontend.
- GitHub Actions ejecuta instalacion, build y tests.

## Preguntas tipicas y respuesta corta

**Donde esta la conexion entre frontend y backend?**  
En `frontend/src/services/api.js`, porque desde ahi salen las peticiones `fetch()` hacia la API.

**Donde se valida antes de guardar en base de datos?**  
En los controladores del backend, antes de ejecutar el `INSERT` o `UPDATE`.

**Por que se usa SweetAlert2?**  
Para mostrar feedback visual claro cuando una accion sale bien o falla.

**Por que hay tests unitarios y Postman?**  
Los unitarios prueban funciones concretas. Postman prueba endpoints reales con el servidor levantado.

**Por que Docker?**  
Para levantar MariaDB, backend y frontend de forma repetible, sin configurar todo a mano cada vez.
