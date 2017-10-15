const express = require('express');
const router = express.Router();
const db = require('../config/database-config');

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json({ type: 'application/*+json'});


router.get('/', function(req, res) {
    res.sendfile('./views/index.html');
    // db.query('SELECT * FROM sec.user', null, (err, dbResults) => {
    //     if (err) {
    //         return next(err);
    //     }
    //     res.send(dbResults.rows);
    // });
});

router.get('/login', function(req, res) {
    res.sendfile('./views/login.html');
});

// process the login form
// app.post('/login', do all our passport stuff here);


// show the signup form
router.get('/signup', function(req, res) {
    res.sendfile('./views/signup.html');
});

// process the signup form
// app.post('/signup', do all our passport stuff here);

router.post('/signup', jsonParser, function(req, ress){

    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    const username = req.body.username;
    const password = req.body.password;

    db.query('INSERT INTO sec.user (first_name, last_name, username, password_hash) VALUES ($1, $2, $3, $4)',
        [firstName, lastName, username, password], function(err, res){

        ress.send('Success');
    });

});

// =====================================
// PROFILE SECTION =====================
// =====================================
// we will want this protected so you have to be logged in to visit
// we will use route middleware to verify this (the isLoggedIn function)
router.get('/profile', isLoggedIn, function(req, res) {
    // res.render('profile.ejs', {
    //     user : req.user // get the user out of session and pass to template
    // });

    res.send(200);
});

// =====================================
// LOGOUT ==============================
// =====================================
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});



// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}


module.exports = router;