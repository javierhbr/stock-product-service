const fetch = require('node-fetch');
const dotenv = require('dotenv');

dotenv.config()

const getProductPrice = (productId, language) => {
    const URL = `${process.env.PRODUCT_INFO_URL}${process.env.PRODUCT_PRICE_URI}${productId}`;
    return fetch(URL, {
        method: "get",
        headers: {"accept-language": language}
    })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            }
            console.error(`error product-price.service.js.getProductPrice: error getting data from product Id[${productId}] : ${response.status}, ${response.body}`);
            throw Error(`error product-price.service.js.getProductPrice: error getting data from product Id[${productId}] : ${response.status}, ${response.body}`);
        })
};

module.exports = {
    getProductPrice
};


