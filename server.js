const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');

const db = require('./db'); 

const projectorRoutes = require('./routes/projectorRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

dotenv.config();
const app = express();

app.use(express.json()); 




app.use('/api/auth', authRoutes);

app.use('/api', projectorRoutes);

app.use('/api', reservationRoutes);


app.get('/', (req, res) => {
  res.send('Gestion des projecteurs - Serveur démarré');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur le port ${PORT}`);
});
