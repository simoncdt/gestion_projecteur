const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authMiddleware = (req, res, next) => {
  // Récupérer le token depuis l'en-tête Authorization
  const token = req.header('Authorization')?.replace('Bearer ', ''); // "Bearer " est souvent ajouté avant le token

  // Vérifier si le token est absent
  if (!token) {
    return res.status(401).json({ message: 'Accès refusé, token manquant.' });
  }

  try {
    // Vérifier et décoder le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attacher les informations de l'utilisateur à la requête
    req.user = decoded;

    // Passer à la suite de la requête
    next();
  } catch (error) {
    return res.status(400).json({ message: 'Token invalide.' });
  }
};

module.exports = authMiddleware;
