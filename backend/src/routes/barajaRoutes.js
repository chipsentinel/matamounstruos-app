const express = require('express');
const {getBarajas, getIdBaraja, createBaraja, updateBaraja} = require('../controllers/barajaController');

const router = express.Router();

router.get('/', getBarajas);
router.get('/:id', getIdBaraja);
router.post('/', createBaraja);
router.put('/:id', updateBaraja);

module.exports = router;