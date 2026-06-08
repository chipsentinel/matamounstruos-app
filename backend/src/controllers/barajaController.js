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
        const {idUsuario} = req.body; // identifico usuario para que solo pueda borrar el usurio

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

        // borrar primero las cartas asociadas a la baraja
        await pool.query(
            'DELETE FROM cartas WHERE idBaraja = ?',
            [id]
        );

        // borrar la baraja despues de borrar sus cartas
        const result = await pool.query(
            'DELETE FROM barajas WHERE idBaraja = ?',
            [id]
        );

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
