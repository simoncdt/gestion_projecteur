const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route d'inscription (POST)
router.post('/register', authController.register);
// Route de connexion (POST)
router.post('/login', authController.login);

module.exports = router;
