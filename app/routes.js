const express    = require('express');
const router     = express.Router();
const db         = require('../config/database-config');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json({ type: 'application/*+json'});
const bcrypt     = require('bcrypt');
const passport   = require('passport');


router.get('/', (req, res) => {
    res.sendfile('./views/index.html');
});

//region LOGIN

router.get('/login', (req, res) => {
    res.sendfile('./views/login.html');
});

router.post('/login', passport.authenticate(
    'local', {
        successRedirect: '/users/profile',
        failureRedirect:'/login'
    }
));

//endregion

//region SINGUP

// show the signup form
router.get('/signup', (req, res) => {
    res.sendfile('./views/signup.html');
});

router.post('/signup', jsonParser, (req, ress, next) => {

    req.checkBody ('firstname','First name is required').notEmpty();
    req.checkBody ('lastname','Last name is required').notEmpty();
    req.checkBody ('username','Username is required').notEmpty();
    req.checkBody ('username','Username must be between 4-20 charecters long').len(4, 20);
    req.checkBody ('password','Password is required').notEmpty();
    req.checkBody ('password','Password must be between 4-20 charecters long').len(4, 20);

    const errors = req.validationErrors();
    if(errors){
        return next(JSON.stringify(errors));
    }

    const firstName = req.body.firstname;
    const lastName  = req.body.lastname;
    const username  = req.body.username;
    const password  = req.body.password;


    bcrypt.hash(password, 10, (err, hash) => {
        if(err) {
            return next(err);
        }
        // Store hash in your password DB.
        db.query('INSERT INTO sec.user (first_name, last_name, username, password_hash) VALUES ($1, $2, $3, $4) returning id',
            [firstName, lastName, username, hash], (err, res) => {
                if(err) {
                    return next(err);
                }
                const userId = res.rows[0].id;

                req.login(userId, (err) => {
                    if(err) { return next(err); }
                    ress.redirect('/');
                });
        });
    });


});

//endregion

//region LOGOUT

router.get('/logout', function(req, res) {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

//endregion


module.exports = router;