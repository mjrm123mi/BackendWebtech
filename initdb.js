const express = require('express');
const client = require('./db');// Verbindung zur Datenbank
const initdb = express.Router();
const format = require('pg-format');// Modul zur Formatierung von SQL-Statements


initdb.get('/', async (req, res) => {

    // Anlegen der Tabelle kategorie
    let query = `
        DROP TABLE IF EXISTS kategorie CASCADE;
        CREATE TABLE kategorie
        (
            kategorieid serial PRIMARY KEY,
            name        VARCHAR(50),
            wichtigkeit BOOL
        );
    `;


    // Anlegen der Tabelle transaktion
    let query2 = `
        DROP TABLE IF EXISTS transaktion;
        CREATE TABLE transaktion
        (
            transaktionsid  serial PRIMARY KEY,
            transaktionstyp VARCHAR(50),
            beschreibung    VARCHAR(50),
            betrag          DOUBLE PRECISION,
            kategorieid     INTEGER REFERENCES kategorie (kategorieid), --Foreign key hinzugefuegt..Tabelle kategorie und Spalte kategorieid
            datum           DATE
        );
    `;

    // Tabellen erstellen
    try {
        await client.query(query)
        await client.query(query2)
        console.log("Table created successfully ...")
    } catch (err) {
        console.log(err)
    }

    // Befüllen der Tabelle transaktion mit 50 Einträgen
    const values_transaktion = [
        ["Ausgabe", "Joghurt", 2.99, 1, "2025-02-03"],
        ["Ausgabe", "Brot", 1.99, 1, "2025-02-02"],
        ["Ausgabe", "Fahrradmantel", 19.99, 4, "2025-01-01"],
        ["Ausgabe", "Iboprophen", 10.00, 5, "2025-01-01"],
        ["Ausgabe", "Zugticket", 50.00, 6, "2025-01-10"],
        ["Ausgabe", "Konzertticket", 15.99, 9, "2025-01-10"],
        ["Ausgabe", "Halleneintritt", 12.50, 10, "2025-01-10"],
        ["Ausgabe", "Einkauf Rewe", 30.99, 1, "2025-01-22"],
        ["Ausgabe", "Miete Januar", 550.00, 12, "2025-01-22"],
        ["Ausgabe", "Krankenversicherung Januar", 200.00, 13, "2025-01-23"],
        ["Einnahme", "Gehalt", 980.00, 20, "2025-01-24"],
        ["Ausgabe", "Spüli", 3.01, 2, "2025-02-07"],
        ["Ausgabe", "Birnen", 3.50, 1, "2025-02-07"],
        ["Ausgabe", "Jeans", 15.00, 3, "2025-02-07"],
        ["Ausgabe", "Semesterticket", 350.00, 23, "2025-02-08"],
        ["Ausgabe", "Haftpflichtversicherung Monatsbeitrag", 4.00, 17, "2025-02-09"],
        ["Ausgabe", "Waschmaschine Reperatur", 100.00, 8, "2025-02-09"],
        ["Ausgabe", "Strom Monatsbeitrag", 50.00, 15, "2025-02-09"],
        ["Ausgabe", "Späti", 50.00, 24, "2025-02-10"],
        ["Einnahme", "Rückzahlung geliehenes Geld Anna", 10.00, 24, "2025-02-10"],
        ["Einnahme", "Oma Geld geschenkt", 5.00, 24, "2025-02-10"],
    ];

    // Befüllen der Tabelle kategorie mit relevanten Einträgen
    const values_kategorie = [
        ["Essen", true], //1
        ["Drogerie", false], //2
        ["Kleidung", false], //3
        ["Fahrradmaterial", false], //4
        ["Medikamente", true], //5
        ["Transport", true], //6
        ["Wohnung", false], //7
        ["Reperaturen", true], //8
        ["Ausgehen", false], //9
        ["Klettern", false], //10
        ["Urlaub", false], //11
        ["Miete", true], //12
        ["Krankenversicherung", true], //13
        ["GEZ", true], //14
        ["Strom", true], //15
        ["Nebenkosten", true], //16
        ["Versicherung", true], //17
        ["Anlage", false], //18
        ["Mitgliedschaften", false], //19
        ["Job", false], //20
        ["Stipendium", false], //21
        ["Sozialleistung", false], //22
        ["Studium-Ausgaben", true], //23
        ["Bargeld", false], //24
        ["Sonstiges", false]  //25
    ];

    // Einfügen der Daten in die Datenbank
    // hierfuer muss pg-format installiert werden (wegen %L):
    const paramquery = format('INSERT INTO kategorie(name, wichtigkeit) VALUES %L RETURNING *', values_kategorie);

    const paramquery2 = format('INSERT INTO transaktion(transaktionstyp, beschreibung, betrag, kategorieid, datum) VALUES %L RETURNING *', values_transaktion);


    try {
        const result = await client.query(paramquery)
        const result2 = await client.query(paramquery2)
        console.log("transaktionen hinzugefuegt ...")
        res.status(200) //Erfolgreiche Antwort senden
        res.send(result.rows)
    } catch (err) {
        console.log(err)
    }

});


module.exports = initdb;