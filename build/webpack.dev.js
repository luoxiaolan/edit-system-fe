/**
 * @file webpack config
 * @author luoxiaolan@badu.com
 */
const path = require('path');
const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const commonWebpack = require('./webpack.common');

module.exports = Object.assign({}, commonWebpack, {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        contentBase: './dist',
        port: 8080,
        hot: true,
        open: true,
        historyApiFallback: true,
        host: 'localhost',
        disableHostCheck: true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        proxy: {
            '/api/*': {
                target: 'http://localhost:8848',
                changeOrigin: true,
                secure: false
            }
        }
    },
    plugins: [
        new HtmlwebpackPlugin({
            template: path.join(__dirname, '../public/index.html')
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            'window.Quill': 'quill'
        })
    ]
});
