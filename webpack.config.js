var path = require('path');
var HtmlWebpackPlugin =  require('html-webpack-plugin');

module.exports = {
    entry : './src/index.js',
    output : {
        path : path.resolve(__dirname , 'build'),
        filename: 'index_bundle.js'
    },
    module : {
        rules : [
            {test : /\.(js|jsx)$/, use:'babel-loader'},
            {test : /\.css$/, use:['style-loader', 'css-loader']}
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
        alias: {
            components: path.resolve(__dirname, './src/components'),
            constants: path.resolve(__dirname, './src/constants.jsx')
        }
    },
    mode:'development',
    plugins : [
        new HtmlWebpackPlugin ({
            template : 'src/index.html'
        })
    ],
}
