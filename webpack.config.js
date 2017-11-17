const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
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
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ]
}