//Controller d'inscription

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const authController = {
  register: (req, res) => {
    const { nom, prenom, email, password } = req.body;

    // Vérification si l'utilisateur existe déjà
    User.findByEmail(email, (err, user) => {
      if (err) return res.status(500).json({ message: 'Erreur serveur' });
      if (user) return res.status(400).json({ message: 'Cet email est déjà utilisé' });

      // Hachage du mot de passe
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json({ message: 'Erreur serveur' });

        // Création de l'utilisateur
        User.create(nom, prenom, email, hashedPassword, (err, result) => {
          if (err) return res.status(500).json({ message: 'Erreur serveur' });
          res.status(201).json({ message: 'Utilisateur créé avec succès', userId: result.id });
        });
      });
    });
  }
};

module.exports = authController;
