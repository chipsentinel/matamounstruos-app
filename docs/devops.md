# DevOps

Esta parte documenta Docker, variables de entorno y GitHub Actions.

## Docker

El proyecto prepara contenedores para levantar la aplicacion completa.

Archivos principales:

- `docker-compose.yml`: entorno completo con MariaDB, backend y frontend.
- `docker/docker-compose-dev.yml`: entorno de desarrollo.
- `backend/Dockerfile`: imagen del backend.
- `frontend/Dockerfile`: build de Vite y servicio con Nginx.
- `backend/.dockerignore`: evita copiar archivos innecesarios.
- `frontend/.dockerignore`: evita copiar `node_modules`, cache y builds locales.

## Puertos

- Backend local: `http://localhost:3000` o `http://localhost:3001` segun entorno.
- Frontend local con Vite: `http://localhost:5173`.
- Frontend con Docker/Nginx: `http://localhost`.

## Variables de entorno

El archivo `.env.example` documenta las variables necesarias.

Puntos importantes:

- El backend necesita datos de conexion a MariaDB.
- El frontend usa `VITE_API_URL` para saber donde esta la API.
- En Docker, el frontend no debe apuntar siempre a `localhost` si el backend vive en otro servicio.

## GitHub Actions

Archivo:

```text
.github/workflows/ci.yml
```

Sirve para validar automaticamente que el proyecto sigue construyendo y pasando pruebas.

Comprobaciones recomendadas:

- `npm ci` en backend.
- `npm test` en backend.
- `npm ci` en frontend.
- `npm run build` en frontend.

## Sobre vulnerabilidades npm

`npm ci` puede mostrar avisos de paquetes de terceros.

Lo importante para la validacion del workflow es que el comando termine correctamente. Si se quiere corregir vulnerabilidades, hay que hacerlo con cuidado porque `npm audit fix --force` puede actualizar versiones con cambios incompatibles.

## Release

Para preparar una release:

1. Asegurar que CI pasa.
2. Revisar rama y PR.
3. Fusionar cambios.
4. Crear tag semantico, por ejemplo `v1.0.0`.
5. Publicar release con resumen de cambios.
