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
        host: '127.0.0.1',
        disableHostCheck: true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        proxy: {
            '/api/*': {
                target: 'http://10.52.183.114:8000/fdi-console-fe',
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
        new webpack.HotModuleReplacementPlugin()
    ]
});
