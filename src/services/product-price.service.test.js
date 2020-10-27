const {rest} = require('msw');
const {setupServer} = require('msw/node');
const {getProductPrice} = require('./product-price.service');

const server = setupServer(
    rest.get('http://localhost:3000/product/:productId', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({currency: "$", price: 38}));
    })
);

describe('Product price', () => {
    beforeAll(() => server.listen());
    afterAll(() => server.close());
    describe(' get price by valid product ID', () => {
        afterEach(() => server.resetHandlers());

        it('get success price given a product ID', () => {
            getProductPrice("10500", "en-US")
                .then(productPrice => {
                    expect(productPrice.price).toBe(38);
                    expect(productPrice.currency).toBe("$");
                })
        })
    })
})
