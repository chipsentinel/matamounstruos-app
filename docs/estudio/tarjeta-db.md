# Tarjetas de estudio: base de datos

Este documento resume cómo se guardan las tarjetas de estudio en la base de datos.

Las tarjetas sirven para mostrar contenido de repaso cuando una carta tiene resultado `NO_APTO` o `PRUEBA_OTRA_VEZ`.

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

Los datos iniciales están en `backend/db/seeds.sql`.

Ahora mismo hay 10 tarjetas asociadas a la baraja `autoria-gitflow`.

Ejemplos de tarjetas cargadas:

- `Crear una rama`
- `Revisar estado`
- `Preparar un commit`
- `Crear un commit`
- `Subir una rama`
- `Actualizar con rebase`
- `Resolver conflictos`
- `Cancelar rebase`
- `Guardar cambios`
- `Recuperar trabajo`

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
