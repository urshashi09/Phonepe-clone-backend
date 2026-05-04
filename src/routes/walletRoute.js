const express= require('express');
const authCheck= require('../middleware/authCheck');
const walletController= require('../controllers/walletController.js');
const router= express.Router();


router.post('/paybill', authCheck, walletController.payBill)
router.get('/balance', authCheck, walletController.getWalletBalance)

module.exports= router