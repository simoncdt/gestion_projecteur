const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const projectorRoutes = require('./routes/projectorRoutes');
dotenv.config();
const app = express();

app.use(express.json()); // Pour lire les requêtes JSON

// Route auth
app.use('/api/auth', authRoutes);
// Routes pour les projecteurs
app.use('/api', projectorRoutes);

const PORT = process.env.PORT || 4002;
app.listen(PORT, () => console.log(`✅Serveur démarré sur le port ${PORT}`));

