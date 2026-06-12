# Docker

Comandos para levantar MariaDB en desarrollo o la aplicacion completa con Docker Compose.

## Decision de configuracion

Docker Compose usa el archivo `.env` de la raiz del proyecto para leer la configuracion del proyecto.

Se tomo esta decision para evitar duplicar valores en varios sitios. Asi, el backend, Docker y el build del frontend pueden usar las mismas variables:

- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`
- `DB_ROOT_PASSWORD`
- `DB_PORT`
- `PORT`
- `VITE_API_URL`
- `NODE_ENV`

De esta forma, si cambia el nombre de la base de datos, el usuario, el puerto o la URL de la API, solo hay que actualizar `.env` y mantener `.env.example` como plantilla documentada.

Como los archivos Compose estan dentro de la carpeta `docker/`, los comandos usan `--env-file .env` para indicar de forma explicita que las variables se leen desde el `.env` de la raiz.

## Inicio rapido

Para iniciar la aplicacion completa desde la raiz del proyecto:

```bash
docker compose --env-file .env -f docker/docker-compose.yml up --build
```

Con la configuracion actual, al terminar el arranque se puede abrir:

```text
Frontend: http://localhost
Backend:  http://localhost:3001
```

Para parar los contenedores:

```bash
docker compose --env-file .env -f docker/docker-compose.yml down
```

## Aplicacion completa

El archivo `docker/docker-compose.yml` levanta:

- `mariadb`: base de datos.
- `backend`: API Express.
- `frontend`: aplicacion React compilada y servida con Nginx.

Levantar todo:

```bash
docker compose --env-file .env -f docker/docker-compose.yml up --build
```

Levantar todo en segundo plano:

```bash
docker compose --env-file .env -f docker/docker-compose.yml up --build -d
```

Parar todo:

```bash
docker compose --env-file .env -f docker/docker-compose.yml down
```

Recrear todo desde cero, eliminando el volumen de MariaDB:

```bash
docker compose --env-file .env -f docker/docker-compose.yml down -v
docker compose --env-file .env -f docker/docker-compose.yml up --build
```

URLs locales con la configuracion actual:

```text
Frontend: http://localhost
Backend:  http://localhost:3001
MariaDB:  localhost:3306
```

El backend se ejecuta dentro del contenedor en el puerto `3000`, pero Docker lo expone en local como `3001:3000`. Por eso `VITE_API_URL` debe apuntar a `http://localhost:3001` durante las pruebas con Docker.

En AWS, `VITE_API_URL` se cambiaria por la IP publica o dominio real del backend antes de construir el frontend.

Si se quiere evitar usar el puerto `80` en local, se puede cambiar el mapeo del frontend en `docker-compose.yml` de `80:80` a `8080:80`. En ese caso el frontend se abriria en `http://localhost:8080`.

## Solo MariaDB en desarrollo

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
