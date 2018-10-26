const fetch = require('node-fetch');
const {currencyConstants} = require('../../constants/product');
const NAME = "Walmart";
const PRODUCT = {
  currency: currencyConstants.CAD,
  location: NAME
};
const KEY = 'rm25tyum3p9jm9x9x7zxshfa';
const ROOT_API = 'http://api.walmartlabs.com/v1/';

const getCheapestProduct = (name) => {
  return fetch(`${ROOT_API}search?&query=${name}&sort=price&order=asc&numItems=1&apiKey=${KEY}`)
    .then(res => res.json())
    .then(json => productAdapter(json));
};

/**
 * Converts bestbuy data
 * @param json {name, salePrice}
 * @returns {productName, bestPrice, currency, location}
 */
const productAdapter = (json) => {
  let result;
  if (json && json.items && json.items.length > 0) {
    const rawProduct = json.items[0];
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



// var bby = require('bestbuy')('YOURKEY');
// bby.products('(search=mario)', {show: 'salePrice, name', pageSize: 100})
//   .then(function(data){
//     if (data.total === 0) console.log('No products found');
//     else console.log('Found %d products. First match "%s" is $%d', data.total, data.products[0].name, data.products[0].salePrice);
//   })
//   .catch(function(err){
//     console.warn(err);
//   });


// {
//   "productName": "iPad Mini",
//   "bestPrice": "150.00",
//   "currency": "CAD",
//   "location": "Walmart"
// }


// http://api.walmartlabs.com/v1/search?apiKey={apiKey}&query=ipad&sort=price&order=asc&numItems=1

// https://api.bestbuy.com/v1/products((search=ipad))?sort=salePrice.asc&show=name,salePrice&facet=salePrice,1&pageSize=100&format=json