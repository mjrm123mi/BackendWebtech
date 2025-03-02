//CRUD LOGIK
// controllers/transaktion.controller.js
const pool = require('../db');
const format = require('pg-format');

// Create
exports.create = async (req, res) => {
    try {
        const { transaktionstyp, beschreibung, betrag, kategorieid, datum } = req.body;
        const query = format('INSERT INTO transaktion(transaktionstyp, beschreibung, betrag, kategorieid, datum) VALUES (%L) RETURNING *', [[transaktionstyp, beschreibung, betrag, kategorieid, datum]]);
        const result = await pool.query(query);
        res.status(201).send(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Fehler beim Erstellen der Transaktion' });
    }
};

// Read (alle)
exports.findAll = async (req, res) => {
    try {
        const query = 'SELECT * FROM transaktion ORDER BY datum DESC'; //Neueste zuerst
        const result = await pool.query(query);
        res.send(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Fehler beim Abrufen der Transaktionen' });
    }
};

// Read (einzeln)
exports.findOne = async (req, res) => {
    try {
        const id = req.params.id;
        const query = format('SELECT * FROM transaktion WHERE transaktionsid = %L', [id]);
        const result = await pool.query(query);
        if (result.rows.length > 0) {
            res.send(result.rows[0]);
        } else {
            res.status(404).send({ message: `Transaktion mit ID ${id} nicht gefunden` });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Fehler beim Abrufen der Transaktion' });
    }
};


// Update
exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const { transaktionstyp, beschreibung, betrag, kategorieid, datum } = req.body;
        const query = format('UPDATE transaktion SET transaktionstyp = %L, beschreibung = %L, betrag = %L, kategorieid = %L, datum = %L WHERE transaktionsid = %L RETURNING *', [transaktionstyp, beschreibung, betrag, kategorieid, datum, id]);
        const result = await pool.query(query);
        if (result.rows.length > 0) {
            res.send(result.rows[0]);
        } else {
            res.status(404).send({ message: `Transaktion mit ID ${id} nicht gefunden` });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Fehler beim Aktualisieren der Transaktion' });
    }
};

// Delete
exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        const query = format('DELETE FROM transaktion WHERE transaktionsid = %L', [id]);
        const result = await pool.query(query);
        if (result.rowCount > 0) {
            res.status(204).send({ message: 'Transaktion erfolgreich gelöscht' });
        } else {
            res.status(404).send({ message: `Transaktion mit ID ${id} nicht gefunden` });
        }

    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Fehler beim Löschen der Transaktion' });
    }
};
