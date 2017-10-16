const express   = require('express');
const router    = express.Router();
const user      = require('./index');
const common    = require('../app/common');


router.get('/', (req, res) => {
    res.send(user.getUserHomePage());
});

// define the about route
router.get('/profile', common.isLoggedIn,  (req, res) => {
    res.send(user.getUserProfilePage());
});


module.exports = router;


