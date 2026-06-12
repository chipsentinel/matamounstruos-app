const pool = require('../config/db');

const getCartas = async (req, res) => {
    try {
        const rows = await pool.query(
            'SELECT idCarta, nombre, valor, tipoResultado, idBaraja FROM cartas'
        );
        
        res.json(rows);
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor. Vuelve a intentarlo mas tarde.'
        });
    }
};

// para poder verificar que se borraron todas las cartas de la baraja
const getCartasPorBaraja = async (req, res) => {
    try {
        const { idBaraja } = req.params;

        const rows = await pool.query(
            'SELECT idCarta, nombre, valor, tipoResultado, idBaraja FROM cartas WHERE idBaraja = ?',
            [idBaraja]
        );

        res.json(rows);
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor. Vuelve a intentarlo mas tarde.'
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
            message: 'Error interno del servidor. Vuelve a intentarlo mas tarde.'
        });
    }
};

const createCarta = async (req, res) => {
    try {
        const {nombre, valor, tipoResultado, idBaraja} = req.body;

        // Validaciones previas para evitar errores controlables de MariaDB.
        if (!nombre || valor === undefined || !tipoResultado || !idBaraja) {
            return res.status(400).json({
                message: 'Faltan datos obligatorios'
            });
        }

        if (nombre.length > 20) {
            return res.status(400).json({
                message: 'El nombre no puede tener mas de 20 caracteres'
            });
        }

        // si la carta es mayor de 12 no se crea
        if (valor > 12) {
            return res.status(400).json({
                message: 'La carta no puede valer mas de 12'
            });
        }

        if (!['APTO', 'NO_APTO', 'PRUEBA_OTRA_VEZ'].includes(tipoResultado)) {
            return res.status(400).json({
                message: 'Tipo de resultado no valido'
            });
        }

        // solo puede haber 4 cartas del mismo valor
        const cartaMismoValor = await pool.query(
            'SELECT COUNT(*) AS total FROM cartas WHERE valor = ? AND idBaraja = ?',
            [valor, idBaraja]
        );

        // aviso 209 de que no puede haber mas de 4 cartas del mismo valor
        if (Number(cartaMismoValor[0].total) >= 4) {
            return res.status(409).json({
                message: 'NO puede haber mas de 4 cartas del mismo valor'
            });
        }
        
        // comprobar que la baraja asociada existe antes de crear la carta
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
            'INSERT INTO cartas (nombre, valor, tipoResultado, idBaraja) VALUES (?, ?, ?, ?)',
            [nombre, valor, tipoResultado, idBaraja]
        );

        res.status(201).json({
            message: 'Carta creada',
            idCarta: Number(result.insertId)
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor. Vuelve a intentarlo mas tarde.'
        });
    }
};

const updateCarta = async (req, res) => {
    try {
        const {id} = req.params;
        const {nombre, valor, tipoResultado} = req.body;

        // Validaciones previas para evitar errores controlables de MariaDB.
        if (!nombre || valor === undefined || !tipoResultado) {
            return res.status(400).json({
                message: 'Faltan datos obligatorios'
            });
        }

        if (nombre.length > 20) {
            return res.status(400).json({
                message: 'El nombre no puede tener mas de 20 caracteres'
            });
        }

        if (valor > 12) {
            return res.status(400).json({
                message: 'La carta no puede valer mas de 12'
            });
        }

        if (!['APTO', 'NO_APTO', 'PRUEBA_OTRA_VEZ'].includes(tipoResultado)) {
            return res.status(400).json({
                message: 'Tipo de resultado no valido'
            });
        }
        
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
            message: 'Error interno del servidor. Vuelve a intentarlo mas tarde.'
        });
    }
};

const deleteCarta = async (req, res) => {
    try {
        const {id} = req.params;
        const {idUsuario} = req.body; // identifico usuario para que solo pueda borrar el usurio

        // localizar si la carta existe
        const cartas = await pool.query(
            'SELECT idCarta, idBaraja FROM cartas WHERE idCarta = ?',
            [id]
        );

        if (cartas.length === 0) {
            return res.status(404).json({
                message: 'Carta no encontrada'
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

        // guardar la carta y el usuario encontrados
        const carta = cartas[0];
        const usuario = usuarios[0];

        // localizar la baraja asociada a la carta
        const barajas = await pool.query(
            'SELECT idBaraja, idUsuario FROM barajas WHERE idBaraja = ?',
            [carta.idBaraja]
        );

        if (barajas.length === 0) {
            return res.status(404).json({
                message: 'Baraja no encontrada'
            });
        }

        const baraja = barajas[0];

        // comprobar que solo pueda borrar el propietario de la baraja o un admin
        if (baraja.idUsuario !== Number(idUsuario) && usuario.rol !== 1) {
            return res.status(403).json({
                message: 'No tiene permiso para eliminar esta carta'
            });
        }

        // borrar la carta
        const result = await pool.query(
            'DELETE FROM cartas WHERE idCarta = ?',
            [id]
        );

        res.json({
            message: 'Carta eliminada'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor. Vuelve a intentarlo mas tarde.'
        });
    }
};

module.exports = {
    getCartas,
    getCartasPorBaraja,
    getIdCarta,
    createCarta,
    updateCarta,
    deleteCarta
};
