const {consumeStockValidation} = require('./stock.validations');
const productService = require('../../services/product.service');

async function getStock(req, res) {
    const productId = req.params.id
    const language = req.header('accept-language')
    try {
        const product = await productService.getProductStock(productId, language);
        return res.status(200).send({
            product
        });
    } catch (error) {
        if (error === -1000) {
            return res.status(404).send({
                message: "Oops, we couldn't find the product information"
            });
        } else {
            return res.status(500).send({
                message: error
            });
        }
    }
}

async function consumeStock(req, res, next) {
    const {error} = consumeStockValidation(req.body);
    if (error) {
        return res.status(404).send({
            message: error.details[0].message
        });
    }
    const language = req.header('accept-language')
    const finalResult = await productService.consumeStockOfProducts(
        req.body.products, req.body.applyForce, language);
    return res.status(200).send(finalResult)
}

module.exports = {
    getStock,
    consumeStock
}