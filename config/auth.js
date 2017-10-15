const session       = require('express-session');
const passport      = require('passport');

function generateRandomString(strLength) {
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!?.0123456789";
    let text = [];

    for (let i = 0; i < strLength; i++)
        text.push(possible.charAt(Math.floor(Math.random() * possible.length)));

    return text.join();
}

module.exports = function(app){
    app.use(session({
        secret: generateRandomString(17),
        resave: false,
        saveUninitialized: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((userId, done) => {
        done(null, userId);
    });

    passport.deserializeUser((userId, done) => {
        done(null, userId);
    });
};