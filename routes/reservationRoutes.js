const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

// Routes CRUD pour les réservations
router.post('/reservations', reservationController.addReservation);
router.get('/reservations', reservationController.getAllReservations);
router.delete('/reservations/:id', reservationController.deleteReservation);

module.exports = router;
