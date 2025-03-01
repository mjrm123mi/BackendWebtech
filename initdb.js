const express = require('express');
const client = require('./db');
const initdb = express.Router();
const format = require('pg-format');


initdb.get('/', async(req, res) => {

    // Anlegen der Tabelle transaktion
    let query = `
            DROP TABLE IF EXISTS transaktion;
            CREATE TABLE transaktion(transaktionsid serial PRIMARY KEY, transaktionstyp VARCHAR(50), beschreibung VARCHAR(50), betrag DOUBLE PRECISION, kategorieid INTEGER, datum DATE);
            `;

    // Anlegen der Tabelle kategorie
    let query2 = `
            DROP TABLE IF EXISTS kategorie;
            CREATE TABLE kategorie(kategorieid serial PRIMARY KEY, name VARCHAR(50), wichtigkeit BOOL);
            `;

    try {
        await client.query(query)
        await client.query(query2)
        console.log("Table created successfully ...")
    } catch (err) {
        console.log(err)
    }

    // Befüllen der Tabelle transaktion mit 50 Einträgen
    const values_transaktion = [
        ["Ausgabe", "Schampoo und Duschgel", 3.01, 0, "2025-01-01"],
        ["Ausgabe", "Fahrradmantel", 19.99, 1, "2025-01-01"],
        ["Ausgabe", "Iboprophen", 10.00, 2, "2025-01-01"],
        ["Ausgabe", "Zugticket", 50.00, 3, "2025-01-10"],
        ["Ausgabe", "Duschschlauch", 9.99, 4, "2025-01-10"],
        ["Ausgabe", "Konzertticket", 15.99, 5, "2025-01-10"],
        ["Ausgabe", "Halleneintritt", 12.50, 6, "2025-01-10"],
        ["Ausgabe", "Hotel", 59.99, 7, "2025-01-22"],
        ["Ausgabe", "Einkauf Rewe", 30.99, 8, "2025-01-22"],
        ["Ausgabe", "Miete Januar", 750.00, 9, "2025-01-22"],
        ["Ausgabe", "Krankenversicherung Januar", 200.00, 10, "2025-01-23"],
        ["Einnahme", "Gehalt", 1200.00, 18, "2025-01-24"],
        ["Einnahme", "Wohngeld", 100.00, 18, "2025-01-24"],
    ];

    // Befüllen der Tabelle kategorie mit relevanten Einträgen
    const values_kategorie = [
        ["Kosmetik", false],
        ["Reperaturen", true],
        ["Medikamente", true],
        ["Transport", true],
        ["Wohnung", false],
        ["Ausgehen", false],
        ["Klettern", false],
        ["Urlaub", false],
        ["Essen", true],
        ["Miete", true],
        ["Krankenversicherung", true],
        ["GEZ", true],
        ["Strom", true],
        ["Nebenkosten", true],
        ["Versicherung", true],
        ["Anlage", false],
        ["Mitgliedschaften", false],
        ["Sonstiges", false],
        ["Job", false],
    ];



    // hierfuer muss pg-format installiert werden (wegen %L):
    const paramquery = format('INSERT INTO transaktion(transaktionstyp, beschreibung, betrag, kategorieid, datum) VALUES %L RETURNING *', values_transaktion);

    const paramquery2 = format('INSERT INTO kategorie(name, wichtigkeit) VALUES %L RETURNING *', values_kategorie);


    try {
        const result = await client.query(paramquery)
        const result2 = await client.query(paramquery2)
        console.log("transaktionen hinzugefuegt ...")
        res.status(200)
        res.send(result.rows)
    } catch (err) {
        console.log(err)
    }

});


module.exports = initdb;