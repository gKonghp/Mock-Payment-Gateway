/**
 * Created by gordonkong on 25/8/2018.
 */
"use strict";

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var extractPlugin = new ExtractTextPlugin({
    filename: path.join( __dirname, '..', 'dist', 'assets', 'stylesheets', 'bundle.css'),
    publicPath: '/'

});

module.exports = {
    entry:[
        // 'babel-polyfill',
        './app.jsx',
    ],
    output: {
        path: path.join( __dirname, '..', 'dist', 'assets', 'javascripts'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    resolve: {
        modules: [path.resolve(__dirname, 'node_modules')],
        extensions: ['.js', '.jsx','css', '.scss'],
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react']
                    }
                }
            ]
        }, {
            test: /\.css$/,
            use: [
                {
                    loader: 'style-loader',
                    options: {

                    }
                },
                {
                    loader: 'css-loader',
                    options: {

                    }
                },
            ]
        }, {
            test: /\.scss$/,
            use: extractPlugin.extract({
                use: [
                    'css-loader',
                    'sass-loader'
                ]
            })
        },
            {
            test: /\.(jpe?g|JPE?G|png|PNG|gif|GIF|svg|SVG|woff|woff2|eot|ttf)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=1024&name=[sha512:hash:base64:7].[ext]'
        }]
    },
    devServer: {
        port: 3000,
        open: true,
        inline: false,
        proxy: {
            "/api": "http://localhost:8080"
        }
    },
    //devtool: 'cheap-module-eval-source-map',
    devtool: 'eval-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM:'react-dom'
        }),
        extractPlugin
    ],
    mode: 'development',
};