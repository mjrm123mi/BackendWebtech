//CRUD LOGIK
// controllers/transaktion.controller.js
const pool = require('../db');
const format = require('pg-format');

// Create (Hier ist die Funktion implementiert zum hinzufuegen)
exports.create = async (req, res) => {
    try {
        const { transaktionstyp, beschreibung, betrag, kategorie, datum } = req.body;
        console.log("transaktionstyp: " + transaktionstyp);
        console.log("beschreibung: " + beschreibung);
        console.log("betrag: " + betrag);
        console.log("kategorie: " + kategorie);
        console.log("datum: " + datum);

        const query = format('SELECT kategorieid FROM kategorie WHERE name = %L', [kategorie]);
        const result = await pool.query(query);
        const kategorieid = result.rows[0]["kategorieid"];

        const query2 = format('INSERT INTO transaktion(transaktionstyp, beschreibung, betrag, kategorieid, datum) VALUES (%L) RETURNING *', [transaktionstyp, beschreibung, betrag, kategorieid, datum]);
        const result2 = await pool.query(query2);
        res.status(201).send(result2.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Fehler beim Erstellen der Transaktion' });
    }
};

// Read (alle)
exports.findAll = async (req, res) => {
    try {
        const query = `
            SELECT t.transaktionsid, t.beschreibung, t.transaktionstyp, t.betrag, t.datum, k.name AS "kategoriename" 
            FROM transaktion t
            INNER JOIN kategorie k
            ON t.kategorieid = k.kategorieid
            ORDER BY datum DESC
            `; //Neueste zuerst (es wird nach Datum sortiert) ...die query ist SQL und hier ist es quasi ein String
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
            res.status(200).send({ message: 'Transaktion erfolgreich gelöscht' });
        } else {
            res.status(404).send({ message: `Transaktion mit ID ${id} nicht gefunden` });
        }

    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Fehler beim Löschen der Transaktion' });
    }
};
