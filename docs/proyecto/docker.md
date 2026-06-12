# Desempeño del proyecto: Docker

Este documento recoge las decisiones y comandos principales usados para preparar Matamounstruos App con Docker y poder levantar el proyecto completo de forma repetible.

El objetivo es que base de datos, backend y frontend puedan arrancar juntos sin depender de una configuracion manual distinta en cada equipo.

## Resumen de desempeño

- Se preparo Docker para MariaDB, backend y frontend.
- Se anadieron Dockerfile para backend y frontend.
- Se configuro Docker Compose para levantar la aplicacion completa.
- Se separo el entorno de desarrollo con `docker-compose-dev.yml`.
- Se documentaron variables, puertos, comandos y comprobaciones.

## Indice

- [Objetivo](#objetivo)
- [Conceptos principales](#conceptos-principales)
- [Estructura Docker](#estructura-docker)
- [Variables de entorno](#variables-de-entorno)
- [Puertos](#puertos)
- [Docker Compose](#docker-compose)
- [Dockerfile backend](#dockerfile-backend)
- [Dockerfile frontend](#dockerfile-frontend)
- [Dockerignore](#dockerignore)
- [Comandos principales](#comandos-principales)
- [Comprobaciones](#comprobaciones)
- [Errores frecuentes](#errores-frecuentes)
- [Notas para la defensa](#notas-para-la-defensa)
- [Navegacion final](#navegacion-final)

## Objetivo

Docker se usa para levantar todos los servicios necesarios de la aplicacion sin depender de instalaciones manuales en cada equipo.

En este proyecto se prepara:

- MariaDB como base de datos.
- Backend Express como API REST.
- Frontend React/Vite compilado y servido con Nginx.

Esta configuracion permite probar la aplicacion completa en local y deja una base preparada para un despliegue posterior.

## Conceptos principales

| Concepto | Explicacion | Uso en el proyecto |
| --- | --- | --- |
| Docker | Permite ejecutar aplicaciones dentro de contenedores. | Se usa para aislar frontend, backend y base de datos. |
| Imagen | Plantilla desde la que se crea un contenedor. | `node:22-alpine`, `nginx:1.27-alpine`, `mariadb:11`. |
| Contenedor | Instancia en ejecucion de una imagen. | Cada servicio de la app corre en su propio contenedor. |
| Dockerfile | Archivo que define como construir una imagen. | Hay uno para backend y otro para frontend. |
| Docker Compose | Herramienta para levantar varios contenedores juntos. | Se usa para iniciar MariaDB, backend y frontend. |
| Volumen | Espacio persistente para guardar datos. | MariaDB usa volumen para conservar la base de datos. |
| `.dockerignore` | Evita copiar archivos innecesarios a la imagen. | Excluye `node_modules`, `.env`, `dist` y archivos locales. |

## Estructura Docker

Archivos principales:

```text
backend/
  Dockerfile
  .dockerignore

frontend/
  Dockerfile
  .dockerignore

docker/
  docker-compose.yml
  docker-compose-dev.yml
  README.md

.env
.env.example
```

`docker-compose.yml` levanta la aplicacion completa.

`docker-compose-dev.yml` queda para levantar solo MariaDB durante el desarrollo.

## Variables de entorno

El proyecto usa un `.env` en la raiz para evitar duplicar configuracion.

Variables principales:

| Variable | Uso |
| --- | --- |
| `DB_HOST` | Host de la base de datos fuera de Docker. |
| `DB_PORT` | Puerto expuesto de MariaDB. |
| `DB_USER` | Usuario de la base de datos. |
| `DB_PASSWORD` | Password del usuario de base de datos. |
| `DB_NAME` | Nombre de la base de datos. |
| `DB_ROOT_PASSWORD` | Password del usuario root de MariaDB. |
| `PORT` | Puerto interno donde corre el backend. |
| `VITE_API_URL` | URL que usa el frontend para llamar al backend. |
| `NODE_ENV` | Entorno de ejecucion. |

El archivo `.env` real no debe subirse al repositorio porque contiene valores privados.

El archivo `.env.example` sirve como plantilla segura para documentar las variables necesarias.

## Puertos

Configuracion usada:

```text
Frontend Docker: http://localhost
Backend Docker:  http://localhost:3001
MariaDB:         localhost:3306
```

El backend corre dentro del contenedor en el puerto `3000`, pero Docker lo expone hacia el equipo como `3001:3000`.

Esto permite diferenciar:

```text
localhost:3000 -> backend local, si se arranca fuera de Docker
localhost:3001 -> backend Docker
```

Por eso, para probar el frontend Docker contra el backend Docker:

```env
VITE_API_URL=http://localhost:3001
```

## Docker Compose

El archivo `docker/docker-compose.yml` define tres servicios:

| Servicio | Funcion |
| --- | --- |
| `mariadb` | Base de datos de la aplicacion. |
| `backend` | API Express conectada a MariaDB. |
| `frontend` | Aplicacion React compilada y servida con Nginx. |

El backend depende de MariaDB.

El frontend depende del backend porque necesita que la API este disponible.

## Dockerfile backend

El backend usa una imagen de Node:

```dockerfile
FROM node:22-alpine
```

Pasos principales:

- Define `/app` como directorio de trabajo.
- Copia `package.json` y `package-lock.json`.
- Instala dependencias de produccion.
- Copia `src/` y `db/`.
- Expone el puerto `3000`.
- Arranca Express con `npm start`.

## Dockerfile frontend

El frontend usa una construccion en dos fases.

Primera fase:

- Usa Node para instalar dependencias.
- Recibe `VITE_API_URL` como argumento de build.
- Ejecuta `npm run build`.
- Genera la carpeta `dist/`.

Segunda fase:

- Usa Nginx.
- Copia `dist/` a `/usr/share/nginx/html`.
- Expone el puerto `80`.
- Sirve el frontend como archivos estaticos.

## Dockerignore

Los `.dockerignore` evitan copiar archivos innecesarios o privados a las imagenes.

Ejemplos:

```text
node_modules
.env
.DS_Store
coverage
```

En frontend tambien se excluye:

```text
dist
```

Esto hace que las imagenes sean mas limpias y evita subir configuracion privada al contexto de Docker.

## Comandos principales

Levantar la aplicacion completa:

```bash
docker compose --env-file .env -f docker/docker-compose.yml up --build
```

Levantar en segundo plano:

```bash
docker compose --env-file .env -f docker/docker-compose.yml up --build -d
```

Ver servicios:

```bash
docker compose --env-file .env -f docker/docker-compose.yml ps
```

Parar servicios:

```bash
docker compose --env-file .env -f docker/docker-compose.yml down
```

Parar y eliminar volumenes:

```bash
docker compose --env-file .env -f docker/docker-compose.yml down -v
```

Validar la configuracion sin arrancar:

```bash
docker compose --env-file .env -f docker/docker-compose.yml config --quiet
```

## Comprobaciones

Comprobaciones realizadas:

- Build de los servicios con Docker Compose.
- MariaDB levantada en contenedor.
- Backend levantado y accesible desde `http://localhost:3001`.
- Frontend levantado y accesible desde `http://localhost`.
- Peticion desde Postman al backend Docker con respuesta `200 OK`.

## Errores frecuentes

| Error | Causa habitual | Solucion |
| --- | --- | --- |
| `address already in use` | El puerto ya esta ocupado. | Cambiar el puerto expuesto o parar el proceso local. |
| Frontend no carga en navegador | El contenedor frontend no esta en `Up`. | Revisar `docker compose ps`. |
| Backend no responde | El backend no ha arrancado o el puerto no coincide. | Revisar logs y confirmar `3001:3000`. |
| El frontend llama al backend equivocado | `VITE_API_URL` apunta a otro puerto. | Usar `http://localhost:3001` para Docker. |
| Cambia `VITE_API_URL` y no se aplica | Vite lee variables durante el build. | Reconstruir con `up --build`. |

## Notas para la defensa

Docker no sustituye al desarrollo local, sino que permite comprobar la aplicacion completa en un entorno reproducible.

La separacion de puertos ayuda a distinguir el backend local del backend Docker.

El frontend se sirve con Nginx porque en despliegue no se usa el servidor de desarrollo de Vite.

El archivo `.env.example` documenta la configuracion sin exponer credenciales reales.

## Navegacion final

- [Volver al README principal](../../README.md)
- [Backend](tarjeta-backend.md)
- [Frontend](tarjeta-frontend.md)
- [Base de datos](tarjeta-db.md)
- [Gitflow](tarjeta-gitflow.md)
