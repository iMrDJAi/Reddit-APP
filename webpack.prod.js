const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer');
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
module.exports = {
    mode: 'production',
    entry: {
        index: './src/index.js'
    },
    output: {
        filename: '[name].[hash].js'
    },
    optimization: {
        minimizer: [
          new OptimizeCssAssetsPlugin(),
          new TerserPlugin()
        ]/*,
        splitChunks: {
            // include all types of chunks
            chunks: 'all',
            maxSize: 249856
        }*/
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: "[name].[hash].css" }),
        new HtmlWebpackPlugin({ template: "./src/index.html" }),
        new CleanWebpackPlugin()
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
                    MiniCssExtractPlugin.loader, //3. Extract css into files
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
    }
}