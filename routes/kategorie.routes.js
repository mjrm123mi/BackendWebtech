// API-Endpunkte für Kategorien (Routing)
// Diese Datei definiert eine Router-Instanz
// und bindet die Controller-Funktionen ein,
// um Anfragen für Kategorien zu bearbeiten.

const express = require('express');// Importiert das Express-Framework, um Routing und Webserver-Funktionen zu nutzen.
const router = express.Router();// Erzeugt eine Instanz eines Express-Routers, um spezifische API-Routen zu definieren.

const kategorieController = require('../controllers/kategorien.controller');
// Importiert den Kategorien-Controller, der die Logik für die Verarbeitung von Anfragen enthält.
// Hier wird die Methode `findAll` verwendet, um alle Kategorien zurückzugeben.

// Definiert die GET-Route für Kategorien
router.get('/', kategorieController.findAll);
// Diese Route antwortet auf eine GET-Anfrage an den Pfad `/` (Root-Pfad für diese Route).
// Die Methode `findAll` aus `kategorien.controller` wird aufgerufen. Diese Funktion holt alle Kategorien aus der Datenbank
// und sendet sie in der HTTP-Antwort zurück (JSON-Format).

module.exports = router;
// Exportiert die Router-Instanz, sodass sie in anderen Dateien (z. B. in server.js) importiert werden kann.