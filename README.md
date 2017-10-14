# Portfolio

## App Structure
initialize app with npm and create project structure.

Portfolio
|   .env
|   .env.default
|   .gitignore
|   clusters.js
|   package.json
|   server.js
|   webpack.config.js
|
|___node_modules
|   |
|
|___app
|   |   index.js
|   |   main-route.js
|   |   users.js
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
|   user.js
|   user.test.js


## Nodejs Framework
Add **Express js** framework.

## Logging
Add **Morganjs** logging middleware to Expressjs. Use 'common' for logging instead of 'combine', 'dev', or 'tiny'.

## Database
* Add postgres database connection to express, use database connection pool for better performance.
* Create centralized query api to be used across the app. Every query will run through that middleware.
* Create logging mechanism in the query api so you could debug and show every query performance.