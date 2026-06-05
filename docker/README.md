# Docker

Comandos para levantar MariaDB en desarrollo.

## Levantar la base de datos

```bash
docker compose -f docker/docker-compose-dev.yml up -d
```

## Ver contenedores

```bash
docker compose -f docker/docker-compose-dev.yml ps
```

## Ver logs

```bash
docker compose -f docker/docker-compose-dev.yml logs -f mariadb
```

## Parar la base de datos

```bash
docker compose -f docker/docker-compose-dev.yml down
```

## Reiniciar desde cero

Este comando borra el volumen de datos y vuelve a cargar `schema.sql` y `seeds.sql`.

```bash
docker compose -f docker/docker-compose-dev.yml down -v
docker compose -f docker/docker-compose-dev.yml up -d
```

## Datos de conexion

```text
Host: localhost
Puerto: 3306
Base de datos: matamounstruos
Usuario: matamounstruos_dev
Password: matamounstruos_dev_pass
```

## Conectar con DBeaver en macOS

1. Levanta MariaDB:

```bash
docker compose -f docker/docker-compose-dev.yml up -d
```

2. Abre DBeaver.
3. Crea una conexion nueva desde `Database > New Database Connection`.
4. Selecciona `MariaDB`.
5. Pulsa `Next`.
6. Usa estos datos:

```text
Server Host: localhost
Port: 3306
Database: matamounstruos
Username: matamounstruos_dev
Password: matamounstruos_dev_pass
```

7. Pulsa `Test Connection`.
8. Si DBeaver pide descargar el driver de MariaDB, acepta la descarga.
9. Si la prueba funciona, pulsa `Finish`.

Si despues de pulsar `Finish` no aparece la conexion, abre el navegador de bases de datos desde:

```text
Window > Show View > Database Navigator
```

La conexion MariaDB deberia aparecer en ese panel.
