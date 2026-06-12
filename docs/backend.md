# Backend

El backend esta construido con Express y se encarga de exponer la API REST de la aplicacion.

## Archivos clave

- `backend/src/app.js`: crea la aplicacion Express, configura middlewares y registra rutas.
- `backend/src/config/db.js`: configura la conexion a MariaDB.
- `backend/src/routes/*.js`: define las URLs disponibles.
- `backend/src/controllers/*.js`: contiene la logica de cada entidad.
- `backend/src/utils/index.js`: funciones auxiliares reutilizables y faciles de testear.

## Patron ruta-controlador

La ruta recibe la peticion y llama al controlador.

El controlador hace el trabajo real:

1. Lee `req.params` o `req.body`.
2. Valida datos.
3. Consulta la base de datos con `pool.query`.
4. Devuelve una respuesta JSON con un codigo HTTP.

## Entidades principales

### Usuarios

Gestionan el acceso basico a la aplicacion.

Puntos importantes:

- Se validan longitudes de `nombre` y `password`.
- Se controla el acceso con nombre y password.
- Se evita que un mismo nombre se registre dos veces si esa validacion esta activa.

### Barajas

Agrupan cartas de un usuario.

Puntos importantes:

- Tienen `nombre`, `descripcion` e `idUsuario`.
- Al crear o editar se validan campos obligatorios.
- Si la descripcion contiene `TEST` o `PRUEBA`, se bloquea con `422`.
- El borrado puede devolver `403` si no pertenece al usuario indicado.

### Cartas

Son los elementos jugables.

Puntos importantes:

- Pertenecen a una baraja.
- Tienen resultado: `APTO`, `NO_APTO` o `PRUEBA_OTRA_VEZ`.
- El valor numerico se controla tambien desde el formulario del frontend.

### Tarjetas

Sirven para repasar cuando una carta no sale bien.

Puntos importantes:

- Contienen contenido tematico.
- Se pueden listar y crear desde la interfaz.
- El juego puede pedir una tarjeta aleatoria cuando corresponde.

### Juego

No guarda una partida completa, sino que coordina cartas y tarjetas.

Puntos importantes:

- Devuelve cartas aleatorias de una baraja.
- Devuelve tarjetas aleatorias asociadas a una carta o flujo de repaso.

## Validaciones

Las validaciones importantes deben estar en backend, porque el frontend se puede saltar.

Ejemplos:

- Campos obligatorios.
- Longitud maxima de textos.
- Usuario inexistente.
- Recurso no encontrado.
- Modo pruebas denegado.
- Resultado de carta no valido.

## Respuestas de error

Para errores internos se usa una respuesta generica:

```js
res.status(500).json({
  message: 'Error interno del servidor. Vuelve a intentarlo mas tarde.'
});
```

Esto evita mostrar detalles internos de SQL al cliente.

## Utilidades

`backend/src/utils/index.js` contiene funciones pequenas que no necesitan servidor ni base de datos para probarse.

Ejemplo:

- `contieneModoPruebas(texto)`: detecta si un texto incluye `TEST` o `PRUEBA` sin importar mayusculas o minusculas.

Esta separacion permite usar tests unitarios simples.

## Como anadir un endpoint

1. Crear o editar una ruta en `backend/src/routes`.
2. Crear o editar el controlador en `backend/src/controllers`.
3. Validar datos antes de consultar la base de datos.
4. Devolver un codigo HTTP claro.
5. Probarlo en Postman.
6. Si hay logica aislable, crear un test unitario.
