const express = require('express');
const router = express.Router();
const User = require('../models/user');
const AuthController = require('../controller/auth')
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');



router.get('/register', (AuthController.registerform))

router.post('/register',wrapAsync(AuthController.register))

router.get('/login',(AuthController.loginform))

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: {
        type: 'error_msg',
        msg: 'Invalid Username or Password'

    }
}),AuthController.login )
router.post('/logout', AuthController.logout);



module.exports = router