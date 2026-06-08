const express = require('express');
const {getCartaAleatoria, getTarjetaPorCarta} = require('../controllers/juegoController');

const router = express.Router();

router.get('/cartas/aleatoria/:idBaraja', getCartaAleatoria);
router.get('/tarjeta/aleatoria/:idCarta', getTarjetaPorCarta);


module.exports = router;