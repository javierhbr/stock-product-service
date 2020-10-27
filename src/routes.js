const {Router} = require('express');

const stock = require('./api/stock/stock.routes');

const router = Router();

router.use('/api/stock', stock);

module.exports = router;