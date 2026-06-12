# Desempeño del proyecto: Postman y Newman

## Objetivo

Usar Postman y Newman como prueba de integracion del backend.

La idea es comprobar que las rutas, los controladores, la base de datos y las respuestas HTTP funcionan juntos. A diferencia de los tests unitarios, aqui si se prueba la aplicacion levantada y conectada a MariaDB.

## Resumen de desempeño

- Se preparo una coleccion Postman para validar endpoints principales.
- Se anadieron scripts de test para comprobar codigos HTTP y respuestas.
- Se ejecuto la coleccion con Newman desde terminal.
- Se ajustaron pruebas para que sean repetibles y no dependan de borrar datos base.
- Se validaron usuarios, barajas, cartas, tarjetas, juego y health check.

## Archivo principal

La coleccion esta guardada en:

```txt
postman/matamounstruos-app.postman_collection.json
```

## Como ejecutar las pruebas

1. Levantar el backend.

```bash
cd backend
npm run dev
```

2. Importar la coleccion en Postman.
3. Usar como URL base:

```txt
http://localhost:3000
```

4. Ejecutar las peticiones por bloques: usuarios, barajas, cartas, tarjetas y juego.

Tambien se puede ejecutar la coleccion completa desde terminal con Newman:

```bash
cd backend
npx newman run ../postman/matamounstruos-app.postman_collection.json
```

Para que esta comprobacion funcione, el backend debe estar levantado previamente en `http://localhost:3000`.

## Bloques de la coleccion

| Bloque | Que comprueba |
| --- | --- |
| Usuarios | Listado y creacion de usuarios normales. |
| Barajas | CRUD de barajas y errores principales. |
| Cartas | CRUD de cartas, cartas por baraja y validaciones de negocio. |
| Tarjetas | Consulta y creacion de tarjetas teoricas. |
| Juego | Carta aleatoria y tarjeta de repaso cuando corresponde. |
| Health | Conexion del backend con MariaDB. |

## Ejecucion con Newman

La coleccion se ha preparado para poder repetirse desde Newman sin depender de borrar datos base.

En el bloque de barajas, Postman crea una baraja temporal, guarda su identificador en una variable de coleccion y la reutiliza para consultar, editar y borrar. De esta forma se evita eliminar la baraja inicial de `seeds.sql`.

Ultima comprobacion realizada:

```txt
iterations: 1
requests: 45
test-scripts: 24
prerequest-scripts: 1
assertions: 24
failed: 0
```

## Casos importantes

- Crear una baraja correctamente.
- Bloquear una baraja con descripcion `TEST` o `PRUEBA` y recibir `422`.
- Editar una baraja existente.
- Eliminar una baraja con permisos correctos.
- Crear una carta correctamente.
- Bloquear una carta con valor mayor que `12`.
- Bloquear mas de 4 cartas con el mismo valor dentro de una baraja.
- Consultar tarjetas creadas.
- Obtener una carta aleatoria desde el juego.
- Obtener una tarjeta cuando el resultado de la carta no sea `APTO`.

## Respuestas esperadas

| Codigo | Significado |
| --- | --- |
| 200 | Consulta correcta. |
| 201 | Recurso creado correctamente. |
| 400 | Datos incompletos o no validos. |
| 403 | El usuario no tiene permisos. |
| 404 | El recurso no existe. |
| 409 | Conflicto con una regla de negocio. |
| 422 | Validacion estricta de modo pruebas denegado. |

## Relacion con los tests unitarios

Los tests unitarios comprueban funciones pequenas de forma aislada.

Postman comprueba el flujo completo: peticion HTTP, controlador, base de datos y respuesta final. Por eso se usa como prueba de integracion del proyecto.
