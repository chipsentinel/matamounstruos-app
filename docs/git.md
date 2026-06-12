# Git

El proyecto se ha trabajado con ramas por funcionalidad.

## Ramas

Ejemplos:

- `feature/frontend-react`
- `feature/testing-postman`
- `feature/github-actions-release`
- `bugfix/...`

## Flujo recomendado

1. Partir de `develop` o de la rama indicada.
2. Crear rama nueva:

```bash
git checkout -b feature/nombre-rama
```

3. Hacer cambios pequenos y comprobables.
4. Revisar estado:

```bash
git status
```

5. Crear commit claro:

```bash
git add .
git commit -m "docs: organiza documentacion del proyecto"
```

6. Subir rama:

```bash
git push -u origin feature/nombre-rama
```

7. Abrir Pull Request.

## Buenas practicas

- Un commit debe explicar una intencion concreta.
- No mezclar cambios grandes sin relacion.
- Probar antes de subir.
- Documentar en la issue que se ha comprobado.
- Si hay capturas, adjuntarlas al comentario de avance o cierre.

## Mensajes de commit utiles

- `feat: anade workflow de integracion continua`
- `test: anade pruebas unitarias del backend`
- `test: actualiza coleccion Postman`
- `docs: reorganiza documentacion de estudio`
- `fix: mejora validaciones de barajas`
