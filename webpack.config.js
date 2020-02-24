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
            // '/auth': 'http://localhost:3001',
            '/': 'http://localhost:3001/'
        },
        hot: true,
        host: '192.168.100.5',
        port: '8080',
        disableHostCheck: true
    },
    module: {
        rules: [
            {
                test: /\.jsx$|\.js$/,
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