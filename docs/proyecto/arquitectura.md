# Arquitectura

El proyecto sigue una separacion sencilla:

```text
frontend/   React + Vite + Bootstrap + SweetAlert2
backend/    Express + controladores + MariaDB
postman/    Coleccion de pruebas de integracion
docker/     Documentacion de arranque con contenedores
docs/       Documentacion de estudio y mantenimiento
```

## Flujo de una peticion

```text
Vista React
  -> frontend/src/services/api.js
  -> fetch()
  -> backend/src/routes/*.js
  -> backend/src/controllers/*.js
  -> backend/src/config/db.js
  -> MariaDB
  -> JSON de respuesta
  -> Estado de React
  -> Pantalla
```

## Backend

El backend recibe la peticion, valida datos, consulta la base de datos y responde con JSON.

Los controladores son el punto mas importante para entender la logica de negocio. Por ejemplo, crear una baraja implica validar campos, comprobar el modo pruebas y ejecutar el `INSERT`.

## Frontend

El frontend no habla directamente con la base de datos. Siempre usa funciones de `api.js`, que llaman al backend con `fetch()`.

Las vistas gestionan tres cosas:

- Estado local con `useState`.
- Carga inicial o recarga con `useEffect`.
- Eventos de formularios y botones.

## Juego

El juego combina barajas, cartas y tarjetas.

1. Se carga el listado de barajas.
2. El usuario elige una baraja.
3. Se pide una carta aleatoria al backend.
4. Se muestra el resultado.
5. Si el resultado requiere repaso, se pide una tarjeta relacionada.
6. Se permite jugar otra vez.

## Errores

Los errores se manejan en dos niveles:

- Backend: devuelve codigos HTTP y JSON con `message` o `reason`.
- Frontend: captura el error y muestra mensaje visual, normalmente con SweetAlert2.

Codigos usados habitualmente:

- `200`: lectura o actualizacion correcta.
- `201`: creacion correcta.
- `400`: datos invalidos.
- `401`: acceso incorrecto.
- `403`: accion no permitida.
- `404`: recurso no encontrado.
- `409`: duplicado o conflicto.
- `422`: validacion especial de modo pruebas.
- `500`: error interno generico.
