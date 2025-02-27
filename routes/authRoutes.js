const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
console.log("AuthController:", authController);

//Route d'inscription(post)
router.post('/register', authController.register);
//Route de connexion (login)
router.post('/login', authController.login);

module.exports = router;
