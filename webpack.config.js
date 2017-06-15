var webpack = require('webpack');
module.exports = {
    context: __dirname + '/src',
    entry: {
        app: './app.js',
        vendor: ['angular', 'cytoscape']
    },
    output: {
        path: __dirname + '/public/js',
        filename: 'app.bundle.js',
        publicPath: 'public/js/'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "vendor.bundle.js"
        })
    ],
    module: {
        rules: [
            { 
                test: /\.css$/, 
                use: [
                    "style-loader",
                    "css-loader"
                ]
            }
        ]
    }
};
