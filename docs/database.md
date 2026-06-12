# Base de datos

La base de datos usa MariaDB y guarda la informacion principal de Matamounstruos App.

## Tablas principales

### usuarios

Guarda usuarios de la aplicacion.

Campos habituales:

- `id`
- `nombre`
- `password`

### barajas

Agrupa cartas.

Campos habituales:

- `id`
- `nombre`
- `descripcion`
- `idUsuario`

Relacion:

- Una baraja pertenece a un usuario.

### cartas

Representa las cartas que salen en el juego.

Campos habituales:

- `id`
- `nombre`
- `valor`
- `tipoResultado`
- `idBaraja`

Relacion:

- Una carta pertenece a una baraja.

### tarjetas

Contiene explicaciones o recordatorios de estudio.

Campos habituales:

- `id`
- `titulo`
- `contenido`

## Relaciones

```text
usuarios 1 -> N barajas
barajas  1 -> N cartas
cartas / juego -> tarjetas cuando toca repasar
```

## Dependencias al borrar

Si una tabla depende de otra mediante claves foraneas, el orden importa.

Ejemplo:

- No conviene borrar una baraja sin tener en cuenta sus cartas.
- No conviene borrar un usuario sin revisar sus barajas.

Por eso algunos endpoints pueden devolver errores como `403` o `404` si la operacion no tiene sentido con los datos actuales.

## Archivos utiles

- `backend/db/schema.sql`: estructura de tablas.
- `backend/db/seeds.sql`: datos iniciales con usuarios, 5 barajas completas, cartas y tarjetas tematicas.
- `backend/src/config/db.js`: conexion del backend a MariaDB.

## Como comprobar la base de datos

1. Levantar MariaDB con Docker o tenerla funcionando en local.
2. Revisar variables de entorno.
3. Ejecutar el backend.
4. Probar endpoints desde Postman.
5. Confirmar que los datos aparecen o cambian en la base de datos.
