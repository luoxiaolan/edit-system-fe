/**
 * @file webpack config
 * @author luoxiaolan@badu.com
 */
const path = require('path');

const vendors = [
    'react',
    'react-dom',
    'react-router'
];

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        vendors: vendors,
        index: [path.join(__dirname, '../src/index')]
    },
    output: {
        // 文件输出目录
        path: path.resolve(__dirname, './output'),
        // 输出文件名
        filename: '[name].min.js?[hash]',
        // cmd、amd异步加载脚本配置名称
        chunkFilename: '[name].chunk.js?[hash]',
        publicPath: '/'
    },
    module: {
        rules:[
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.less$/,
                use: [{
                        loader: 'style-loader' // creates style nodes from JS strings
                    },
                    {
                        loader: 'css-loader' // translates CSS into CommonJS
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')({
                                    browsers: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie < 9' // React doesn't support IE8 anyway
                                    ]
                                })
                            ]
                        }
                    },
                    {
                        loader: 'less-loader', // compiles Less to CSS
                        options: {
                            javascriptEnabled: true
                        }
                    }],
                exclude: /\.useable\.less$/
            },
            {
              test: /\.css$/,
              exclude: /\.useable\.css$/,
              loader: "style-loader!css-loader"
            },
            {
              test: /\.useable\.css$/,
              exclude: /node_modules/,
              loader: "style-loader/useable!css-loader"
            },
            {
                test: /\.(png|jpg|ttf)$/,
                loader: 'url-loader?limit=10000',
                exclude: /node_modules/,
            }
        ]
    }
};
