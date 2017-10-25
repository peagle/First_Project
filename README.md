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
|   |   routes.js
|   |   app-error-handlers.js
|
|___config
|   |   auth.js
|   |   cors-config.js
|   |   database-config.js
|
|___public
|   |
|
|___views
|   |    index.hbs
|   |    signup.hbs
|   |    login.hbs
|   |    error.hbs
|   |    |___partials
|   |    |      |   header.hbs
|   |    |      |   footer.hbs
|   |    |      |   footer-end.hbs
|
|___user
|   |   index.js
|   |   user.bl.js
|   |   routes.js
|   |   |___test
|   |   |   |   user.test.js
````


## Nodejs Framework
* Add **Express js** framework.

## Logging
* Add **Morganjs** logging middleware to Expressjs. Add conditional to morgan logging to log info to file if the environment is 'production' otherwise use console.

## Error Handling
* Add a module 'app-error-handlers.js' that contains the app error handlers and require/use it in the main file 'server.js'.

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

## Storing Password
* Use 'bcrypt' node module to hash user passwords with a 10 salt rounds for better security.

## Authentication
* Add **passport** module for API user authentication. This will be used to authenticate every request.

## Session and Cookies
* Add **express-session** to be our session management middleware.

## Session Storage Redis
* Add 'redis' client to server machine.
* Add 'node_redis' as nodejs client for Redis.
* Add 'connect-redis' and configure app session to connect to redis db to store sessions.

## Server View Engine - Html Templates on Server
* Add 'hbs' module to the app to render templates and partials on the server.