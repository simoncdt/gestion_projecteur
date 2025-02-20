const express = require('express');
const app = express();
const port = 3000;
const authMiddleware = require('./middlewares/authMiddleware'); 

// Middleware pour les requêtes JSON
app.use(express.json());

// Route de test
app.get('/', (req, res) => {
  res.send('Gestion des projecteurs - Serveur démarré');
});

app.post('/projecteurs', authMiddleware, (req, res) => {
    req.user.id
    res.send('Création d\'un nouveau projecteur');
  });
//route protégée

app.get('/protected', authMiddleware, (req, res) => {
    res.send(`Bienvenue, ${req.user.username}! Vous avez accédé à une route protégée.`);
  });





 //Démarrer le serveur
app.listen(port, () => {
  console.log(`Le serveur est lancé sur http://localhost:${port}`);
});
