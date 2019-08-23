var path = require('path');
var HtmlWebpackPlugin =  require('html-webpack-plugin');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry : './src/index.js',
    output : {
        path : path.resolve(__dirname , 'build'),
        filename: 'main.js'
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
    mode:'production',
    plugins : [
        new HtmlWebpackPlugin ({
            template : 'src/index.html'
        })/*,
        new BundleAnalyzerPlugin()*/
    ],
}
