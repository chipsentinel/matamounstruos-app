# Desempeño del proyecto: base de datos

Este documento resume como se ha planteado la parte de base de datos relacionada con las tarjetas de estudio y como encaja dentro del resto del proyecto.

Las tarjetas sirven para mostrar contenido de repaso cuando una carta tiene resultado `NO_APTO` o `PRUEBA_OTRA_VEZ`, por eso la base de datos debe mantener bien la relacion entre barajas, cartas y contenido teorico.

## Resumen de desempeño

- Se definio la tabla `tarjetas` dentro del modelo relacional.
- Se relacionaron las tarjetas con las barajas mediante `idBaraja`.
- Se dejaron datos iniciales en `seeds.sql` para poder probar la aplicacion.
- Se documento el uso de MariaDB en Docker y la comprobacion con `/health/db`.
- Se explico el papel de las tarjetas dentro del flujo del juego.

## Tabla

La tabla se llama `tarjetas` y pertenece a una baraja mediante `idBaraja`.

| Campo | Tipo | Clave | Uso |
| --- | --- | --- | --- |
| `idTarjeta` | `INT UNSIGNED AUTO_INCREMENT` | PK | Identifica la tarjeta. |
| `titulo` | `VARCHAR(50)` |  | Título visible. |
| `contenido` | `TEXT` |  | Explicación o ayuda de estudio. |
| `idBaraja` | `INT UNSIGNED` | FK | Baraja a la que pertenece. |

La relación principal es:

```text
barajas 1:N tarjetas
```

Esto significa que una baraja puede tener varias tarjetas, pero cada tarjeta pertenece a una sola baraja.

## SQL

La estructura está en `backend/db/schema.sql`.

```sql
CREATE TABLE tarjetas (
    idTarjeta INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(50) NOT NULL,
    contenido TEXT NOT NULL,
    idBaraja INT UNSIGNED NOT NULL,
    FOREIGN KEY (idBaraja) REFERENCES barajas(idBaraja)
);
```

## Datos iniciales

Los datos iniciales estan en `backend/db/seeds.sql`.

Actualmente se cargan 5 barajas completas:

- `gitflow`
- `backend`
- `frontend`
- `database`
- `devops-testing`

Cada baraja tiene 12 cartas y varias tarjetas tematicas de repaso. La distribucion de resultados esta pensada para que el juego sea jugable, pero con mas cartas de repaso que de victoria.

## Entorno

La base de datos se levanta con MariaDB en Docker.

Comando principal:

```bash
docker compose --env-file .env -f docker/docker-compose-dev.yml up -d
```

La guía de Docker y DBeaver está en `docker/README.md`.

La base de datos usada en desarrollo se llama `matamounstruosdb`.

La conexion desde el backend se comprueba con:

```text
GET /health/db
```

## Reglas

- Una tarjeta siempre debe tener `titulo`.
- Una tarjeta siempre debe tener `contenido`.
- Una tarjeta siempre debe pertenecer a una baraja.
- No debe existir una tarjeta con `idBaraja` inexistente.

## Pendiente

- Decidir si una tarjeta podrá asociarse a una carta concreta.
- Decidir si hará falta un campo de orden, categoría o nivel.
- Decidir qué pasará con las tarjetas si se elimina una baraja.
