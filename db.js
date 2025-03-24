const pg = require('pg');

//die Zeile hier drunter hinzugefuegt damit das Datum richtig angezeigt wird:
// Das PostgreSQL-Modul wird angewiesen, Datumswerte unverändert darzustellen
pg.types.setTypeParser(1082, value => value);
//In der DB sind die Datum als reines Datum. Wenn Node.js sich das Datum holt, wandelt
// es in eine JavascriptDatum um. Dieses Date hat schon Zeitstunden. Deswegen wird es so angezeigt.
// In Zeile 5 wird dem pg modul (eine libary für node.js die mit der DBpostgreSQL kommuniziert)
// wird gesagt dass es das Datum so lassen soll.

const client = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false
    }
});

// Verbindung herstellen
client.connect(err => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connection to DB ...');
    }
});

// Exportieren der Verbindung
module.exports = client;