# Diseño de base de datos

Este documento explica el diseño inicial de la base de datos de Matamounstruos App.

La idea principal del proyecto es trabajar con usuarios que tienen barajas. Cada baraja puede tener cartas y tarjetas de temario asociadas.

## Entidades principales

En el diseño aparecen cuatro entidades:

- `Usuario`
- `Baraja`
- `Carta`
- `Tarjeta`

La entidad `Tarjeta` se refiere a las tarjetas de contenido teórico. Se usa un nombre simple para que sea más fácil trabajar con ella en la base de datos y en la API.

## Modelo Entidad/Relación

El modelo Entidad/Relación sirve para ver las entidades del sistema y cómo se relacionan entre ellas.

### Usuario

Representa a la persona que usa la aplicación.

Atributos:

- `idUsuario`
- `nombre`
- `password`
- `rol`

Relación:

- Un usuario puede tener varias barajas.

### Baraja

Representa una colección de cartas y tarjetas de temario.

Atributos:

- `idBaraja`
- `nombre`
- `descripcion`
- `idUsuario`

Relaciones:

- Una baraja pertenece a un usuario.
- Una baraja contiene varias cartas.
- Una baraja contiene varias tarjetas de temario.

En la primera versión, el valor de las cartas se limita a un máximo de 12 y cada baraja puede tener como máximo 4 cartas con el mismo valor. Estas reglas se controlan desde la API.

### Carta

Representa una carta dentro de una baraja.

Atributos:

- `idCarta`
- `nombre`
- `valor`
- `tipoResultado`
- `idBaraja`

El campo `tipoResultado` solo puede tener estos valores:

- `APTO`
- `NO_APTO`
- `PRUEBA_OTRA_VEZ`

El campo `valor` se usará para indicar la posición o número de la carta dentro de la baraja. En la primera baraja irá del 1 al 12.

Relación:

- Una carta pertenece a una baraja.

### Tarjeta

Representa una tarjeta con contenido teórico de una baraja.

Las tarjetas se usarán como contenido de repaso cuando el resultado de una carta sea `NO_APTO` o `PRUEBA_OTRA_VEZ`.

Atributos:

- `idTarjeta`
- `titulo`
- `contenido`
- `idBaraja`

Relación:

- Una tarjeta de temario pertenece a una baraja.

## Modelo relacional

En el modelo relacional las entidades se convierten en tablas.

Las relaciones 1:N se resuelven añadiendo una clave foránea en la tabla que está en el lado N de la relación.

Por ejemplo, como un usuario puede tener muchas barajas, la tabla `barajas` guarda el campo `idUsuario`.

## Tablas

### `usuarios`

| Campo | Clave | Descripción |
| --- | --- | --- |
| `idUsuario` | PK | Identificador del usuario. |
| `nombre` |  | Nombre del usuario. |
| `password` |  | Contraseña. |
| `rol` |  | Rol del usuario. |

### `barajas`

| Campo | Clave | Descripción |
| --- | --- | --- |
| `idBaraja` | PK | Identificador de la baraja. |
| `nombre` |  | Nombre de la baraja. |
| `descripcion` |  | Descripción de la baraja. |
| `idUsuario` | FK | Usuario al que pertenece la baraja. |

### `cartas`

| Campo | Clave | Descripción |
| --- | --- | --- |
| `idCarta` | PK | Identificador de la carta. |
| `nombre` |  | Nombre de la carta. |
| `valor` |  | Valor de la carta. |
| `tipoResultado` |  | Resultado de la carta. |
| `idBaraja` | FK | Baraja a la que pertenece la carta. |

### `tarjetas`

| Campo | Clave | Descripción |
| --- | --- | --- |
| `idTarjeta` | PK | Identificador de la tarjeta. |
| `titulo` |  | Título de la tarjeta. |
| `contenido` |  | Contenido teórico de la tarjeta. |
| `idBaraja` | FK | Baraja a la que pertenece la tarjeta. |

