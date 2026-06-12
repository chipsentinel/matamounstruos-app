const mariadb = require('mariadb'); // importar mariadb para conectar con la base de datos

// un pool es un grupo de conexiones reutilizables a mariadb
// crear un pool de conexiones con los datos del .env
const pool = mariadb.createPool({
    host: process.env.DB_HOST,             // host donde se ejecuta mariadb
    port: Number(process.env.DB_PORT),     // puerto de conexion a mariadb
    user: process.env.DB_USER,             // usuario de la base de datos
    password: process.env.DB_PASSWORD,     // password del usuario
    database: process.env.DB_NAME,         // nombre de la base de datos
    connectionLimit: 5                     // numero maximo de conexiones abiertas
});

module.exports = pool; // exportar el pool para usarlo en otros archivos
