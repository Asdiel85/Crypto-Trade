const router = require('express').Router();

const coinService = require('../services/coinService');
const { extractErrorMessages } = require('../utils/errorHelper');
const { isAuth } = require('../middlewares/authMiddleware');
const {
  isOwner,
  notOwner,
} = require('../middlewares/checkOwnershipMiddleware');

router.get('/catalog', async (req, res) => {
  try {
    const coins = await coinService.getAll();

    res.render('coins/catalog', { coins });
  } catch (error) {
    const errorMessage = extractErrorMessages(error);
    res.render('404', { errorMessage });
  }
});

router.get('/create', isAuth, (req, res) => {
  res.render('coins/create');
});

router.post('/create', isAuth, async (req, res) => {
  const { name, image, price, description, paymentMethod } = req.body;
  const owner = req.user.id;

  try {
    await coinService.createCoin({
      name,
      image,
      price,
      description,
      paymentMethod,
      owner,
    });
    res.redirect('/crypto/catalog');
  } catch (error) {
    const errorMessage = extractErrorMessages(error);
    res.render('coins/create', {
      errorMessage,
      name,
      image,
      price,
      description,
      paymentMethod,
    });
  }
});

router.get('/:id/details', async (req, res) => {
  const coinId = req.params.id;
  const loggetUserId = req.user?.id;
  try {
    const coin = await coinService.getById(coinId);

    const isOwner = coin.owner.toString() === loggetUserId;
    const isBought = !coin.buyCrypto.some(
      (id) => id.toString() === loggetUserId
    );
    res.render('coins/details', { coin, isOwner, isBought });
  } catch (error) {
    const errorMessage = extractErrorMessages(error);
    res.render('404', { errorMessage });
  }
});

router.get('/:id/buy', notOwner, async (req, res) => {
  const coinId = req.params.id;
  const loggetUserId = req.user.id;

  try {
    await coinService.buyCoin(coinId, loggetUserId);
    res.redirect(`/crypto/${coinId}/details`);
  } catch (error) {
    console.log(error);
    const errorMessage = extractErrorMessages(error);
    res.render('404', { errorMessage });
  }
});

router.get('/:id/edit', isOwner, async (req, res) => {
  const coinId = req.params.id;

  try {
    const { name, image, price, description, paymentMethod } =
      await coinService.getById(coinId);
      res.render('coins/edit', {name, image, price, description, paymentMethod})
  } catch (error) {
    const errorMessage = extractErrorMessages(error);
    res.render('404', { errorMessage });
  }
});

router.post('/:id/edit', isOwner, async (req, res) => {
    const coinId = req.params.id;
    const { name, image, price, description, paymentMethod } = req.body;

    try {
        await coinService.editCoin(coinId, { name, image, price, description, paymentMethod })
        res.redirect(`/crypto/${coinId}/details`)
    } catch (error) {
        const errorMessage = extractErrorMessages(error);
        res.render('coins/edit', {errorMessage, name, image, price, description, paymentMethod})  
    }
})

router.get('/:id/delete', isOwner, async (req, res) => {
    const coinId = req.params.id;

    try {
      await coinService.deleteCoin(coinId);
      res.redirect('/crypto/catalog')  
    } catch (error) {
        const errorMessage = extractErrorMessages(error);
        res.render('404', { errorMessage });    
    }
})

router.get('/search', isAuth, async (req, res) => {
    const {name, paymentMethod} = req.query;

    try {
        const coins = await coinService.searchCoins(name, paymentMethod)
        res.render('coins/search', {coins})
    } catch (error) {
        const errorMessage = extractErrorMessages(error);
        res.render('404', { errorMessage });     
    }
})

module.exports = router;
