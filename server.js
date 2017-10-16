// set up ======================================================================

require('dotenv/config');
const path     = require('path');
const fs       = require('fs');
const express  = require('express');
const app      = express();
const bodyParser = require('body-parser');
const morgan   = require('morgan');
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

// View engine setup - server side render
require('./config/view-engine')(app);

// APP Error handling
app.use(appErrorHandler.clientErrorHandler);
app.use(appErrorHandler.errorHandler);

app.use(bodyParser.json()); // request, response json support middleware
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public'))); // load static files

app.use(expressValidator()); //Adds POST validation and sanitization of inputs. Must come after body-parser

app.use(helmet()); // Helemet  - to secure the app against 8 attacks

app.use(cors(corsConfig)); // enable CORS and restrict client

app.use(gzipCompression()); // compress requests

require('./config/auth')(app); // creates cookies and authentication [express-session and passport]


// Setup ROUTES ================================================================

const mainRoutes = require('./app/routes');
app.use('/', mainRoutes);


const userRoutes = require('./user/routes');
app.use('/users', userRoutes);


// launch ======================================================================

app.use(appErrorHandler.error404);

app.listen(process.env.APP_PORT);
console.log('Server listening on port: ' + process.env.APP_PORT);

//==============================================================================

