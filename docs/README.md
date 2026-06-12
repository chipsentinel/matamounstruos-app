# Documentacion del proyecto

Esta carpeta es el punto de entrada para entender, construir y defender Matamounstruos App.

La documentacion esta separada en tres niveles:

- Documentacion tecnica directa: archivos principales de `docs/`.
- Desempeno del proyecto: carpeta `docs/proyecto/`.
- Contenido de tarjetas: carpeta `docs/tematica/`.

## Mapa rapido

| Seccion | Archivo | Para que sirve |
| --- | --- | --- |
| Guia general | [proyecto/guia-estudio.md](./proyecto/guia-estudio.md) | Entender el proyecto de forma global. |
| Arquitectura | [proyecto/arquitectura.md](./proyecto/arquitectura.md) | Ver el flujo frontend -> backend -> base de datos. |
| Backend | [backend.md](./backend.md) | Repasar Express, rutas, controladores y validaciones. |
| Frontend | [frontend.md](./frontend.md) | Repasar React, vistas, componentes y `api.js`. |
| Base de datos | [database.md](./database.md) | Entender tablas, relaciones y dependencias. |
| Testing | [testing.md](./testing.md) | Ejecutar unitarios, Postman, Newman y CI. |
| DevOps | [devops.md](./devops.md) | Entender Docker, variables y GitHub Actions. |
| Git | [git.md](./git.md) | Repasar ramas, commits, PR y release. |
| Diseno inicial DB | [database-design.md](./database-design.md) | Ver el planteamiento del modelo de datos. |
| Desempeno | [proyecto/README.md](./proyecto/README.md) | Consultar que se hizo por area del proyecto. |
| Tarjetas | [tematica/README.md](./tematica/README.md) | Contenido breve reutilizable como tarjetas de estudio. |

## Regla de organizacion

- Si explica como funciona una parte tecnica, va en `docs/*.md`.
- Si explica que se hizo en una fase del proyecto, va en `docs/proyecto/`.
- Si es contenido breve para convertir en tarjeta, va en `docs/tematica/tarjeta-*.md`.

## Orden recomendado de estudio

1. Leer [Guia de estudio](./proyecto/guia-estudio.md).
2. Leer [Arquitectura](./proyecto/arquitectura.md).
3. Revisar [Backend](./backend.md).
4. Revisar [Frontend](./frontend.md).
5. Revisar [Base de datos](./database.md).
6. Ejecutar lo explicado en [Testing](./testing.md).
7. Revisar [DevOps](./devops.md).
8. Repasar [Git](./git.md).
9. Usar [Tematica](./tematica/README.md) para repasar en formato tarjeta.

## Comandos clave

```bash
# Backend
cd backend
npm install
npm test
npm run dev

# Frontend
cd frontend
npm install
npm run build
npm run dev

# Docker
docker compose up --build

# Postman con Newman
cd backend
npx newman run ../postman/matamounstruos-app.postman_collection.json
```

## Comprobacion final

Antes de dar el proyecto por listo, el recorrido minimo es:

1. Backend: `npm test`.
2. Frontend: `npm run build`.
3. Integracion: `npx newman run ../postman/matamounstruos-app.postman_collection.json`.
4. Docker: `docker compose up --build`.
5. GitHub Actions: comprobar que el workflow aparece en verde en GitHub.
