const pool = require('../config/db');

// leer usuario
const getUsuarios = async (req, res) => {
    try {
        // ejecutar una consulta sencilla para validar la conexion
        const rows = await pool.query('SELECT idUsuario, nombre, rol FROM usuarios');
        
        // responder con estado correcto si mariadb responde
        res.json(rows);
    } catch (error) {
        // responder con error 500 si falla la conexion o la consulta
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