# Tarjetas de estudio: backend

Este documento queda como espacio de trabajo para definir la API REST y la logica de backend asociada a las tarjetas de estudio.

La intención es preparar los endpoints, validaciones y respuestas que más adelante permitirán gestionar tarjetas desde la aplicación.

## Indice

- [Objetivo](#objetivo)
- [Conceptos principales](#conceptos-principales)
- [Dependencias iniciales](#dependencias-iniciales)
- [Configuracion inicial](#configuracion-inicial)
- [Servidor Express](#servidor-express)
- [Conexion MariaDB](#conexion-mariadb)
- [Recurso principal](#recurso-principal)
- [Endpoints](#endpoints)
- [Datos de entrada](#datos-de-entrada)
- [Datos de salida](#datos-de-salida)
- [Validaciones](#validaciones)
- [Errores frecuentes](#errores-frecuentes)
- [Material para futuras tarjetas](#material-para-futuras-tarjetas)
- [Dudas o decisiones pendientes](#dudas-o-decisiones-pendientes)
- [Navegacion final](#navegacion-final)

## Objetivo

Preparar el backend REST de Matamounstruos App para gestionar barajas, cartas y el flujo principal del juego.

La issue 3 se centra en configurar Express, conectar con MariaDB, crear CRUD para Baraja y Carta, y exponer endpoints de juego para obtener una carta aleatoria y mostrar una TarjetaTeoria cuando corresponda.

## Conceptos principales

| Concepto | Explicacion | Notas |
| --- | --- | --- |
| API REST | Forma de exponer operaciones del backend mediante rutas HTTP. | Se usara para CRUD y flujo de juego. |
| Express | Framework de Node.js para crear el servidor y las rutas. | Dependencia base del backend. |
| MariaDB | Base de datos relacional donde viven barajas, cartas y tarjetas teoricas. | Se conectara desde Node con el paquete `mariadb`. |
| Variables de entorno | Configuracion sensible fuera del codigo. | Se gestionan con `dotenv`. |
| CORS | Permite llamadas desde el frontend si corre en otro puerto. | Se gestiona con `cors`. |

## Dependencias iniciales

| Dependencia | Tipo | Para que sirve |
| --- | --- | --- |
| `express` | Produccion | Crear el servidor HTTP y definir endpoints REST. |
| `mariadb` | Produccion | Conectar el backend con la base de datos MariaDB. |
| `dotenv` | Produccion | Cargar configuracion desde variables de entorno. |
| `cors` | Produccion | Permitir peticiones desde el frontend durante el desarrollo. |
| `nodemon` | Desarrollo | Reiniciar el servidor automaticamente al cambiar archivos. |

## Configuracion inicial

| Archivo | Se comitea | Uso |
| --- | --- | --- |
| `.env` | No | Guarda variables reales del entorno local. |
| `.env.example` | Si | Sirve como plantilla para saber que variables necesita el backend. |
| `.gitignore` | Si | Evita subir `node_modules/` y `.env`. |

| Variable | Uso |
| --- | --- |
| `DB_HOST` | Host de MariaDB. |
| `DB_PORT` | Puerto de MariaDB. |
| `DB_USER` | Usuario de base de datos. |
| `DB_PASSWORD` | Password de base de datos. |
| `DB_NAME` | Nombre de la base de datos. |
| `DB_ROOT_PASSWORD` | Password root de MariaDB usada por Docker. |
| `PORT` | Puerto del servidor Express. |

## Servidor Express

| Elemento | Estado | Explicacion |
| --- | --- | --- |
| `backend/src/app.js` | Creado | Archivo principal donde se configura y arranca Express. |
| `dotenv` | Configurado | Carga variables de entorno desde `.env`. |
| `cors` | Configurado | Permite peticiones desde el frontend. |
| `express.json()` | Configurado | Permite recibir cuerpos de peticion en formato JSON. |
| `PORT` | Configurado | Usa el puerto definido en `.env` o `3000` por defecto. |
| Ruta `/` | Configurada | Ruta inicial para comprobar que la API responde. |
| `backend/src/routes/healthRoutes.js` | Configurado | Define rutas tecnicas de comprobacion. |
| `backend/src/controllers/healthController.js` | Configurado | Contiene la logica para comprobar la conexion con MariaDB. |

## Conexion MariaDB

| Elemento | Estado | Explicacion |
| --- | --- | --- |
| `backend/src/config/db.js` | Configurado | Crea un pool de conexiones reutilizables a MariaDB. |
| `mariadb.createPool()` | Configurado | Usa las variables `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD` y `DB_NAME`. |
| `docker-compose-dev.yml` | Configurado | Usa variables del `.env` para crear la base, usuario y password. |
| `DB_ROOT_PASSWORD` | Configurado | Password del usuario root de MariaDB usado por Docker. |
| `GET /health/db` | Comprobado | Valida desde Express que el backend puede consultar MariaDB. |

## Recurso principal

| Recurso | Ruta base | Descripcion |
| --- | --- | --- |
| Usuario | `/usuarios` | Persona que usa la aplicacion. |
| Baraja | `/barajas` | Agrupa cartas de una tematica o nivel. |
| Carta | `/cartas` | Pregunta o reto asociado a una baraja. |
| Juego | `/juego` | Flujo para obtener carta aleatoria y resolver el resultado. |
| TarjetaTeoria | `/tarjetas-teoria` | Contenido de apoyo cuando el resultado no permite finalizar. |

## Endpoints

| Metodo | Ruta | Uso | Estado |
| --- | --- | --- | --- |
| GET | `/` | Comprobar que la API esta operativa. | Configurado |
| GET | `/health/db` | Comprobar conexion backend-MariaDB. | Configurado y probado |
| GET | `/usuarios` | Listar usuarios con `idUsuario`, `nombre` y `rol`. | Configurado y probado |
| POST | `/usuarios` | Crear un usuario normal con `nombre` y `password`. | Configurado y probado |
| GET | `/barajas` | Listar barajas. | Configurado |
| POST | `/barajas` | Crear una baraja. | Configurado |
| GET | `/barajas/:id` | Consultar una baraja concreta. | Configurado |
| PUT | `/barajas/:id` | Actualizar nombre y descripcion de una baraja. | Configurado |
| DELETE | `/barajas/:id` | Eliminar una baraja por identificador. | Configurado |
| GET | `/cartas` | Listar cartas. | Configurado y probado |
| POST | `/cartas` | Crear una carta. | Configurado y probado |
| GET | `/cartas/:id` | Consultar una carta concreta. | Configurado y probado |
| PUT | `/cartas/:id` | Actualizar una carta. | Configurado y probado |
| DELETE | `/cartas/:id` | Eliminar una carta. | Configurado y probado |
| GET | `/tarjetas` | Listar tarjetas teoricas. | Configurado |
| GET | `/tarjetas/:id` | Consultar una tarjeta teorica concreta. | Configurado |
| POST | `/tarjetas` | Crear una tarjeta teorica. | Configurado |
| GET | `/juego/cartas/aleatoria/:idBaraja` | Obtener una carta aleatoria de una baraja. | Configurado y probado |
| GET | `/juego/tarjeta-teoria` | Obtener una TarjetaTeoria asociada al resultado. | Previsto |

## Datos de entrada

### POST /usuarios

```json
{
  "nombre": "manolo",
  "password": "1234"
}
```

En `POST /usuarios` no se recibe `rol` desde el cliente. La base de datos aplica `rol DEFAULT FALSE` para que los usuarios creados por esta ruta sean usuarios normales.

### POST /barajas

```json
{
  "nombre": "baraja-test",
  "descripcion": "Baraja de prueba",
  "idUsuario": 1
}
```

### PUT /barajas/:id

```json
{
  "nombre": "baraja-editada",
  "descripcion": "Descripcion actualizada"
}
```

En `PUT /barajas/:id` no se modifica `idUsuario`, para no cambiar el propietario de la baraja durante una edicion normal.

### POST /cartas

```json
{
  "nombre": "AUTORIA APROBADA",
  "valor": 1,
  "tipoResultado": "APTO",
  "idBaraja": 1
}
```

### PUT /cartas/:id

```json
{
  "nombre": "AUTORIA APROBADA",
  "valor": 1,
  "tipoResultado": "APTO"
}
```

En `PUT /cartas/:id` no se modifica `idBaraja`, para no mover la carta de una baraja a otra durante una edicion normal.

### POST /tarjetas

```json
{
  "titulo": "Repaso backend",
  "contenido": "Explicacion sobre rutas y controladores",
  "idBaraja": 1
}
```

### GET /juego/cartas/aleatoria/:idBaraja

No necesita body. El identificador de la baraja se envia en la URL.

## Datos de salida

### POST /usuarios

```json
{
  "message": "Usuario creado",
  "idUsuario": 4
}
```

### POST /barajas

```json
{
  "message": "Baraja creada",
  "idBaraja": 4
}
```

### PUT /barajas/:id

```json
{
  "message": "Baraja actualizada"
}
```

### DELETE /barajas/:id

```json
{
  "message": "Baraja eliminada"
}
```

Si no existe una baraja con ese identificador, la API devuelve `404` con el mensaje `Baraja no encontrada`.

### POST /cartas

```json
{
  "message": "Carta creada"
}
```

### PUT /cartas/:id

```json
{
  "message": "Carta actualizada"
}
```

### DELETE /cartas/:id

```json
{
  "message": "Carta eliminada"
}
```

Si no existe una carta con ese identificador, la API devuelve `404` con el mensaje `Carta no encontrada`.

### POST /tarjetas

```json
{
  "message": "Tarjeta creada"
}
```

Si no existe una tarjeta con ese identificador, la API devuelve `404` con el mensaje `Tarjeta no encontrada`.

### GET /juego/cartas/aleatoria/:idBaraja

```json
{
  "idCarta": 1,
  "nombre": "AUTORIA APROBADA",
  "valor": 1,
  "tipoResultado": "APTO",
  "idBaraja": 1
}
```

Si la baraja no tiene cartas disponibles, la API devuelve `404` con el mensaje `Esta baraja no tiene cartas`.

## Validaciones

- No permitir cartas duplicadas dentro de una misma baraja.
- Impedir eliminar una baraja que tenga cartas asociadas. Pendiente de completar cuando se implemente el CRUD de cartas.
- No permitir que un usuario se cree como admin enviando `rol` en el registro basico.
- Validar que los datos obligatorios lleguen en las peticiones de creacion y actualizacion.
- Devolver respuestas de error claras cuando no exista el recurso solicitado.

## Errores frecuentes

| Caso | Codigo | Mensaje | Solucion |
| --- | --- | --- | --- |
| Carta duplicada en la misma baraja | 409 | La carta ya existe en esta baraja. | Revisar la combinacion de carta y baraja antes de insertar. |
| Baraja con cartas asociadas | 409 | No se puede eliminar una baraja con cartas asociadas. | Pendiente de implementar junto al CRUD de cartas. |
| Recurso no encontrado | 404 | Recurso no encontrado. | Comprobar el identificador usado en la ruta. |
| Datos incompletos | 400 | Faltan datos obligatorios. | Validar el cuerpo de la peticion antes de enviarla. |

## Material para futuras tarjetas

| Titulo de tarjeta | Idea principal | Contenido clave |
| --- | --- | --- |
| Pendiente | Pendiente | Pendiente |
| Pendiente | Pendiente | Pendiente |

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

- Confirmar nombres finales de rutas: plural en español (`/barajas`, `/cartas`) o estilo alternativo.
- Decidir si el endpoint de TarjetaTeoria depende del resultado, de la carta o de ambos.
- Definir codigos y formato comun de errores antes de crear todos los controladores.

## Navegacion final

- [Inicio](#tarjetas-de-estudio-backend)
- [Indice](#indice)
- [Objetivo](#objetivo)
- [Dependencias iniciales](#dependencias-iniciales)
- [Configuracion inicial](#configuracion-inicial)
- [Servidor Express](#servidor-express)
- [Conexion MariaDB](#conexion-mariadb)
- [Recurso principal](#recurso-principal)
- [Endpoints](#endpoints)
- [Validaciones](#validaciones)
- [Errores frecuentes](#errores-frecuentes)
- [Material para futuras tarjetas](#material-para-futuras-tarjetas)
- [Dudas o decisiones pendientes](#dudas-o-decisiones-pendientes)
