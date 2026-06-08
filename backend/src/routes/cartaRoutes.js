const express = require('express');
const {getCartas, getIdCarta, createCarta, updateCarta, deleteCarta} = require('../controllers/cartaController');

const router = express.Router();

router.get('/', getCartas);
router.get('/:id', getIdCarta);
router.post('/', createCarta);
router.put('/:id', updateCarta);
router.delete('/:id', deleteCarta);

module.exports = router;