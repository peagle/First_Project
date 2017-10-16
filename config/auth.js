const session       = require('express-session');
const passport      = require('passport');
const redis         = require('redis');
const SessionStore  = require('connect-redis')(session);
const LocalStrategy = require('passport-local').Strategy;
const db            = require('../config/database-config');
const bcrypt        = require('bcrypt');

function generateRandomString(strLength) {
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!?.0123456789";
    let text = [];

    for (let i = 0; i < strLength; i++)
        text.push(possible.charAt(Math.floor(Math.random() * possible.length)));

    return text.join();
}

module.exports = (app) => {

    const redisClient = redis.createClient();
    app.use(session({
        store: new SessionStore({host:process.env.REDIS_HOST, port:process.env.REDIS_PORT,  client: redisClient}),
        secret: generateRandomString(17),
        resave: false,
        saveUninitialized: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use((req, res, next) => {
        if (!req.session) {
            return next(new Error('Redis failed to establish connection')) // handle error
        }
        next(); // otherwise continue
    });

    // passport config
    passport.use(new LocalStrategy( (username, password, done) => {
        db.query('SELECT * FROM sec.user WHERE username = $1', [username], (err, results) => {
            if(err) {
                return done(err);
            }
            if(results.rows.length === 0){
                done(null, false);
            }else{
                const user = results.rows[0];
                const hash = user.password_hash.toString();

                bcrypt.compare(password, hash, (err, response) => {
                    if(response === true){
                        return done(null, {user_id: user.id});
                    }else{
                        return done(null, false);
                    }
                });
            }
        });
    }));

    passport.serializeUser((userId, done) => {
        done(null, userId);
    });

    passport.deserializeUser((userId, done) => {
        done(null, userId);
    });

    app.use( (req, res, next) => {
        res.locals.isAuthenticated = req.isAuthenticated();
        next();
    });
};