const express = require('express');
const {getUsuarios, createUsuario, accesoUsuario} = require('../controllers/usuarioController');

const router = express.Router();

router.get('/', getUsuarios);
router.post('/', createUsuario);
router.post('/acceso', accesoUsuario);

module.exports = router;
