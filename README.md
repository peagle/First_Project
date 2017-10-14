# Portfolio

## App Structure
initialize app with npm and create project structure.
````
.
|   .env
|   .env.default
|   .gitignore
|   clusters.js
|   package.json
|   server.js
|
|___node_modules
|   |
|
|___app
|   |   main-route.js
|
|___config
|   auth.js
|   cors-config.js
|   database-config.js
|   passport-config.js
|
|___public
|   |___js
|       bundle.js
|
|___views
|   index.html
|   signup.html
|   login.html
|
|___user
|   index.js
|   user.bl.js
|   user.test.js
|   routes.js
````


## Nodejs Framework
* Add **Express js** framework.

## Logging
* Add **Morganjs** logging middleware to Expressjs. Use 'common' for logging instead of 'combine', 'dev', or 'tiny'.

## Database
* Add postgres database connection to express, use database connection pool for better performance.
* Create centralized query api to be used across the app. Every query will run through that middleware.
* Create logging mechanism in the query api so you could debug and show every query performance.

## Environment Variables
* Add a centralized way to define app environment variables. Used **dotenv** module to achieve that. Environment variables are stored in .env file, then referenced in other files as follows 'process.env.DB_USER'

## Nodejs Cluster
* Add nodejs cluster support. which will find max number of cores the cpu has and fork new cluster for each core. [Parallelism in Nodejs]

## Routes
* Use Expressjs Router to split code based on features and their implementation to single files. Example: look user module.

## Testing
* Add **mocha** module to test the API. Integration test.

## CORS
* Add **cors** module to expressjs to allow all clients to interact with the API based on a policy created in ./config/cors-config.js

## JSON Parser
* Add **body-parser** to expressjs to be the middleware jason parser for requests.

## gZip - Compression
* Add **compression** module to expressjs for request size compression, better performance.

## Security of API
  Add **helmet** module to expressjs and configure security policy. Below are **helmet's** capabilities:

* Removes the header X-Powered-By that informs the name and the version of a server;
* Configures rules for HTTP Public Key Pinning;
* Configures rules for HTTP Strict Transport Security;
* Treats the header X-Download-Options for Internet Explorer 8+;
* Disables the client-side caching;
* Prevents sniffing attacks on the client Mime Type;
* Prevents ClickJacking attacks;
* Protects against XSS (Cross-Site Scripting) attacks.

## Authentication
* Add **passport** module for API user authentication. This will be used to authenticate every request.

## Session and Cookies
* Add **express-session** to be our session management middleware. cookies currently stored in nodejs process memory. Later to be converted to Redis.