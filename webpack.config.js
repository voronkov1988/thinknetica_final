// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const path = require("path");

// eslint-disable-next-line no-undef
module.exports = {
    mode: "development",
    entry: "./loadIssues.js",
    output: {
        filename: "index.[hash].js",
        // eslint-disable-next-line no-undef
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test:/\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test:/\.(jpg|png|gif|jpeg|svg)$/,
                use: ["file-loader"]
            }
        ]
    }
};