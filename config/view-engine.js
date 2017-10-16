const path  = require('path');
const hbs   = require('hbs');
const fs    = require('fs');

module.exports = (app) => {

    app.set('views', path.join( __dirname, '..', 'views'));
    app.set('view engine', 'hbs');

    const partialsDir = path.join(__dirname, '..', 'views/partials');

    const filenames = fs.readdirSync(partialsDir);

    filenames.forEach((filename) => {
        const matches = /^([^.]+).hbs$/.exec(filename);
        if (!matches) {
            return;
        }
        const name = matches[1];
        const template = fs.readFileSync(partialsDir + '/' + filename, 'utf8');
        hbs.registerPartial(name, template);
    });

    hbs.registerHelper('json', (context) => {
        return JSON.stringify(context, null, 2);
    });

};




