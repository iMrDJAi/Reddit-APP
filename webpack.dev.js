const HtmlWebpackPlugin = require("html-webpack-plugin");
const autoprefixer = require('autoprefixer');
const path = require('path');
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: '[name].[hash].js',
        publicPath: '/',
    },
    plugins: [
        new HtmlWebpackPlugin({ template: "./src/index.html" })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[hash].[ext]',
                    outputPath: 'assets'
                }
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader", //3. Inject styles into DOM
                    "css-loader", //2. Turns css into commonjs
                    //"sass-loader" //1. Turns sass into css
                    { 
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [autoprefixer()]
                        }
                    },
                    { 
                        loader: 'sass-loader',
                        options: {
                            webpackImporter: false,
                            sassOptions: {
                                includePaths: ['node_modules'],
                            },
                        }
                    },
                ]
            }
      ]
    },
    devServer: {
        historyApiFallback: true,
        port: 80
    }
}