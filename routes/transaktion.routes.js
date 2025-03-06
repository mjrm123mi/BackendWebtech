//API-Endpunkte

// routes/transaktion.routes.js
const express = require('express');
const router = express.Router();
const transaktionController = require('../controllers/transaktion.controller');

// Create (Hier wird die Funktion aufgerufen create aufgerufen)
router.post('/', transaktionController.create);

// Read (alle)
router.get('/', transaktionController.findAll);

// Read (einzeln)
router.get('/:id', transaktionController.findOne);

// Update
router.put('/:id', transaktionController.update);

// Delete
router.delete('/:id', transaktionController.delete);

module.exports = router;
