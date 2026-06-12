const express = require('express');
const {getBarajas, getIdBaraja, createBaraja, updateBaraja, deleteBaraja} = require('../controllers/barajaController');

const router = express.Router();

router.get('/', getBarajas);
router.get('/:id', getIdBaraja);
router.post('/', createBaraja);
router.put('/:id', updateBaraja);
router.delete('/:id', deleteBaraja);

module.exports = router;