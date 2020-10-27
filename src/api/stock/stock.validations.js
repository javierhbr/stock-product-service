const Joi = require('@hapi/joi');

const consumeStockValidation = (data) => {
    const schema = {
        applyForce: Joi.boolean()
            .required(),
        products: Joi.array().min(1).length(50).required()
            .items({
                id: Joi.string()
                    .min(3)
                    .required(),
                quantity: Joi.number()
                    .min(1)
                    .max(100)
                    .required()
            })
    };
    return Joi.validate(data, schema);
};

module.exports = {
    consumeStockValidation
};