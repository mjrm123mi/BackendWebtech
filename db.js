const pg = require('pg');

//die Zeile hier drunter hinzugefuegt damit das Datum richtig angezeigt wird:
pg.types.setTypeParser(1082, value => value);
//In der DB sind die Datum als reines Datum. Wenn Node.js sich das Datum holt, wandelt
// es in eine JavascriptDatum um. Dieses Date hat schon Zeitstunden. Deswegen wird es so angezeigt.
// In Zeile 4 wird dem pg modul (eine libary für node.js die mit der DBpostgreSQL kommuniziert)
// wird gesagt dass es das Datum so lassen soll.

const client = new pg.Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
});

client.connect(err => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connection to DB ...');
    }
});

module.exports = client;