const express= require('express');
const { registerUser, getUser, setMpin, login } = require('../controllers/authController');
const authCheck= require('../middleware/authCheck');
const router= express.Router();

router.post('/register', registerUser)
router.get('/user', authCheck, getUser)
router.post('/setmpin', authCheck, setMpin)
router.post('/login', login)



module.exports= router

