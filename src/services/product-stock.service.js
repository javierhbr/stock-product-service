const ProductStock = require('../model/stock.model');

const getStock = async (productId) => {
    const product = await ProductStock.findOne({productId: productId});
    if (product) {
        return product.currentStock;
    } else {
        console.error(`error product-stock.service.js.getStock: error getting stock for product Id[${productId}]`)
        return -1000;
    }
};

const calculateNewStock = (currentStock, quantity) => {
    if (quantity > currentStock) {
        return -20000;
    } else {
        return currentStock - quantity;
    }
};

const consumeStock = async (productId, newStock) => {
    try {
        await ProductStock.updateOne({productId: productId}, {
            currentStock: newStock
        });
    } catch (error) {
        console.error(`error product-stock.service.js.consumeStock: error consuming stock for product Id[${productId}] : ${error}`);
        return error;
    }
};

module.exports = {
    getStock,
    consumeStock,
    calculateNewStock
};