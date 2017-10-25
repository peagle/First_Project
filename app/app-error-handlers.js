module.exports = {

    clientErrorHandler:  (err, req, res, next) => {
        if (req.xhr) {
            res.status(500).send({ error: 'Sorry for inconvenience, something failed. We dispatched an army to solve this issue.' });
        } else {
            next(err);
        }
    },

    errorHandler: (err, req, res, next) => {
        // If you call next() with an error after you have started writing the response
        // (for example, if you encounter an error while streaming the response to the client) the Express default
        // error handler closes the connection and fails the request.
        // Thats why we need to delegate to Express for error handling after this point.
        if (res.headersSent) {
            return next(err);
        }
        res.status(500);
        res.render('error', { error: err });
    },

    error404: (req, res, next) => {
        const err = new Error('Not Found');
        err.status = 404;
        res.status(404);
        res.render('error', { error: err });
    },
};

