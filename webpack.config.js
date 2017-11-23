const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    target: "electron",
    entry: "./src/index.jsx",
    output: {
        path: __dirname + "/bundle",
        filename: "index.js"
    },
    resolve: {
        modules: ["node_modules"],
        extensions: [".js", ".jsx"]
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["es2015", "react"]
                }
            }
        }, {
            test: /\.less$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }, {
                loader: "less-loader"
            }]
        }, {
            test: /\.css$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }]
        }, {
            test: /\.(png|jpg|jpeg|svg|ico)$/,
            use: {
                loader: "file-loader",
                options: {
                    name: "./res/images/[name].[ext]"
                }
            }
        }, { 
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            use: {
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            }
        }, {
            test: /\.(ttf|eot)$/,
            use: {
                loader: "file-loader"
            }
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ]
}