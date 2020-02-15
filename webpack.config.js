const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.jsx',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        historyApiFallback: true,
        proxy: {
            '/auth': 'http://localhost:3001'
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        // presets: ['@babel/preset-env', '@babel/preset-react']
                        presets: ['@babel/preset-react']
                    }
                }
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({template: './src/template.html'})
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    }
}