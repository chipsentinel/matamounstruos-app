const express = require('express'); // importar express para crear rutas
const { checkDbConnection } = require('../controllers/healthController'); // importar la funcion del controller

const router = express.Router(); // crear un router separado para rutas health

// definir la ruta GET /health/db para comprobar la conexion con mariadb
router.get('/db', checkDbConnection);

module.exports = router; // exportar el router para usarlo en app.js

/*
Repaso de la ruta:

Este archivo define las rutas relacionadas con comprobaciones de salud del
backend.

1. Importa express para poder crear un router.

2. Importa checkDbConnection desde el controller.
   Esa funcion contiene la logica que comprueba la conexion con MariaDB.

3. Crea un router con express.Router().
   El router permite separar rutas en archivos independientes en lugar de
   escribirlo todo dentro de app.js.

4. Define:
   router.get('/db', checkDbConnection)

   Esta ruta por si sola es /db, pero en app.js se monta con:
   app.use('/health', healthRoutes)

   Por eso la ruta final queda:
   GET /health/db

5. Cuando llega una peticion GET /health/db, Express ejecuta
   checkDbConnection.

6. Al final se exporta el router para que app.js pueda usarlo.

Glosario:

- express.Router():
  Crea un router de Express. Sirve para agrupar rutas en un archivo separado.

- router:
  Objeto donde se definen rutas como GET, POST, PUT o DELETE.

- router.get(...):
  Define una ruta que responde a peticiones HTTP GET.

- '/db':
  Parte final de la ruta. Como app.js monta este router en /health,
  la ruta completa queda /health/db.

- checkDbConnection:
  Funcion controller que se ejecuta cuando llega una peticion a /health/db.

- module.exports:
  Exporta el router para que otro archivo pueda importarlo con require().

- require(...):
  Importa codigo desde otro archivo o paquete.
*/
