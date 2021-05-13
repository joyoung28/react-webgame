const path = require('path');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    name: 'response-check',
    mode: 'development', //실서비스: production
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.jsx'],
        fallback: {
            "crypto": false, "util": false
        },
    },

    entry: {
        app: ['./client'],
    },//입력

    module: {
        rules: [{
            test: /\.jsx?/, 
            loader: 'babel-loader',
            options: {
                presets: [
                  ['@babel/preset-env', {
                    targets: {
                      browsers: ['> 1% in KR'], // browserslist
                    },
                    debug: true,
                  }],
                  '@babel/preset-react',
                ],
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                    'react-refresh/babel',
                ],
              },
              exclude: path.join(__dirname, 'node_modules'),
        }],
    },
    plugins: [
        new RefreshWebpackPlugin()

    ],
    output: {
        path: path.join(__dirname, 'dist'),//path.join하면 현재경로를 dist로 만들어줌
        filename: 'app.js',
        publicPath: '/dist/',
    },//출력
    devServer: {
        publicPath: '/dist/',
        hot: true,
    },

};