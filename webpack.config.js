const path = require('path');

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'commonjs'
    },
    externals: ["micromatch", "socket.io-client"],
    module: {
        rules: [{
            test: /\.ts?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        fallback: {
            "fs": false,
            "tls": false,
            "net": false,
            "util": false,
            "path": false,
            "zlib": false,
            "http": false,
            "https": false,
            "stream": false,
            "crypto": false,
            "crypto-browserify": false,
        },
        extensions: ['.ts', '.js']
    }
};