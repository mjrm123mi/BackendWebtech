//API-Endpunkte

// routes/transaktion.routes.js
const express = require('express');
const router = express.Router();
const transaktionController = require('../controllers/transaktion.controller');

// Create (Neue Transaktion hinzufügen)
router.post('/', transaktionController.create);
// könnte auch '/add' schreiben in Pfad. Hier ist ein Post.

// Read (Alle Transaktionen abrufen)
router.get('/', transaktionController.findAll);
// hier ist ein get


// Read (Eine Transaktion abrufen)
router.get('/:id', transaktionController.findOne);

// Update (Transaktion bearbeiten)
router.put('/:id', transaktionController.update);

// Delete (Transaktion löschen)
router.delete('/:id', transaktionController.delete);

module.exports = router;
