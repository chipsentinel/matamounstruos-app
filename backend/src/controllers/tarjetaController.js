const pool = require('../config/db');

const getTarjetas = async (req, res) => {
    try {
        const rows = await pool.query(
            'SELECT idTarjeta, titulo, contenido, idBaraja FROM tarjetas'
        );
        
        res.json(rows);
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor. Vuelve a intentarlo mas tarde.'
        });
    }
};

const getIdTarjeta = async (req, res) => {
    try {
        const { id } = req.params;
        const rows = await pool.query(
            'SELECT idTarjeta, titulo, contenido, idBaraja FROM tarjetas WHERE idTarjeta = ?',[id]
        );       
        
        if (rows.length === 0) {
            return res.status(404).json({
                message: 'Tarjeta no encontrada'
            })
        }

        res.json(rows[0]);

    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor. Vuelve a intentarlo mas tarde.'
        });
    }
};

const createTarjeta = async (req, res) => {
    try {
        const {titulo, contenido, idBaraja} = req.body;

        // Validaciones previas para evitar errores controlables de MariaDB.
        if (!titulo || !contenido || !idBaraja) {
            return res.status(400).json({
                message: 'Faltan datos obligatorios'
            });
        }

        if (titulo.length > 50) {
            return res.status(400).json({
                message: 'El titulo no puede tener mas de 50 caracteres'
            });
        }

        const barajas = await pool.query(
            'SELECT idBaraja FROM barajas WHERE idBaraja = ?',
            [idBaraja]
        );

        if (barajas.length === 0) {
            return res.status(404).json({
                message: 'Baraja no encontrada'
            });
        }

        const result = await pool.query(
            'INSERT INTO tarjetas (titulo, contenido, idBaraja) VALUES (?, ?, ?)',
            [titulo, contenido, idBaraja]
        );

        res.status(201).json({
            message: 'Tarjeta creada',
            idBaraja: Number(result.insertId)
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor. Vuelve a intentarlo mas tarde.'
        });
    }
};

module.exports = {
    getTarjetas,
    getIdTarjeta,
    createTarjeta
};
