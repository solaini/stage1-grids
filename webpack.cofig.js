//Webpack configuration file
const webpack = require('webpack');

// webpack.config.js
var webpack = require('webpack')

module.exports = {
    entry: {
        entry: __dirname + '/entry.js'
    },
    output: {
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
}