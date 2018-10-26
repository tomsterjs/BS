const {queryConstants} = require("../../constants/product");
const bestBuy = require("../../services/best_buy");
const walmart = require("../../services/walmart");

const services = [bestBuy, walmart];

/**
 * Return the cheapest product
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
const getCheapestProduct = async (req, res, next) => {
  const name = req.query[queryConstants.NAME];
  let product = {};

  try {
    let products = await getAllProducts(name);
    products = products.filter(element => element);
    if (products.length > 0) {
      product = products.reduce((element, acc) => (!acc || element.bestPrice) < acc.bestPrice ? element : acc);
    }
  } catch (e) {
    next(e);
  }
  res.send(product);
};

/**
 * Retrieve products from services
 * @returns {Promise<void>}
 */
const getAllProducts = async (name) => {
  return await Promise.all(services.map(async service => await service.getCheapestProduct(name)));
};

module.exports = {getCheapestProduct};