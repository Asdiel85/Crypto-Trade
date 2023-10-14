const router = require('express').Router()

const userService = require('../services/usersService')
const {extractErrorMessages} = require('../utils/errorHelper')

router.get('/register', (req, res) => {
    res.render('users/register')
})

router.post('/register', async (req, res) => {
    const {email, username, password, repeatPassword } = req.body;

    try {
        await userService.register({email, username, password, repeatPassword })
        res.redirect('/users/login')
    } catch (error) {
        const errorMessage = extractErrorMessages(error )
        res.render('users/register', {errorMessage, email, username,})
    }
})

router.get('/login', (req, res) => {
    res.render('users/login')
})

router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    try {
        const token = await userService.login(email, password);
        res.cookie('auth', token, { httpOnly: true });
        res.redirect('/')
    } catch (error) {
        const errorMessage = extractErrorMessages(error ) 
        res.render('users/login', {errorMessage}) 
    }
})

router.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.redirect('/')
})

module.exports = router