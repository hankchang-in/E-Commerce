const path = require('path');
const express = require('express');
const router = express.Router()
const login = require('../controllers/signin/signIn')
const passport = require('../auth/passport')

router.get('/' , login.getSignIn);
router.post('/', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/shop/profile');
  });

module.exports = router