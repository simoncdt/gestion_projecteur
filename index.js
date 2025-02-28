const express = require('express');
const app = express();
const port = 3000;
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const authMiddleware = require('./middlewares/authMiddleware');
const roleMiddleware = require('./middlewares/roleMiddleware');
const authRoutes = require('./routes/authRoutes'); 

dotenv.config();

// Middleware pour les requêtes JSON
app.use(express.json());

// Route de test
app.get('/', (req, res) => {
  res.send('Gestion des projecteurs - Serveur démarré');
});

app.post('/projecteurs', authMiddleware, (req, res) => {
  req.user.id;
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
// Simulation de base de données avec un tableau (dans un projet réel, vous utiliseriez une base de données)
let projecteurs = [
    { id: 1, nom: 'Projecteur A', disponible: true },
    { id: 2, nom: 'Projecteur B', disponible: false },
    { id: 3, nom: 'Projecteur C', disponible: true },
];
  
// Route pour réserver un projecteur
app.post('/reservations', authMiddleware, (req, res) => {
  const { projecteurId } = req.body;

  // Trouver le projecteur par ID
  const projecteur = projecteurs.find(p => p.id === projecteurId);

  // Vérifier si le projecteur existe
  if (!projecteur) {
    return res.status(404).json({ message: 'Projecteur non trouvé.' });
  }

  // Vérifier si le projecteur est disponible
  if (!projecteur.disponible) {
    return res.status(400).json({ message: 'Le projecteur n\'est pas disponible.' });
  }

  // Marquer le projecteur comme réservé (inaccessible)
  projecteur.disponible = false;

  // Répondre à la réservation
  res.json({ message: `Le projecteur "${projecteur.nom}" a été réservé avec succès.` });
});


// Démarrer le serveur
app.listen(port, () => {
  console.log(`Le serveur est lancé sur http://localhost:${port}`);
});
