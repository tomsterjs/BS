const express = require('express');
require('express-async-errors');
const logger = require('morgan');
const searchRouter = require('./api/product/search');
const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/product', searchRouter);

// error handler
app.use(function (err, req, res) {
  res.status(500).send('Something is broken. Please try other API')
});

module.exports = app;
