const db = require('../config/db'); // Assurez-vous d'avoir une connexion à la BD

const projectorController = {
  // Ajouter un projecteur
  addProjector: (req, res) => {
    const { name, status } = req.body; // status: "fonctionnel" ou "non fonctionnel"

    if (!name || !status) {
      return res.status(400).json({ message: 'Nom et statut requis' });
    }

    const sql = 'INSERT INTO projectors (name, status) VALUES (?, ?)';
    db.run(sql, [name, status], function (err) {
      if (err) return res.status(500).json({ message: 'Erreur serveur' });
      res.status(201).json({ message: 'Projecteur ajouté', id: this.lastID });
    });
  },

  // Lister les projecteurs disponibles
  getAllProjectors: (req, res) => {
    const sql = 'SELECT * FROM projectors';
    db.all(sql, [], (err, rows) => {
      if (err) return res.status(500).json({ message: 'Erreur serveur' });
      res.status(200).json(rows);
    });
  },

  // Modifier l'état d'un projecteur
  updateProjectorStatus: (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) return res.status(400).json({ message: 'Statut requis' });

    const sql = 'UPDATE projectors SET status = ? WHERE id = ?';
    db.run(sql, [status, id], function (err) {
      if (err) return res.status(500).json({ message: 'Erreur serveur' });
      if (this.changes === 0) return res.status(404).json({ message: 'Projecteur non trouvé' });

      res.status(200).json({ message: 'Statut mis à jour' });
    });
  },

  // Supprimer un projecteur
  deleteProjector: (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM projectors WHERE id = ?';
    db.run(sql, [id], function (err) {
      if (err) return res.status(500).json({ message: 'Erreur serveur' });
      if (this.changes === 0) return res.status(404).json({ message: 'Projecteur non trouvé' });

      res.status(200).json({ message: 'Projecteur supprimé' });
    });
  }
};

module.exports = projectorController;
