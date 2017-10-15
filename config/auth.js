const session    = require('express-session');
const passport   = require('passport');
const redis      = require('redis');
const RedisStore = require('connect-redis')(session);


function generateRandomString(strLength) {
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!?.0123456789";
    let text = [];

    for (let i = 0; i < strLength; i++)
        text.push(possible.charAt(Math.floor(Math.random() * possible.length)));

    return text.join();
}

module.exports = function(app){

    const redisClient = redis.createClient();
    app.use(session({
        store: new RedisStore({host:process.env.REDIS_HOST, port:process.env.REDIS_PORT,  client: redisClient}),
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


    passport.serializeUser((userId, done) => {
        done(null, userId);
    });

    passport.deserializeUser((userId, done) => {
        done(null, userId);
    });
};