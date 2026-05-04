const express= require('express');
const authCheck= require('../middleware/authCheck');
const transactionController= require('../controllers/transactionController.js');
const router= express.Router();


router.post('/send', authCheck, transactionController.sendMoney)
router.get('/history', authCheck, transactionController.getTransactionHistory)
router.post('/deposit', authCheck, transactionController.depositMoney)

module.exports= router