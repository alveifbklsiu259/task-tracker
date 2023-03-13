const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: {
        bundle: './src'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name]_[contenthash].js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/template.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /\node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', ['@babel/preset-react', {"runtime": "automatic"}]]
                    }
                }
            },
            {
                test: /\.(s[ca]|c)ss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
}