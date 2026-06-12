# Tarjetas: Backend

## API REST

Una API REST permite que el frontend se comunique con el backend usando rutas HTTP como `GET`, `POST`, `PUT` y `DELETE`.

## Ruta

Una ruta define que URL existe y que controlador se ejecuta cuando llega una peticion.

## Controlador

Un controlador valida datos, consulta la base de datos y responde con JSON al cliente.

## Validacion

La validacion importante debe estar en backend porque el frontend se puede modificar o saltar.

## Error 500

Un error 500 significa que algo fallo dentro del servidor. La respuesta debe ser generica para no mostrar detalles internos.

## Modo pruebas

Si una descripcion contiene `TEST` o `PRUEBA`, el backend puede bloquear la accion y devolver `422`.
