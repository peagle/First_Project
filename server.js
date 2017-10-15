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
const appErrorHandler  = require('./app/app-error-handlers');
const expressValidator = require('express-validator');



// configuration ===============================================================

// HTTP requests errors logging
if (process.env.NODE_ENV == 'PRODUCTION') {
    app.use(morgan('common', {
        stream: fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})
    }));
} else {
    app.use(morgan('dev'));
}

// APP Error handling
app.use(appErrorHandler.clientErrorHandler);
app.use(appErrorHandler.errorHandler);

// require('./config/passport')(passport); // pass passport for configuration

app.use(bodyParser.json()); // request, response json support middleware
app.use(bodyParser.urlencoded({extended: true}));

app.use(expressValidator()); //Adds POST validation and sanitization of inputs. Must come after body-parser

app.use(helmet()); // Helemet  - to secure the app against 8 attacks

app.use(cors(corsConfig)); // enable CORS and restrict client

app.use(gzipCompression()); // compress requests

app.use(express.static(path.join(__dirname, 'public'))); // load static files


require('./config/auth')(app); // creates cookies and authentication [express-session and passport]


// Setup ROUTES ================================================================

const mainRoutes = require('./app/routes');
app.use('/', mainRoutes);


const userRoutes = require('./user/routes');
app.use('/users', userRoutes);


// launch ======================================================================

app.listen(port);
console.log('Server listening on port: ' + port);

//==============================================================================

