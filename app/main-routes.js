const db = require('../config/database-config');
const users = require('./users');

module.exports = function(app, passport) {

    app.use('/users', users);

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        // res.sendfile('./views/index.html');
        db.query('SELECT * FROM sec.user', null, (err, dbResults) => {
            if (err) {
                return next(err);
            }
            res.send(dbResults.rows);
        });
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.sendfile('./views/login.html');
    });

    // process the login form
    // app.post('/login', do all our passport stuff here);

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        //res.render('signup.ejs', { message: req.flash('signupMessage') });
        res.sendfile('./views/signup.html');
    });

    // process the signup form
    // app.post('/signup', do all our passport stuff here);

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        // res.render('profile.ejs', {
        //     user : req.user // get the user out of session and pass to template
        // });

        res.send(200);
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        // req.logout();
        // res.redirect('/');

        res.send(200);
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
