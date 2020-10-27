const productServicePrice = require('./product-price.service');
const productServiceStock = require('./product-stock.service');

const getProductStock = async (productId, language) => {
    try {
        const price = await productServicePrice.getProductPrice(productId, language);
        const stock = await productServiceStock.getStock(productId);
        if (stock === -1000) {
            throw -1000;
        } else {
            return {
                id: productId,
                currency: price.currency,
                price: price.price,
                stock
            };
        }
    } catch (error) {
        console.error(`error product.service.js.getProductStock: error getting data from product Id[${productId}] : ${error}`);
        throw error;
    }
};


const saveNewProductsStock = (askForConfirmation, applyForce, productsToConsume ) =>{
    if (!askForConfirmation || applyForce) {
        productsToConsume.forEach(product => {
            if (product.newStock !== -20000) {
                productServiceStock.consumeStock(product.id, product.newStock);
            }
        });
    }
};

const consumeStockOfProducts = async (products, applyForce, language) => {
    try {
        let askForConfirmation = false;
        const productsToConsumePromise = products.map(async (product) => {
            let fullProduct = {
                id: product.id,
                quantity: product.quantity,
                message: 'product confirmed'
            };
            try {
                const productData = await getProductStock(product.id, language)
                fullProduct.currency = productData.currency;
                fullProduct.price = productData.price;
                fullProduct.currentStock = productData.stock;

                const newStock = productServiceStock.calculateNewStock(fullProduct.currentStock, fullProduct.quantity);
                fullProduct.newStock = newStock;
                if (newStock === -20000) {
                    askForConfirmation = true;
                    fullProduct.message = 'product out of stock'
                }

            } catch (error) {
                console.error(`error product.service.js.consumeStockOfProducts: error consuming stock for product Id[${product.id}] : ${error}`);
                askForConfirmation = true;
                fullProduct.message = 'Oops, something happen with this product, try later.'
            }
            return fullProduct;
        });

        const productsToConsume = await Promise.all(productsToConsumePromise);
        saveNewProductsStock(askForConfirmation, applyForce, productsToConsume );
        const returnProducts = productsToConsume.map(product => {
            return {
                id: product.id,
                quantity: product.quantity,
                currency: product.currency,
                price: product.price,
                message: product.message
            }
        });

        const status = (!askForConfirmation || applyForce) ? "APPLIED" : "CONFIRMATION";
        return {
            status: status,
            returnProducts
        };

    } catch (error) {
        console.error(`error product.service.js.consumeStockOfProducts: error consuming stock: ${error}`);
        throw error;
    }
}

module.exports = {
    getProductStock,
    consumeStockOfProducts
};