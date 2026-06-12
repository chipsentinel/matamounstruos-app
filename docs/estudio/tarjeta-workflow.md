# Tarjeta de estudio: GitHub Actions

## Objetivo

Automatizar comprobaciones basicas del proyecto cada vez que se abre una pull request o se suben cambios a ramas principales.

El workflow esta en:

```txt
.github/workflows/ci.yml
```

## Cuando se ejecuta

El workflow se ejecuta en:

- Pull requests.
- Push a `develop`.
- Push a `main`.

## Que comprueba

El workflow tiene dos jobs separados:

| Job | Carpeta | Comprobacion |
| --- | --- | --- |
| Backend tests | `backend/` | Instala dependencias y ejecuta `npm test`. |
| Frontend build | `frontend/` | Instala dependencias y ejecuta `npm run build`. |

## Pasos principales

En backend:

```bash
npm ci
npm test
```

En frontend:

```bash
npm ci
npm run build
```

## Por que se usa `npm ci`

`npm ci` instala las dependencias usando el `package-lock.json`.

Es mas adecuado para integracion continua porque reproduce las versiones exactas usadas en el proyecto.

## Resultado esperado

Para que el workflow sea correcto:

- Los tests unitarios del backend deben pasar.
- El build del frontend debe completarse sin errores.
- La pull request debe mostrar el check de CI en verde.

## Nota sobre Newman

Las pruebas de integracion con Postman/Newman se mantienen documentadas y ejecutables desde local.

En este workflow inicial se automatizan los tests unitarios y el build del frontend para mantener el CI sencillo y estable.
