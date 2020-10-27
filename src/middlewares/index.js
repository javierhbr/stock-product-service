const R = require('ramda');

function checkLanguage(req, res, next) {
    const language = req.get('accept-language');
    if (R.isNil(language) || R.isEmpty(language)) {
        res.status(400).json({
            message: "missing header paramters"
        });
    } else {
        next();
    }
}

module.exports = {
    checkLanguage
};