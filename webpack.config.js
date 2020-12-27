const path = require('path');

module.exports = {
    entry: {
        index: './src/index.js',
        chat: './src/chat.js',
        forgot_password: './src/forgot-password.js',
        profile: './src/profile.js',
        sign_up: './src/sign-up.js'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: { presets: ["@babel/env"] }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    resolve: {
        extensions: ["*", ".js", ".jsx"]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, "public/dist"),
        publicPath: "/public/dist"
    }
};
