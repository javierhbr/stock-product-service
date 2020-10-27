const router = require('express').Router();
const {checkLanguage} = require('../../middlewares');
const {getStock, consumeStock} = require('./stock.controller');

router.use(checkLanguage);

router.get('/:id', getStock);
router.post('/consume', consumeStock);

module.exports = router;