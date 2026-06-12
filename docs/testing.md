# Testing

El proyecto tiene dos tipos de pruebas principales: unitarias e integracion con Postman/Newman.

## Tests unitarios

Los tests unitarios estan en:

```text
backend/src/test/unit/
```

Sirven para probar funciones pequenas sin levantar todo el servidor.

Ejemplo importante:

- `contieneModoPruebas(texto)` detecta `TEST` o `PRUEBA`.

Comando:

```bash
cd backend
npm test
```

## Postman

Postman se usa para probar endpoints reales con el backend levantado.

La coleccion esta en:

```text
postman/matamounstruos-app.postman_collection.json
```

Se prueban casos como:

- Listar usuarios.
- Crear usuario.
- Validar errores de usuario.
- CRUD de barajas.
- Respuestas `400`, `404`, `409`, `422`.
- Endpoints principales del juego.

## Newman

Newman permite ejecutar la coleccion de Postman por terminal.

Comando:

```bash
cd backend
npx newman run ../postman/matamounstruos-app.postman_collection.json
```

Resultado esperado:

- Requests ejecutadas sin fallos.
- Test scripts ejecutados.
- Assertions correctas.

## GitHub Actions

El workflow automatiza comprobaciones al subir cambios.

Archivo:

```text
.github/workflows/ci.yml
```

Comprueba normalmente:

- Instalacion de dependencias.
- Tests del backend.
- Build del frontend.

## Diferencia entre unitario e integracion

Un test unitario comprueba una funcion aislada.

Un test de integracion comprueba que varias piezas funcionan juntas: servidor, rutas, controladores y base de datos.

## Checklist rapido

```bash
cd backend
npm test
npx newman run ../postman/matamounstruos-app.postman_collection.json

cd ../frontend
npm run build
```
