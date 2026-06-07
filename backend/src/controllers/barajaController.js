const pool = require('../config/db');

const getBarajas = async (req, res) => {
    try {
        const rows = await pool.query(
            'SELECT idBaraja, nombre, descripcion, idUsuario FROM barajas'
        );
        
        res.json(rows);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getIdBaraja = async (req, res) => {
    try {
        const { id } = req.params;
        const rows = await pool.query(
            'SELECT idBaraja, nombre, descripcion, idUsuario FROM barajas WHERE idBaraja = ?',[id]
        );       
        
        if (rows.length === 0) {
            return res.status(404).json({
                message: 'Baraja no encontrada'
            })
        }

        res.json(rows[0]);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const createBaraja = async (req, res) => {
    try {
        const {nombre, descripcion, idUsuario} = req.body;

        const result = await pool.query(
            'INSERT INTO barajas (nombre, descripcion, idUsuario) VALUES (?, ?, ?)',
            [nombre, descripcion, idUsuario]
        );

        res.status(201).json({
            message: 'Baraja creada',
            idBaraja: Number(result.insertId)
        });
    } catch (error) {
        res.status(500).json({
        message: error.message
        });
    }
};

const updateBaraja = async (req, res) => {
    try {
        const {id} = req.params;
        const {nombre, descripcion} = req.body;
        
        const result = await pool.query(
            'UPDATE barajas SET nombre = ?, descripcion = ? WHERE idBaraja = ?',
            [nombre, descripcion, id]
        );       
        
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Baraja no encontrada'
            });
        }

        res.json({
            message: 'Baraja actualizada'
        });

    } catch (error) {
        res.status(500).json({
        message: error.message
        });
    }
};

const deleteBaraja = async (req, res) => {
    try {
        const {id} = req.params;

        const result = await pool.query(
            'DELETE FROM barajas WHERE idBaraja = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Baraja no encontrada'
            });
        }

        res.json({
            message: 'Baraja eliminada'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getBarajas,
    getIdBaraja,
    createBaraja,
    updateBaraja,
    deleteBaraja
};