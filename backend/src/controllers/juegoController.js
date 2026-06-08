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

const getTarjetaPorCarta = async (req, res) => {
    try {
        const {idCarta}= req.params;

        const cartas = await pool.query(
            'SELECT idCarta, tipoResultado, idBaraja FROM cartas WHERE idCarta = ?',
            [idCarta]
        );
        
        if (cartas.length === 0){
            return res.status(404).json({
                message: 'Carta no encontrada'
            });
        }

        const carta = cartas[0];

        // Si eres APTO no veras tarjeta de estudio
        if (carta.tipoResultado === 'APTO') {
            return res.json({
                message: 'Eres APTO, has terminado'
            });
        }
        
        // Tarjeta aletoria para estudiar despues de haber resultado todo menos APTO
        const tarjetas = await pool.query(
            'SELECT idTarjeta, titulo, contenido, idBaraja FROM tarjetas WHERE idBaraja = ? ORDER BY RAND() LIMIT 1',
            [carta.idBaraja]
        );
        
        if (tarjetas.length === 0) {
            return res.status(404).json({
                message: 'Esta baraja no tiene Tarjetas'
            })
        }

        res.json(tarjetas[0]);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getCartaAleatoria,
    getTarjetaPorCarta
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


Repaso de getTarjetaPorCarta:

Esta funcion tambien pertenece a la logica de juego.
Su objetivo es decidir si una carta necesita una tarjeta de estudio.

La ruta prevista es:
    /juego/tarjeta/aleatoria/:idCarta

Si en Postman llamamos a:
    /juego/tarjeta/aleatoria/3

Entonces idCarta vale 3.

1. const {idCarta}= req.params;
    req.params recoge el idCarta que llega por la URL.
    Ese id sirve para saber que carta se esta jugando o revisando.

2. const cartas = await pool.query(...)
    Consulta la tabla cartas para buscar la carta concreta.

    Consulta SQL usada:
        SELECT idCarta, tipoResultado, idBaraja
        FROM cartas
        WHERE idCarta = ?

    SELECT: pide solo los campos necesarios para decidir el flujo.
    FROM cartas: busca la informacion en la tabla cartas.
    WHERE idCarta = ?: filtra por la carta recibida en la URL.

3. if (cartas.length === 0)
    Comprueba si no existe ninguna carta con ese id.
    Si no existe, devuelve 404 con el mensaje Carta no encontrada.

4. const carta = cartas[0];
    Guarda la carta encontrada en una variable mas comoda.
    Como se busca por idCarta, solo deberia haber una carta.

5. if (carta.tipoResultado === 'APTO')
    Si la carta es APTO, no hace falta mostrar tarjeta de estudio.
    Por eso se devuelve un mensaje y se corta la funcion con return.

6. const tarjetas = await pool.query(...)
    Si la carta no es APTO, se busca una tarjeta de estudio.
    La tarjeta se busca en la misma baraja que la carta.

    Consulta SQL usada:
        SELECT idTarjeta, titulo, contenido, idBaraja
        FROM tarjetas
        WHERE idBaraja = ?
        ORDER BY RAND()
        LIMIT 1

    WHERE idBaraja = ?: filtra tarjetas de la misma baraja que la carta.
    ORDER BY RAND(): mezcla las tarjetas al azar.
    LIMIT 1: devuelve solo una tarjeta.

7. [carta.idBaraja]
    Sustituye el ? de la consulta SQL.
    Usa la baraja de la carta para buscar una tarjeta relacionada.

8. if (tarjetas.length === 0)
    Comprueba si no hay tarjetas para esa baraja.
    Si no hay tarjetas, devuelve 404.

9. res.json(tarjetas[0])
    Devuelve la primera tarjeta encontrada.
    Como la consulta tiene LIMIT 1, solo necesitamos la posicion 0.

10. catch (error)
    Si falla la consulta o ocurre un error inesperado,
    se responde con status 500 y el mensaje del error.

11. module.exports
    Exporta getTarjetaPorCarta junto a getCartaAleatoria
    para poder usar ambas funciones en juegoRoutes.js.
*/
