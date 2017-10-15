// set up ======================================================================
require('dotenv/config');
const path     = require('path');
const fs       = require('fs');
const express  = require('express');
const app      = express();
const bodyParser = require('body-parser');
const morgan   = require('morgan');
const port     = process.env.APP_PORT;
const cors     = require('cors');
const corsConfig = require('./config/cors-config');
const gzipCompression = require('compression');
const helmet   = require('helmet');


// configuration ===============================================================

// HTTP requests errors logging
if (process.env.NODE_ENV == 'PRODUCTION') {
    app.use(morgan('common', {
        stream: fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})
    }));
} else {
    app.use(morgan('dev'));
}



// require('./config/passport')(passport); // pass passport for configuration

app.use(bodyParser.json()); // request, response json support middleware
app.use(bodyParser.urlencoded({extended: true}));

app.use(helmet()); // Helemet  - to secure the app against 8 attacks

app.use(cors(corsConfig)); // enable CORS and restrict client

app.use(gzipCompression()); // compress requests

app.use(express.static(path.join(__dirname, 'public'))); // load static files




//app.use(cookieParser()); // read cookies (needed for auth)

// required for passport
// app.use(session({ secret: 'fjfuDklkdfiu35dsJKdgmgjeL' })); // session secret
// app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions

// Setup ROUTES ================================================================

const mainRoutes = require('./app/routes');
app.use('/', mainRoutes);


const userRoutes = require('./user/routes');
app.use('/users', userRoutes);


// launch ======================================================================

app.listen(port);
console.log('Server listening on port: ' + port);

//==============================================================================