## Relaciones

Las relaciones del diseño son:

- `Usuario` 1:N `Baraja`
- `Baraja` 1:N `Carta`
- `Baraja` 1:N `Tarjeta`

Esto significa que:

- Un usuario puede tener muchas barajas, pero cada baraja pertenece a un solo usuario.
- Una baraja puede tener muchas cartas, pero cada carta pertenece a una sola baraja.
- Una baraja puede tener muchas tarjetas de temario, pero cada tarjeta pertenece a una sola baraja.

Aunque la relación permite varias cartas por baraja, en la aplicación se limitará a un máximo de 12 cartas por baraja para mantener una estructura parecida a una baraja sencilla.

## Decisiones de diseño

Se han tomado decisiones sencillas para que el modelo sea fácil de implementar:

- Cada entidad principal tiene su propia tabla.
- Cada tabla tiene una clave primaria.
- Las relaciones se controlan con claves foráneas.
- Las cartas y las tarjetas de temario dependen de una baraja.
- Las barajas dependen de un usuario.
- `tipoResultado` se mantiene como una lista cerrada de valores.
- Las tablas de la base de datos se nombran en plural para alinearlas con los recursos del backend.
- Se usa `Tarjeta` como nombre de entidad y `idTarjeta` como identificador.
- El valor máximo de una carta es 12 y se valida desde el backend.
- Se permite un máximo de 4 cartas con el mismo valor dentro de una misma baraja.
- No se valida una carta duplicada exacta, porque la regla importante del modelo es controlar la repetición por valor.
- Al eliminar una baraja desde la API, se comprueba que el solicitante sea propietario o admin y se eliminan primero sus cartas asociadas.
- Las cartas con resultado `APTO` mostrarán un mensaje de aprobado.
- Las cartas con resultado `NO_APTO` o `PRUEBA_OTRA_VEZ` mostrarán una tarjeta formativa.

## Utilidad para el desarrollo

Este diseño servirá como base para crear la base de datos en MariaDB.

Las tablas se podrán crear siguiendo el modelo relacional con nombres en plural:

- `usuarios`
- `barajas`
- `cartas`
- `tarjetas`

La primera baraja podrá cargarse como datos iniciales en `seeds.sql`, incluyendo sus 12 cartas y las tarjetas formativas relacionadas.

En desarrollo, MariaDB se levanta con Docker Compose y toma la configuracion desde variables de entorno. El backend usa esas mismas variables para conectarse a la base de datos mediante un pool de conexiones.

También servirá para preparar la API REST. Cada tabla podrá tener sus operaciones básicas:

- Crear registros.
- Consultar registros.
- Modificar registros.
- Eliminar registros.

Por ejemplo, más adelante se podrán crear rutas como:

- `/usuarios`
- `/barajas`
- `/cartas`
- `/tarjetas`

El diseño también ayuda a mantener la integridad de los datos, porque las claves foráneas evitan que existan cartas sin baraja, tarjetas sin baraja o barajas sin usuario.

## Documentación de estudio

Como complemento a este diseño inicial, la carpeta `docs/estudio/` recoge la documentación específica de la funcionalidad de tarjetas de estudio.

Estos documentos servirán como guía de análisis y diseño para preparar:

- La estructura de datos de las tarjetas.
- Los endpoints de la API REST.
- Las pantallas y componentes del frontend.
- El flujo funcional entre cartas, resultados y tarjetas.
- La metodología de trabajo aplicada durante el desarrollo.
- El contenido teórico que más adelante podrá cargarse como material real de estudio.

Documentos relacionados:

- `docs/estudio/tarjeta-db.md`
- `docs/estudio/tarjeta-backend.md`
- `docs/estudio/tarjeta-frontend.md`
- `docs/estudio/tarjeta-flujo.md`
- `docs/estudio/tarjeta-gitflow.md`
