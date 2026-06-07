const pool = require('../config/db');

const getUsuarios = async (req, res) => {
    try {
        const rows = await pool.query(
            'SELECT idUsuario, nombre, rol FROM usuarios'
        );
        
        res.json(rows);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const createUsuario = async (req, res) => {
    try {
        const {nombre, password} = req.body;

        const result = await pool.query(
            'INSERT INTO usuarios (nombre, password) VALUES (?, ?)',
            [nombre, password]
        );

        res.status(201).json({
            message: 'Usuario creado',
            idUsuario: Number(result.insertId)
        });
    } catch (error) {
        res.status(500).json({
        message: error.message
        });
    }
};

module.exports = {
    getUsuarios,
    createUsuario
};