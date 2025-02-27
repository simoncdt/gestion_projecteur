const db = require('../config/db');

const User = {
  create: (nom, prenom, email, hashedPassword, callback) => {
    const sql = `INSERT INTO utilisateurs (nom, prenom, email, password, user_role) VALUES (?, ?, ?, ?, ?)`;
    db.run(sql, [nom, prenom, email, hashedPassword, 'etudiant'], function (err) {
      callback(err, { id: this.lastID });
    });
  },

  findByEmail: (email, callback) => {
    db.get(`SELECT * FROM utilisateurs WHERE email = ?`, [email], callback);
  }
};

module.exports = User;
