const pool = require('../config/db');
const { contieneModoPruebas } = require('../utils'); // validacion reutilizable del modo pruebas

const getBarajas = async (req, res) => {
    try {
        const rows = await pool.query(
            'SELECT idBaraja, nombre, descripcion, idUsuario FROM barajas'
        );
        
        res.json(rows);
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor. Vuelve a intentarlo mas tarde.'
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
            message: 'Error interno del servidor. Vuelve a intentarlo mas tarde.'
        });
    }
};

const createBaraja = async (req, res) => {
    try {
        const {nombre, descripcion, idUsuario} = req.body;

        // Validaciones previas para evitar errores controlables de MariaDB.
        if (!nombre || !descripcion || !idUsuario) {
            return res.status(400).json({
                message: 'Faltan datos obligatorios'
            });
        }

        if (nombre.length > 20) {
            return res.status(400).json({
                message: 'El nombre no puede tener mas de 20 caracteres'
            });
        }

        if (descripcion.length > 100) {
            return res.status(400).json({
                message: 'La descripcion no puede tener mas de 100 caracteres'
            });
        }

        if (contieneModoPruebas(descripcion)) {
            console.warn(`[${new Date().toISOString()}] Modo pruebas denegado desde ${req.ip}`);
            return res.status(422).json({
                status: 'error',
                reason: 'Modo pruebas denegado'
            });
        }

        // Se valida la relacion antes del INSERT para devolver 404 en vez de error SQL.
        const usuarios = await pool.query(
            'SELECT idUsuario FROM usuarios WHERE idUsuario = ?',
            [idUsuario]
        );

        if (usuarios.length === 0) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        }

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
            message: 'Error interno del servidor. Vuelve a intentarlo mas tarde.'
        });
    }
};

const updateBaraja = async (req, res) => {
    try {
        const {id} = req.params;
        const {nombre, descripcion} = req.body;

        // Validaciones previas para evitar errores controlables de MariaDB.
        if (!nombre || !descripcion) {
            return res.status(400).json({
                message: 'Faltan datos obligatorios'
            });
        }

        if (nombre.length > 20) {
            return res.status(400).json({
                message: 'El nombre no puede tener mas de 20 caracteres'
            });
        }

        if (descripcion.length > 100) {
            return res.status(400).json({
                message: 'La descripcion no puede tener mas de 100 caracteres'
            });
        }

        if (contieneModoPruebas(descripcion)) {
            console.warn(`[${new Date().toISOString()}] Modo pruebas denegado desde ${req.ip}`);
            return res.status(422).json({
                status: 'error',
                reason: 'Modo pruebas denegado'
            });
        }
        
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
            message: 'Error interno del servidor. Vuelve a intentarlo mas tarde.'
        });
    }
};

const deleteBaraja = async (req, res) => {
    try {
        const {id} = req.params;
        const {idUsuario} = req.body;

        // localizar si la baraja existe
        const barajas = await pool.query(
            'SELECT idBaraja, idUsuario FROM barajas WHERE idBaraja = ?',
            [id]
        );

        if (barajas.length === 0) {
            return res.status(404).json({
                message: 'Baraja no encontrada'
            });
        }

        // localizar si el usuario existe
        const usuarios = await pool.query(
            'SELECT idUsuario, rol FROM usuarios WHERE idUsuario = ?',
            [idUsuario]
        );

        if (usuarios.length === 0) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        }

        // guardar la baraja y el usuario encontrados
        const baraja = barajas [0];
        const usuario = usuarios [0];

        // comprobar que solo pueda borrar el propietario o un admin
        if (baraja.idUsuario !== Number(idUsuario) && usuario.rol !== 1){
            return res.status(403).json({
                message: 'No tiene permiso para eliminar esta baraja'
            });
        }

        // Se borran dependencias primero para no romper las claves foraneas.
        await pool.query(
            'DELETE FROM cartas WHERE idBaraja = ?',
            [id]
        );

        await pool.query(
            'DELETE FROM tarjetas WHERE idBaraja = ?',
            [id]
        );

        const result = await pool.query(
            'DELETE FROM barajas WHERE idBaraja = ?',
            [id]
        );

        res.json({
            message: 'Baraja eliminada'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor. Vuelve a intentarlo mas tarde.'
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
