
const { Pool } = require('pg');
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

module.exports = {
    query: (text, params, callback) => {
        const start = Date.now();
        return pool.query(text, params, (err, res) => {
            // Uncomment the lines below to log database queries to console
            // const duration = Date.now() - start;
            // console.log('executed query', { text, duration, rows: res.rowCount });
            callback(err, res);
        });
    },

    getClient: (callback) => {
        pool.connect((err, client, done) => {

            if(err) {
                return next(err);
            }

            const query = client.query.bind(client);

            // monkey patch the query method to keep track of the last query executed9
            client.query = () => {
                client.lastQuery = arguments;
                client.query.apply(client, arguments);
            }

            // set a timeout of 5 seconds, after which we will log this client's last query
            const timeout = setTimeout(() => {
                console.error('A client has been checked out for more than 5 seconds!');
                console.error(`The last executed query on this client was: ${client.lastQuery}`);
            }, 5000);

            const release = (err) => {
                // call the actual 'done' method, returning this client to the pool
                done(err);

                // clear our timeout
                clearTimeout(timeout);

                // set the query method back to its old un-monkey-patched version
                client.query = query;
            };

            callback(err, client, done);
        });
    }
}
