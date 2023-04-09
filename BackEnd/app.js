const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const db = require('./models/bundle.model.js');

app.use('/public', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

db.sequelize.sync({
  force: true
});

const productRouter = require('./routes/produk.js');
app.use('/produk', productRouter);

const kategoriRouter = require('./routes/kategori.js');
app.use('/kategori', kategoriRouter);

const frontendRouter = require('./routes/frontend.js');
app.use('/frontend', frontendRouter);

const transaksiRouter = require('./routes/transaksi.js');
app.use('/transaksi', transaksiRouter);

module.exports = app;