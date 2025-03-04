const pool = require('../db');
const format = require('pg-format');

// Read (alle)
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

