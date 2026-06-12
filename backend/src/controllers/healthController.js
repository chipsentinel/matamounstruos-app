const pool = require('../config/db'); // importar el pool de conexiones a mariadb

// funcion que comprueba si el backend puede conectarse a la base de datos
const checkDbConnection = async (req, res) => {
    try {
        // ejecutar una consulta sencilla para validar la conexion
        const rows = await pool.query('SELECT 1 AS ok');
        
        // responder con estado correcto si mariadb responde
        res.json({
            database: 'connected',
            result: rows[0]
        });
    } catch (error) {
        // responder con error 500 si falla la conexion o la consulta
        res.status(500).json({
            message: 'Error interno del servidor. Vuelve a intentarlo mas tarde.'
        });
    }
};

// exportar la funcion para poder usarla desde las rutas
module.exports = {
    checkDbConnection
};

/*
Repaso del controller:

Este archivo contiene la logica que se ejecuta cuando se llama a la ruta
GET /health/db.

1. Importa el pool desde ../config/db.
   El pool es el objeto que permite hacer consultas a MariaDB.

2. Define checkDbConnection como una funcion async.
   Es async porque la consulta a la base de datos tarda un tiempo y se espera
   con await.

3. Dentro del try se ejecuta:
   SELECT 1 AS ok

   Esta consulta no usa ninguna tabla. Solo sirve para comprobar que MariaDB
   responde correctamente.

4. Si la consulta funciona, se devuelve un JSON con:
   database: 'connected'
   result: rows[0]

5. Si la consulta falla, el catch devuelve un error 500 con:
   message: 'Error interno del servidor. Vuelve a intentarlo mas tarde.'

6. Al final se exporta checkDbConnection para que healthRoutes.js pueda usarla.

Glosario:

- req:
  Significa request. Es la peticion que llega al backend.
  Puede traer parametros, body, headers o query params.

- res:
  Significa response. Es la respuesta que el backend envia al cliente.
  Se usa para devolver JSON, cambiar el codigo HTTP o terminar la peticion.

- res.json(...):
  Envia una respuesta en formato JSON.

- res.status(500):
  Define el codigo HTTP de la respuesta.
  500 significa error interno del servidor.

- async:
  Indica que la funcion trabaja con operaciones asincronas.
  Se usa aqui porque consultar la base de datos no es inmediato.

- await:
  Espera a que termine una promesa antes de continuar.
  Aqui espera a que MariaDB responda a pool.query().

- try:
  Bloque donde se escribe el codigo que se intenta ejecutar.

- catch:
  Bloque que se ejecuta si ocurre un error dentro del try.

- error:
  Objeto con informacion sobre el fallo que ha ocurrido.

- mensaje generico de error:
  Texto sencillo para no exponer detalles internos del servidor.

- rows:
  Resultado devuelto por MariaDB despues de ejecutar la consulta.

- rows[0]:
  Primer resultado de la consulta.

- pool.query(...):
  Ejecuta una consulta SQL usando una conexion del pool.
*/
