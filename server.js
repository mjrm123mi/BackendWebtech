const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Routen importieren
const rootRoute = require('./routes/root');
const initRoute = require('./initdb');
const transaktionenRoute = require('./routes/transaktion.routes');
const kategorienRoute = require('./routes/kategorie.routes');

const app = express();
const PORT = process.env.PORT || 3000;

//Konfiguration vom Webserver. Die app variable ist der Webserver und hier
//ist definiert wie der Webserver sich verhalten soll.
app.use(express.json());
app.use(cors());
app.use('/', rootRoute);
app.use('/init', initRoute);
app.use('/transaktionen', transaktionenRoute);
app.use('/kategorien', kategorienRoute);


//hier wird der Webserver gestartet
app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Server started and listening on port ${PORT} ...`);
    }
})