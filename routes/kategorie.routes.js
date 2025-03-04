//API ENDPUNKTE
const express = require('express');
const router = express.Router();
const kategorieController = require('../controllers/kategorien.controller');

// Read (alle)
router.get('/', kategorieController.findAll);

module.exports = router;