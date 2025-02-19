const db = require('./db');

// 📌 Ajouter un utilisateur
function ajouterUtilisateur(nom, prenom, email, password, role, callback) {
    const sql = "INSERT INTO utilisateurs (nom, prenom, email, password, user_role) VALUES (?, ?, ?, ?, ?)";
    db.run(sql, [nom, prenom, email, password, role], function (err) {
        callback(err, this.lastID);
    });
}

// 📌 Récupérer tous les utilisateurs
function getUtilisateurs(callback) {
    db.all("SELECT id, nom, prenom, email, user_role FROM utilisateurs", [], callback);
}

// 📌 Supprimer un utilisateur
function supprimerUtilisateur(id, callback) {
    db.run("DELETE FROM utilisateurs WHERE id = ?", [id], callback);
}

// 📌 Ajouter un projecteur
function ajouterProjecteur(disponibilite, etat, callback) {
    const sql = "INSERT INTO projecteurs (disponibilite, etat) VALUES (?, ?)";
    db.run(sql, [disponibilite, etat], function (err) {
        callback(err, this.lastID);
    });
}

// 📌 Récupérer tous les projecteurs
function getProjecteurs(callback) {
    db.all("SELECT * FROM projecteurs", [], callback);
}

// 📌 Mettre à jour l'état d'un projecteur
function mettreAJourProjecteur(id, disponibilite, etat, callback) {
    const sql = "UPDATE projecteurs SET disponibilite = ?, etat = ? WHERE id = ?";
    db.run(sql, [disponibilite, etat, id], callback);
}

// 📌 Supprimer un projecteur
function supprimerProjecteur(id, callback) {
    db.run("DELETE FROM projecteurs WHERE id = ?", [id], callback);
}

// Exporter les fonctions
module.exports = {
    ajouterUtilisateur,
    getUtilisateurs,
    supprimerUtilisateur,
    ajouterProjecteur,
    getProjecteurs,
    mettreAJourProjecteur,
    supprimerProjecteur
};
