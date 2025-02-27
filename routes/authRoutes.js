const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();
//Route d'inscription


router.post('/register', authController.register);


module.exports = router;
