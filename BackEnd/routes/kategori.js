const express = require('express');
const router = express.Router();
const kategori = require('../controllers/kategori.controller.js')
const Validation = require('../validation/kategori/kategori.validation.js');

router.get('/', kategori.findAll);
router.get('/:id', kategori.findOne);
router.post('/', Validation.createKategori, kategori.create);
router.put('/:id', Validation.createKategori, kategori.update);
router.delete('/:id', kategori.delete);

module.exports = router;