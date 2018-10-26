const fetch = require('node-fetch');
const {currencyConstants} = require('../../constants/product');
const NAME = "BestBuy";
const PRODUCT = {
  currency: currencyConstants.CAD,
  location: NAME
};
const KEY = 'pfe9fpy68yg28hvvma49sc89';
const ROOT_API = 'https://api.bestbuy.com/v1/';


const getCheapestProduct = (name) => {
  return fetch(`${ROOT_API}products(name=${name}*)?sort=salePrice.asc&show=name,salePrice&facet=salePrice,1&pageSize=1&format=json&&apiKey=${KEY}`)
    .then(res => res.json())
    .then(json => productAdapter(json))
};

/**
 * Converts bestbuy data
 * @param json {name, salePrice}
 * @returns {productName, bestPrice, currency, location}
 */
const productAdapter = (json) => {
  let result;
  if (json && json.products && json.products.length > 0) {
    const rawProduct = json.products[0];
    result = {
      ...PRODUCT,
      productName: rawProduct.name,
      bestPrice: rawProduct.salePrice,
    }
  }
  console.log('result', result);
  return result;
};

module.exports = {getCheapestProduct};