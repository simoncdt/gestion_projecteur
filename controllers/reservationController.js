const db = require('../config/db');

const reservationController = {
    // Réserver un projecteur
    addReservation: (req, res) => {
        const { projecteur_id, utilisateur_id, date_reservation, heure_debut, heure_fin } = req.body;

        if (!projecteur_id || !utilisateur_id || !date_reservation || !heure_debut || !heure_fin) {
            return res.status(400).json({ message: 'Tous les champs sont requis' });
        }

        // Vérifier si le projecteur est déjà réservé sur le créneau donné
        const checkQuery = `
            SELECT * FROM reservations 
            WHERE projecteur_id = ? 
            AND date_reservation = ? 
            AND (
                (? BETWEEN heure_debut AND heure_fin) 
                OR (? BETWEEN heure_debut AND heure_fin)
                OR (heure_debut BETWEEN ? AND ?)
            )
        `;

        db.get(checkQuery, [projecteur_id, date_reservation, heure_debut, heure_fin, heure_debut, heure_fin], (err, row) => {
            if (err) return res.status(500).json({ message: 'Erreur serveur' });

            if (row) {
                return res.status(400).json({ message: 'Projecteur déjà réservé pour ce créneau' });
            }

            // Insérer la réservation
            const insertQuery = `
                INSERT INTO reservations (projecteur_id, utilisateur_id, date_reservation, heure_debut, heure_fin) 
                VALUES (?, ?, ?, ?, ?)
            `;

            db.run(insertQuery, [projecteur_id, utilisateur_id, date_reservation, heure_debut, heure_fin], function (err) {
                if (err) return res.status(500).json({ message: 'Erreur serveur' });

                res.status(201).json({ message: 'Réservation effectuée', id: this.lastID });
            });
        });
    },

    // Lister les réservations
    getAllReservations: (req, res) => {
        const sql = `
            SELECT r.id, p.id AS projecteur_id, u.nom, u.prenom, r.date_reservation, r.heure_debut, r.heure_fin
            FROM reservations r
            JOIN projecteurs p ON r.projecteur_id = p.id
            JOIN utilisateurs u ON r.utilisateur_id = u.id
        `;

        db.all(sql, [], (err, rows) => {
            if (err) return res.status(500).json({ message: 'Erreur serveur' });

            res.status(200).json(rows);
        });
    },

    // Annuler une réservation
    deleteReservation: (req, res) => {
        const { id } = req.params;

        const sql = 'DELETE FROM reservations WHERE id = ?';
        db.run(sql, [id], function (err) {
            if (err) return res.status(500).json({ message: 'Erreur serveur' });
            if (this.changes === 0) return res.status(404).json({ message: 'Réservation non trouvée' });

            res.status(200).json({ message: 'Réservation annulée' });
        });
    }
};

module.exports = reservationController;
