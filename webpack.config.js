var webpack = require('webpack');
module.exports = {
    context: __dirname + '/src',
    entry: {
        app: './app.js',
        vendor: ['angular']
    },
    output: {
        path: __dirname + '/public/js',
        filename: 'app.bundle.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "vendor.bundle.js"
        })
    ]
};
