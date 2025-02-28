const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const authController = {
  // Contrôleur d'inscription
  register: (req, res) => {
    const { nom, prenom, email, password, user_role } = req.body;

    // Vérification si l'utilisateur existe déjà
    User.findByEmail(email, (err, user) => {
      if (err) return res.status(500).json({ message: 'Erreur serveur' });
      if (user) return res.status(400).json({ message: 'Cet email est déjà utilisé' });

      // Hachage du mot de passe
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json({ message: 'Erreur serveur' });

        // Création de l'utilisateur
        User.create(nom, prenom, email, hashedPassword, user_role, (err, result) => {
          if (err) return res.status(500).json({ message: 'Erreur serveur' });
          res.status(201).json({ message: 'Utilisateur créé avec succès', userId: result.id });
        });
      });
    });
  },

  // Contrôleur de connexion
  login: (req, res) => {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
    User.findByEmail(email, (err, user) => {
      if (err) return res.status(500).json({ message: 'Erreur serveur' });
      if (!user) return res.status(400).json({ message: 'Email ou mot de passe incorrect' });

      // Comparer le mot de passe
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) return res.status(500).json({ message: 'Erreur serveur' });
        if (!isMatch) return res.status(400).json({ message: 'Email ou mot de passe incorrect' });

        // Génération d'un token JWT
        const token = jwt.sign({ userId: user.id, role: user.user_role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Connexion réussie', token });
      });
    });
  }
};

module.exports = authController;
