const express = require('express');
const router = express.Router();
const user = require('./index');


router.get('/', function (req, res) {
    res.send(user.getUserHomePage());
});

// define the about route
router.get('/about', function (req, res) {
    res.send(user.getUserAboutPage());
});



module.exports = router;


