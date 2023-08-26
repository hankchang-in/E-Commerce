const path = require('path');
const express = require('express');
const router = express.Router();
module.exports = router
const shopController = require('../controllers/shop/shop')

router.get('/profile' , shopController.getProfile );