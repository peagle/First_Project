const path = require('path');
const DotEnvPlugin = require('webpack-dotenv-plugin');

module.exports = {
    devtool: "source-map",
    entry : {
        app: './app/index.js'
    },
    output:{
        path: path.resolve(__dirname + '/public/js/'),
        filename: "bundle.js"
    },

    module: {

    },
    plugins: [
        new DotEnvPlugin({
            sample: './.env.default',
            path: './.env'
        }),
    ]
}