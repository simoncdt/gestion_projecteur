const express = require('express');
const app = express();
const port = 3000;
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const authMiddleware = require('./middlewares/authMiddleware');
const roleMiddleware = require('./middlewares/roleMiddleware');

dotenv.config();

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

// Route protégée
app.get('/protected', authMiddleware, (req, res) => {
  res.send(`Bienvenue, ${req.user.username}! Vous avez accédé à une route protégée.`);
});

// Route protégée pour obtenir les informations de l'utilisateur
app.get('/profile', authMiddleware, (req, res) => {
  res.json({
    message: 'Voici vos informations de profil.',
    user: req.user // Les informations de l'utilisateur sont attachées à req.user
  });
});

// Route pour login (exemple)
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Vérifiez l'utilisateur (ici, un exemple simple)
  if (username === 'admin' && password === 'adminpassword') {
    const token = jwt.sign(
      { id: 1, username: 'admin', role: 'administrateur' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    return res.json({ token });
  }

  if (username === 'teacher' && password === 'teacherpassword') {
    const token = jwt.sign(
      { id: 2, username: 'teacher', role: 'enseignant' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    return res.json({ token });
  }

  if (username === 'student' && password === 'studentpassword') {
    const token = jwt.sign(
      { id: 3, username: 'student', role: 'etudiant' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    return res.json({ token });
  }

  // Si les identifiants sont incorrects
  res.status(401).json({ message: 'Identifiants invalides' });
});

// Route protégée pour les administrateurs uniquement
app.get('/admin', authMiddleware, roleMiddleware('administrateur'), (req, res) => {
  res.send('Bienvenue sur la page d\'administration.');
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Le serveur est lancé sur http://localhost:${port}`);
});
