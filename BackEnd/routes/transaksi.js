const express = require('express');
const router = express.Router();
const transaksi = require('../controllers/transaksi.controller.js');

router.get('/', transaksi.getAllTransaksi);
router.get('/:id', transaksi.getOneTransaksi);

module.exports = router;