const express = require('express');
const {getCartaAleatoriaDeBaraja, getTarjetaAleatoriaDeCarta} = require('../controllers/juegoController');

const router = express.Router();

router.get('/carta/aleatoria/:idBaraja', getCartaAleatoriaDeBaraja);
router.get('/tarjeta/aleatoria/:idCarta', getTarjetaAleatoriaDeCarta);


module.exports = router;