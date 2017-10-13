// set up ======================================================================
require('dotenv/config');
const express  = require('express');
const bodyParser = require('body-parser');
const logger   = require('morgan');
const app      = express();
const port     = process.env.PORT || 3000;
const cors     = require('cors');
const corsConfig = require('./config/cors-config');
const gzipCompression = require('compression');
const helmet   = require('helmet');


// configuration ===============================================================


// require('./config/passport')(passport); // pass passport for configuration



// set up our express middleware
app.use(logger('common')); // log every request to the console

// Helemet  - to secure the app against 8 attacks
// 1- Configures the Content Security Policy;
// 2- Removes the header X-Powered-By that informs the name and the version of a server;
// 3- Configures rules for HTTP Public Key Pinning;
// 4- Configures rules for HTTP Strict Transport Security;
// 5- Treats the header X-Download-Options for Internet Explorer 8+;
// 6- Disables the client-side caching;
// 7- Prevents sniffing attacks on the client Mime Type;
// 8- Prevents ClickJacking attacks;
// 9- Protects against XSS (Cross-Site Scripting) attacks.
app.use(helmet());

app.use(cors(corsConfig)); // enable CORS and restrict client
app.use(gzipCompression()); // compress requests

app.use(bodyParser.json()); // request, response json support middleware
//app.use(cookieParser()); // read cookies (needed for auth)

// required for passport
// app.use(session({ secret: 'fjfuDklkdfiu35dsJKdgmgjeL' })); // session secret
// app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions
// app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
// load our routes and pass in our app and fully configured passport
require('./app/main-routes')(app, null);
//require('./app/routes')(app, passport);

// launch ======================================================================
app.listen(port);
console.log('Server listening on port: ' + port);


//==============================================================================

