
const pool = require('../db');
// Importiert die PostgreSQL-Verbindung aus der Datei `db.js`.
// `pool` wird verwendet, um SQL-Abfragen an die Datenbank zu senden.

const format = require('pg-format');

// Funktion: Alle Kategorien abrufen (Read all)
exports.findAll = async (req, res) => {
    try {
        const query = 'SELECT name FROM kategorie';
        const result = await pool.query(query);
        res.send(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Fehler beim Abrufen der Transaktionen' });
    }
};

