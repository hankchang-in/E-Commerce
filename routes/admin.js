const path = require('path');
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin/admin')

router.get('/addProducts' , adminController.getAddProduct);
router.post('/addProducts' , adminController.postAddProduct);









module.exports = router

