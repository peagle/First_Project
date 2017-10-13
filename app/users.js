const express = require('express');
const router = express.Router();


router.get('/', function (req, res) {
    res.send('Users HOME PAGE');
});

// define the about route
router.get('/about', function (req, res) {
    res.send('ABOUT USERS');
});


module.exports = router;