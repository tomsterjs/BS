const express = require('express');
const router = express.Router();
const {getCheapestProduct} = require("../../../controllers/product");

/**
 * Returns the cheapest product
 * Query param: name
 * @example search?name=ipadasync
 */
router.get('/search', getCheapestProduct);

module.exports = router;
