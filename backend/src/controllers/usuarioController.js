const pool = require('../config/db');

const getUsuarios = async (req, res) => {
    try {
        const rows = await pool.query(
            'SELECT idUsuario, nombre, rol FROM usuarios'
        );
        
        res.json(rows);
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor. Vuelve a intentarlo mas tarde.'
        });
    }
};

const createUsuario = async (req, res) => {
    try {
        const {nombre, password} = req.body;

        if (!nombre || !password) {
            return res.status(400).json({
                message: 'Faltan datos obligatorios'
            });
        }

        if (nombre.length > 10) {
            return res.status(400).json({
                message: 'El nombre no puede tener mas de 10 caracteres'
            });
        }

        if (password.length > 20) {
            return res.status(400).json({
                message: 'La password no puede tener mas de 20 caracteres'
            });
        }

        const usuarioExistente = await pool.query(
            'SELECT idUsuario FROM usuarios WHERE nombre = ?',
            [nombre]
        );

        if (usuarioExistente.length > 0) {
            return res.status(409).json({
                message: 'El usuario ya existe'
            });
        }

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
            message: 'Error interno del servidor. Vuelve a intentarlo mas tarde.'
        });
    }
};

const accesoUsuario = async (req, res) => {
    try {
        const {nombre, password} = req.body;

        if (!nombre || !password) {
            return res.status(400).json({
                message: 'Faltan datos obligatorios'
            });
        }

        // Comprueba el acceso en backend para no validar la password desde el frontend.
        const usuarios = await pool.query(
            'SELECT idUsuario, nombre, rol FROM usuarios WHERE nombre = ? AND password = ?',
            [nombre, password]
        );

        if (usuarios.length === 0) {
            return res.status(401).json({
                message: 'Usuario o password incorrectos'
            });
        }

        res.json(usuarios[0]);
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor. Vuelve a intentarlo mas tarde.'
        });
    }
};

module.exports = {
    getUsuarios,
    createUsuario,
    accesoUsuario
};
