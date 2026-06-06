# Docker

Comandos para levantar MariaDB en desarrollo.

## Decision de configuracion

Docker Compose usa el archivo `.env` de la raiz del proyecto para leer los datos de MariaDB.

Se tomo esta decision para evitar duplicar valores en varios sitios. Asi, el backend y Docker usan las mismas variables:

- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`
- `DB_ROOT_PASSWORD`
- `DB_PORT`

De esta forma, si cambia el nombre de la base de datos, el usuario o el puerto, solo hay que actualizar `.env` y mantener `.env.example` como plantilla documentada.

Como el archivo `docker-compose-dev.yml` esta dentro de la carpeta `docker/`, los comandos usan `--env-file .env` para indicar de forma explicita que las variables se leen desde el `.env` de la raiz.

## Comandos habituales

Levantar MariaDB:

```bash
docker compose --env-file .env -f docker/docker-compose-dev.yml up -d
```

Parar MariaDB:

```bash
docker compose --env-file .env -f docker/docker-compose-dev.yml down
```

Ver contenedores:

```bash
docker compose --env-file .env -f docker/docker-compose-dev.yml ps
```

Ver logs:

```bash
docker compose --env-file .env -f docker/docker-compose-dev.yml logs -f mariadb
```

Recrear la base desde cero:

```bash
docker compose --env-file .env -f docker/docker-compose-dev.yml down -v
docker compose --env-file .env -f docker/docker-compose-dev.yml up -d
```

## Datos de conexion

```text
Host: localhost
Puerto: 3306
Base de datos: matamounstruosdb
Usuario: usuario configurado en `DB_USER`
Password: password configurado en `DB_PASSWORD`
```

## Conectar con DBeaver en macOS

1. Levanta MariaDB:

```bash
docker compose --env-file .env -f docker/docker-compose-dev.yml up -d
```

2. Abre DBeaver.
3. Crea una conexion nueva desde `Database > New Database Connection`.
4. Selecciona `MariaDB`.
5. Pulsa `Next`.
6. Usa estos datos:

```text
Server Host: localhost
Port: 3306
Database: matamounstruosdb
Username: valor de `DB_USER`
Password: valor de `DB_PASSWORD`
```

7. Pulsa `Test Connection`.
8. Si DBeaver pide descargar el driver de MariaDB, acepta la descarga.
9. Si la prueba funciona, pulsa `Finish`.

Si despues de pulsar `Finish` no aparece la conexion, abre el navegador de bases de datos desde:

```text
Window > Show View > Database Navigator
```

La conexion MariaDB deberia aparecer en ese panel.
