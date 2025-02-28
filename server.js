const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const db = require('./db'); // Connexion à la base de données SQLite

dotenv.config();
const app = express();

app.use(express.json()); // Pour lire les requêtes JSON

// Routes
app.use('/api/auth', authRoutes);

// Route de test
app.get('/', (req, res) => {
  res.send('Gestion des projecteurs - Serveur démarré');
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur le port ${PORT}`);
});
