const coinService = require('../services/coinService')
const {extractErrorMessages} = require('../utils/errorHelper')

exports.isOwner = async(req, res, next) => {
    const coinId = req.params.id;
    const userId = req.user?.id;

    try {
        const coin = await coinService.getById(coinId)
        if(coin.owner.toString() === userId) {
            next()
        } else {
            res.redirect(`/crypto/${coinId}/details`)
        }
    } catch (error) {
        const errorMessage = extractErrorMessages(error);
        res.render('404', {errorMessage})
    }
}

exports.notOwner = async(req, res, next) => {
    const coinId = req.params.id;
    const userId = req.user?.id;

    try {
        const coin = await coinService.getById(coinId)
        if(coin.owner.toString() !== userId) {
            next()
        } else {
            res.redirect(`/crypto/${coinId}/details`)
        }
    } catch (error) {
        const errorMessage = extractErrorMessages(error);
        res.render('404', {errorMessage})
    }
}