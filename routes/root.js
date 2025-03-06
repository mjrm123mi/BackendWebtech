const express = require('express');
const router = express.Router(); //router ist ein Objekt von der Express Library und ist wegen const nicht veränderbar.

// eine GET-Anfrage
router.get('/', async(req, res) => {

    res.send({ message: "Hallo FIW!" });
});

module.exports = router;