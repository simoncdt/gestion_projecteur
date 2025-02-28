const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.resolve(__dirname, 'gestion_projecteurs.db');
// Connexion à la base SQLite
const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error('❌ Erreur de connexion à la base de données :', err.message);
    } else {
        console.log('✅ Connexion à la base de données SQLite réussie.');
    }
});

// Fonction pour créer les tables
function createTables() {
    db.serialize(() => {
        // Création de la table utilisateurs
        db.run(`
            CREATE TABLE IF NOT EXISTS utilisateurs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nom TEXT NOT NULL,
                prenom TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                user_role TEXT CHECK(user_role IN ('etudiant', 'enseignant', 'admin')) NOT NULL
            )
        `, (err) => {
            if (err) {
                console.error('❌ Erreur lors de la création de la table utilisateurs :', err.message);
            } else {
                console.log('✅ Table utilisateurs créée ou déjà existante.');
            }
        });

        db.run(`
            CREATE TABLE IF NOT EXISTS projecteurs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                disponibilite BOOLEAN DEFAULT 1,
                etat TEXT CHECK(etat IN ('fonctionnel', 'en panne')) DEFAULT 'fonctionnel'
            )
        `, (err) => {
            if (err) {
                console.error('❌ Erreur lors de la création de la table projecteurs :', err.message);
            } else {
                console.log('✅ Table projecteurs créée ou déjà existante.');
            }
        });

        console.log('📌 Les tables ont été vérifiées et créées si nécessaire.');
    });
    db.run(`
        CREATE TABLE IF NOT EXISTS reservations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            projecteur_id INTEGER NOT NULL,
            utilisateur_id INTEGER NOT NULL,
            date_reservation TEXT NOT NULL,
            heure_debut TEXT NOT NULL,
            heure_fin TEXT NOT NULL,
            FOREIGN KEY (projecteur_id) REFERENCES projecteurs(id),
            FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id)
        )
    `, (err) => {
        if (err) {
            console.error('❌ Erreur lors de la création de la table reservations :', err.message);
        } else {
            console.log('✅ Table reservations créée ou déjà existante.');
        }
    });
     
}

// Appeler la fonction pour créer les tables
createTables();

// Exporter la connexion
module.exports = db;
