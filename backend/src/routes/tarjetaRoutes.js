const express = require('express');
const {getTarjetas, getIdTarjeta, createTarjeta} = require('../controllers/tarjetaController');

const router = express.Router();

router.get('/', getTarjetas);
router.get('/:id', getIdTarjeta);
router.post('/', createTarjeta);

module.exports = router;