# Frontend

El frontend esta construido con React, Vite, Bootstrap y SweetAlert2.

## Archivos clave

- `frontend/src/App.jsx`: organiza rutas, estado global sencillo y vistas protegidas.
- `frontend/src/components/Navbar.jsx`: barra de navegacion.
- `frontend/src/components/CardUsuario.jsx`: acceso y registro de usuario.
- `frontend/src/services/api.js`: funciones `fetch()` hacia el backend.
- `frontend/src/views/*.jsx`: pantallas principales de la aplicacion.
- `frontend/src/App.css`: estilos generales.

## Flujo general

1. El usuario abre el frontend.
2. `App.jsx` decide que vista se muestra.
3. Si hace falta usuario, se muestra `CardUsuario`.
4. Las vistas llaman a funciones de `api.js`.
5. `api.js` hace `fetch()` al backend.
6. La respuesta actualiza el estado de React.
7. La vista se vuelve a pintar.

## Servicios API

`api.js` es el punto central de conexion con el backend.

Ventajas:

- Las URLs estan centralizadas.
- El codigo de las vistas queda mas limpio.
- Es mas facil mantener sincronizado el CRUD del frontend con el backend.

## Vistas

### HomeView

Pantalla inicial. Sirve como punto de entrada visual a la aplicacion.

### BarajaView

Gestiona el CRUD de barajas.

Hace:

- Listar barajas.
- Crear baraja.
- Editar baraja.
- Borrar baraja.
- Mostrar errores del backend con SweetAlert2 cuando corresponde.

### CartaView

Gestiona el CRUD de cartas.

Hace:

- Listar cartas.
- Crear carta.
- Editar carta.
- Borrar carta.
- Controlar que el valor sea numerico desde el formulario.

### TematicaView

Gestiona tarjetas de estudio.

Hace:

- Listar tarjetas.
- Crear tarjetas.
- Mostrar el contenido que luego puede servir para repasar.

### JuegoView

Vista principal del juego.

Hace:

- Cargar barajas.
- Permitir seleccionar una baraja.
- Pedir una carta aleatoria.
- Mostrar resultado.
- Pedir tarjeta tematica si toca repasar.
- Mostrar avisos con SweetAlert2.

## Componentes

### Navbar

Muestra logo, navegacion, usuario y buscador.

### CardUsuario

Gestiona acceso y registro.

Puntos importantes:

- Usa el backend para validar usuario.
- Muestra feedback con SweetAlert2.
- Informa a `App.jsx` cuando hay usuario activo.

## SweetAlert2

Se usa para avisos principales:

- Acceso correcto.
- Registro correcto.
- Error de validacion.
- Resultado del juego.
- Errores importantes del backend.

## Como anadir una vista

1. Crear el archivo en `frontend/src/views`.
2. Crear funciones necesarias en `frontend/src/services/api.js`.
3. Registrar la ruta en `App.jsx`.
4. Anadir enlace en `Navbar.jsx` si debe aparecer en navegacion.
5. Probar la vista en navegador.
6. Ejecutar `npm run build`.
