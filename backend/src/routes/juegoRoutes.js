const express = require('express');
const {getCartaAleatoria} = require('../controllers/juegoController');

const router = express.Router();

router.get('/cartas/aleatoria/:idBaraja', getCartaAleatoria);

module.exports = router;