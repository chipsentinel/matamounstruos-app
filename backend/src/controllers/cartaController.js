const pool = require('../config/db');

const getCartas = async (req, res) => {
    try {
        const rows = await pool.query(
            'SELECT idCarta, nombre, valor, tipoResultado, idBaraja FROM cartas'
        );
        
        res.json(rows);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getIdCarta = async (req, res) => {
    try {
        const { id } = req.params;
        const rows = await pool.query(
            'SELECT idCarta, nombre, valor, tipoResultado, idBaraja FROM cartas WHERE idCarta = ?',[id]
        );       
        
        if (rows.length === 0) {
            return res.status(404).json({
                message: 'Carta no encontrada'
            })
        }

        res.json(rows[0]);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const createCarta = async (req, res) => {
    try {
        const {nombre, valor, tipoResultado, idBaraja} = req.body;

        const result = await pool.query(
            'INSERT INTO cartas (nombre, valor, tipoResultado, idBaraja) VALUES (?, ?, ?, ?)',
            [nombre, valor, tipoResultado, idBaraja]
        );

        res.status(201).json({
            message: 'Carta creada',
            idBaraja: Number(result.insertId)
        });
    } catch (error) {
        res.status(500).json({
        message: error.message
        });
    }
};

const updateCarta = async (req, res) => {
    try {
        const {id} = req.params;
        const {nombre, valor, tipoResultado} = req.body;
        
        const result = await pool.query(
            'UPDATE cartas SET nombre = ?, valor = ?, tipoResultado = ? WHERE idCarta = ?',
            [nombre, valor, tipoResultado, id]
        );       
        
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Carta no encontrada'
            });
        }

        res.json({
            message: 'Carta actualizada'
        });

    } catch (error) {
        res.status(500).json({
        message: error.message
        });
    }
};

const deleteCarta = async (req, res) => {
    try {
        const {id} = req.params;

        const result = await pool.query(
            'DELETE FROM cartas WHERE idCarta = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Carta no encontrada'
            });
        }

        res.json({
            message: 'Carta eliminada'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getCartas,
    getIdCarta,
    createCarta,
    updateCarta,
    deleteCarta
};