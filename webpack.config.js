const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: './src/index.js',
    },
    devtool: 'inline-source-map',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'vue project',
            template: path.resolve('./src/template.html')
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: 'css-loader'
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            //用babel解析js文件 排除模块安装目录的文件
            {
                // .babelrc 解决vue-loader解析es6中...失败问题
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'stage-2']
                    }
                }],
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        // 省略文件名后缀
        extensions: ['.js', '.vue'],
        alias: {
            // https://www.imooc.com/article/17868
            'vue': 'vue/dist/vue.js'
        }
    },
};