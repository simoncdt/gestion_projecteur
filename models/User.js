const db = require('../config/db'); // Assure-toi d'avoir une connexion à la base de données

const User = {
  findByEmail: (email, callback) => {
    db.get("SELECT * FROM utilisateurs WHERE email = ?", [email], (err, row) => {
      if (err) {
        console.error(err.message);
        return callback(err);
      }
      callback(null, row);
    });
  },
  create: (nom, prenom, email, password, callback) => {
    db.run(
      "INSERT INTO utilisateurs (nom, prenom, email, password, user_role) VALUES (?, ?, ?, ?, 'etudiant')",
      [nom, prenom, email, password],
      function (err) {
        if (err) {
          console.error(err.message);
          return callback(err);
        }
        callback(null, { id: this.lastID });
      }
    );
  }
};

module.exports = User;
