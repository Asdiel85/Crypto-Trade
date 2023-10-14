const router = require('express').Router();

const homeController = require('./controllers/homeController')
const usersController = require('./controllers/usersController.js')
const coinController = require('./controllers/coinController')

router.use(homeController);
router.use('/users', usersController)
router.use('/crypto', coinController)
router.get('*', (req, res) => {
    res.redirect('/404')
})

module.exports = router;