# Tarjetas de estudio: backend

Este documento queda como espacio de trabajo para definir la API REST y la logica de backend asociada a las tarjetas de estudio.

La intención es preparar los endpoints, validaciones y respuestas que más adelante permitirán gestionar tarjetas desde la aplicación.

## Indice

- [Objetivo](#objetivo)
- [Conceptos principales](#conceptos-principales)
- [Dependencias iniciales](#dependencias-iniciales)
- [Configuracion inicial](#configuracion-inicial)
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
| `PORT` | Puerto del servidor Express. |

## Recurso principal

| Recurso | Ruta base | Descripcion |
| --- | --- | --- |
| Baraja | `/barajas` | Agrupa cartas de una tematica o nivel. |
| Carta | `/cartas` | Pregunta o reto asociado a una baraja. |
| Juego | `/juego` | Flujo para obtener carta aleatoria y resolver el resultado. |
| TarjetaTeoria | `/tarjetas-teoria` | Contenido de apoyo cuando el resultado no permite finalizar. |

## Endpoints

| Metodo | Ruta | Uso | Estado |
| --- | --- | --- | --- |
| GET | `/barajas` | Listar barajas. | Previsto |
| POST | `/barajas` | Crear una baraja. | Previsto |
| GET | `/barajas/:id` | Consultar una baraja concreta. | Previsto |
| PUT | `/barajas/:id` | Actualizar una baraja. | Previsto |
| DELETE | `/barajas/:id` | Eliminar una baraja si no tiene cartas asociadas. | Previsto |
| GET | `/cartas` | Listar cartas. | Previsto |
| POST | `/cartas` | Crear una carta. | Previsto |
| GET | `/cartas/:id` | Consultar una carta concreta. | Previsto |
| PUT | `/cartas/:id` | Actualizar una carta. | Previsto |
| DELETE | `/cartas/:id` | Eliminar una carta. | Previsto |
| GET | `/juego/cartas/aleatoria` | Obtener una carta aleatoria. | Previsto |
| GET | `/juego/tarjeta-teoria` | Obtener una TarjetaTeoria asociada al resultado. | Previsto |

## Datos de entrada

```json
{
  "pendiente": "pendiente"
}
```

## Datos de salida

```json
{
  "pendiente": "pendiente"
}
```

## Validaciones

- No permitir cartas duplicadas dentro de una misma baraja.
- Impedir eliminar una baraja que tenga cartas asociadas.
- Validar que los datos obligatorios lleguen en las peticiones de creacion y actualizacion.
- Devolver respuestas de error claras cuando no exista el recurso solicitado.

## Errores frecuentes

| Caso | Codigo | Mensaje | Solucion |
| --- | --- | --- | --- |
| Carta duplicada en la misma baraja | 409 | La carta ya existe en esta baraja. | Revisar la combinacion de carta y baraja antes de insertar. |
| Baraja con cartas asociadas | 409 | No se puede eliminar una baraja con cartas asociadas. | Borrar o reasignar cartas antes de eliminar la baraja. |
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
- [Recurso principal](#recurso-principal)
- [Endpoints](#endpoints)
- [Validaciones](#validaciones)
- [Errores frecuentes](#errores-frecuentes)
- [Material para futuras tarjetas](#material-para-futuras-tarjetas)
- [Dudas o decisiones pendientes](#dudas-o-decisiones-pendientes)
