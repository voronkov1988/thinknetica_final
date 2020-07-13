const path = require('path');

module.exports = {
    mode: "development",
    entry: './loadIssues.js',
    output: {
        filename: "index.[hash].js",
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test:/\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test:/\.(jpg|png|gif|jpeg|svg)$/,
                use: ['file-loader']
            }
        ]
    }
};