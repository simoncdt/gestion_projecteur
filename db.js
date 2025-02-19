const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.resolve(__dirname, 'gestion_projecteurs.db');

const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error('❌ Erreur de connexion à la base de données :', err.message);
    } else {
        console.log('✅ Connexion à la base de données SQLite réussie.');
    }
});

// 🚀 Créer les tables si elles n'existent pas
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS utilisateurs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nom TEXT NOT NULL,
            prenom TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            user_role TEXT CHECK(user_role IN ('etudiant', 'enseignant', 'admin')) NOT NULL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS projecteurs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            disponibilite BOOLEAN DEFAULT 1,
            etat TEXT CHECK(etat IN ('fonctionnel', 'en panne')) DEFAULT 'fonctionnel'
        )
    `);

    console.log('📌 Les tables ont été vérifiées et créées si nécessaire.');
});

// Exporter la connexion
module.exports = db;