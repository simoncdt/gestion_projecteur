const express = require('express');
const router = express.Router();
const projectorController = require('../controllers/projectorController');

// Routes CRUD pour les projecteurs
router.post('/projectors', projectorController.addProjector);
router.get('/projectors', projectorController.getAllProjectors);
router.put('/projectors/:id', projectorController.updateProjectorStatus);
router.delete('/projectors/:id', projectorController.deleteProjector);

module.exports = router;
