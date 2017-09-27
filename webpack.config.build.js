const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { entry, html } = require('./fileList');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const config = {
    entry: './main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].js",
        // publicPath: "./src/images",
        chunkFilename: '[name].[chunkhash:5].chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.(css|less)$/, use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true
                            }
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                minimize: true
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                use: [ // use 作用是使用多个loader
                    {
                        loader: 'file-loader?name=images/[name].[ext]'
                    }
                ]
            },
            {
                test: /\.(mp3)$/,
                use: [ // use 作用是使用多个loader
                    {
                        loader: 'file-loader?name=music/[name].[ext]'
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/, loader: 'file-loader'
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['react', 'es2015'],
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ],
    },
    resolve: {
        enforceModuleExtension: false,
        extensions: ['.js', '.jsx', '.css', '.less']
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 3000
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: false,
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
            // chunks: [html.substring(0, html.indexOf('.'))], // 允许添加的模块 js / css
            inject:'true',
            hasg:'true'
        })
    ]
}

module.exports = config;