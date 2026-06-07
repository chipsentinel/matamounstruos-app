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
Linea 6 getCartaAleatoria:
    'SELECT idCarta, nombre, valor, tipoResultado, idBaraja 
    FROM cartas 
    WHERE idBaraja = ?, 
    ORDER BY RAND() 
    LIMIT 1'


WHERE idBaraja = ?: solo cartas de una baraja concreta.
ORDER BY RAND(): mezcladas al azar.
LIMIT 1: dame solo una carta. 
*/