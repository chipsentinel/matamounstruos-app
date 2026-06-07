const pool = require('../config/db'); // importar el pool de conexiones a mariadb

const getCartaAleatoria = async (req, res) => {
    try {
        const {idBaraja}= req.params;

        const rows = await pool.query(
            'SELECT idCarta, nombre, valor, tipoResultado, idBaraja FROM cartas WHERE idBaraja = ? ORDER BY RAND() LIMIT 1',
            [idBaraja]
        );
        
        if (rows.length === 0){
            return res.status(404).json({
                message: 'Esta baraja no tiene cartas'
            });
        }

        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getCartaAleatoria
};

/*
Repaso de getCartaAleatoria:

Esta funcion pertenece a la logica de juego.
No crea, modifica ni elimina cartas.
Su objetivo es obtener una carta aleatoria de una baraja concreta.

1. const {idBaraja}= req.params;
    req.params contiene los valores que llegan por la URL.

    Si la ruta es:
        /juego/cartas/aleatoria/:idBaraja

    Y en Postman llamamos a:
        /juego/cartas/aleatoria/1

    Entonces idBaraja vale 1.

2. const rows = await pool.query(...)
    pool.query ejecuta una consulta SQL en MariaDB.
    await espera a que MariaDB responda antes de continuar.
    rows guarda el resultado de la consulta.

3. Consulta SQL usada:
    SELECT idCarta, nombre, valor, tipoResultado, idBaraja
    FROM cartas
    WHERE idBaraja = ?
    ORDER BY RAND()
    LIMIT 1

    SELECT: indica que columnas queremos recibir.
    FROM cartas: indica que la informacion sale de la tabla cartas.
    WHERE idBaraja = ?: filtra solo cartas de una baraja concreta.
    ORDER BY RAND(): ordena las cartas de forma aleatoria.
    LIMIT 1: devuelve solo una carta.

4. [idBaraja]
    Sustituye el ? de la consulta SQL.
    Se usa asi para evitar escribir valores directamente dentro del SQL.

5. if (rows.length === 0)
    Comprueba si la consulta no ha encontrado cartas.
    Esto puede pasar si la baraja existe pero todavia no tiene cartas.

6. return res.status(404).json(...)
    Devuelve una respuesta 404 y corta la funcion.
    El return evita que el codigo continue hasta res.json(rows[0]).

7. res.json(rows[0])
    Devuelve la primera carta encontrada.
    Como la consulta tiene LIMIT 1, solo necesitamos la posicion 0.

8. catch (error)
    Si falla la consulta o ocurre un error inesperado,
    se responde con status 500 y el mensaje del error.

9. module.exports
    Exporta getCartaAleatoria para poder usarla en juegoRoutes.js.
*/
