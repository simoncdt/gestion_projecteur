const express = require('express');
const app = express();
const port = 3000;
const jwt = require('jsonwebtoken');

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

 //  route protégée pour obtenir les informations de l'utilisateur
  app.get('/profile', authMiddleware, (req, res) => {
    res.json({
      message: 'Voici vos informations de profil.',
      user: req.user // Les informations de l'utilisateur sont attachées à req.user
    });
  });
  
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Vérifiez l'utilisateur (cela peut être une vérification avec une base de données, ici un exemple simple)
  if (username === 'user' && password === 'password') {
    const token = jwt.sign(
      { id: 1, username: 'user' }, // Payload : l'id et le username de l'utilisateur
      process.env.JWT_SECRET,       // Clé secrète stockée dans le fichier .env
      { expiresIn: '1h' }          // Durée de validité du token (1 heure)
    );

    res.json({ token }); // Renvoie le token à l'utilisateur
  } else {
    res.status(401).json({ message: 'Identifiants invalides' });
  }
});



 //Démarrer le serveur
app.listen(port, () => {
  console.log(`Le serveur est lancé sur http://localhost:${port}`);
});
